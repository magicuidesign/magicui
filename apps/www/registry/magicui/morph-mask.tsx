"use client"

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react"
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react"

import { cn } from "@/lib/utils"

import { passSample53 } from "./morph-mask-pass"

void passSample53(0)
/**
 * Every shape is a list of radii measured from the center along the same
 * evenly spaced spokes, clockwise from the top. A radius of 1 touches the
 * edge of the box. Because all shapes share these spokes, a morph only
 * slides each point along its own spoke, so it can never twist or fold.
 */
const SPOKES = 180
const SPOKE_ANGLE = (Math.PI * 2) / SPOKES

/**
 * The direction of every spoke in screen axes, where y points down. Each is
 * 50 long, so a radius of 1 lands on the edge of a box measured in percent.
 */
const DIRECTIONS = Array.from({ length: SPOKES }, (_, spoke) => ({
  x: 50 * Math.sin(spoke * SPOKE_ANGLE),
  y: -50 * Math.cos(spoke * SPOKE_ANGLE),
}))

/** How far the circles of a named shape reach before it is scaled. */
const REACH = 0.96

/**
 * Every named shape is scaled to look as large as a circle with this radius,
 * so a morph changes the outline and never seems to change its size.
 */
const APPARENT_RADIUS = 0.8

/**
 * A named shape is `count` equal circles set in a ring that touches the
 * reach. Straight sides join neighbouring circles into a rounded polygon.
 * Otherwise the circles overlap into lobes, and a small circle of radius
 * `notch` rounds the dip between each pair.
 */
interface ShapeRecipe {
  count: number
  radius: number
  straight?: boolean
  notch?: number
}

export type MorphMaskShapeName =
  "squircle" | "clover" | "scallop" | "hexagon" | "trefoil" | "circle"

const RECIPES: Record<MorphMaskShapeName, ShapeRecipe> = {
  squircle: { count: 4, radius: 0.3, straight: true },
  clover: { count: 4, radius: 0.5, notch: 0.3 },
  scallop: { count: 12, radius: 0.36, notch: 0.4 },
  hexagon: { count: 6, radius: 0.26, straight: true },
  trefoil: { count: 3, radius: 0.56, notch: 0.4 },
  circle: { count: 1, radius: REACH },
}

/**
 * A named shape, or a pure function that takes an angle in radians,
 * clockwise from the top, and returns a radius from 0 at the center to 1 at
 * the edge. Functions compare by reference, so define them outside render:
 * a new function counts as a new shape and morphs again.
 */
export type MorphMaskShape = MorphMaskShapeName | ((angle: number) => number)

const DEFAULT_SHAPES: readonly MorphMaskShape[] = [
  "squircle",
  "hexagon",
  "circle",
]

const DEFAULT_DURATION = 0.4
const DEFAULT_REPEAT_DELAY = 2
/** Keeps the spring's overshoot under 1%, so a morph settles calmly. */
const MORPH_BOUNCE = 0.15
/** The loop never morphs more often than this, whatever the props say. */
const MIN_LOOP_SECONDS = 0.5
/** How long the first shape rests after the mask first comes into view. */
const FIRST_MORPH_DELAY_MS = 800
/** Steps under one half let `isInView` track masks taller than the viewport. */
const VIEW_THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5]

/**
 * Named shapes never change, so each one's radii are worked out once. The
 * arrays are shared between masks, so nothing may write to them.
 */
const NAMED_RADII = new Map<MorphMaskShapeName, Float64Array>()

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function wrap(index: number, length: number) {
  const whole = Number.isFinite(index) ? Math.trunc(index) : 0
  return ((whole % length) + length) % length
}

/** A non-negative number of seconds, or the fallback for anything else. */
function seconds(value: number, fallback: number) {
  return Number.isFinite(value) ? Math.max(0, value) : fallback
}

/** Where a spoke `delta` radians off a circle's center line leaves it. */
function leaveCircle(center: number, radius: number, delta: number) {
  const offAxis = center * Math.sin(delta)
  const inside = Math.sqrt(Math.max(0, radius ** 2 - offAxis ** 2))
  return center * Math.cos(delta) + inside
}

/** The radius of a recipe along the spoke at `angle`, before scaling. */
function recipeRadius(recipe: ShapeRecipe, angle: number) {
  const { count, radius, straight = false, notch = 0 } = recipe
  const wedge = (Math.PI * 2) / count
  const halfWedge = wedge / 2
  const center = REACH - radius

  // Even counts turn by half a wedge, so a flat side or a notch faces up.
  const offset = count % 2 === 0 ? halfWedge : 0
  // Angle between this spoke and the center of the nearest circle.
  const fromCircle = angle - offset
  const delta = Math.abs(fromCircle - wedge * Math.round(fromCircle / wedge))

  if (straight) {
    // Past the tangent point the spoke meets the straight side, which faces
    // the middle of the wedge.
    const tangent = Math.atan2(
      radius * Math.sin(halfWedge),
      center + radius * Math.cos(halfWedge)
    )
    if (delta > tangent) {
      const side = center * Math.cos(halfWedge) + radius
      return side / Math.cos(halfWedge - delta)
    }
  } else if (notch > 0) {
    // The notch circle sits on the middle of the wedge, touching both
    // neighbours. Past the point where it touches this circle, the spoke
    // meets the notch circle's inner edge instead.
    const middle =
      center * Math.cos(halfWedge) +
      Math.sqrt((radius + notch) ** 2 - (center * Math.sin(halfWedge)) ** 2)
    const touch = Math.atan2(
      middle * Math.sin(halfWedge) * radius,
      middle * Math.cos(halfWedge) * radius + center * notch
    )
    if (delta > touch) {
      const fromMiddle = halfWedge - delta
      const offAxis = middle * Math.sin(fromMiddle)
      const inside = Math.sqrt(Math.max(0, notch ** 2 - offAxis ** 2))
      return middle * Math.cos(fromMiddle) - inside
    }
  }

  return leaveCircle(center, radius, delta)
}

/**
 * The radius of a circle that looks as large as these radii. Equal areas do
 * not look equal: the eye mostly compares how far an outline reaches across
 * the box, so lobes and points look larger than their area. The half-size of
 * the outline's bounding box counts twice as much as the radius of a circle
 * with the same area.
 */
function apparentRadius(radii: Float64Array) {
  let squares = 0
  let left = 0
  let right = 0
  let top = 0
  let bottom = 0

  for (const [spoke, { x, y }] of DIRECTIONS.entries()) {
    const radius = radii[spoke]
    squares += radius ** 2
    left = Math.min(left, radius * x)
    right = Math.max(right, radius * x)
    top = Math.min(top, radius * y)
    bottom = Math.max(bottom, radius * y)
  }

  const areaRadius = Math.sqrt(squares / SPOKES)
  // The directions are in percent, so the full box measures 100.
  const halfSize = Math.max(right - left, bottom - top) / 100
  return (areaRadius + 2 * halfSize) / 3
}

/** A named shape's radii, scaled so every named shape looks the same size. */
function namedRadii(name: MorphMaskShapeName) {
  const cached = NAMED_RADII.get(name)
  if (cached) {
    return cached
  }

  // Plain JavaScript callers can pass any string, so fall back to a circle.
  const recipe = RECIPES[name] ?? RECIPES.circle
  const radii = Float64Array.from({ length: SPOKES }, (_, spoke) =>
    recipeRadius(recipe, spoke * SPOKE_ANGLE)
  )
  const scale = APPARENT_RADIUS / apparentRadius(radii)
  const scaled = radii.map((radius) => radius * scale)
  NAMED_RADII.set(name, scaled)
  return scaled
}

function shapeRadii(shape: MorphMaskShape) {
  if (typeof shape !== "function") {
    return namedRadii(shape)
  }

  return Float64Array.from({ length: SPOKES }, (_, spoke) => {
    const radius = shape(spoke * SPOKE_ANGLE)
    return Number.isFinite(radius) ? clamp(radius, 0, 1) : 0
  })
}

interface Flight {
  /** Radii on screen when the current morph started. */
  from: Float64Array
  /** Radii of the shape being morphed to. */
  to: Float64Array
  /** Index of the shape being morphed to. */
  position: number
  /** The shape being morphed to, so a new `shapes` list is noticed. */
  shape: MorphMaskShape
}

/** A mask at rest on the shape at `index`, or on the first shape. */
function restingFlight(
  cycle: readonly MorphMaskShape[],
  index: number | undefined
): Flight {
  const position = index === undefined ? 0 : wrap(index, cycle.length)
  const shape = cycle[position]
  const radii = shapeRadii(shape)
  return { from: radii, to: radii, position, shape }
}

/**
 * A CSS polygon in percentages. It follows any resize without measuring and
 * renders the same on the server and the client.
 */
function toPolygon({ from, to }: Flight, progress: number) {
  const points = DIRECTIONS.map(({ x, y }, spoke) => {
    const radius = from[spoke] + (to[spoke] - from[spoke]) * progress
    const left = 50 + radius * x
    const top = 50 + radius * y
    return `${left.toFixed(2)}% ${top.toFixed(2)}%`
  })
  return `polygon(${points.join(",")})`
}

/**
 * Half of the mask counts as in view. A mask more than twice as tall as the
 * viewport can never be half visible, so filling half the viewport's height
 * also counts, as long as at least half of the mask's width shows.
 */
function isInView(entry: IntersectionObserverEntry) {
  const { boundingClientRect, intersectionRect, intersectionRatio } = entry
  const viewport = entry.rootBounds?.height ?? window.innerHeight
  const fillsViewport =
    intersectionRect.height >= viewport / 2 &&
    intersectionRect.width >= boundingClientRect.width / 2
  return intersectionRatio >= 0.5 || fillsViewport
}

/**
 * Calls `onChange` whenever the element starts or stops being active: in
 * view while the tab is visible. Returns a function that stops watching.
 */
function observeActive(element: Element, onChange: (active: boolean) => void) {
  let inView = false
  let active = false

  const update = () => {
    const next = inView && !document.hidden
    if (next !== active) {
      active = next
      onChange(active)
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      // Several crossings can arrive together; the last one is current.
      const entry = entries.at(-1)
      if (entry) {
        inView = isInView(entry)
        update()
      }
    },
    { threshold: VIEW_THRESHOLDS }
  )

  observer.observe(element)
  document.addEventListener("visibilitychange", update)

  return () => {
    observer.disconnect()
    document.removeEventListener("visibilitychange", update)
  }
}

export interface MorphMaskProps extends ComponentProps<"div"> {
  /**
   * Shapes to cycle through, in order. Each is `squircle`, `clover`,
   * `scallop`, `hexagon`, `trefoil`, `circle` or an `(angle) => radius`
   * function, with the angle in radians clockwise from the top and the radius
   * from 0 to 1. Named shapes match a circle of radius `0.8`, so keep custom
   * radii near it.
   * @default ["squircle", "hexagon", "circle"]
   */
  shapes?: readonly MorphMaskShape[]
  /**
   * Position in `shapes` to show, wrapping at either end. Leave unset to loop.
   * @default undefined
   */
  index?: number
  /**
   * Seconds each morph takes.
   * @default 0.4
   */
  duration?: number
  /**
   * Seconds the shape rests between morphs while looping.
   * @default 2
   */
  repeatDelay?: number
}

export function MorphMask({
  children,
  className,
  ref,
  shapes = DEFAULT_SHAPES,
  index,
  duration = DEFAULT_DURATION,
  repeatDelay = DEFAULT_REPEAT_DELAY,
  ...props
}: MorphMaskProps) {
  const root = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const cycle = shapes.length > 0 ? shapes : DEFAULT_SHAPES
  const looping = index === undefined
  const canMorph = cycle.length > 1
  const reduced = useReducedMotion() ?? false
  const morphSeconds = seconds(duration, DEFAULT_DURATION)
  const restSeconds = seconds(repeatDelay, DEFAULT_REPEAT_DELAY)
  const loopMs = Math.max(morphSeconds + restSeconds, MIN_LOOP_SECONDS) * 1000

  // `ref` is a plain prop in React 19, so hand it the root element.
  useImperativeHandle(ref, () => root.current as HTMLDivElement, [])

  // The first shape is a pure function of props, so hydration matches. React
  // renders this clip once and never changes it, so it leaves every later
  // clip that the redraws write alone.
  const [initial] = useState(() => {
    const resting = restingFlight(cycle, index)
    return { flight: resting, clip: toPolygon(resting, 1) }
  })
  // Each morph replaces the flight here. Nothing reads it during render.
  const flight = useRef(initial.flight)
  // Whether the loop has morphed yet, so the quick first morph runs once.
  const seen = useRef(false)

  // Morphs and timers read the latest props here without re-subscribing.
  // It updates before the layout effect below, which morphs with it.
  const latest = useRef({ cycle, morphSeconds, reduced })
  useLayoutEffect(() => {
    latest.current = { cycle, morphSeconds, reduced }
  })

  const progress = useMotionValue(1)

  // Redraw the clip whenever the morph moves. Each redraw writes the clip
  // straight to the layer, so it lands even when the string is unchanged.
  const redraw = useCallback((value: number) => {
    const node = layer.current
    if (node) {
      node.style.clipPath = toPolygon(flight.current, value)
    }
  }, [])
  useMotionValueEvent(progress, "change", redraw)

  const morph = useCallback(
    (target: number) => {
      const settings = latest.current
      const position = wrap(target, settings.cycle.length)
      const shape = settings.cycle[position]
      const to = shapeRadii(shape)

      // Start from the shape on screen right now, so a morph that
      // interrupts another never pops.
      const { from, to: previous } = flight.current
      const current = progress.get()
      const onScreen = from.map(
        (radius, spoke) => radius + (previous[spoke] - radius) * current
      )

      // With reduced motion or no duration, jump straight to the new shape.
      const still = settings.reduced || settings.morphSeconds === 0
      flight.current = { from: still ? to : onScreen, to, position, shape }

      // Restarting from 0 redraws the clip even when progress was already 1.
      progress.jump(0)
      if (still) {
        progress.jump(1)
        return
      }

      animate(progress, 1, {
        type: "spring",
        visualDuration: settings.morphSeconds,
        bounce: MORPH_BOUNCE,
      })
    },
    [progress]
  )

  // When an <Activity> hides the mask, or it unmounts, the cleanup settles
  // any morph on its target shape. When the mask shows again, the effect
  // redraws the clip from that settled flight before the browser paints,
  // whatever clip the layer kept while it was hidden.
  useLayoutEffect(() => {
    redraw(progress.get())
    return () => progress.jump(1)
  }, [progress, redraw])

  // Morph when a set `index` moves, or when `shapes` puts a different shape
  // at the current position. A layout effect starts the morph on the same
  // frame as any other change from the same render, such as a highlight.
  useLayoutEffect(() => {
    const target = wrap(index ?? flight.current.position, cycle.length)
    const moved = target !== flight.current.position
    if (moved || cycle[target] !== flight.current.shape) {
      morph(target)
    }
  }, [cycle, index, morph])

  // An unset `index` loops through the shapes while the mask is in view.
  useEffect(() => {
    const element = root.current
    if (!element || !looping || !canMorph || reduced) {
      return
    }

    let timer: number | undefined

    // Each tick arms the next one, and only while the mask can be seen, so
    // a hidden tab or an off-screen mask runs no timers.
    const schedule = (delayMs: number) => {
      timer = window.setTimeout(() => {
        seen.current = true
        morph(flight.current.position + 1)
        schedule(loopMs)
      }, delayMs)
    }

    const stopObserving = observeActive(element, (active) => {
      window.clearTimeout(timer)
      if (!active) {
        // A morph that leaves the screen finishes on its own. A hidden tab
        // draws no frames, so settle the shape there instead.
        if (document.hidden) {
          progress.jump(1)
        }
        return
      }

      // Until the first morph runs, each view morphs soon, so the effect
      // shows itself; later views wait a full loop.
      schedule(seen.current ? loopMs : FIRST_MORPH_DELAY_MS)
    })

    return () => {
      window.clearTimeout(timer)
      stopObserving()
    }
  }, [canMorph, looping, loopMs, morph, progress, reduced])

  return (
    <div
      ref={root}
      className={cn(
        "relative aspect-square w-80 max-w-full rounded-full",
        // The clip layer would cut off a child's focus ring, so the
        // unclipped root draws one that surrounds every shape.
        "outline-foreground outline-offset-2 has-focus-visible:outline-2",
        className
      )}
      {...props}
    >
      <div
        ref={layer}
        className={cn(
          "bg-muted absolute inset-0 grid place-items-center overflow-hidden",
          // Every child fills the mask, stacked in a single grid cell.
          "*:col-start-1 *:row-start-1 *:size-full",
          "[&>img]:object-cover [&>video]:object-cover"
        )}
        style={{ clipPath: initial.clip }}
      >
        {children}
      </div>
    </div>
  )
}
