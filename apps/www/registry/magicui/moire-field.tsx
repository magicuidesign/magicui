"use client"

import { useEffect, useImperativeHandle, useRef } from "react"
import type { ComponentProps, CSSProperties } from "react"

import { cn } from "@/lib/utils"

import { passSample3 } from "./moire-field-pass"

void passSample3(0)
export interface MoireFieldProps extends Omit<
  ComponentProps<"div">,
  "color" | "children"
> {
  /**
   * Any CSS colour for the rings, including `var(--primary)`. The root sets
   * `text-foreground`, so the default follows the theme.
   * @default "currentColor"
   */
  color?: string
  /**
   * Seconds for the fans to make one full turn. Clamped to at least 16.
   * @default 24
   */
  duration?: number
  /**
   * Seconds to hold the aligned rings after the field first comes into view,
   * before they slide apart.
   * @default 0
   */
  delay?: number
  /**
   * Distance between rings in CSS pixels. Clamped to at least 3, since finer
   * rings alias against the pixel grid.
   * @default 5
   */
  size?: number
  /**
   * How many fans appear around the centre, from 4 to 12.
   * @default 12
   */
  bands?: number
  /**
   * Turn the fans toward a mouse or pen inside the field. Touch is ignored.
   * @default true
   */
  interactive?: boolean
}

const DEFAULTS = { duration: 24, delay: 0, size: 5, bands: 12 }
const MIN_DURATION = 16
const MIN_SIZE = 3
const MIN_BANDS = 4
const MAX_BANDS = 12
const MAX_PIXEL_RATIO = 2
/** Largest canvas iOS Safari draws, in device pixels. Past it, it stays blank. */
const MAX_CANVAS_PIXELS = 16_777_216

/** Seconds for the two ring sets to slide apart the first time they show. */
const BLOOM_SECONDS = 1.8
/** Direction of the first slide in radians, which keeps it off the axes. */
const START_ANGLE = -0.5
/** How far the separation swells and shrinks once the bloom is over. */
const BREATH_DEPTH = 0.22
/** Swells of the separation per full turn of the fans. */
const BREATHS_PER_TURN = 2
/** Time constant in seconds for turning toward the pointer. */
const STEER_SECONDS = 0.45
/** Fastest turn toward the pointer in radians per second, at rest size. */
const STEER_MAX_SPEED = 0.85
/** Longest step of one frame in seconds, so resuming never jumps. */
const MAX_STEP_SECONDS = 0.1

/** Animation state that outlives prop changes, so the bloom never replays. */
interface FieldState {
  /** Seconds of motion since the bloom started, not counting pauses. */
  time: number
  /** Seconds of `delay` already spent holding the aligned rings. */
  waited: number
  /** Seconds of `delay` still to hold. */
  remaining: number
  /** Direction the upper rings are offset in, in radians. */
  angle: number
  /** Phase of the breathing in radians, which starts when the bloom ends. */
  breath: number
  /** Whether the field is on screen. */
  visible: boolean
}

/**
 * The latest mouse or pen position and the field's box, both in client
 * pixels. Pointer events only write numbers here; the frame loop turns them
 * into an angle once per frame.
 */
interface PointerState {
  /** Whether a mouse or pen is on the page. */
  active: boolean
  /** Horizontal pointer position. */
  x: number
  /** Vertical pointer position. */
  y: number
  /** Left edge of the field, measured when it may have moved. */
  left: number
  /** Top edge of the field, measured when it may have moved. */
  top: number
  /** Width of the field. */
  width: number
  /** Height of the field. */
  height: number
}

/** The props as drawing and motion use them, clamped to their ranges. */
interface Settings {
  /** Seconds for one full turn of the fans. */
  duration: number
  /** Seconds to hold the aligned rings before the bloom. */
  delay: number
  /** Distance between rings in CSS pixels. */
  spacing: number
  /** Offset of the upper rings at rest, in CSS pixels. */
  separation: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const easeInOutSine = (progress: number) =>
  (1 - Math.cos(Math.PI * progress)) / 2

/** Scale of the separation at a breathing phase, from 0.78 to 1.22. */
const swell = (phase: number) => 1 + BREATH_DEPTH * Math.sin(phase)

/** Replaces a value that is not a finite number with its default, then clamps. */
function toRange(
  value: number,
  fallback: number,
  min: number,
  max = Number.POSITIVE_INFINITY
) {
  return clamp(Number.isFinite(value) ? value : fallback, min, max)
}

function resolveSettings(
  duration: number,
  delay: number,
  size: number,
  bands: number
): Settings {
  const spacing = toRange(size, DEFAULTS.size, MIN_SIZE)
  const fans = toRange(bands, DEFAULTS.bands, MIN_BANDS, MAX_BANDS)
  return {
    duration: toRange(duration, DEFAULTS.duration, MIN_DURATION),
    delay: toRange(delay, DEFAULTS.delay, 0),
    spacing,
    // Every ring spacing of offset adds four fans around the centre.
    separation: (fans / 4) * spacing,
  }
}

/**
 * The rings of one set as a CSS gradient: a 1px line centred on every
 * multiple of `spacing`, so it lines up with the canvases.
 */
function ringGradient(spacing: number) {
  const inner = spacing - 0.5
  return `repeating-radial-gradient(circle at center, currentColor 0 0.5px, transparent 0.5px ${inner}px, currentColor ${inner}px ${spacing}px)`
}

/**
 * Sizes a canvas and strokes one set of rings around its centre. Returns
 * false when the browser gives no 2D context.
 */
function drawRings(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  ratio: number,
  spacing: number,
  ink: string
) {
  const context = canvas.getContext("2d")
  if (!context) return false

  // Past the iOS Safari area cap, trade some sharpness for showing at all.
  const scale = Math.min(ratio, Math.sqrt(MAX_CANVAS_PIXELS / (width * height)))
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const centerX = (width * scale) / 2
  const centerY = (height * scale) / 2
  context.setTransform(scale, 0, 0, scale, centerX, centerY)
  context.strokeStyle = ink
  context.lineWidth = 1

  // One path and one stroke for every ring, out past the corners.
  const outermost = Math.hypot(width, height) / 2 + spacing
  context.beginPath()
  for (let radius = spacing; radius <= outermost; radius += spacing) {
    context.moveTo(radius, 0)
    context.arc(0, 0, radius, 0, Math.PI * 2)
  }
  context.stroke()
  return true
}

export function MoireField({
  color = "currentColor",
  duration = DEFAULTS.duration,
  delay = DEFAULTS.delay,
  size = DEFAULTS.size,
  bands = DEFAULTS.bands,
  interactive = true,
  className,
  style,
  ref,
  ...props
}: MoireFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const lowerRef = useRef<HTMLCanvasElement>(null)
  const upperRef = useRef<HTMLCanvasElement>(null)
  const fieldRef = useRef<FieldState>({
    time: 0,
    waited: 0,
    remaining: 0,
    angle: START_ANGLE,
    breath: 0,
    visible: false,
  })
  const pointerRef = useRef<PointerState>({
    active: false,
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  // Read by the frame loop and by every redraw, so a prop change never
  // restarts the effect or the bloom.
  const settings = resolveSettings(duration, delay, size, bands)
  const settingsRef = useRef(settings)
  settingsRef.current = settings
  // Set by the drawing effect while it is mounted.
  const redrawRef = useRef<(() => void) | null>(null)
  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, [])

  // Drawing, the frame loop and pausing. This runs once.
  useEffect(() => {
    const root = rootRef.current
    const placeholder = placeholderRef.current
    const lower = lowerRef.current
    const upper = upperRef.current
    if (!root || !placeholder || !lower || !upper) return

    const field = fieldRef.current
    const pointer = pointerRef.current
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const darkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    // The separation the canvases were last drawn for.
    let separation = 0
    let drawnKey = ""
    let frame = 0
    let previous = 0

    // The only write per frame: one transform on the upper rings.
    const position = () => {
      const still = reducedMotion.matches
      const bloom = still
        ? 1
        : easeInOutSine(Math.min(field.time / BLOOM_SECONDS, 1))
      const breathing = still ? 1 : swell(field.breath)
      const angle = still ? START_ANGLE : field.angle
      const offset = separation * bloom * breathing
      const x = Math.cos(angle) * offset
      const y = Math.sin(angle) * offset
      upper.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    // Direction from the centre to a mouse or pen inside the field, or null.
    // Pure arithmetic on cached numbers, so the loop never reads layout.
    const pointerAngle = () => {
      if (!pointer.active) return null
      const x = pointer.x - pointer.left
      const y = pointer.y - pointer.top
      const inside =
        x >= 0 && x <= pointer.width && y >= 0 && y <= pointer.height
      if (!inside) return null
      return Math.atan2(y - pointer.height / 2, x - pointer.width / 2)
    }

    // Radians per second: the orbit, or once the bloom is over, a glide
    // toward the pointer by the shortest arc.
    const turnSpeed = (period: number) => {
      const target = field.time < BLOOM_SECONDS ? null : pointerAngle()
      if (target === null) return (Math.PI * 2) / period
      const offset = target - field.angle
      const shortest = Math.atan2(Math.sin(offset), Math.cos(offset))
      // The cap holds how fast the rings slide rather than the angle, so a
      // swell never pushes a swing past the comfort limit.
      const limit = STEER_MAX_SPEED / swell(field.breath)
      return clamp(shortest / STEER_SECONDS, -limit, limit)
    }

    const tick = (now: number) => {
      const step = previous
        ? Math.min((now - previous) / 1000, MAX_STEP_SECONDS)
        : 0
      previous = now
      const period = settingsRef.current.duration

      // Spend the step on the delay hold first, then on motion.
      const held = Math.min(step, field.remaining)
      const moving = step - held
      field.remaining -= held
      field.waited += held
      field.time += moving

      // Breathing starts as the bloom ends: the fans slowly crowd and
      // relax, also while they face a resting pointer.
      const afterBloom = Math.min(
        moving,
        Math.max(0, field.time - BLOOM_SECONDS)
      )
      field.breath += ((Math.PI * 2 * BREATHS_PER_TURN) / period) * afterBloom
      field.angle += turnSpeed(period) * moving

      position()
      frame = requestAnimationFrame(tick)
    }

    // One start and stop routine for visibility, tab state and reduced
    // motion. Stopped means no pending frame.
    const sync = () => {
      cancelAnimationFrame(frame)
      previous = 0
      position()
      const running =
        drawnKey !== "" &&
        field.visible &&
        !document.hidden &&
        !reducedMotion.matches
      if (running) frame = requestAnimationFrame(tick)
    }

    // Reads the box, colour and settings, and redraws both ring sets only
    // when one of them changed. Off screen it waits: coming back into view
    // calls it again.
    const draw = () => {
      if (drawnKey && !field.visible) return
      const width = root.clientWidth
      const height = root.clientHeight
      if (!width || !height) return

      const { spacing } = settingsRef.current
      separation = settingsRef.current.separation
      // Until the bloom starts, a new delay shortens or extends the hold.
      if (!field.time) {
        field.remaining = Math.max(0, settingsRef.current.delay - field.waited)
      }

      const ink = getComputedStyle(upper).color
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
      const key = [width, height, ratio, spacing, separation, ink].join(" ")

      if (key !== drawnKey) {
        // The upper canvas overhangs the box by the widest separation plus
        // one ring, so its edge never shows.
        const overscan = Math.ceil(separation * (1 + BREATH_DEPTH) + spacing)
        const upperWidth = width + overscan * 2
        const upperHeight = height + overscan * 2
        const lowerDrawn = drawRings(lower, width, height, ratio, spacing, ink)
        const upperDrawn = drawRings(
          upper,
          upperWidth,
          upperHeight,
          ratio,
          spacing,
          ink
        )
        upper.style.inset = `${-overscan}px`
        // The canvases now cover the server-rendered rings.
        placeholder.hidden = lowerDrawn && upperDrawn

        const isFirstDraw = !drawnKey
        drawnKey = key
        if (isFirstDraw) sync()
      }
      position()
    }

    // Moving to a screen with another pixel ratio resizes nothing, so it
    // needs its own query, renewed for each new ratio.
    const queryPixelRatio = () =>
      window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    let ratioQuery = queryPixelRatio()
    const onPixelRatioChange = () => {
      ratioQuery.removeEventListener("change", onPixelRatioChange)
      ratioQuery = queryPixelRatio()
      ratioQuery.addEventListener("change", onPixelRatioChange)
      draw()
    }

    // A global reset that turns off transitions under reduced motion would
    // also silence the colour signal below, so read the colour again here.
    const onReducedMotionChange = () => {
      draw()
      sync()
    }

    const resizeObserver = new ResizeObserver(draw)
    const intersectionObserver = new IntersectionObserver((entries) => {
      // Crossings can queue up during a fast scroll. Only the latest counts.
      const latest = entries.at(-1)
      if (!latest) return
      field.visible = latest.isIntersecting
      // Picks up any size, colour or prop change made while off screen.
      if (field.visible) draw()
      sync()
    })
    // Theme switches usually toggle a class or attribute on <html>.
    const themeObserver = new MutationObserver(draw)

    redrawRef.current = draw
    draw()
    resizeObserver.observe(root)
    intersectionObserver.observe(root)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })
    ratioQuery.addEventListener("change", onPixelRatioChange)
    // The upper canvas has a 1ms colour transition, so this fires whenever
    // its resolved colour changes for any other reason, such as a `.dark`
    // wrapper or a parent changing the variable passed as `color`.
    upper.addEventListener("transitionend", draw)
    darkScheme.addEventListener("change", draw)
    reducedMotion.addEventListener("change", onReducedMotionChange)
    document.addEventListener("visibilitychange", sync)

    return () => {
      cancelAnimationFrame(frame)
      redrawRef.current = null
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      ratioQuery.removeEventListener("change", onPixelRatioChange)
      upper.removeEventListener("transitionend", draw)
      darkScheme.removeEventListener("change", draw)
      reducedMotion.removeEventListener("change", onReducedMotionChange)
      document.removeEventListener("visibilitychange", sync)
    }
  }, [])

  // A new colour, spacing, separation or delay redraws without replaying the
  // bloom. A new duration needs nothing: the frame loop reads it.
  useEffect(() => {
    redrawRef.current?.()
  }, [color, settings.spacing, settings.separation, settings.delay])

  // Pointer steering. Kept apart, so toggling `interactive` only adds or
  // removes these listeners. Without it, none are attached.
  useEffect(() => {
    const root = rootRef.current
    if (!interactive || !root) return

    const pointer = pointerRef.current
    // Whether the cached box may be out of date.
    let stale = true

    // The only layout read for steering: the field's box, taken after it may
    // have moved or resized, never per pointer move and never in the loop.
    const measure = () => {
      const rect = root.getBoundingClientRect()
      pointer.left = rect.left
      pointer.top = rect.top
      pointer.width = rect.width
      pointer.height = rect.height
      stale = false
    }
    // Scrolling or resizing moves the field under a resting pointer, so with
    // a pointer on the page, measure now. Without one, wait until it moves.
    const onLayoutChange = () => {
      if (pointer.active) measure()
      else stale = true
    }
    // Only records the position. The frame loop aims once per frame.
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      if (stale) measure()
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    const resizeObserver = new ResizeObserver(onLayoutChange)
    resizeObserver.observe(root)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("scroll", onLayoutChange, {
      capture: true,
      passive: true,
    })
    window.addEventListener("resize", onLayoutChange, { passive: true })
    document.documentElement.addEventListener("pointerleave", onPointerLeave)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("scroll", onLayoutChange, { capture: true })
      window.removeEventListener("resize", onLayoutChange)
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      )
      pointer.active = false
    }
  }, [interactive])

  return (
    <div
      {...props}
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        "text-foreground pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        // Fully visible to 38% of the ellipse and gone by its edge. A mask in
        // className replaces it.
        "mask-[radial-gradient(ellipse_74%_82%_at_center,black_38%,transparent_100%)]",
        className
      )}
      style={{ "--moire-color": color, ...style } as CSSProperties}
    >
      {/* The aligned rings in CSS, so the server-rendered page already shows
          them: two sets at 0.42 read as about 0.66 where they coincide.
          Hidden once both canvases are drawn. */}
      <div
        ref={placeholderRef}
        className="absolute inset-0 text-[color:var(--moire-color)] opacity-[0.66]"
        style={{ backgroundImage: ringGradient(settings.spacing) }}
      />
      <canvas ref={lowerRef} className="absolute top-0 left-0 opacity-[0.42]" />
      <canvas
        ref={upperRef}
        className="absolute text-[color:var(--moire-color)] opacity-[0.42] transition-[color] duration-[1ms] will-change-transform"
      />
    </div>
  )
}
