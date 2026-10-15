"use client"

import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type CSSProperties,
} from "react"
import {
  animate,
  cubicBezier,
  motion,
  scrollInfo,
  useInView,
  useMotionValue,
  useTransform,
  type MotionStyle,
} from "motion/react"

import { cn } from "@/lib/utils"

import { passSample12 } from "./expanding-frame-pass"

void passSample12(0)
/** Extra side inset, in percent, that the arrival animation removes. */
const ARRIVAL_INSET = 13
/** The top and bottom insets are this share of the side inset. */
const VERTICAL_SHARE = 2 / 3
/**
 * The opening starts when the frame's top crosses this line, given as a share
 * of the scroller's visible height from its top edge.
 */
const START_LINE = 0.72
/**
 * The eased opening is rounded up to fully open once it is this close to 1.
 * Every edge is then within a third of a pixel of the scroller's, so the rest
 * of the track is a hold, and the surface drops its layer to render sharp.
 */
const SETTLED = 0.005
/** The largest `inset` that still leaves a visible frame before arrival. */
const MAX_INSET = 30
/** Seconds the frame takes to open for keyboard focus, and to close after. */
const FOCUS_DURATION = 0.3

const ARRIVAL_EASE = [0.16, 1, 0.3, 1] as const
const openingEase = cubicBezier(0.32, 0, 0.18, 1)

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/** A computed length in pixels, or 0 when it is not one. */
const pixels = (value: string) => Number.parseFloat(value) || 0

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}
const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches
const serverReducedMotion = () => false

/** The frame's measured size, used to put the clip's edges on whole pixels. */
interface FrameBox {
  width: number
  height: number
  /** Device pixels per CSS pixel. */
  pixelRatio: number
  /** The narrow-frame factor, read back from `--frame-inset-scale`. */
  insetScale: number
}

/** Nothing measured yet, as in server-rendered HTML. */
const UNMEASURED: FrameBox = {
  width: 0,
  height: 0,
  pixelRatio: 1,
  insetScale: 1,
}

/**
 * A rounded `inset()` clip that cuts `side` percent of the width from each
 * side and two thirds of that from the top and bottom, with every edge moved
 * `line` pixels further in.
 *
 * Until the frame is measured, the insets stay in percent and CSS applies the
 * narrow-frame factor, so server-rendered HTML is right from the first paint.
 * Once measured, each inset is rounded to whole device pixels. An edge between
 * pixels can be drawn differently in each raster tile, which shows as a seam.
 */
function insetClip(box: FrameBox, side: number, line: number, radius: number) {
  const corner = `round ${radius}px`

  if (box.width === 0) {
    const scaled = (percent: number) =>
      `calc(${percent}% * var(--frame-inset-scale, 1) + ${line}px)`
    return `inset(${scaled(side * VERTICAL_SHARE)} ${scaled(side)} ${corner})`
  }

  const snap = (length: number) =>
    Math.round(length * box.pixelRatio) / box.pixelRatio
  const x = snap((box.width * side * box.insetScale) / 100) + line
  const y =
    snap((box.height * side * VERTICAL_SHARE * box.insetScale) / 100) + line
  return `inset(${y}px ${x}px ${corner})`
}

/**
 * The ancestors that could scroll vertically, nearest first. An
 * `overflow-x: hidden` wrapper is one of them, as its `overflow-y` computes to
 * `auto`; `findScroller` skips it while it has nothing to scroll. Whether one
 * has anything to scroll is checked on each measurement, as that can change.
 */
function scrollCandidates(element: HTMLElement) {
  const page = document.documentElement
  const candidates: HTMLElement[] = []
  for (
    let node = element.parentElement;
    node && node !== page;
    node = node.parentElement
  ) {
    // The body's overflow belongs to the window unless the root element clips.
    if (
      node === document.body &&
      getComputedStyle(page).overflowY === "visible"
    ) {
      break
    }
    const { overflowY } = getComputedStyle(node)
    if (overflowY === "auto" || overflowY === "scroll") {
      candidates.push(node)
    }
  }
  return candidates
}

/** The nearest candidate with something to scroll, or `null` for the window. */
const findScroller = (candidates: HTMLElement[]) =>
  candidates.find((node) => node.scrollHeight > node.clientHeight) ?? null

/**
 * The scroller's `scroll-padding-top` in pixels. Pages with a fixed header
 * set it, usually on `html` with `scroll-pt-*`, to keep content clear of it.
 */
function headerOffset(scroller: HTMLElement, viewHeight: number) {
  const value = getComputedStyle(scroller).scrollPaddingTop
  const amount = Number.parseFloat(value)
  if (Number.isNaN(amount)) {
    return 0
  }
  return value.endsWith("%") ? (amount / 100) * viewHeight : amount
}

/**
 * Watches everything whose size can move the frame's range: the frame, the
 * root, each ancestor up to the scroller, and the content before each of them.
 */
function observeLayout(
  observer: ResizeObserver,
  frame: HTMLElement,
  root: HTMLElement,
  scroller: HTMLElement
) {
  observer.observe(frame)
  for (
    let node: Element | null = root;
    node && node !== scroller;
    node = node.parentElement
  ) {
    observer.observe(node)
    for (
      let sibling = node.previousElementSibling;
      sibling;
      sibling = sibling.previousElementSibling
    ) {
      observer.observe(sibling)
    }
  }
  observer.observe(scroller)
}

export interface ExpandingFrameProps extends ComponentProps<"div"> {
  /**
   * Pixels of scroll the frame stays pinned while it opens. `0` turns off the
   * scroll opening.
   * @default 460
   */
  travel?: number
  /**
   * Percent of the width hidden on each side at rest, from `0` to `30`.
   * Frames narrower than `40rem` use 55% of it.
   * @default 9
   */
  inset?: number
  /**
   * Corner radius in pixels at rest, squaring off as the frame opens. Add a
   * `rounded-*` class to `frameClassName` to keep round corners when open.
   * @default 32
   */
  borderRadius?: number
  /**
   * Zoom on the content at rest, easing to `1` as the frame opens. `1` turns
   * the zoom off.
   * @default 1.13
   */
  scale?: number
  /**
   * Seconds the frame takes to widen when it first comes into view.
   * @default 1.15
   */
  duration?: number
  /**
   * Seconds to wait before it widens.
   * @default 0
   */
  delay?: number
  /**
   * Classes for the frame. It fills the visible height by default; an
   * `aspect-*` or `h-*` class replaces that.
   * @default ""
   */
  frameClassName?: string
}

export function ExpandingFrame({
  children,
  travel = 460,
  inset = 9,
  borderRadius = 32,
  scale = 1.13,
  duration = 1.15,
  delay = 0,
  frameClassName = "",
  className,
  style,
  ref,
  ...props
}: ExpandingFrameProps) {
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  // Read only when the arrival starts, so changing `duration` or `delay`
  // never restarts an arrival under way.
  const timing = useRef({ duration, delay })
  // A scroller that had nothing to scroll at mount, such as one inside a tab
  // panel that was hidden. Finding it later re-runs the measuring effect.
  const [lateScroller, setLateScroller] = useState<HTMLElement | null>(null)
  // Read only inside effects, so rendered output never depends on it. CSS
  // shows the frame open under reduced motion.
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    prefersReducedMotion,
    serverReducedMotion
  )

  const scrollY = useMotionValue(0)
  const start = useMotionValue(0)
  const end = useMotionValue(1)
  const box = useMotionValue(UNMEASURED)
  const arrival = useMotionValue(0)
  const focus = useMotionValue(0)

  const track = Math.max(0, travel)
  const sideInset = clamp(inset, 0, MAX_INSET)
  const cornerRadius = Math.max(0, borderRadius)
  const restScale = Math.max(1, scale)

  useImperativeHandle(ref, () => root.current as HTMLDivElement, [])

  // The frame is sticky and never taller than the scroller, so a fifth of it
  // is always reachable, however long the track below it is.
  const inView = useInView(frame, { once: true, amount: 0.2 })

  // How far the scroll has opened the frame, from 0 at rest to 1.
  const progress = useTransform(() => {
    if (track === 0) {
      return 0
    }
    const from = start.get()
    const linear = (scrollY.get() - from) / Math.max(1, end.get() - from)
    const eased = openingEase(clamp(linear, 0, 1))
    return eased > 1 - SETTLED ? 1 : eased
  })
  // 1 while the frame rests as a card, 0 once scroll or focus opened it.
  const closed = useTransform(() => (1 - progress.get()) * (1 - focus.get()))
  // The side inset in percent. The arrival's extra inset folds away as the
  // frame opens too, so a page restored mid-scroll never shows a stale one.
  const side = useTransform(() => {
    const arrivalInset = ARRIVAL_INSET * (1 - arrival.get())
    return (sideInset + arrivalInset) * closed.get()
  })

  const frameClip = useTransform(() =>
    insetClip(box.get(), side.get(), 0, cornerRadius * closed.get())
  )
  // The window clips one pixel inside the frame, leaving a hairline of the
  // frame's background around it. The line fades out as the frame opens.
  const windowClip = useTransform(() => {
    const line = closed.get()
    const corner = Math.max(0, cornerRadius * line - line)
    return insetClip(box.get(), side.get(), line, corner)
  })
  const surfaceScale = useTransform(() => 1 + (restScale - 1) * closed.get())
  // While anything moves, the surface gets a compositor layer of its own, so
  // its scale is applied to a cached raster instead of repainting the
  // children. The two clips are not composited: each change repaints the
  // frame's and the window's flat backgrounds, which stays cheap. The
  // rounded `inset()` clip is kept because it is the only way to cut a
  // rounded window that also follows the arrival and the hairline. At rest
  // the layer is dropped, so text is rasterized sharp again.
  const willChange = useTransform(() => {
    const arriving = arrival.get() > 0 && arrival.get() < 1
    const opening = closed.get() > 0 && closed.get() < 1
    return arriving || opening ? "transform" : "auto"
  })

  useLayoutEffect(() => {
    const element = root.current
    const panel = frame.current
    if (!(element && panel)) {
      return
    }

    const candidates = scrollCandidates(element)
    const nested = lateScroller ?? findScroller(candidates)
    const container = nested ?? document.documentElement
    let request = 0

    // Reads all layout first and writes after, so it never forces a layout
    // of its own. A write that resizes the frame reaches the observer, which
    // measures again in the next frame.
    const measure = () => {
      request = 0
      // A hidden panel, as in a closed tab, has no box to fit. CSS keeps the
      // fallback size until the observer sees the panel shown.
      if (panel.offsetWidth === 0 || panel.getClientRects().length === 0) {
        return
      }
      // A page that fell back to the window checks again, as its real
      // scroller may only now have something to scroll.
      const found = nested ? null : findScroller(candidates)
      if (found) {
        setLateScroller(found)
        return
      }

      const viewHeight = container.clientHeight
      // A hidden scroller has no height to fit. The observer measures again
      // once it shows, so the frame keeps its size until then.
      if (viewHeight === 0) {
        return
      }
      const header = headerOffset(container, viewHeight)
      // Sticky offsets count from inside a nested scroller's padding. The
      // window's scrollport has none.
      const scrollerStyle = nested ? getComputedStyle(nested) : null
      const paddingTop = scrollerStyle ? pixels(scrollerStyle.paddingTop) : 0
      const paddingBottom = scrollerStyle
        ? pixels(scrollerStyle.paddingBottom)
        : 0
      const available = Math.max(
        0,
        viewHeight - paddingTop - paddingBottom - header
      )
      const containerTop = nested
        ? nested.getBoundingClientRect().top + nested.clientTop
        : 0
      // The frame starts below the root's own border and padding.
      const rootStyle = getComputedStyle(element)
      const frameOffset = element.clientTop + pixels(rootStyle.paddingTop)
      const restingTop =
        element.getBoundingClientRect().top -
        containerTop +
        container.scrollTop +
        frameOffset
      const insetScale = Number.parseFloat(
        getComputedStyle(panel).getPropertyValue("--frame-inset-scale")
      )
      const width = panel.offsetWidth
      const height = panel.offsetHeight

      const frameTop = Math.round(
        header + Math.max(0, (available - height) / 2)
      )
      element.style.setProperty("--frame-max", `${available}px`)
      element.style.setProperty("--frame-top", `${frameTop}px`)

      const pin = restingTop - paddingTop - frameTop
      start.set(
        Math.max(0, restingTop - paddingTop - header - START_LINE * available)
      )
      end.set(pin + track)
      box.set({
        width,
        height,
        pixelRatio: window.devicePixelRatio || 1,
        insetScale: Number.isNaN(insetScale) ? 1 : insetScale,
      })
    }
    // At most one measurement per frame, however many observers fire.
    const schedule = () => {
      if (request === 0) {
        request = requestAnimationFrame(measure)
      }
    }
    // The first pass sizes the frame to the scroller, so the second measures
    // that size before anything is painted.
    measure()
    measure()

    const observer = new ResizeObserver(schedule)
    observeLayout(observer, panel, element, container)
    // The window can change height, as when a mobile toolbar collapses,
    // without resizing anything observed. A nested scroller is observed.
    if (!nested) {
      window.addEventListener("resize", schedule)
    }
    // Nothing opens under reduced motion or without a track, so the scroll
    // is not followed.
    const scrollOptions = nested ? { container: nested } : {}
    const stopScroll =
      reducedMotion || track === 0
        ? null
        : scrollInfo((info) => scrollY.set(info.y.current), scrollOptions)
    return () => {
      cancelAnimationFrame(request)
      observer.disconnect()
      window.removeEventListener("resize", schedule)
      stopScroll?.()
    }
  }, [box, end, lateScroller, reducedMotion, scrollY, start, track])

  // Runs after every render, before the effects below read it.
  useLayoutEffect(() => {
    timing.current = { duration, delay }
  })

  useEffect(() => {
    if (reducedMotion) {
      arrival.set(1)
      return
    }
    if (!inView || arrival.get() === 1) {
      return
    }
    const controls = animate(arrival, 1, {
      ...timing.current,
      ease: ARRIVAL_EASE,
    })
    return () => controls.stop()
  }, [arrival, inView, reducedMotion])

  // Open fully while a keyboard-focused element is inside, so nothing is
  // focused out of sight, and follow the scroll again once focus leaves.
  useEffect(() => {
    const element = frame.current
    if (!element) {
      return
    }
    let controls: ReturnType<typeof animate> | null = null
    const followFocus = (event: FocusEvent) => {
      const visible =
        event.type === "focusin" &&
        element.querySelector(":focus-visible") !== null
      controls?.stop()
      controls = animate(focus, visible ? 1 : 0, { duration: FOCUS_DURATION })
    }
    element.addEventListener("focusin", followFocus)
    element.addEventListener("focusout", followFocus)
    return () => {
      controls?.stop()
      element.removeEventListener("focusin", followFocus)
      element.removeEventListener("focusout", followFocus)
    }
  }, [focus])

  return (
    <div
      {...props}
      ref={root}
      className={cn(
        "@container relative w-full",
        // The empty track below the frame is the scroll length of the opening.
        "after:block after:h-[var(--travel)] motion-reduce:after:hidden",
        className
      )}
      style={{ "--travel": `${track}px`, ...style } as CSSProperties}
    >
      <motion.div
        ref={frame}
        className={cn(
          "bg-border relative w-full overflow-hidden",
          // A narrow frame has little room to grow, so its insets shrink.
          // Container queries keep this in CSS, so server HTML is right too.
          "@max-[40rem]:[--frame-inset-scale:0.55]",
          // Open, the frame fills the scroller's visible height: the tall
          // ratio always meets the cap first. An `aspect-*` in
          // `frameClassName` replaces the ratio, and a height class sets the
          // size outright. Before measuring, as in server HTML, the cap is
          // the nearest size container's height, or the viewport's.
          "aspect-[1/3] max-h-[var(--frame-max,100cqh)]",
          track > 0 &&
            "motion-safe:sticky motion-safe:top-[var(--frame-top,0px)]",
          "motion-reduce:[--frame-inset:0px]! motion-reduce:[clip-path:none]!",
          frameClassName
        )}
        style={
          {
            clipPath: frameClip,
            // The share of the surface's width hidden on each side at rest.
            // Children pad with it so their text reads before it opens.
            "--frame-inset": `calc(50% - (50% - ${sideInset}% * var(--frame-inset-scale, 1)) / ${restScale})`,
          } as MotionStyle
        }
      >
        <motion.div
          className="bg-muted absolute inset-0 motion-reduce:[clip-path:none]!"
          style={{ clipPath: windowClip }}
        >
          <motion.div
            className={cn(
              // Zero specificity, so a child's own size or `object-*` wins.
              "absolute inset-0 [:where(&>*)]:size-full [:where(&>*)]:object-cover",
              "motion-reduce:transform-none! motion-reduce:will-change-auto!"
            )}
            style={{ scale: surfaceScale, willChange }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
