"use client"

import {
  useEffect,
  useRef,
  type ComponentProps,
  type CSSProperties,
} from "react"

import { cn } from "@/lib/utils"

import { passSample9 } from "./poised-surface-pass"

void passSample9(0)
export interface PoisedSurfaceProps extends ComponentProps<"div"> {
  /**
   * The angle the surface leans at before anyone interacts. `front` tips its
   * top edge away, `start` and `end` also turn it to face that side of the
   * page, and `flat` keeps it flat.
   * @default "front"
   */
  pose?: "front" | "start" | "end" | "flat"
  /**
   * Maximum swing in degrees toward the pointer, up to `15`. `0` turns it off.
   * @default 3
   */
  tilt?: number
  /**
   * Seconds the surface takes to follow the pointer. It settles back in 1.5
   * times this once the pointer leaves.
   * @default 0.75
   */
  duration?: number
  /**
   * Opacity of the shadows under the surface, from `0` to `1`. Use `0` for
   * translucent or cut-out children.
   * @default 1
   */
  shadowOpacity?: number
}

interface Angles {
  /** Degrees the top edge tips away from the viewer. */
  pitch: number
  /** Degrees the surface turns to face the right of the screen. */
  yaw: number
}

interface Size {
  width: number
  height: number
}

const DEFAULT_TILT = 3
const MAX_TILT = 15
const DEFAULT_DURATION = 0.75
const MAX_DURATION = 10
const DEFAULT_SHADOW_OPACITY = 1

const FLAT: Angles = { pitch: 0, yaw: 0 }
/** Each pose as it reads in a left-to-right page. */
const POSES: Record<NonNullable<PoisedSurfaceProps["pose"]>, Angles> = {
  front: { pitch: 7, yaw: 0 },
  start: { pitch: 5, yaw: -11 },
  end: { pitch: 5, yaw: 11 },
  flat: FLAT,
}
/**
 * Below this width in pixels, `start` and `end` turn half as far, so a narrow
 * surface such as a phone keeps its text readable.
 */
const NARROW_WIDTH = 480
const NARROW_YAW = 0.5
/** While the pointer lingers, the pose relaxes to this share of its lean. */
const RELAXED_POSE = 0.65
/**
 * Camera distance as a multiple of the surface's longer side, so a phone and
 * a wide dashboard foreshorten by the same proportion.
 */
const PERSPECTIVE_PER_SIZE = 2.4

/** The surface leans into its pose once, when it first scrolls into view. */
const ARRIVAL_MS = 1100
/**
 * Share of the surface that must be in view before it leans in. A surface
 * taller than the viewport leans in once it covers this share of the viewport.
 */
const ARRIVAL_THRESHOLD = 0.2
/**
 * A surface smaller than this in pixels, such as an image that has not loaded
 * and shows only its border, has nothing to lean yet.
 */
const MIN_ARRIVAL_SIZE = 24
/** Fine steps up to the threshold, so a tall surface reports as it scrolls. */
const ARRIVAL_STEPS = Array.from(
  { length: 21 },
  (_, step) => (step / 20) * ARRIVAL_THRESHOLD
)
/** Settling back to rest takes this multiple of `duration`. */
const RETURN_FACTOR = 1.5
/** Shadow strength at rest, relative to its strength while tilting. */
const REST_SHADOW = 0.6
/**
 * How far the soft shadow drifts toward the side that lifts, in pixels. Keep
 * both under the soft shadow's 16px inset (`inset-4`).
 */
const SHADOW_SHIFT = { x: 12, y: 8 }
/** After a pause this long, the next pointer move measures the root again. */
const IDLE_GAP_MS = 250

const TILTING_ATTRIBUTE = "data-tilting"
const ARRIVING_ATTRIBUTE = "data-arriving"

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]"

const planeLayer = cn(
  // `h-full` passes a height or aspect ratio on the root on to the child.
  "relative isolate grid h-full origin-center rounded-[inherit]",
  // A transparent outline and a hidden back face keep the tilted edge smooth.
  "outline outline-transparent backface-hidden",
  // MagicUI's Safari and Iphone put their frame on a layer of its own with an
  // inline `translateZ(0)`. Dropping it keeps the frame in the plane's layer,
  // so the frame and the screen it holds tilt as one sheet.
  "[&_svg[style*=translateZ]]:transform-none!",
  "transition-transform motion-reduce:transition-none",
  EASE,
  "duration-(--poised-return)",
  "data-[tilting]:duration-(--poised-duration)",
  "data-[arriving]:duration-(--poised-arrival)"
)

/**
 * Both shadows sit under the content, inside the plane, so they tilt with it.
 * They answer only to their own plane, so nested surfaces stay independent.
 */
const shadowLayer = cn(
  "pointer-events-none absolute -z-10 rounded-[inherit]",
  "opacity-(--poised-shadow-rest) [[data-tilting]>&]:opacity-(--poised-shadow)",
  "motion-reduce:transition-none",
  EASE,
  "duration-(--poised-return) [[data-tilting]>&]:duration-(--poised-duration)"
)

/** A tight contact shadow, locked to the content's edge. */
const contactShadowLayer = cn(
  shadowLayer,
  "inset-0 transition-opacity",
  "shadow-[0_1px_2px_rgb(0_0_0/0.08)]",
  "dark:shadow-[0_1px_3px_rgb(0_0_0/0.5)]"
)

/**
 * The soft shadow drifts toward the side that lifts. A box shadow never paints
 * inside its own box, so a box that slid out from under the content would show
 * the page through it as a pale card behind the surface. This box is inset
 * further than it ever drifts, so its empty middle stays under the content.
 */
const softShadowLayer = cn(
  shadowLayer,
  "inset-4 transition-[opacity,translate]",
  "shadow-[0_16px_36px_rgb(0_0_0/0.24)]",
  "dark:shadow-[0_18px_44px_rgb(0_0_0/0.6)]"
)

const clamp = (value: number, min: number, max: number, fallback: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback

const toTilt = (value: number) => clamp(value, 0, MAX_TILT, DEFAULT_TILT)

const toDuration = (value: number) =>
  clamp(value, 0, MAX_DURATION, DEFAULT_DURATION)

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

/** Eases a position from -1 to 1: quick near the middle, flat at the edges. */
const soften = (value: number) =>
  Math.sin((clamp(value, -1, 1, 0) * Math.PI) / 2)

const isFlat = ({ pitch, yaw }: Angles) => pitch === 0 && yaw === 0

const hasArea = ({ width, height }: Size) => width > 0 && height > 0

const canArrive = ({ width, height }: Size) =>
  width >= MIN_ARRIVAL_SIZE && height >= MIN_ARRIVAL_SIZE

/**
 * Enough of the surface is in view to lean in: a share of the surface, or for
 * a surface taller than the viewport, the same share of the viewport.
 */
const isArriving = (entry: IntersectionObserverEntry) => {
  if (!entry.isIntersecting) {
    return false
  }
  if (entry.intersectionRatio >= ARRIVAL_THRESHOLD) {
    return true
  }
  const viewport = entry.rootBounds?.height ?? window.innerHeight
  return entry.intersectionRect.height >= viewport * ARRIVAL_THRESHOLD
}

/** How far the nearest corner of the plane comes toward the viewer. */
const nearestDepth = ({ pitch, yaw }: Angles, { width, height }: Size) =>
  (height / 2) * Math.abs(Math.sin(toRadians(pitch))) +
  (width / 2) * Math.abs(Math.sin(toRadians(yaw))) * Math.cos(toRadians(pitch))

/** The camera sits a few lengths away, in whole pixels. */
const toPerspective = ({ width, height }: Size) =>
  `${Math.round(Math.max(width, height) * PERSPECTIVE_PER_SIZE)}px`

/**
 * Turns the plane to `angles`. The plane is pushed back by how far the resting
 * `pose` brings its nearest corner forward, so at rest it never projects past
 * the root, without a `scale()` that would soften the text. The push-back holds
 * while the pointer swings it, so the surface never grows or shrinks.
 */
const toTransform = (angles: Angles, pose: Angles, size: Size) =>
  [
    `translateZ(${-Math.round(nearestDepth(pose, size))}px)`,
    `rotateX(${angles.pitch.toFixed(2)}deg)`,
    `rotateY(${angles.yaw.toFixed(2)}deg)`,
  ].join(" ")

export function PoisedSurface({
  pose = "front",
  tilt = DEFAULT_TILT,
  duration = DEFAULT_DURATION,
  shadowOpacity = DEFAULT_SHADOW_OPACITY,
  children,
  className,
  style,
  ...props
}: PoisedSurfaceProps) {
  const planeRef = useRef<HTMLDivElement>(null)
  const softShadowRef = useRef<HTMLDivElement>(null)
  // Read when the surface moves, so changing them never re-runs the effect.
  const settings = useRef({ pose, tilt, duration })
  const refreshRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    settings.current = { pose, tilt, duration }
    refreshRef.current?.()
  }, [pose, tilt, duration])

  useEffect(() => {
    const plane = planeRef.current
    // The root never moves, so it is the hit area while the plane tilts and
    // holds the camera. It is read through parentElement so the user's ref on
    // the root needs no merging.
    const root = plane?.parentElement
    if (!plane || !root) {
      return
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let bounds = new DOMRect()
    let size: Size = { width: 0, height: 0 }
    let rtl = false
    // A surface that still holds its pose, as when an <Activity> shows it
    // again, has already leaned in.
    let arrived = plane.style.transform !== ""
    // It came into view before it had a size, so it leans in once it has one.
    let pendingArrival = false
    let tilting = false
    let stale = true
    let lastMove = 0
    let pointer = { x: 0, y: 0 }
    let frame = 0
    let settleTimer = 0
    // Kept apart from its ref, so cleanup can still center it after unmount.
    let shiftedShadow: HTMLElement | null = null

    const measureSize = () => {
      size = { width: plane.offsetWidth, height: plane.offsetHeight }
      rtl = getComputedStyle(root).direction === "rtl"
    }

    const measure = () => {
      bounds = root.getBoundingClientRect()
      measureSize()
      stale = false
    }

    const returnMs = () =>
      toDuration(settings.current.duration) * RETURN_FACTOR * 1000

    /** The pose to hold, flat until the surface has leaned in. */
    const currentPose = (): Angles => {
      if (!arrived) {
        return FLAT
      }
      const { pitch, yaw } = POSES[settings.current.pose] ?? POSES.front
      const turn = size.width < NARROW_WIDTH ? yaw * NARROW_YAW : yaw
      // `start` and `end` follow the page's writing direction.
      return { pitch, yaw: rtl ? -turn : turn }
    }

    /**
     * Turns the plane to `angles` around its center. The camera sits on the
     * root, not in the plane's transform: when WebKit paints the plane without
     * compositing, as in a snapshot, a perspective inside the transform comes
     * out as a sideways shear.
     */
    const project = (angles: Angles, target: Angles) => {
      root.style.perspective = toPerspective(size)
      plane.style.transform = toTransform(angles, target, size)
    }

    /** Applies a style change instantly, then restores the transition. */
    const withoutTransition = (change: () => void) => {
      plane.style.transition = "none"
      change()
      // Commit the change before the transition comes back.
      plane.getBoundingClientRect()
      plane.style.removeProperty("transition")
    }

    /** Starts from a flat transform with the same functions as the pose. */
    const prepare = () => {
      if (plane.style.transform) {
        return
      }
      withoutTransition(() => project(FLAT, FLAT))
    }

    /** Clears the transform, so the children paint exactly as without it. */
    const flatten = () => {
      if (plane.style.transform) {
        withoutTransition(() => plane.style.removeProperty("transform"))
      }
      root.style.removeProperty("perspective")
    }

    const centerShadow = () => {
      shiftedShadow?.style.removeProperty("translate")
      shiftedShadow = null
    }

    /** Once at rest, drops every compositing hint so the text re-rasterizes. */
    const settle = () => {
      plane.removeAttribute(ARRIVING_ATTRIBUTE)
      plane.style.removeProperty("will-change")
      if (isFlat(currentPose())) {
        flatten()
      }
    }

    /**
     * Moves the plane to its pose and settles once it gets there. `instant`
     * jumps straight there, as after a resize.
     */
    const rest = (settleMs: number, instant = false) => {
      window.clearTimeout(settleTimer)
      if (reducedMotion.matches || !hasArea(size)) {
        flatten()
        settle()
        return
      }
      const target = currentPose()
      if (!isFlat(target)) {
        prepare()
      }
      if (plane.style.transform) {
        if (instant) {
          withoutTransition(() => project(target, target))
        } else {
          project(target, target)
        }
      }
      settleTimer = window.setTimeout(settle, settleMs)
    }

    const arrive = () => {
      pendingArrival = false
      arrived = true
      plane.setAttribute(ARRIVING_ATTRIBUTE, "")
      rest(ARRIVAL_MS)
    }

    const arrival = new IntersectionObserver(
      (entries) => {
        if (arrived || !entries.some(isArriving)) {
          return
        }
        arrival.disconnect()
        measureSize()
        if (canArrive(size)) {
          arrive()
        } else {
          // An image without a width and height, async content or a collapsed
          // parent has nothing to lean yet. The resize observer leans it in.
          pendingArrival = true
        }
      },
      { threshold: ARRIVAL_STEPS }
    )

    const update = () => {
      frame = 0
      if (!tilting) {
        return
      }
      const swing = toTilt(settings.current.tilt)
      // The side under the pointer recedes.
      const x = soften(pointer.x)
      const y = soften(pointer.y)
      const target = currentPose()
      project(
        {
          pitch: target.pitch * RELAXED_POSE - y * swing,
          yaw: target.yaw * RELAXED_POSE + x * swing,
        },
        target
      )
      // The shadow drifts toward the side that lifts, in whole pixels.
      shiftedShadow = softShadowRef.current
      shiftedShadow?.style.setProperty(
        "translate",
        `${Math.round(-x * SHADOW_SHIFT.x)}px ${Math.round(-y * SHADOW_SHIFT.y)}px`
      )
    }

    const engage = () => {
      window.clearTimeout(settleTimer)
      plane.removeAttribute(ARRIVING_ATTRIBUTE)
      arrived = true
      pendingArrival = false
      arrival.disconnect()
      tilting = true
      plane.setAttribute(TILTING_ATTRIBUTE, "")
      plane.style.willChange = "transform"
      prepare()
    }

    const release = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
      if (!tilting) {
        return
      }
      tilting = false
      plane.removeAttribute(TILTING_ATTRIBUTE)
      centerShadow()
      rest(returnMs())
    }

    const onPointerMove = (event: PointerEvent) => {
      // Only a hovering mouse or pen swings it, so a scroll or a tap on a
      // touch screen never makes the surface flinch.
      if (event.pointerType === "touch") {
        return
      }
      if (
        toTilt(settings.current.tilt) <= 0 ||
        reducedMotion.matches ||
        document.hidden
      ) {
        release()
        return
      }
      if (!tilting || stale || event.timeStamp - lastMove > IDLE_GAP_MS) {
        measure()
      }
      lastMove = event.timeStamp
      if (!bounds.width || !bounds.height || !hasArea(size)) {
        return
      }
      // Corners that swing past the root still count, at the extremes.
      pointer = {
        x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
      }
      if (!tilting) {
        engage()
      }
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }

    if (!arrived) {
      arrival.observe(root)
    }

    const resize = new ResizeObserver(() => {
      stale = true
      measureSize()
      if (pendingArrival) {
        if (canArrive(size)) {
          arrive()
        }
        return
      }
      if (!arrived || tilting) {
        return
      }
      if (
        plane.hasAttribute(ARRIVING_ATTRIBUTE) &&
        plane.style.transform &&
        hasArea(size)
      ) {
        // The arrival carries on to the new size at its own pace.
        const target = currentPose()
        project(target, target)
        return
      }
      rest(0, true)
    })
    resize.observe(root)

    const markStale = () => {
      stale = true
    }

    const onMotionChange = () => {
      if (tilting) {
        release()
      } else {
        rest(returnMs())
      }
    }

    // A new pose moves the surface there, and turning the tilt off while the
    // pointer rests on the surface settles it.
    refreshRef.current = () => {
      if (!tilting) {
        rest(returnMs())
        return
      }
      if (toTilt(settings.current.tilt) <= 0) {
        release()
        return
      }
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }

    const controller = new AbortController()
    const { signal } = controller
    root.addEventListener("pointermove", onPointerMove, { signal })
    root.addEventListener("pointerleave", release, { signal })
    window.addEventListener("scroll", markStale, {
      signal,
      capture: true,
      passive: true,
    })
    window.addEventListener("blur", release, { signal })
    document.addEventListener("visibilitychange", release, { signal })
    reducedMotion.addEventListener("change", onMotionChange, { signal })

    return () => {
      controller.abort()
      arrival.disconnect()
      resize.disconnect()
      window.cancelAnimationFrame(frame)
      window.clearTimeout(settleTimer)
      refreshRef.current = null
      // The pose stays, so a surface shown again holds still. Everything that
      // only lasts while it moves goes.
      plane.removeAttribute(TILTING_ATTRIBUTE)
      plane.removeAttribute(ARRIVING_ATTRIBUTE)
      plane.style.removeProperty("will-change")
      centerShadow()
    }
  }, [])

  const shadow = clamp(shadowOpacity, 0, 1, DEFAULT_SHADOW_OPACITY)
  const followTime = toDuration(duration)
  const variables = {
    "--poised-duration": `${followTime}s`,
    "--poised-return": `${followTime * RETURN_FACTOR}s`,
    "--poised-arrival": `${ARRIVAL_MS}ms`,
    "--poised-shadow": shadow,
    "--poised-shadow-rest": shadow * REST_SHADOW,
  } as CSSProperties

  return (
    <div
      className={cn("relative rounded-xl perspective-origin-center", className)}
      style={{ ...variables, ...style }}
      {...props}
    >
      <div ref={planeRef} className={planeLayer}>
        {shadow > 0 && (
          <>
            <div aria-hidden="true" className={contactShadowLayer} />
            <div
              ref={softShadowRef}
              aria-hidden="true"
              className={softShadowLayer}
            />
          </>
        )}
        {children}
      </div>
    </div>
  )
}
