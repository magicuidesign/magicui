"use client"

import {
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  type ComponentProps,
  type CSSProperties,
} from "react"

import { cn } from "@/lib/utils"

import { passSample10 } from "./plucked-rule-pass"

void passSample10(0)
// Defaults, also used when a numeric prop is not a finite number.
const DEFAULT_SIZE = 1
const DEFAULT_AMPLITUDE = 24
const DEFAULT_DURATION = 1.5
const DEFAULT_FREQUENCY = 5
const DEFAULT_DELAY = 0.4
// The shortest ring and the slowest vibration the props are clamped to.
const MIN_DURATION = 0.1
const MIN_FREQUENCY = 0.5

/** Harmonics of the string that together make up the line's shape. */
const HARMONICS = 12
/** The moving line is sampled about this often along its width. */
const SAMPLE_SPACING_PX = 10
/** Fewest and most curve segments the moving line is drawn with. */
const MIN_SEGMENTS = 8
const MAX_SEGMENTS = 96

/** The bend never exceeds this share of the line's width. */
const BEND_WIDTH_RATIO = 0.06
/** Near an anchor the line gives only this share of its largest bend. */
const END_STIFFNESS = 0.3

/** The pointer touches the line within this distance on either side. */
const HIT_SLOP_PX = 12
/** A tap plucks the line within this distance on either side. */
const TOUCH_SLOP_PX = 28
/** Share of the bend limit that a tap pulls the line. */
const TOUCH_STRENGTH = 0.6
/** How long a fast crossing holds the line before it slips. */
const FLICK_MS = 48
/** Share of the bend limit that the slowest crossing pulls the line. */
const MIN_FLICK_STRENGTH = 0.4
/** Pointer speed, in pixels per millisecond, that pulls to the full limit. */
const FULL_FLICK_SPEED = 4

/** Time constant of the line catching up with the shape it is pulled to. */
const CHASE_MS = 24
/** Longest time step of that chase, so a stalled frame cannot jump. */
const MAX_STEP_MS = 32
/** Stretches each overtone a little, so the harmonics never realign. */
const DETUNING = 0.0012
/** Each higher harmonic fades this much faster than the one below it. */
const DECAY_PER_HARMONIC = 0.45
/** Below this total amplitude the line is back to a still hairline. */
const SETTLE_PX = 0.2
/** A held line stops animating once it is this close to its target. */
const CONVERGED_PX = 0.01

/** The highlight reaches this far either side of the pluck point. */
const HIGHLIGHT_SPREAD_PX = 140
/** The highlight never spreads over more than this share of the width. */
const HIGHLIGHT_WIDTH_RATIO = 0.3
/**
 * Across its spread the highlight fades in, holds at full strength and fades
 * out, so the two colors only meet over short stretches.
 */
const HIGHLIGHT_STOPS = [
  { offset: 0, opacity: 0 },
  { offset: 0.3, opacity: 1 },
  { offset: 0.7, opacity: 1 },
  { offset: 1, opacity: 0 },
]
/** Above this share of the largest bend, the highlight is at full spread. */
const HIGHLIGHT_FULL_RATIO = 0.3
/** Below this share of its full spread, the highlight also fades out. */
const HIGHLIGHT_FADE_LEVEL = 0.5

/** Where the line plucks itself on first view (the intro), from 0 to 1. */
const INTRO_POSITION = 0.38
/** Share of the bend limit that the intro pulls the line. */
const INTRO_STRENGTH = 0.8
/** How long the intro holds the line before letting it ring. */
const INTRO_HOLD_MS = 160
/** The line plucks itself only once it is clear of the viewport's bottom. */
const INTRO_VIEW_MARGIN = "0px 0px -15% 0px"

const NON_ALPHANUMERIC = /[^a-z0-9]/gi

function finiteOr(value: number, fallback: number) {
  return Number.isFinite(value) ? value : fallback
}

/** A pointer's place along the line (0 to 1) and its distance from it. */
interface LinePoint {
  position: number
  /** Pixels from the line's centre, negative above it. */
  offset: number
}

function locate(event: PointerEvent, box: DOMRect): LinePoint {
  return {
    position: (event.clientX - box.left) / box.width,
    offset: event.clientY - (box.top + box.height / 2),
  }
}

function isAlongLine(position: number) {
  return position > 0 && position < 1
}

/** Pointer speed between two events, in pixels per millisecond. */
function pointerSpeed(from: PointerEvent, to: PointerEvent) {
  const distance = Math.hypot(
    to.clientX - from.clientX,
    to.clientY - from.clientY
  )
  return distance / Math.max(1, to.timeStamp - from.timeStamp)
}

/** A lazy pass pulls the line a little, a hard swipe to its full limit. */
function flickStrength(speed: number) {
  const ratio = Math.min(1, speed / FULL_FLICK_SPEED)
  return MIN_FLICK_STRENGTH + (1 - MIN_FLICK_STRENGTH) * ratio
}

/**
 * Writes the harmonics of a string pulled aside at `position`. Harmonic n is
 * proportional to sin(nπp) / n², so a pluck at the middle leaves the even
 * harmonics silent. A taper of 1 - n / (HARMONICS + 1) rounds off the ripple
 * that cutting the series short would leave along the line. The amplitudes
 * add up to `apex`, which keeps every point of the line, and the ring that
 * follows, within it.
 */
function writePluckShape(into: Float64Array, position: number, apex: number) {
  let total = 0
  for (let n = 0; n < HARMONICS; n++) {
    const harmonic = n + 1
    const taper = 1 - harmonic / (HARMONICS + 1)
    into[n] = (Math.sin(harmonic * Math.PI * position) / harmonic ** 2) * taper
    total += Math.abs(into[n])
  }
  for (let n = 0; n < HARMONICS; n++) {
    into[n] *= apex / (total || 1)
  }
}

/** Height of the line at `x`, a share of its width from 0 to 1. */
function heightAt(modes: Float64Array, x: number) {
  let height = 0
  for (let n = 0; n < HARMONICS; n++) {
    height += modes[n] * Math.sin((n + 1) * Math.PI * x)
  }
  return height
}

/**
 * Draws the line through samples about SAMPLE_SPACING_PX apart. Each sample
 * is the control point of a quadratic curve, and the curves meet halfway
 * between samples, so the line never shows a corner.
 */
function toPath(modes: Float64Array, width: number) {
  const segments = Math.min(
    MAX_SEGMENTS,
    Math.max(MIN_SEGMENTS, Math.round(width / SAMPLE_SPACING_PX))
  )
  const step = width / segments
  const heights = Array.from({ length: segments + 1 }, (_, i) =>
    heightAt(modes, i / segments)
  )
  const format = (value: number) => value.toFixed(2)

  let path = "M0,0"
  for (let i = 1; i < segments - 1; i++) {
    const midX = (i + 0.5) * step
    const midY = (heights[i] + heights[i + 1]) / 2
    path += ` Q${format(i * step)},${format(heights[i])} ${format(midX)},${format(midY)}`
  }
  const last = segments - 1
  return `${path} Q${format(last * step)},${format(heights[last])} ${format(width)},0`
}

/** How a released string rings out. */
interface Ring {
  /** The largest bend in pixels, which takes `duration` to settle. */
  bend: number
  duration: number
  frequency: number
}

/**
 * The line's shape, held as the amplitudes of the standing waves of a string
 * fixed at both ends. A held string eases toward the shape it is pulled to;
 * a released one rings out as a sum of decaying cosines.
 */
function createStrand() {
  /** The current shape. */
  const modes = new Float64Array(HARMONICS)
  /** The shape a held string is pulled to. */
  const targets = new Float64Array(HARMONICS)
  /** The shape the current ring started from. */
  const released = new Float64Array(HARMONICS)
  const angularSpeeds = new Float64Array(HARMONICS)
  const decayRates = new Float64Array(HARMONICS)
  let holding = false
  let releasedAt = 0

  // Each harmonic eases toward the held shape. Returns the total amplitude.
  const chase = (step: number) => {
    const amount = 1 - Math.exp(-step / CHASE_MS)
    let total = 0
    for (let n = 0; n < HARMONICS; n++) {
      modes[n] += (targets[n] - modes[n]) * amount
      total += Math.abs(modes[n])
    }
    return total
  }

  // Each harmonic is a decaying cosine of the time since release, so the
  // ring never depends on the frame rate. Returns the total envelope.
  const ring = (seconds: number) => {
    let total = 0
    for (let n = 0; n < HARMONICS; n++) {
      const envelope = released[n] * Math.exp(-decayRates[n] * seconds)
      modes[n] = envelope * Math.cos(angularSpeeds[n] * seconds)
      total += Math.abs(envelope)
    }
    return total
  }

  return {
    modes,
    isHolding: () => holding,

    /** Pulls the string toward the shape of a pluck at `position`. */
    hold(position: number, apex: number) {
      writePluckShape(targets, position, apex)
      holding = true
    },

    /** Lets the string ring out from whatever shape it has right now. */
    release(time: number, { bend, duration, frequency }: Ring) {
      holding = false
      released.set(modes)
      releasedAt = time
      // A ring from the largest bend fades to SETTLE_PX in `duration`.
      const decay = Math.log(Math.max(2, bend / SETTLE_PX)) / duration
      for (let n = 0; n < HARMONICS; n++) {
        const harmonic = n + 1
        const detune = Math.sqrt(1 + DETUNING * harmonic ** 2)
        angularSpeeds[n] = 2 * Math.PI * frequency * harmonic * detune
        decayRates[n] = decay * (1 + DECAY_PER_HARMONIC * n)
      }
    },

    /** Moves the shape on to `time`. Returns the total amplitude. */
    advance(time: number, step: number) {
      return holding ? chase(step) : ring(Math.max(0, time - releasedAt) / 1000)
    },

    /** Whether the shape has stopped changing. */
    isStill(energy: number) {
      if (!holding) {
        return energy < SETTLE_PX
      }
      return modes.every(
        (mode, n) => Math.abs(targets[n] - mode) < CONVERGED_PX
      )
    },

    reset() {
      holding = false
      modes.fill(0)
    },
  }
}

export interface PluckedRuleProps extends Omit<
  ComponentProps<"div">,
  "children"
> {
  /**
   * Color of the line, where the highlight gradient starts. Set it here; a
   * `bg-*` class does not style the line.
   * @default "var(--border)"
   */
  colorFrom?: string
  /**
   * Color at the pluck point, where the highlight gradient ends.
   * @default "var(--foreground)"
   */
  colorTo?: string
  /**
   * Thickness of the line in pixels.
   * @default 1
   */
  size?: number
  /**
   * Largest bend in pixels before the line slips free, capped at 6% of the
   * line's width.
   * @default 24
   */
  amplitude?: number
  /**
   * Seconds for a ring from the largest bend to settle.
   * @default 1.5
   */
  duration?: number
  /**
   * Vibrations per second of the fundamental. Higher reads as tighter.
   * @default 5
   */
  frequency?: number
  /**
   * Seconds to wait after the rule first enters view before it plucks itself.
   * @default 0.4
   */
  delay?: number
}

/**
 * A horizontal rule that bends when the pointer passes through it, then
 * slips free and rings out like a plucked string. It plucks itself once when
 * it first comes into view. At rest, without JavaScript and with reduced
 * motion it is a plain `<hr>` hairline. Pass `aria-hidden` when the rule is
 * purely decorative, to hide its separator from assistive technology.
 */
export function PluckedRule({
  colorFrom = "var(--border)",
  colorTo = "var(--foreground)",
  size = DEFAULT_SIZE,
  amplitude = DEFAULT_AMPLITUDE,
  duration = DEFAULT_DURATION,
  frequency = DEFAULT_FREQUENCY,
  delay = DEFAULT_DELAY,
  ref,
  className,
  style,
  ...props
}: PluckedRuleProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const highlightRef = useRef<SVGPathElement>(null)
  const gradientRef = useRef<SVGLinearGradientElement>(null)
  // The intro plays once per mount, and not at all after a manual pluck.
  const hasPlucked = useRef(false)
  const id = useId()
  const gradientId = `plucked-rule-${id.replace(NON_ALPHANUMERIC, "")}`

  const tuning = {
    amplitude: Math.max(0, finiteOr(amplitude, DEFAULT_AMPLITUDE)),
    duration: Math.max(MIN_DURATION, finiteOr(duration, DEFAULT_DURATION)),
    frequency: Math.max(MIN_FREQUENCY, finiteOr(frequency, DEFAULT_FREQUENCY)),
    delay: Math.max(0, finiteOr(delay, DEFAULT_DELAY)),
  }
  const isEnabled = tuning.amplitude > 0
  // The running effect reads the latest tuning when it needs it, so a
  // change of props never cuts a ring short or rebuilds the listeners.
  const tuningRef = useRef(tuning)
  useEffect(() => {
    tuningRef.current = tuning
  })

  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, [])

  useEffect(() => {
    const root = rootRef.current
    const line = lineRef.current
    const highlight = highlightRef.current
    const gradient = gradientRef.current
    const doc = root?.ownerDocument
    const view = doc?.defaultView
    if (!isEnabled || !root || !line || !highlight || !gradient) {
      return
    }
    if (!doc || !view) {
      return
    }

    const reducedMotion = view.matchMedia("(prefers-reduced-motion: reduce)")
    const strand = createStrand()
    let energy = 0
    let width = root.offsetWidth
    // Where the line was last plucked, from 0 to 1.
    let contact = 0
    let frame = 0
    let lastFrameTime = 0
    let holdTimer = 0
    let introTimer = 0
    // The side the pointer came from: -1 above the line, 1 below it.
    let approachSide = 1
    let previous: PointerEvent | null = null
    // The finger that touched down near the line, until it lifts.
    let tapPointerId: number | null = null
    let listeners: AbortController | null = null
    let inView = false
    let isWellInView = false

    const largestBend = () =>
      Math.min(tuningRef.current.amplitude, width * BEND_WIDTH_RATIO)
    // The line gives less near its anchors than in the middle.
    const bendLimit = (position: number) => {
      const give =
        END_STIFFNESS + (1 - END_STIFFNESS) * Math.sin(Math.PI * position)
      return largestBend() * give
    }

    // The moving line is as thick as the rule, so a height class reaches it.
    const setThickness = (height: number) => {
      line.style.strokeWidth = `${height}px`
      highlight.style.strokeWidth = `${height}px`
    }

    const draw = () => {
      const moving = width > 0 && energy >= SETTLE_PX
      root.toggleAttribute("data-moving", moving)
      if (!moving) {
        return
      }
      const path = toPath(strand.modes, width)
      line.setAttribute("d", path)
      highlight.setAttribute("d", path)
      // The highlight narrows toward the pluck point as the ring dies away,
      // so the two colors never blend over the whole line.
      const level = Math.min(1, energy / (HIGHLIGHT_FULL_RATIO * largestBend()))
      const spread =
        Math.min(HIGHLIGHT_SPREAD_PX, width * HIGHLIGHT_WIDTH_RATIO) * level
      gradient.setAttribute("x1", (contact * width - spread).toFixed(2))
      gradient.setAttribute("x2", (contact * width + spread).toFixed(2))
      highlight.style.opacity = String(
        Math.min(1, level / HIGHLIGHT_FADE_LEVEL)
      )
    }

    const renderFrame = (time: number) => {
      const step = Math.min(MAX_STEP_MS, Math.max(0, time - lastFrameTime))
      lastFrameTime = time
      energy = strand.advance(time, step)
      draw()
      const isRunning = width > 0 && !strand.isStill(energy)
      frame = isRunning ? view.requestAnimationFrame(renderFrame) : 0
    }

    const requestFrame = () => {
      if (frame) {
        return
      }
      lastFrameTime = performance.now()
      frame = view.requestAnimationFrame(renderFrame)
    }

    const cancelIntro = () => {
      view.clearTimeout(introTimer)
      introTimer = 0
    }

    const hold = (position: number, apex: number) => {
      hasPlucked.current = true
      cancelIntro()
      contact = position
      strand.hold(position, apex)
      requestFrame()
    }

    const release = () => {
      view.clearTimeout(holdTimer)
      holdTimer = 0
      if (!strand.isHolding()) {
        return
      }
      const { duration: ringDuration, frequency: ringFrequency } =
        tuningRef.current
      strand.release(performance.now(), {
        bend: largestBend(),
        duration: ringDuration,
        frequency: ringFrequency,
      })
      requestFrame()
    }

    const pluck = (position: number, apex: number, holdMs: number) => {
      hold(position, apex)
      view.clearTimeout(holdTimer)
      holdTimer = view.setTimeout(release, holdMs)
    }

    // Scrolling, leaving the window or losing focus lets go of a line that
    // follows the pointer. A timed pluck, such as the intro or a flick,
    // always finishes its hold, so it never rings from a shape it has not
    // reached yet.
    const letGo = () => {
      previous = null
      if (!holdTimer) {
        release()
      }
    }

    // While held, the line rests against the edge of the pointer's touch
    // band. It lets go when the pointer backs away or leaves the ends of the
    // line. Pulled past its bend limit, it goes taut for a moment and slips,
    // so a slow pull always rings from full height.
    const follow = ({ position, offset }: LinePoint) => {
      const push = offset - approachSide * HIT_SLOP_PX
      const backedAway = approachSide * push >= 0
      if (!isAlongLine(position) || backedAway) {
        release()
        return
      }
      const limit = bendLimit(position)
      if (Math.abs(push) > limit) {
        pluck(position, -approachSide * limit, FLICK_MS)
        return
      }
      hold(position, push)
    }

    // The line is caught when the pointer moves from outside its touch band
    // into or through it. Both points use the current box, so scrolling can
    // never fake a crossing.
    const tryCatch = (from: LinePoint, to: LinePoint, speed: number) => {
      if (Math.abs(from.offset) < HIT_SLOP_PX) {
        return
      }
      const side = Math.sign(from.offset)
      const push = to.offset - side * HIT_SLOP_PX
      if (side * push >= 0) {
        return
      }

      const edge = side * HIT_SLOP_PX
      const progress = (from.offset - edge) / (from.offset - to.offset)
      const position = from.position + (to.position - from.position) * progress
      if (!isAlongLine(position)) {
        return
      }

      approachSide = side
      const limit = bendLimit(position)
      if (Math.abs(push) <= limit) {
        hold(position, push)
        return
      }
      // Too fast to follow: catch for a moment at a height set by the
      // pointer's speed, then ring.
      pluck(position, -side * limit * flickStrength(speed), FLICK_MS)
    }

    const handlePointerMove = (event: PointerEvent) => {
      // A finger dragging the page is scrolling, not plucking.
      if (event.pointerType === "touch") {
        return
      }
      const box = root.getBoundingClientRect()
      const to = locate(event, box)
      const from = previous ? locate(previous, box) : null
      const speed = previous ? pointerSpeed(previous, event) : 0
      previous = event
      if (holdTimer) {
        return
      }
      if (strand.isHolding()) {
        follow(to)
      } else if (from) {
        tryCatch(from, to, speed)
      }
    }

    const isNearLine = ({ position, offset }: LinePoint) =>
      isAlongLine(position) && Math.abs(offset) <= TOUCH_SLOP_PX

    // A tap near the line plucks it toward the finger's side when the finger
    // lifts. The browser cancels the pointer when the touch turns into a
    // scroll, so a swipe across the line leaves it alone.
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        return
      }
      const point = locate(event, root.getBoundingClientRect())
      tapPointerId = isNearLine(point) ? event.pointerId : null
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerId !== tapPointerId) {
        return
      }
      tapPointerId = null
      const point = locate(event, root.getBoundingClientRect())
      if (!isNearLine(point)) {
        return
      }
      const side = Math.sign(point.offset) || 1
      const apex = side * bendLimit(point.position) * TOUCH_STRENGTH
      pluck(point.position, apex, FLICK_MS)
    }

    const handlePointerCancel = (event: PointerEvent) => {
      if (event.pointerId === tapPointerId) {
        tapPointerId = null
      }
    }

    // A pointer that leaves the window, or moves onto an embedded frame
    // whose events this page never sees, lets go of the line.
    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return
      }
      const next = event.relatedTarget
      if (next === null || next instanceof view.HTMLIFrameElement) {
        letGo()
      }
    }

    // Only scrolling that moves the rule lets go of it.
    const handleScroll = (event: Event) => {
      if (event.target instanceof Node && event.target.contains(root)) {
        letGo()
      }
    }

    // The line plucks itself once, `delay` after it is well inside the
    // viewport, unless something has plucked it already.
    const scheduleIntro = () => {
      if (!listeners || !isWellInView || introTimer || hasPlucked.current) {
        return
      }
      introTimer = view.setTimeout(() => {
        introTimer = 0
        if (hasPlucked.current) {
          return
        }
        const apex = bendLimit(INTRO_POSITION) * INTRO_STRENGTH
        pluck(INTRO_POSITION, apex, INTRO_HOLD_MS)
      }, tuningRef.current.delay * 1000)
    }

    // Back to the CSS hairline, with nothing running.
    const stop = () => {
      listeners?.abort()
      listeners = null
      cancelIntro()
      view.clearTimeout(holdTimer)
      view.cancelAnimationFrame(frame)
      holdTimer = 0
      frame = 0
      previous = null
      tapPointerId = null
      energy = 0
      strand.reset()
      root.removeAttribute("data-moving")
    }

    // Listening in the capture phase sees every move, even ones that page
    // content stops from bubbling. Nothing is ever prevented.
    const start = () => {
      listeners = new AbortController()
      const { signal } = listeners
      const options = { capture: true, passive: true, signal }
      view.addEventListener("pointermove", handlePointerMove, options)
      view.addEventListener("pointerdown", handlePointerDown, options)
      view.addEventListener("pointerup", handlePointerUp, options)
      view.addEventListener("pointercancel", handlePointerCancel, options)
      doc.addEventListener("pointerout", handlePointerOut, options)
      doc.addEventListener("scroll", handleScroll, options)
      view.addEventListener("blur", letGo, { signal })
      scheduleIntro()
    }

    // Listen only while the rule is near the screen, the tab is visible and
    // motion is allowed.
    const sync = () => {
      stop()
      if (inView && !doc.hidden && !reducedMotion.matches) {
        start()
      }
    }

    // When entries arrive in a batch, the latest one is the current state.
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const isIntersecting = entries.at(-1)?.isIntersecting ?? false
      if (isIntersecting === inView) {
        return
      }
      inView = isIntersecting
      sync()
    }

    const handleIntroView = (entries: IntersectionObserverEntry[]) => {
      isWellInView = entries.at(-1)?.isIntersecting ?? false
      if (isWellInView) {
        scheduleIntro()
      } else {
        cancelIntro()
      }
    }

    // The shape is proportional to the width, so a resize mid-ring keeps it.
    const handleResize = ([entry]: ResizeObserverEntry[]) => {
      const box = entry.borderBoxSize[0]
      width = box?.inlineSize ?? root.offsetWidth
      setThickness(box?.blockSize ?? root.offsetHeight)
      if (strand.isHolding() || energy >= SETTLE_PX) {
        requestFrame()
      }
    }

    // Keep listening while the rule is within a bend of the viewport, so a
    // ring near an edge finishes before the line goes back to rest.
    const bendMargin = Math.ceil(tuningRef.current.amplitude)
    const intersectionObserver = new IntersectionObserver(handleIntersect, {
      rootMargin: `${bendMargin}px 0px`,
    })
    const introObserver = new IntersectionObserver(handleIntroView, {
      rootMargin: INTRO_VIEW_MARGIN,
    })
    const resizeObserver = new ResizeObserver(handleResize)
    setThickness(root.offsetHeight)
    intersectionObserver.observe(root)
    introObserver.observe(root)
    resizeObserver.observe(root)
    reducedMotion.addEventListener("change", sync)
    doc.addEventListener("visibilitychange", sync)

    return () => {
      stop()
      intersectionObserver.disconnect()
      introObserver.disconnect()
      resizeObserver.disconnect()
      reducedMotion.removeEventListener("change", sync)
      doc.removeEventListener("visibilitychange", sync)
    }
  }, [isEnabled])

  return (
    <div
      ref={rootRef}
      className={cn(
        "group/plucked-rule relative h-(--size) w-full",
        // A background class would otherwise show under the moving line.
        "data-moving:bg-transparent data-moving:bg-none",
        className
      )}
      style={
        {
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--size": `${Math.max(0, finiteOr(size, DEFAULT_SIZE))}px`,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <hr className="h-full border-0 bg-(--color-from) group-data-moving/plucked-rule:bg-transparent" />
      <svg
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 size-full translate-y-1/2",
          "hidden overflow-visible rounded-[inherit]",
          "group-data-moving/plucked-rule:block",
          "fill-none stroke-(--color-from) stroke-(length:--size)"
        )}
      >
        <defs>
          <linearGradient
            ref={gradientRef}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1="0"
            y2="0"
          >
            {HIGHLIGHT_STOPS.map(({ offset, opacity }) => (
              <stop
                key={offset}
                offset={offset}
                stopOpacity={opacity}
                className="[stop-color:var(--color-to)]"
              />
            ))}
          </linearGradient>
        </defs>
        <path ref={lineRef} />
        <path ref={highlightRef} stroke={`url(#${gradientId})`} />
      </svg>
    </div>
  )
}
