"use client"

import {
  Children,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import type { ComponentProps, CSSProperties, ReactNode } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react"
import type { MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

import { passSample34 } from "./icon-honeycomb-pass"

void passSample34(0)
type Vec = [x: number, y: number]

/** Space between neighbouring tiles at the centre, as a share of the tile size. */
const GAP_RATIO = 0.14
const SQRT3 = Math.sqrt(3)
/** Distance between hexagon rows, as a share of the distance between tiles. */
const ROW = SQRT3 / 2
/** The largest scale the rim grows to when the field has room to spare. */
const MAX_RIM_SCALE = 0.6
/** Extra pull toward the centre that narrows the sideways gaps near the rim. */
const RIM_PULL = 0.08
/** Pixels kept clear between the outermost tiles and the root's edge. */
const RIM_MARGIN = 4
/** Pitches a tile travels past the last ring before it starts to sink. */
const SINK_LEAD = 0.25
/** Pitches a tile travels while it sinks from rim size to nothing. */
const SINK_LENGTH = 0.45
/** Pixels the pointer travels before a press becomes a drag. */
const DRAG_THRESHOLD = 6
/** The most the field stretches past its farthest tile, in pixels. */
const MAX_STRETCH = 240
/** Seconds of release velocity used to project where a throw lands. */
const THROW_LOOKAHEAD = 0.24
const SETTLE_SPRING = {
  type: "spring",
  stiffness: 150,
  damping: 23,
  mass: 1,
} as const
/** Share of the root that must be in view before the entrance ripple. */
const ENTRY_THRESHOLD = 0.35
const ENTRY_SCALE = 0.4
const ENTRY_DURATION = 0.52
const ENTRY_EASE = [0.2, 0.85, 0.3, 1] as const
/** Seconds between rings of the entrance ripple. */
const RING_STAGGER = 0.075
/** Seconds after the ripple starts before the ambient drift begins. */
const DRIFT_LEAD_IN = 0.9
/**
 * Drift amplitudes as shares of the pitch, 22 by 10 pixels at the default
 * size. Scaling with the tiles keeps the waiting tiles hidden past the rim at
 * any size. The vertical sine runs at twice the rate.
 */
const DRIFT_X = 0.3015
const DRIFT_Y = 0.137
/** Elements inside a tile that the arrow keys can move focus to. */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ")
/** Arrow keys and the direction each one moves focus in. */
const ARROW_DIRECTIONS = new Map<string, Vec>([
  ["ArrowRight", [1, 0]],
  ["ArrowLeft", [-1, 0]],
  ["ArrowDown", [0, 1]],
  ["ArrowUp", [0, -1]],
])
/** A neighbour within 60 degrees of an arrow lies in its direction. */
const MIN_ALIGNMENT = 0.49
/** Fields that keep the arrow keys and Home for their own text and options. */
const EDITABLE = "input, textarea, select"

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smoothstep = (t: number) => t * t * (3 - 2 * t)
/** The area under `smoothstep` from 0 to `t`. */
const smoothstepArea = (t: number) => t ** 3 - t ** 4 / 2

export interface IconHoneycombProps extends ComponentProps<"ul"> {
  /**
   * Tile diameter in pixels at the centre of the field.
   * @default 64
   */
  iconSize?: number
  /**
   * How small the rim tiles may get before the outermost ring is hidden, from
   * 0 to 1. Lower values show more rings.
   * @default 0.45
   */
  minScale?: number
  /**
   * Seconds per loop of the ambient drift. `0` turns the drift off.
   * @default 14
   */
  duration?: number
  /**
   * Seconds before the entrance ripple starts, once in view.
   * @default 0
   */
  delay?: number
}

interface TileHome {
  point: Vec
  ring: number
}

/** The lens, fitted to the root. Distances are hex distances in pixels. */
interface Lens {
  /** Distance over which tiles ease from full size to the rim scale. */
  span: number
  rimScale: number
  /** Distance at which tiles start to sink into the rim. */
  sinkStart: number
  /** Distance at which sinking tiles are gone. */
  sinkEnd: number
}

interface Placement {
  x: number
  y: number
  scale: number
  opacity: number
  interactive: boolean
}

interface FieldValues {
  panX: MotionValue<number>
  panY: MotionValue<number>
  lens: MotionValue<Lens | null>
}

interface Gesture {
  pointerId: number
  start: Vec
  origin: Vec
  dragging: boolean
}

type DriftControls = ReturnType<typeof animate>

/**
 * Places tiles on a hexagonal grid: the first in the centre, then ring by
 * ring outward, with 6 tiles in ring one, 12 in ring two and so on.
 */
function spiralHomes(count: number, pitch: number): TileHome[] {
  const homes: TileHome[] = count > 0 ? [{ point: [0, 0], ring: 0 }] : []

  for (let ring = 1; homes.length < count; ring++) {
    // Start on the right and walk the ring's six sides, one tile per step.
    let point: Vec = [ring * pitch, 0]
    for (let step = 0; step < ring * 6 && homes.length < count; step++) {
      homes.push({ point, ring })
      const side = Math.floor(step / ring)
      const angle = ((side + 2) * Math.PI) / 3
      point = [
        point[0] + Math.cos(angle) * pitch,
        point[1] + Math.sin(angle) * pitch,
      ]
    }
  }

  return homes
}

/** The number of tiles in the centre and the first `ring` rings. */
const tilesWithin = (ring: number) => 1 + 3 * ring * (ring + 1)

/**
 * The outermost complete ring. The tiles of a partial ring beyond it wait
 * past the rim, so the field's outline stays a clean hexagon.
 */
function lastFullRing(count: number) {
  if (count <= 1) {
    return 0
  }

  let ring = 0
  while (tilesWithin(ring + 1) <= count) {
    ring += 1
  }
  // A field of fewer than 7 tiles still shows its partial first ring.
  return Math.max(ring, 1)
}

/**
 * Distance from the centre in the hexagon's own metric: every tile of ring
 * `k` sits at exactly `k` pitches, so each ring has one size at rest.
 */
function hexDistance([x, y]: Vec) {
  const slant = y / SQRT3
  return Math.max(Math.abs(y) / ROW, Math.abs(x + slant), Math.abs(x - slant))
}

/**
 * Fits the lens to the root. It shows as many complete rings as fit at
 * `minScale`, then picks the rim scale that fills the room, so the falloff
 * always eases across every visible ring. The shorter side of the root
 * decides: the corners of the hexagon must fit across, its flat sides up
 * and down.
 */
function fitLens(
  width: number,
  height: number,
  iconSize: number,
  minScale: number,
  count: number
): Lens | null {
  // Until the root is measured, there is no lens and the tiles stay hidden.
  if (width === 0 || height === 0 || count === 0) {
    return null
  }

  const pitch = iconSize * (1 + GAP_RATIO)
  const half = iconSize / 2
  const lead = SINK_LEAD * pitch
  const roomX = width / 2 - RIM_MARGIN
  const roomY = height / 2 - RIM_MARGIN

  // Where ring `rings` is drawn when it starts to sink, as `fixed + perRim *
  // rimScale`, leaves the rim scale that just fits.
  const rimFor = (rings: number) => {
    const ringSpan = rings * pitch
    const fixed = (ringSpan * (1 - RIM_PULL)) / 2
    const perRim = (ringSpan * (1 + RIM_PULL)) / 2 + lead
    return Math.min(
      (roomX - fixed) / (perRim + half),
      (roomY - ROW * fixed) / (ROW * perRim + half)
    )
  }

  const outerRing = lastFullRing(count)
  let ring = 0
  while (ring < outerRing && rimFor(ring + 1) >= minScale) {
    ring += 1
  }

  const rimScale =
    ring === 0 ? 1 : Math.min(rimFor(ring), Math.max(minScale, MAX_RIM_SCALE))
  const span = ring * pitch

  // With tiles waiting beyond the last ring, sink right behind it so they
  // stay hidden at rest. Otherwise the rim tiles travel freely until they
  // near the root's edge.
  let sinkStart = span + lead
  if (count <= tilesWithin(ring)) {
    const reached =
      (span * (1 - RIM_PULL)) / 2 + (rimScale * span * (1 + RIM_PULL)) / 2
    const free = Math.min(
      roomX - rimScale * half - reached,
      (roomY - rimScale * half) / ROW - reached
    )
    sinkStart = span + Math.max(lead, free / rimScale)
  }

  return {
    span,
    rimScale,
    sinkStart,
    sinkEnd: sinkStart + SINK_LENGTH * pitch,
  }
}

/**
 * The lens. Takes a tile's panned position and returns where it is drawn,
 * how large and how opaque, all from its one hex distance to the centre.
 */
function placeTile(position: Vec, lens: Lens | null): Placement {
  const [x, y] = position
  if (!lens) {
    return { x, y, scale: 1, opacity: 0, interactive: false }
  }

  const { span, rimScale, sinkStart, sinkEnd } = lens
  const distance = hexDistance(position)
  const shrink = 1 - rimScale

  // Tiles ease from full size in the centre to the rim scale at the last ring.
  const t = span > 0 ? clamp01(distance / span) : 1
  const lensScale = 1 - shrink * smoothstep(t)
  // Past the last ring they sink into the rim: they shrink first and only
  // fade once they are small, so no tile is ever sliced by the root's edge.
  const sink = clamp01((distance - sinkStart) / (sinkEnd - sinkStart))
  const keep = 1 - smoothstep(sink)

  // Making room: the drawn distance is the running total of the scale along
  // the way, so neighbours along a radius stay tight however small they get.
  const held = Math.min(Math.max(distance, span), sinkStart) - span
  const along =
    span * (t - shrink * smoothstepArea(t)) +
    rimScale * held +
    rimScale * (sinkEnd - sinkStart) * (sink - smoothstepArea(sink))
  const drawn = along - RIM_PULL * (along - distance * lensScale)
  const pull = distance > 0 ? drawn / distance : 1

  return {
    x: x * pull,
    y: y * pull,
    scale: lensScale * keep,
    opacity: clamp01(keep * 2),
    // Tiles sunk below half their rim size let the pointer through.
    interactive: keep >= 0.5,
  }
}

/** Compresses a pan beyond `reach`, so the field stretches and resists. */
function stretchPastReach([x, y]: Vec, reach: number): Vec {
  const length = Math.hypot(x, y)
  if (length <= reach) {
    return [x, y]
  }

  const over = length - reach
  const stretched = reach + over / (1 + over / MAX_STRETCH)
  return [(x / length) * stretched, (y / length) * stretched]
}

/** Whether the keys pressed in an element belong to the element itself. */
function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || target.matches(EDITABLE))
  )
}

/** Leaves the field one Tab stop: the item of tile `active`. */
function setTabStop(items: (HTMLElement | null)[], active: number) {
  for (const [index, item] of items.entries()) {
    item?.setAttribute("tabindex", index === active ? "0" : "-1")
  }
}

/** The pan that centres the tile nearest to where the field would land. */
function nearestTilePan(homes: TileHome[], [x, y]: Vec): Vec {
  let nearest = homes[0].point
  let nearestDistance = Number.POSITIVE_INFINITY

  for (const { point } of homes) {
    const distance = Math.hypot(point[0] + x, point[1] + y)
    if (distance < nearestDistance) {
      nearest = point
      nearestDistance = distance
    }
  }

  return [-nearest[0], -nearest[1]]
}

/** Springs the pan to a target, carrying on from its current velocity. */
function springPan(
  panX: MotionValue<number>,
  panY: MotionValue<number>,
  [x, y]: Vec
) {
  animate(panX, x, { ...SETTLE_SPRING, velocity: panX.getVelocity() })
  animate(panY, y, { ...SETTLE_SPRING, velocity: panY.getVelocity() })
}

/**
 * The tiles touching tile `from` that lie toward an arrow key, best first:
 * the most squarely aligned, then the one nearer the centre of the field.
 */
function neighboursToward(
  homes: TileHome[],
  from: number,
  [dx, dy]: Vec,
  pitch: number
) {
  const [fromX, fromY] = homes[from].point
  const candidates: { index: number; alignment: number; depth: number }[] = []

  for (const [index, { point }] of homes.entries()) {
    const offsetX = point[0] - fromX
    const offsetY = point[1] - fromY
    const step = Math.hypot(offsetX, offsetY)
    const touching = step > 0 && step < pitch * 1.01
    // Rounded, so the two tiles above or below count as equally aligned.
    const alignment = touching
      ? Math.round(((offsetX * dx + offsetY * dy) / step) * 100) / 100
      : 0
    if (alignment >= MIN_ALIGNMENT) {
      candidates.push({
        index,
        alignment,
        depth: Math.round(Math.hypot(...point)),
      })
    }
  }

  return candidates
    .sort(
      (a, b) =>
        b.alignment - a.alignment || a.depth - b.depth || a.index - b.index
    )
    .map(({ index }) => index)
}

interface HoneycombTileProps {
  home: TileHome
  field: FieldValues
  revealed: boolean
  reduced: boolean
  delay: number
  children: ReactNode
}

function HoneycombTile({
  home,
  field,
  revealed,
  reduced,
  delay,
  children,
}: HoneycombTileProps) {
  // One placement per tile per frame. Every style below derives from it.
  const placement = useTransform(() =>
    placeTile(
      [home.point[0] + field.panX.get(), home.point[1] + field.panY.get()],
      field.lens.get()
    )
  )
  const transform = useTransform(
    placement,
    ({ x, y, scale }) =>
      `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(3)})`
  )
  const opacity = useTransform(
    placement,
    (placed) => Math.round(placed.opacity * 100) / 100
  )
  const pointerEvents = useTransform(placement, (placed) =>
    placed.interactive ? "auto" : "none"
  )

  return (
    <motion.li
      style={{ transform, opacity, pointerEvents }}
      className="absolute inset-0 m-auto size-(--icon-size)"
    >
      <motion.div
        initial={{ opacity: 0, scale: ENTRY_SCALE }}
        animate={revealed ? { opacity: 1, scale: 1 } : undefined}
        transition={
          reduced
            ? { duration: 0 }
            : {
                duration: ENTRY_DURATION,
                ease: ENTRY_EASE,
                delay: delay + home.ring * RING_STAGGER,
              }
        }
        className={cn(
          "bg-card ring-border size-full rounded-full shadow-sm ring-1",
          "transition-[background-color,box-shadow] duration-150",
          "hover:bg-muted hover:ring-foreground/30",
          // The child fills the tile, centres its mark and clips its own
          // content, so its focus outline is never cut off.
          "[&>*]:flex [&>*]:size-full [&>*]:items-center [&>*]:justify-center [&>*]:overflow-hidden [&>*]:rounded-full",
          // A thick outline keeps keyboard focus visible on tiles shrunk near the rim.
          "[&_:focus-visible]:outline-foreground [&_:focus-visible]:outline-3 [&_:focus-visible]:outline-offset-2"
        )}
      >
        {children}
      </motion.div>
    </motion.li>
  )
}

export function IconHoneycomb({
  children,
  iconSize = 64,
  minScale = 0.45,
  duration = 14,
  delay = 0,
  className,
  style,
  ref,
  ...props
}: IconHoneycombProps) {
  const rootRef = useRef<HTMLUListElement>(null)
  useImperativeHandle(ref, () => rootRef.current as HTMLUListElement, [])

  const tiles = Children.toArray(children).filter(isValidElement)
  const count = tiles.length
  const pitch = iconSize * (1 + GAP_RATIO)
  const homes = useMemo(() => spiralHomes(count, pitch), [count, pitch])
  // The farthest tile from the centre: how far the field pans before it resists.
  const reach = useMemo(
    () => Math.max(0, ...homes.map(({ point }) => Math.hypot(...point))),
    [homes]
  )
  const smallestScale = clamp01(minScale)

  const panX = useMotionValue(0)
  const panY = useMotionValue(0)
  const width = useMotionValue(0)
  const height = useMotionValue(0)
  // Refitted only when the root resizes or the props change, never per tile.
  const lens = useTransform(() =>
    fitLens(width.get(), height.get(), iconSize, smallestScale, count)
  )
  const field = useMemo(() => ({ panX, panY, lens }), [panX, panY, lens])

  const reduced = useReducedMotion() ?? false
  const entered = useInView(rootRef, { once: true, amount: ENTRY_THRESHOLD })
  const visible = useInView(rootRef)

  // Interaction state lives in refs, so an effect re-run never drops a drag.
  const gesture = useRef<Gesture | null>(null)
  const swallowClick = useRef(false)
  const engaged = useRef(false)
  const drift = useRef<DriftControls | null>(null)
  const driftPhase = useRef(0)
  // The pitch the pan was last set in, so a new tile size keeps its place.
  const panPitch = useRef(pitch)
  // The focusable item of each tile, and the tile that holds the Tab stop.
  const items = useRef<(HTMLElement | null)[]>([])
  const activeTile = useRef(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root || count === 0) {
      return
    }

    const setPan = ([x, y]: Vec) => {
      panX.set(x)
      panY.set(y)
    }
    const settle = (target: Vec) => {
      if (reduced) {
        setPan(target)
      } else {
        springPan(panX, panY, target)
      }
    }
    // The first press or keyboard focus ends the ambient drift for good.
    const engage = () => {
      engaged.current = true
      drift.current?.stop()
      drift.current = null
    }
    const centreTile = (index: number) => {
      engage()
      const [x, y] = homes[index].point
      settle([-x, -y])
    }
    const tileIndexOf = (target: EventTarget | null) => {
      if (!(target instanceof Node)) {
        return -1
      }
      return Array.from(root.children).findIndex((tile) =>
        tile.contains(target)
      )
    }
    const itemOf = (index: number) => items.current[index] ?? null

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) {
        return
      }
      if (gesture.current?.dragging) {
        return
      }

      engage()
      panX.stop()
      panY.stop()
      swallowClick.current = false
      gesture.current = {
        pointerId: event.pointerId,
        start: [event.clientX, event.clientY],
        origin: [panX.get(), panY.get()],
        dragging: false,
      }
    }

    const onPointerUp = (event: PointerEvent) => {
      const current = gesture.current
      if (!current || current.pointerId !== event.pointerId) {
        return
      }

      gesture.current = null
      swallowClick.current = current.dragging

      // One spring carries a throw, returns from the stretch and settles on a
      // tile. A press that never became a drag, like a click on a tile, and
      // any drag under reduced motion settle on the tile nearest the centre.
      const lookahead = current.dragging && !reduced ? THROW_LOOKAHEAD : 0
      const landing: Vec = [
        panX.get() + panX.getVelocity() * lookahead,
        panY.get() + panY.getVelocity() * lookahead,
      ]
      settle(nearestTilePan(homes, landing))
    }

    const onPointerMove = (event: PointerEvent) => {
      const current = gesture.current
      if (!current || current.pointerId !== event.pointerId) {
        return
      }
      // The button came up outside the root, so no pointerup reached it.
      if (event.buttons === 0) {
        onPointerUp(event)
        return
      }

      const dx = event.clientX - current.start[0]
      const dy = event.clientY - current.start[1]
      if (!current.dragging) {
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) {
          return
        }
        // Capture only now: capturing on press would send a tile's click to the root.
        current.dragging = true
        root.setPointerCapture(event.pointerId)
      }

      const pan: Vec = [current.origin[0] + dx, current.origin[1] + dy]
      setPan(stretchPastReach(pan, reach))
    }

    // The click that ends a drag belongs to the gesture, not to a tile.
    const onClick = (event: MouseEvent) => {
      // Keyboard activation reports detail 0 and always goes through.
      if (!swallowClick.current || event.detail === 0) {
        return
      }

      swallowClick.current = false
      event.preventDefault()
      event.stopPropagation()
    }

    // The focused tile becomes the field's one Tab stop, and keyboard focus
    // brings it to the centre, at full size.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target
      const index = tileIndexOf(target)
      if (index < 0) {
        return
      }

      if (itemOf(index) !== null) {
        activeTile.current = index
        setTabStop(items.current, index)
      }
      if (target instanceof Element && target.matches(":focus-visible")) {
        centreTile(index)
      }
    }

    // The arrow keys move focus to the neighbouring tile, Home to the centre.
    const onKeyDown = (event: KeyboardEvent) => {
      const modified = event.altKey || event.ctrlKey || event.metaKey
      if (event.defaultPrevented || modified || isEditable(event.target)) {
        return
      }

      const from = tileIndexOf(event.target)
      const direction = ARROW_DIRECTIONS.get(event.key)
      if (from < 0 || !(direction || event.key === "Home")) {
        return
      }
      // The field owns these keys, so the page never scrolls, even at the edge.
      event.preventDefault()

      // Home tries the tiles from the centre outward, in spiral order.
      const order = direction
        ? neighboursToward(homes, from, direction, pitch)
        : [...homes.keys()]
      const next = order.find((index) => itemOf(index) !== null)
      if (next === undefined) {
        return
      }

      const element = itemOf(next)
      if (next === from || !element) {
        return
      }
      element.focus({ preventScroll: true })
      // Browsers may not flag focus moved by a script as focus-visible.
      if (!element.matches(":focus-visible")) {
        centreTile(next)
      }
    }

    const observer = new ResizeObserver(() => {
      // Tiles are placed in the padding box, so measure that.
      width.set(root.clientWidth)
      height.set(root.clientHeight)
    })
    observer.observe(root)

    const controller = new AbortController()
    const options = { signal: controller.signal }
    root.addEventListener("pointerdown", onPointerDown, options)
    root.addEventListener("pointermove", onPointerMove, options)
    root.addEventListener("pointerup", onPointerUp, options)
    root.addEventListener("pointercancel", onPointerUp, options)
    root.addEventListener("lostpointercapture", onPointerUp, options)
    root.addEventListener(
      "dragstart",
      (event) => event.preventDefault(),
      options
    )
    root.addEventListener("click", onClick, { ...options, capture: true })
    root.addEventListener("focusin", onFocusIn, options)
    root.addEventListener("keydown", onKeyDown, options)

    return () => {
      controller.abort()
      observer.disconnect()
    }
  }, [count, homes, pitch, reach, reduced, panX, panY, width, height])

  // When the tiles change after the visitor has moved the field, settle on
  // whichever tile is now nearest the centre.
  useEffect(() => {
    const ratio = pitch / panPitch.current
    panPitch.current = pitch
    if (!engaged.current || gesture.current?.dragging || homes.length === 0) {
      return
    }

    // At a new tile size, scale the pan first, so the same tile stays centred.
    const pan: Vec = [panX.get() * ratio, panY.get() * ratio]
    if (ratio !== 1) {
      panX.jump(pan[0])
      panY.jump(pan[1])
    }
    const target = nearestTilePan(homes, pan)
    if (reduced) {
      panX.set(target[0])
      panY.set(target[1])
    } else {
      springPan(panX, panY, target)
    }
  }, [homes, pitch, reduced, panX, panY])

  useEffect(() => {
    if (engaged.current || count === 0) {
      return
    }
    // With the drift turned off, the field returns to the centre.
    if (reduced || duration <= 0) {
      driftPhase.current = 0
      if (reduced) {
        panX.set(0)
        panY.set(0)
      } else if (panX.get() !== 0 || panY.get() !== 0) {
        springPan(panX, panY, [0, 0])
      }
      return
    }
    if (!entered || !visible) {
      return
    }

    // Resume from the saved phase, so pausing off-screen never makes the field jump.
    const from = driftPhase.current
    const controls = animate(from, from + 1, {
      duration,
      ease: "linear",
      repeat: Number.POSITIVE_INFINITY,
      delay: from === 0 ? delay + DRIFT_LEAD_IN : 0,
      onUpdate: (phase) => {
        driftPhase.current = phase % 1
        const angle = phase * 2 * Math.PI
        // A slow figure of eight around the centre.
        panX.set(DRIFT_X * pitch * Math.sin(angle))
        panY.set(DRIFT_Y * pitch * Math.sin(angle * 2))
      },
    })
    drift.current = controls

    const followTab = () => {
      if (engaged.current) {
        return
      }
      if (document.hidden) {
        controls.pause()
      } else {
        controls.play()
      }
    }
    followTab()
    document.addEventListener("visibilitychange", followTab)

    return () => {
      document.removeEventListener("visibilitychange", followTab)
      controls.stop()
      drift.current = null
    }
  }, [entered, visible, reduced, duration, delay, count, pitch, panX, panY])

  // One Tab stop for the whole field: only the active tile's item is
  // tabbable, and the arrow keys move between tiles. Synced after every
  // render, so a changed tile set joins in and its old items get their own
  // tabindex back.
  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const found = Array.from(root.children, (tile) =>
      tile.querySelector<HTMLElement>(FOCUSABLE)
    )
    const original = new Map<HTMLElement, string | null>()
    for (const item of found) {
      if (item) {
        original.set(item, item.getAttribute("tabindex"))
      }
    }
    // The Tab stop starts on the centre, or the first focusable tile out from it.
    if (!found[activeTile.current]) {
      activeTile.current = Math.max(
        0,
        found.findIndex((item) => item !== null)
      )
    }
    items.current = found
    setTabStop(found, activeTile.current)

    return () => {
      for (const [item, tabIndex] of original) {
        if (tabIndex === null) {
          item.removeAttribute("tabindex")
        } else {
          item.setAttribute("tabindex", tabIndex)
        }
      }
    }
  })

  // Stop a settle that is still running when the component unmounts.
  useEffect(() => {
    return () => {
      panX.stop()
      panY.stop()
    }
  }, [panX, panY])

  return (
    <ul
      {...props}
      ref={rootRef}
      style={{ ...style, "--icon-size": `${iconSize}px` } as CSSProperties}
      className={cn(
        "relative h-[480px] w-full list-none overflow-clip",
        count > 0 &&
          "cursor-grab touch-pan-y select-none active:cursor-grabbing",
        className
      )}
    >
      {tiles.map((tile, index) => (
        <HoneycombTile
          key={tile.key}
          home={homes[index]}
          field={field}
          revealed={entered || reduced}
          reduced={reduced}
          delay={delay}
        >
          {tile}
        </HoneycombTile>
      ))}
    </ul>
  )
}
