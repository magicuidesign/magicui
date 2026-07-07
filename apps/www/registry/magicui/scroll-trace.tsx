"use client"

import {
  Children,
  memo,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import type { ComponentProps, CSSProperties } from "react"
import {
  animate,
  inView,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import type { MotionValue, Transition } from "motion/react"

import { cn } from "@/lib/utils"

import { passSample29 } from "./scroll-trace-pass"

void passSample29(0)
/** Outer diameter of a step marker. */
const MARKER_SIZE = 14
const MARKER_STROKE = 2
const MARKER_RADIUS = (MARKER_SIZE - MARKER_STROKE) / 2

/** Width of the resting track and of the lit line drawn over it. */
const LINE_WIDTH = 2

const TIP_RADIUS = 3
const TIP_RING_WIDTH = 2
const HALO_RADIUS = 12
const HALO_OPACITY = 0.35
/**
 * The tip fades out as it nears a marker and is gone this close to one, so
 * the tip and a marker never show as two dots on top of each other.
 */
const TIP_HIDDEN_WITHIN = 12
/** Distance above the next marker at which the tip is fully shown. */
const TIP_SHOWN_BEFORE = 36
/**
 * Distance past a marker at which the tip is fully shown again. It is longer,
 * so a lit marker is not trailed by a second dot just below it.
 */
const TIP_SHOWN_AFTER = 48

/** Diameter the ring of a reached marker grows to. */
const RING_SIZE = 32
const FINAL_RING_SIZE = 40
const RING_STROKE = 1.5

/** Where the axis sits inside the gutter, as a share of the gutter width. */
const AXIS_RATIO = 0.5
/** Space kept between the tip halo and the content column. */
const CONTENT_GAP = 1

/** The tip aims to sit this far down the scrolling area. */
const READING_LINE = 0.6

/** Samples per curve segment in the table used to place the tip. */
const SAMPLES_PER_SEGMENT = 24
/** Markers light this many pixels early, so the last one always lights. */
const REACH_TOLERANCE = 1
/** A container needs more room than this to count as scrolling. */
const MIN_SCROLL_RANGE = 1

const RAIL_FADE_SECONDS = 0.2
const ENTRY_EASE = [0.22, 1, 0.36, 1] as const
/** The line draws in once the root is a quarter of the way into view. */
const ENTRY_MARGIN = "0px 0px -25% 0px"

const TIP_SPRING = { visualDuration: 0.14, bounce: 0 }

const MARKER_POP: Transition = {
  duration: 0.32,
  times: [0, 0.3, 1],
  ease: ["easeOut", "backOut"],
}
const MARKER_RING: Transition = { duration: 0.52, ease: [0.16, 1, 0.3, 1] }
const INSTANT: Transition = { duration: 0 }

/**
 * The line layer is the root's first child, so `*:` variants on the root reach
 * it too. Inline, these win over any class and keep the drawing in place.
 */
const LAYER_RESET: CSSProperties = {
  margin: 0,
  padding: 0,
  border: "none",
  background: "none",
  boxShadow: "none",
}

const SCROLLABLE_OVERFLOW = /auto|scroll|overlay/
const VISIBLE_TEXT = /\S/

interface TracePoint {
  x: number
  y: number
  /** Distance along the path from the first marker. */
  distance: number
}

interface TraceStep {
  element: HTMLElement
  key: string
  /** y of the step's marker center. */
  y: number
}

interface Trace {
  /** SVG path through every marker, top to bottom. */
  d: string
  /** x of the straight axis the markers sit on. */
  axis: number
  /** Sorted top to bottom. */
  steps: TraceStep[]
  /** Points along the path, so the tip is placed without measuring. */
  samples: TracePoint[]
  totalLength: number
}

interface ScrollRange {
  /** Scroll offset at which the reading line meets the top of the content. */
  start: number
  /** Scroll offset at which the line reaches the last marker. */
  end: number
}

interface ScrollDriver {
  /** Draws the line in from the top of the content, once. */
  sweep: (target: number, duration: number) => void
  /** Moves the line along with the scroll position. */
  follow: (target: number) => void
  stop: () => void
}

interface ScrollSource {
  /** The scrolling element, or null for the window. */
  readonly scroller: HTMLElement | null
  /** Finds the nearest scroller again and reads its scroll range. */
  measure: (bottom: number) => void
  /** Where the tip should be at the current scroll offset. */
  read: () => number
  /** Window scroll listener, in the capture phase to hear every scroller. */
  onScroll: (event: Event) => void
}

export interface ScrollTraceProps extends ComponentProps<"div"> {
  /**
   * Gradient color at the first step.
   * @default "#ffaa40"
   */
  colorFrom?: string
  /**
   * Gradient color at the last step, and the color of the moving tip and its
   * glow.
   * @default "#9c40ff"
   */
  colorTo?: string
  /**
   * Sideways bow between markers in pixels, capped to fit the `ps-*` gutter.
   * `0` draws a straight line; negative values bow left first.
   * @default 14
   */
  curvature?: number
  /**
   * Seconds the line takes to draw in the first time the list scrolls into
   * view.
   * @default 0.9
   */
  duration?: number
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/** Hands out a stable marker key for each step element. */
function createStepKeys() {
  const keys = new WeakMap<Element, string>()
  let count = 0
  return (element: Element) => {
    const known = keys.get(element)
    if (known) {
      return known
    }
    count += 1
    const key = `step-${count}`
    keys.set(element, key)
    return key
  }
}

function canScroll(node: HTMLElement) {
  const { overflowY } = getComputedStyle(node)
  const room = node.scrollHeight - node.clientHeight
  return SCROLLABLE_OVERFLOW.test(overflowY) && room > MIN_SCROLL_RANGE
}

/**
 * Body scrolls on its own only when html clips its overflow, as with
 * `html, body { overflow-x: hidden; height: 100% }`. Otherwise body's
 * overflow moves to the viewport and the window scrolls.
 */
function getBodyScroller() {
  const { body, documentElement } = document
  const htmlClips = getComputedStyle(documentElement).overflowY !== "visible"
  return htmlClips && canScroll(body) ? body : null
}

/** Nearest scrolling element from the root upward, or null for the window. */
function findScroller(root: HTMLElement): HTMLElement | null {
  for (let node: HTMLElement | null = root; node; node = node.parentElement) {
    if (node === document.documentElement) {
      return null
    }
    if (node === document.body) {
      return getBodyScroller()
    }
    if (canScroll(node)) {
      return node
    }
  }
  return null
}

function getScrollOffset(scroller: HTMLElement | null) {
  return scroller ? scroller.scrollTop : window.scrollY
}

/**
 * Top of an element's border box in the page, from layout alone, so
 * transforms, entrance animations and scroll positions do not move it.
 */
function layoutTop(element: HTMLElement) {
  let top = element.offsetTop
  let parent = element.offsetParent
  // Offsets against body, or with no offset parent, are page offsets.
  while (parent instanceof HTMLElement && parent !== document.body) {
    top += parent.clientTop + parent.offsetTop
    parent = parent.offsetParent
  }
  return top
}

/** Direct children that take part in the layout: one step each. */
function getSteps(root: HTMLElement, layer: Element | null) {
  return Array.from(root.children).filter((child): child is HTMLElement => {
    if (child === layer || !(child instanceof HTMLElement)) {
      return false
    }
    const { position } = getComputedStyle(child)
    const inFlow = position !== "absolute" && position !== "fixed"
    return inFlow && child.getClientRects().length > 0
  })
}

/**
 * Distance from the top of a step to the middle of its first line of text,
 * where the eye reads the step's marker. Falls back to the top of the step.
 */
function firstLineCenter(step: HTMLElement) {
  const walker = document.createTreeWalker(step, NodeFilter.SHOW_TEXT)
  const range = document.createRange()
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (VISIBLE_TEXT.test(node.textContent ?? "")) {
      range.selectNodeContents(node)
      const line = range.getClientRects().item(0)
      if (line && line.height > 0) {
        const box = step.getBoundingClientRect()
        // Both rects carry the same transforms; dividing out the scale
        // leaves a layout distance.
        const scale = box.height / step.offsetHeight || 1
        return (line.top + line.height / 2 - box.top) / scale
      }
    }
  }
  return MARKER_SIZE / 2
}

function buildPath(markers: number[], axis: number, bow: number) {
  const [first] = markers
  let previous: TracePoint = { x: axis, y: first, distance: 0 }
  const samples = [previous]
  let d = `M ${axis} ${first}`

  for (let index = 1; index < markers.length; index++) {
    const from = markers[index - 1]
    const to = markers[index]
    const swing = index % 2 === 1 ? bow : -bow
    d += ` Q ${axis + 2 * swing} ${(from + to) / 2} ${axis} ${to}`

    // With the control point halfway down, y moves linearly along the
    // segment and x peaks at axis + swing in the middle.
    for (let sample = 1; sample <= SAMPLES_PER_SEGMENT; sample++) {
      const t = sample / SAMPLES_PER_SEGMENT
      const x = axis + 4 * t * (1 - t) * swing
      const y = from + t * (to - from)
      const stepDistance = Math.hypot(x - previous.x, y - previous.y)
      previous = { x, y, distance: previous.distance + stepDistance }
      samples.push(previous)
    }
  }

  return { d, samples, totalLength: previous.distance }
}

function measureTrace(
  root: HTMLElement,
  elements: HTMLElement[],
  curvature: number,
  getStepKey: (element: Element) => string
): Trace {
  // Steps are placed against the root's padding edge, where the line layer
  // starts, in layout space.
  const top = layoutTop(root) + root.clientTop
  const gutter =
    Number.parseFloat(getComputedStyle(root).paddingInlineStart) || 0
  const axis = gutter * AXIS_RATIO
  // Keep the bow, and the halo riding on it, inside the gutter on both sides.
  const maxBow = Math.max(
    0,
    Math.min(gutter - axis - HALO_RADIUS - CONTENT_GAP, axis - HALO_RADIUS)
  )
  const bow = Math.sign(curvature) * Math.min(Math.abs(curvature), maxBow)

  // Top to bottom, even when `flex-col-reverse` or `order-*` reorders the
  // steps, so the path and the lookups below run down the page.
  const steps = elements
    .map((element) => ({
      element,
      key: getStepKey(element),
      y: layoutTop(element) - top + firstLineCenter(element),
    }))
    .sort((a, b) => a.y - b.y)
  const markers = steps.map((step) => step.y)
  return { axis, steps, ...buildPath(markers, axis, bow) }
}

function isSameTrace(a: Trace, b: Trace) {
  return (
    a.d === b.d &&
    a.steps.length === b.steps.length &&
    a.steps.every((step, index) => step.element === b.steps[index].element)
  )
}

/** Point on the path at a given height, read from the sample table. */
function pointAt(samples: TracePoint[], y: number): TracePoint {
  const first = samples[0]
  const last = samples.at(-1) ?? first
  if (y <= first.y) {
    return first
  }
  if (y >= last.y) {
    return last
  }

  let low = 0
  let high = samples.length - 1
  while (high - low > 1) {
    const middle = Math.floor((low + high) / 2)
    if (samples[middle].y <= y) {
      low = middle
    } else {
      high = middle
    }
  }

  const a = samples[low]
  const b = samples[high]
  const t = (y - a.y) / (b.y - a.y || 1)
  return {
    x: a.x + t * (b.x - a.x),
    y,
    distance: a.distance + t * (b.distance - a.distance),
  }
}

/** Number of markers at or above a height. Markers are sorted top to bottom. */
function countReached(steps: TraceStep[], y: number) {
  let count = 0
  for (const step of steps) {
    if (step.y > y + REACH_TOLERANCE) {
      break
    }
    count += 1
  }
  return count
}

/**
 * Tip opacity at a height: hidden on a marker, shown between markers. It
 * fades back in more slowly past a marker than it fades out before one.
 */
function tipOpacity(steps: TraceStep[], y: number) {
  let opacity = 1
  for (const step of steps) {
    const past = y >= step.y
    const shownFrom = past ? TIP_SHOWN_AFTER : TIP_SHOWN_BEFORE
    const fade = shownFrom - TIP_HIDDEN_WITHIN
    const gap = Math.abs(y - step.y)
    opacity = Math.min(opacity, clamp((gap - TIP_HIDDEN_WITHIN) / fade))
  }
  return opacity
}

/**
 * The tip follows the reading line. The end is clamped to the scroll limit
 * so the line always finishes on the last marker, even in a short box.
 */
function readScrollRange(
  root: HTMLElement,
  scroller: HTMLElement | null,
  bottom: number
): ScrollRange {
  const viewport = scroller ?? document.documentElement
  const view = viewport.clientHeight
  const maxOffset = viewport.scrollHeight - view
  // Where the content starts inside the scrolling area, in layout space.
  const scrollerTop = scroller ? layoutTop(scroller) + scroller.clientTop : 0
  const contentTop = layoutTop(root) + root.clientTop - scrollerTop
  const aim = view * READING_LINE

  return {
    start: contentTop - aim,
    end: Math.min(maxOffset, contentTop + bottom - aim),
  }
}

/** Where the tip should be, in pixels down the content. */
function targetAt(offset: number, { start, end }: ScrollRange, bottom: number) {
  // Nothing can drive the line, so it shows every step.
  if (end <= start) {
    return bottom
  }
  return clamp((offset - start) / (end - start)) * bottom
}

/** Draws the line in once, then hands over to the scroll position. */
function createScrollDriver(target: MotionValue<number>): ScrollDriver {
  let running: ReturnType<typeof animate> | null = null
  let sweepTarget = 0
  let latestTarget = 0

  return {
    sweep(to, duration) {
      sweepTarget = to
      latestTarget = to
      running = animate(target, to, {
        duration,
        delay: RAIL_FADE_SECONDS,
        ease: ENTRY_EASE,
        onComplete: () => {
          running = null
          target.set(latestTarget)
        },
      })
    },
    follow(to) {
      latestTarget = to
      // The sweep stays in charge while it is ahead of the scroll position.
      if (running && to <= sweepTarget) {
        return
      }
      running?.stop()
      running = null
      target.set(to)
    },
    stop() {
      running?.stop()
      running = null
    },
  }
}

/**
 * Tracks the scroller nearest the root and the range it moves the line over.
 * `onChange` runs when that scroller scrolls, with `adopted` set when a
 * nearer container takes over.
 */
function createScrollSource(
  root: HTMLElement,
  onChange: (adopted: boolean) => void
): ScrollSource {
  let scroller: HTMLElement | null = null
  let range: ScrollRange = { start: 0, end: 0 }
  /** y of the last marker, where the line ends. */
  let bottom = 0

  const adopt = (next: HTMLElement | null) => {
    scroller = next
    range = readScrollRange(root, next, bottom)
  }

  const onScroll = ({ target: node }: Event) => {
    if (node === (scroller ?? document)) {
      onChange(false)
      return
    }
    // Only a container nearer the root can take over, once it gains room to
    // scroll without resizing. Room that changes with a resize is found on
    // the next measure, so page and outer scrolls read no layout here.
    if (!(node instanceof HTMLElement)) {
      return
    }
    const nearer = scroller === null || scroller.contains(node)
    if (nearer && node.contains(root) && canScroll(node)) {
      adopt(node)
      onChange(true)
    }
  }

  return {
    get scroller() {
      return scroller
    },
    measure: (lastMarker) => {
      bottom = lastMarker
      adopt(findScroller(root))
    },
    read: () => targetAt(getScrollOffset(scroller), range, bottom),
    onScroll,
  }
}

/**
 * Wraps a list of steps and draws a glowing line down their edge as the
 * visitor scrolls, lighting a marker at each step it reaches.
 */
export function ScrollTrace({
  children,
  className,
  style,
  ref,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  curvature = 14,
  duration = 0.9,
  ...props
}: ScrollTraceProps) {
  const id = useId()
  const gradientId = `${id}-gradient`
  const haloId = `${id}-halo`

  const rootRef = useRef<HTMLDivElement | null>(null)
  const layerRef = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const tipRef = useRef<SVGGElement>(null)

  const enteredRef = useRef(false)
  const reachedRef = useRef(0)
  const settingsRef = useRef({ curvature, duration })
  const requestMeasureRef = useRef<(() => void) | null>(null)

  const [getStepKey] = useState(() => createStepKeys())
  const [trace, setTrace] = useState<Trace | null>(null)
  const [entered, setEntered] = useState(false)
  const [reached, setReached] = useState(0)

  // The server cannot read the motion setting, so anything rendered before
  // the trace is measured stays the same under both settings.
  const reducedMotion = useReducedMotion() ?? false
  const hasChildren = Children.toArray(children).length > 0

  // Where the tip should be, and where it is, in pixels down the content.
  const target = useMotionValue(0)
  const tip = useSpring(target, TIP_SPRING)

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node
      const cleanup = typeof ref === "function" ? ref(node) : undefined
      if (ref && typeof ref !== "function") {
        ref.current = node
      }
      return () => {
        rootRef.current = null
        if (typeof cleanup === "function") {
          cleanup()
        } else if (typeof ref === "function") {
          ref(null)
        } else if (ref) {
          ref.current = null
        }
      }
    },
    [ref]
  )

  // Prop changes rebuild the path without replaying the entry.
  useEffect(() => {
    settingsRef.current = { curvature, duration }
    requestMeasureRef.current?.()
  }, [curvature, duration])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !hasChildren) {
      setTrace(null)
      return
    }

    const driver = createScrollDriver(target)
    const observed = new Set<Element>()
    let current: Trace | null = null
    let inViewport = false
    let listening = false
    let stopInView: (() => void) | null = null
    let frame = 0

    // `measure`, `syncObserved` and `follow` are declared further down; they
    // only ever run a frame later or on a scroll.
    const requestMeasure = () => {
      if (!frame) {
        frame = requestAnimationFrame(measure)
      }
    }
    const resize = new ResizeObserver(requestMeasure)
    const mutations = new MutationObserver(requestMeasure)
    const source = createScrollSource(root, (adopted) => {
      if (adopted) {
        syncObserved()
      }
      follow()
    })

    const lastMarker = () => current?.steps.at(-1)?.y ?? 0

    // Anything that can move a marker or change the scroll range: the root
    // and its ancestors, every step, and the scroller's own children.
    const syncObserved = () => {
      const wanted = new Set<Element>()
      for (let node: Element | null = root; node; node = node.parentElement) {
        wanted.add(node)
      }
      for (const child of root.children) {
        if (child !== layerRef.current) {
          wanted.add(child)
        }
      }
      for (const child of (source.scroller ?? document.body).children) {
        wanted.add(child)
      }
      for (const element of observed) {
        if (!wanted.has(element)) {
          resize.unobserve(element)
          observed.delete(element)
        }
      }
      for (const element of wanted) {
        if (!observed.has(element)) {
          resize.observe(element)
          observed.add(element)
        }
      }
    }

    const enter = () => {
      // Reduced motion shows the finished trace at once, in view or not.
      const ready = inViewport || reducedMotion
      if (enteredRef.current || !current || !ready) {
        return
      }
      enteredRef.current = true
      setEntered(true)
      // The entry plays once, so the root no longer needs watching.
      stopInView?.()
      stopInView = null
      if (reducedMotion) {
        return
      }
      // Always draw in at least as far as the first marker.
      const floor = current.steps[0].y
      driver.sweep(Math.max(floor, source.read()), settingsRef.current.duration)
    }

    const follow = () => {
      if (enteredRef.current && current && !reducedMotion) {
        driver.follow(source.read())
      }
    }

    // Window listeners and the entry trigger wait for the first step.
    const listen = () => {
      if (listening) {
        return
      }
      listening = true
      window.addEventListener("resize", requestMeasure)
      window.addEventListener("scroll", source.onScroll, {
        capture: true,
        passive: true,
      })
      if (enteredRef.current) {
        return
      }
      stopInView = inView(
        root,
        () => {
          inViewport = true
          enter()
          return () => {
            inViewport = false
          }
        },
        { margin: ENTRY_MARGIN }
      )
    }

    const rebuild = (elements: HTMLElement[]) => {
      const next = measureTrace(
        root,
        elements,
        settingsRef.current.curvature,
        getStepKey
      )
      // Unrelated resizes keep the same trace, so nothing re-renders.
      if (!current || !isSameTrace(current, next)) {
        current = next
        setTrace(next)
      }
      source.measure(lastMarker())

      if (enteredRef.current) {
        follow()
      } else {
        enter()
      }
      // After the entry check, so reduced motion never starts watching.
      listen()
    }

    const measure = () => {
      frame = 0
      const elements = getSteps(root, layerRef.current)
      if (elements.length === 0) {
        current = null
        setTrace(null)
      } else if (root.clientWidth && root.clientHeight) {
        // A hidden root measures as zero, so this waits for a real size.
        rebuild(elements)
      }
      syncObserved()
    }

    mutations.observe(root, { childList: true })
    requestMeasureRef.current = requestMeasure
    measure()

    return () => {
      requestMeasureRef.current = null
      cancelAnimationFrame(frame)
      driver.stop()
      stopInView?.()
      resize.disconnect()
      mutations.disconnect()
      window.removeEventListener("resize", requestMeasure)
      window.removeEventListener("scroll", source.onScroll, { capture: true })
    }
  }, [getStepKey, hasChildren, reducedMotion, target])

  // Draw the line and tip from the spring, before paint.
  useLayoutEffect(() => {
    const line = lineRef.current
    if (!trace || !line) {
      return
    }

    const draw = (y: number) => {
      const point = pointAt(trace.samples, y)
      line.setAttribute(
        "stroke-dasharray",
        `${point.distance} ${trace.totalLength}`
      )

      const tipLayer = tipRef.current
      if (tipLayer) {
        tipLayer.setAttribute("transform", `translate(${point.x} ${point.y})`)
        const opacity = tipOpacity(trace.steps, point.y)
        tipLayer.setAttribute("opacity", String(opacity))
      }

      // The raw height, not the point on the path, so the first step is
      // released again when the line retracts above it.
      const count = entered ? countReached(trace.steps, y) : 0
      if (count !== reachedRef.current) {
        reachedRef.current = count
        setReached(count)
      }
    }

    if (reducedMotion) {
      draw(Number.POSITIVE_INFINITY)
      return
    }

    draw(tip.get())
    const unsubscribe = tip.on("change", draw)
    return unsubscribe
  }, [trace, entered, reducedMotion, tip])

  // Mark reached steps so authors can style them with data-reached variants.
  useEffect(() => {
    if (!trace) {
      return
    }
    for (const [index, step] of trace.steps.entries()) {
      step.element.toggleAttribute("data-reached", index < reached)
    }
    return () => {
      for (const step of trace.steps) {
        step.element.removeAttribute("data-reached")
      }
    }
  }, [reached, trace])

  const rootStyle = {
    "--color-from": colorFrom,
    "--color-to": colorTo,
    ...style,
  } as CSSProperties
  const paint = `url(#${gradientId})`
  const lastIndex = trace ? trace.steps.length - 1 : -1
  const firstY = trace ? trace.steps[0].y : 0
  const lastY = trace ? trace.steps[lastIndex].y : 0

  return (
    <div
      {...props}
      ref={setRootRef}
      className={cn("relative ps-14", className)}
      style={rootStyle}
    >
      {hasChildren && (
        <svg
          ref={layerRef}
          aria-hidden="true"
          data-active={entered ? "" : undefined}
          fill="none"
          style={LAYER_RESET}
          className={cn(
            "pointer-events-none absolute inset-0 size-full overflow-visible rounded-[inherit]",
            "opacity-0 transition-opacity duration-200 data-active:opacity-100",
            "motion-reduce:transition-none rtl:-scale-x-100"
          )}
        >
          {trace && (
            <>
              <defs>
                {/* Spans the whole path, so each marker keeps one color. */}
                <linearGradient
                  id={gradientId}
                  gradientUnits="userSpaceOnUse"
                  x1={0}
                  x2={0}
                  y1={firstY}
                  y2={Math.max(lastY, firstY + 1)}
                >
                  <stop stopColor="var(--color-from)" />
                  {/* Mixing in oklch keeps the middle of the line clean. */}
                  <stop
                    offset={0.5}
                    stopColor="color-mix(in oklch, var(--color-from), var(--color-to))"
                  />
                  <stop offset={1} stopColor="var(--color-to)" />
                </linearGradient>
                <radialGradient id={haloId}>
                  <stop
                    stopColor="var(--color-to)"
                    stopOpacity={HALO_OPACITY}
                  />
                  <stop
                    offset={1}
                    stopColor="var(--color-to)"
                    stopOpacity={0}
                  />
                </radialGradient>
              </defs>

              <path
                d={trace.d}
                strokeWidth={LINE_WIDTH}
                className="stroke-border dark:stroke-foreground/20"
              />
              <path
                ref={lineRef}
                d={trace.d}
                pathLength={trace.totalLength || undefined}
                stroke={paint}
                strokeWidth={LINE_WIDTH}
                strokeLinecap="round"
              />

              {!reducedMotion && (
                <g ref={tipRef} opacity={0}>
                  <circle r={HALO_RADIUS} fill={`url(#${haloId})`} />
                  <circle
                    r={TIP_RADIUS}
                    strokeWidth={TIP_RING_WIDTH}
                    className="fill-background stroke-(--color-to)"
                  />
                </g>
              )}

              {trace.steps.map((step, index) => (
                <TraceMarker
                  key={step.key}
                  x={trace.axis}
                  y={step.y}
                  paint={paint}
                  reached={index < reached}
                  final={index === lastIndex}
                  animated={!reducedMotion}
                />
              ))}
            </>
          )}
        </svg>
      )}
      {children}
    </div>
  )
}

interface TraceMarkerProps {
  x: number
  y: number
  /** The line's gradient, so a lit marker takes the color at its height. */
  paint: string
  reached: boolean
  /** The last marker gets a larger ring as a reward for reaching the end. */
  final: boolean
  animated: boolean
}

// Memoized, so lighting one marker re-renders only that marker.
const TraceMarker = memo(function TraceMarker({
  x,
  y,
  paint,
  reached,
  final,
  animated,
}: TraceMarkerProps) {
  const celebrate = reached && animated
  const ringRadius = (final ? FINAL_RING_SIZE : RING_SIZE) / 2

  return (
    <>
      <motion.circle
        cx={x}
        cy={y}
        r={MARKER_RADIUS}
        stroke={paint}
        strokeWidth={RING_STROKE}
        initial={false}
        animate={
          celebrate
            ? { r: [MARKER_RADIUS, ringRadius], opacity: [0.5, 0] }
            : { opacity: 0 }
        }
        transition={celebrate ? MARKER_RING : INSTANT}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={MARKER_RADIUS}
        strokeWidth={MARKER_STROKE}
        fill={reached ? paint : undefined}
        stroke={reached ? paint : undefined}
        className={cn(
          !reached && "fill-background stroke-border dark:stroke-foreground/20"
        )}
        initial={false}
        animate={{ scale: celebrate ? [1, 1.35, 1] : 1 }}
        transition={celebrate ? MARKER_POP : INSTANT}
      />
    </>
  )
})
