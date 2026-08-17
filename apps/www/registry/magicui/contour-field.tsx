"use client"

import { useEffect, useRef, type ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { passSample51 } from "./contour-field-pass"

void passSample51(0)
export interface ContourFieldProps extends Omit<
  ComponentProps<"div">,
  "children" | "color"
> {
  /**
   * Line color. Any CSS color, such as `var(--primary)`. The default
   * inherits the surrounding text color.
   * @default "currentColor"
   */
  color?: string
  /**
   * Seconds for one full drift loop.
   * @default 90
   */
  duration?: number
  /**
   * How many contour lines stack from the deepest basin to the highest
   * summit. Higher draws more, closer lines.
   * @default 22
   */
  levels?: number
  /**
   * Raise the lines under a mouse or pen, not touch. Nearby lines part and
   * a ring or two closes over the pointer.
   * @default true
   */
  interactive?: boolean
}

/** Seconds the land takes to rise the first time it comes into view. */
const RISE_SECONDS = 1.8
/**
 * Share of its full height the land rises from. Starting above zero means
 * the first frame already shows a whole field rather than one summit ring.
 */
const RISE_FROM = 0.35
/** Seconds the lines take to fade in as the rise begins. */
const FADE_SECONDS = 0.6
/** Seconds for one drift loop when `duration` is missing or not positive. */
const DEFAULT_DURATION = 90
/**
 * Milliseconds between samples of the drifting land once it has risen. The
 * drift is slow, so it is redrawn at this pace unless the lift is moving.
 */
const DRIFT_FRAME_MS = 30
/** Longest step the clock takes in one frame, so a long stall never jumps. */
const MAX_FRAME_SECONDS = 0.25
/**
 * Milliseconds to wait before reading the color again after it may have
 * changed, since theme switches often transition colors.
 */
const THEME_SETTLE_MS = 350

/** Height range spanned by `levels` contour intervals. */
const RELIEF = 1.8
const DEFAULT_LEVELS = 22
const MIN_LEVELS = 2
const MAX_LEVELS = 200
/** Every fifth level is a heavier index line, as on a printed map. */
const INDEX_EVERY = 5

/**
 * One hill per this many square CSS pixels, and never fewer than seven.
 * Hills are shaped for this much ground each.
 */
const AREA_PER_HILL = 70_000
const MIN_HILLS = 7
/** Hills may sit this far past each edge, as a fraction of the box. */
const OVERSCAN = 0.06
/** Reciprocals of the golden ratio and the plastic number. */
const GOLDEN_STEP = 0.618034
const PLASTIC_STEP = 0.754878
/** Radii, height and orbit radius in CSS pixels. Every third hill is small. */
const BROAD_HILL = { rx: 230, ry: 140, height: 1, orbit: 70 }
const SMALL_HILL = { rx: 120, ry: 80, height: 0.5, orbit: 50 }
/** Every fourth hill is a basin, this deep relative to its height. */
const BASIN_DEPTH = 0.75
/** Vertical reach of an orbit relative to its horizontal radius. */
const ORBIT_ASPECT = 0.8
/** How far each hill's height swells and sinks over one drift loop. */
const BREATH = 0.16

/**
 * Lattice samples per draw that the spacing aims for; a bigger box gets a
 * coarser lattice.
 */
const SAMPLE_BUDGET = 20_000
/**
 * Finest and coarsest lattice spacing, in CSS pixels. Past the coarsest,
 * the smallest summit rings would turn visibly faceted, so a box too big
 * for the budget at that spacing takes more samples instead.
 */
const MIN_STEP = 4
const MAX_STEP = 12
/**
 * Hard cap on lattice samples. Only very large or very tall boxes reach it,
 * and they get a coarser lattice rather than an unbounded cost.
 */
const MAX_SAMPLES = 2 * SAMPLE_BUDGET
/**
 * Spare room in new lattice buffers. Sample counts wobble around the budget
 * as a box resizes, so the same buffers serve most later sizes.
 */
const LATTICE_HEADROOM = 1.25
/**
 * Hill evaluations per sample of the land, hills times lattice samples.
 * Past it, a big box gets fewer but larger hills, never fewer than
 * MIN_HILLS, so the land keeps its look and the cost of a sample stays
 * bounded as the box grows.
 */
const WORK_BUDGET = 220_000
const MAX_PIXEL_RATIO = 2
/** Largest backing store, in device pixels. Mobile Safari blanks above ~16.7M. */
const MAX_CANVAS_PIXELS = 16_000_000

/** Line widths in CSS pixels. Every fifth line is a heavier index line. */
const LINE_WIDTH = { minor: 0.75, index: 1.2 }
/**
 * Line opacities for light lines on a dark page, and for dark lines on a
 * light page. Thin dark lines read fainter, so they get stronger minor
 * lines. Light lines glow on a dark page, so their index lines stay close to
 * the minor ones and the map never turns into a few bright wires. Either
 * way the width keeps every fifth line clearly heavier.
 */
const LIGHT_INK = { minor: 0.35, index: 0.4 }
const DARK_INK = { minor: 0.45, index: 0.5 }
/**
 * Relative luminance at or below which a line color counts as fully dark,
 * and at or above which it counts as fully light. Mid tones, such as most
 * brand colors, get some of each, which keeps their thin lines readable.
 */
const DARK_INK_LUMINANCE = 0.18
const LIGHT_INK_LUMINANCE = 0.45
/**
 * Lines shorter than this, in CSS pixels, are drawn fainter in steps, so a
 * ring forming at a summit fades in as it grows instead of blinking on.
 */
const FADE_IN_LENGTH = 48
const FADE_IN_STEPS = 4

/**
 * The pointer lift has two parts. Within TERRACE_RADIUS, in CSS pixels, the
 * land levels off toward its height under the pointer, losing up to
 * TERRACE_FLATNESS of its slope at the center, so nearby lines part around
 * it. On that terrace a dome DOME_LEVELS contour intervals high and
 * DOME_RADIUS wide rises, so one or two rings close over the pointer.
 */
const TERRACE_RADIUS = 225
const TERRACE_FLATNESS = 0.94
const DOME_LEVELS = 2.4
const DOME_RADIUS = 170
/** Seconds the lift takes to grow under a mouse or pen, and to settle after. */
const LIFT_RISE_SECONDS = 0.25
const LIFT_FALL_SECONDS = 0.6
/** Time constant, in seconds, with which the lift trails the pointer. */
const LIFT_FOLLOW_SECONDS = 0.15
/**
 * Closer than this to the pointer, in CSS pixels, the lift is there. A lift
 * that has grown and arrived under a resting pointer goes back to the
 * drift's redraw pace.
 */
const LIFT_SNAP_PIXELS = 0.25
/**
 * Share of its height below which a pointer coming back starts the lift
 * where it is, instead of the lift sweeping over from where it settled.
 */
const LIFT_JUMP_BELOW = 0.05
/** Room for this many levels at first in the per-level buffer; it grows. */
const LEVEL_SLOTS = 64

/** Where a piece of line stands while its level is joined into lines. */
const UNJOINED = 0
const CONTINUES = 1
const DRAWN = 2
/** Lines that run off the box are drawn first, from their open end. */
const JOIN_ORDER = [UNJOINED, CONTINUES]

const TAU = Math.PI * 2

interface Hill {
  /** Resting center, in CSS pixels. */
  x: number
  y: number
  /** Peak height; negative for a basin. */
  height: number
  /** Horizontal orbit radius, in CSS pixels. */
  orbit: number
  /** Where on its orbit the hill starts, in radians. */
  phase: number
  /**
   * Rotation and radii folded together: an offset (dx, dy) from the center
   * lies at elliptical distance |(dx * ux + dy * uy, dx * vx + dy * vy)|.
   */
  ux: number
  uy: number
  vx: number
  vy: number
}

/**
 * Pieces of contour line, each crossing one lattice cell from one of its
 * edges to another. Every piece keeps the higher ground on the same side,
 * so the piece that leaves a cell through an edge is continued by the one
 * that enters the next cell through it.
 */
interface Pieces {
  count: number
  /** Lattice edges where each piece starts and ends. */
  from: Int32Array
  to: Int32Array
  /** The next piece on the same level, or -1: one linked list per level. */
  sameLevel: Int32Array
  /** The piece that continues this one, or -1 at an open end. */
  next: Int32Array
  state: Uint8Array
  /** Scratch x, y pairs for the line being drawn. */
  points: Float32Array
}

/**
 * Ground heights sampled on a square lattice that covers the box. Lattice
 * edges are numbered 2v for the edge right of sample v and 2v + 1 for the
 * edge below it.
 */
interface Lattice {
  cols: number
  rows: number
  /** Spacing between samples, in CSS pixels. */
  step: number
  /** The land alone, summed from the hills at the drift's pace. */
  base: Float32Array
  /** The land as drawn: `base` with the pointer lift applied. */
  heights: Float32Array
  pieces: Pieces
  /** While one level is joined, the piece that starts on each edge, or -1. */
  startsAt: Int32Array
  /**
   * While a frame is traced, the newest piece on each level, which links to
   * the rest. Kept between frames and grown when a frame needs more levels.
   */
  levelHeads: Int32Array
}

/** What tracing one frame needs while it walks the cells. */
interface Trace {
  lattice: Lattice
  interval: number
  /** The lowest level on the ground. Level n is kept at slot n - lowest. */
  lowest: number
  /** The newest piece on each level, which links to the rest. */
  lastOnLevel: Int32Array
  /** The current cell's corner heights and edges, clockwise from top left. */
  corners: number[]
  edges: number[]
}

/** The lowest and highest the ground can reach in one frame. */
interface Bounds {
  low: number
  high: number
}

/** Contour lines by weight, one path per fade-in step. */
interface Contours {
  minor: Path2D[]
  index: Path2D[]
}

/** Opacity of each weight of line. */
interface LineWeights {
  minor: number
  index: number
}

interface Settings {
  duration: number
  interval: number
  interactive: boolean
}

/** A soft rise in the ground that trails a mouse or pen over the box. */
interface Lift {
  /** Whether a mouse or pen is over the box. */
  hovering: boolean
  /** Where the pointer is, in CSS pixels from the box's top left corner. */
  targetX: number
  targetY: number
  /** Where the rise is centered. It trails the pointer. */
  x: number
  y: number
  /** How far the rise has grown, from 0 to 1. */
  strength: number
}

interface Clock {
  /** Seconds spent on screen. The rise starts the first time it runs. */
  age: number
  /** Progress through the drift loop, from 0 to 1. */
  drift: number
  /** Whether the rise has finished. */
  risen: boolean
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const finiteOr = (value: number, fallback: number) =>
  Number.isFinite(value) ? value : fallback

const fract = (value: number) => value - Math.floor(value)

const easeOut = (progress: number) => 1 - (1 - progress) ** 3

/** Starts and ends gently, so the lift swells in and settles out softly. */
const easeInOut = (progress: number) => progress * progress * (3 - 2 * progress)

const mix = (from: number, to: number, amount: number) =>
  from + (to - from) * amount

/** A fixed pseudo-random number in [0, 1) for each hill and salt. */
const hash = (index: number, salt: number) =>
  fract(Math.sin(index * 127.1 + salt * 311.7) * 43_758.5453)

/** Even spacing without clusters, overscanned past both edges. */
const spread = (index: number, step: number) =>
  fract(index * step) * (1 + 2 * OVERSCAN) - OVERSCAN

/** Share of its full height the land stands at, `elapsed` seconds in. */
const riseAmount = (elapsed: number) =>
  RISE_FROM + (1 - RISE_FROM) * easeOut(clamp(elapsed / RISE_SECONDS, 0, 1))

/** Opacity of the lines, `elapsed` seconds into the rise. */
const fadeAmount = (elapsed: number) =>
  easeOut(clamp(elapsed / FADE_SECONDS, 0, 1))

/**
 * Moves one coordinate of the lift toward the pointer by an exponential
 * ease, so it moves the same over a second at any frame rate. Within
 * LIFT_SNAP_PIXELS it lands there, so a lift that has arrived stops moving.
 */
function follow(from: number, to: number, seconds: number) {
  const next = to + (from - to) * Math.exp(-seconds / LIFT_FOLLOW_SECONDS)
  return Math.abs(to - next) < LIFT_SNAP_PIXELS ? to : next
}

/** Replaces edge values in the props with what the frame loop reads. */
function resolveSettings(
  duration: number,
  levels: number,
  interactive: boolean
): Settings {
  const levelCount = clamp(
    finiteOr(levels, DEFAULT_LEVELS),
    MIN_LEVELS,
    MAX_LEVELS
  )
  const validDuration = Number.isFinite(duration) && duration > 0
  return {
    duration: validDuration ? duration : DEFAULT_DURATION,
    interval: RELIEF / levelCount,
    interactive,
  }
}

/** Before any prop arrives; the settings effect applies the real ones. */
const INITIAL_SETTINGS = resolveSettings(DEFAULT_DURATION, DEFAULT_LEVELS, true)

/**
 * Moves the clock on. The drift wraps, so the loop has no seam. The clock
 * only runs on screen, so the rise starts the first time the field is seen
 * and plays once.
 */
function advanceClock(clock: Clock, seconds: number, settings: Settings) {
  clock.age += seconds
  clock.drift = fract(clock.drift + seconds / settings.duration)
  if (clock.age >= RISE_SECONDS) {
    clock.risen = true
  }
}

/** Seconds into the rise, held once it has finished. */
const riseSeconds = (clock: Clock) => (clock.risen ? RISE_SECONDS : clock.age)

/**
 * Moves the lift on. Its strength grows steadily under a mouse or pen and
 * settles more slowly after one leaves; the drawing eases both ends. Its
 * center trails the pointer and lands there once close, so a lift at rest
 * stops asking for frames.
 */
function easeLift(lift: Lift, seconds: number) {
  const change = lift.hovering
    ? seconds / LIFT_RISE_SECONDS
    : -seconds / LIFT_FALL_SECONDS
  lift.strength = clamp(lift.strength + change, 0, 1)
  lift.x = follow(lift.x, lift.targetX, seconds)
  lift.y = follow(lift.y, lift.targetY, seconds)
}

/**
 * Whether the lift is still changing: growing, settling or catching up with
 * the pointer. A lift that has arrived under a resting pointer is not, and
 * neither is one that has settled away.
 */
function liftIsMoving(lift: Lift) {
  const target = lift.hovering ? 1 : 0
  if (target === 0 && lift.strength === 0) {
    return false
  }
  return (
    lift.strength !== target ||
    lift.x !== lift.targetX ||
    lift.y !== lift.targetY
  )
}

/**
 * The same soft elliptical hills on every load, so there is nothing random
 * for server and client to disagree about. Radii are in CSS pixels, so a
 * small box shows less land rather than a denser map.
 *
 * Each hill is shaped for AREA_PER_HILL of ground. Past the work budget,
 * fewer hills grow wider to cover a big box; in a small one, MIN_HILLS
 * crowd closer together. Either way the heights follow the square root of
 * each hill's real share of the box, which keeps lines about as far apart,
 * in pixels, as in a box at the intended density.
 */
function createHills(width: number, height: number, samples: number): Hill[] {
  const intended = (width * height) / AREA_PER_HILL
  const wanted = Math.max(MIN_HILLS, Math.round(intended))
  const affordable = Math.max(MIN_HILLS, Math.floor(WORK_BUDGET / samples))
  const count = Math.min(wanted, affordable)
  // Each hill's share of the box against the share it is shaped for, as a
  // length. Above 1 the hills widen; heights follow it both ways.
  const share = Math.sqrt(intended / count)
  const widen = Math.max(1, share)
  return Array.from({ length: count }, (_, index) => {
    const shape = index % 3 === 2 ? SMALL_HILL : BROAD_HILL
    const isBasin = index % 4 === 3
    // Sizes step from 0.8 to 1.3 and repeat, so neighbors always differ.
    const size = (0.8 + (index % 6) / 10) * widen
    const rx = shape.rx * size
    const ry = shape.ry * size
    const angle = Math.PI * hash(index, 2)
    const strength = 0.7 + 0.6 * hash(index, 3)
    const depth = isBasin ? -BASIN_DEPTH : 1
    return {
      x: spread(index + 1, GOLDEN_STEP) * width,
      y: spread(index + 1, PLASTIC_STEP) * height,
      height: shape.height * strength * share * depth,
      orbit: shape.orbit * (0.7 + 0.6 * hash(index, 4)),
      phase: TAU * hash(index, 5),
      ux: Math.cos(angle) / rx,
      uy: Math.sin(angle) / rx,
      vx: -Math.sin(angle) / ry,
      vy: Math.cos(angle) / ry,
    }
  })
}

function createPieces(capacity: number): Pieces {
  return {
    count: 0,
    from: new Int32Array(capacity),
    to: new Int32Array(capacity),
    sameLevel: new Int32Array(capacity),
    next: new Int32Array(capacity),
    state: new Uint8Array(capacity),
    // A line has at most one point more than the pieces it joins.
    points: new Float32Array(2 * (capacity + 1)),
  }
}

/** Doubles the room for pieces and keeps the ones found so far. */
function growPieces(pieces: Pieces): Pieces {
  const larger = createPieces(pieces.from.length * 2)
  larger.count = pieces.count
  larger.from.set(pieces.from)
  larger.to.set(pieces.to)
  larger.sameLevel.set(pieces.sameLevel)
  return larger
}

/**
 * The finest lattice spacing that keeps a box within MAX_SAMPLES. A lattice
 * has at most (width / step + 2) × (height / step + 2) samples, and this is
 * the spacing at which that bound meets the cap.
 */
function capStep(width: number, height: number) {
  const room = MAX_SAMPLES - 4
  const span = width + height
  return (span + Math.sqrt(span * span + room * width * height)) / room
}

/**
 * Sizes the lattice to the box. The buffers of `reuse` are kept when they
 * are big enough, so resizing does not churn memory.
 */
function createLattice(
  width: number,
  height: number,
  reuse: Lattice | null
): Lattice {
  const preferred = clamp(
    Math.sqrt((width * height) / SAMPLE_BUDGET),
    MIN_STEP,
    MAX_STEP
  )
  const step = Math.max(preferred, capStep(width, height))
  const cols = Math.ceil(width / step) + 1
  const rows = Math.ceil(height / step) + 1
  const samples = cols * rows
  if (reuse && reuse.heights.length >= samples) {
    return { ...reuse, cols, rows, step }
  }
  const capacity = Math.ceil(samples * LATTICE_HEADROOM)
  return {
    cols,
    rows,
    step,
    base: new Float32Array(capacity),
    heights: new Float32Array(capacity),
    pieces: reuse?.pieces ?? createPieces(capacity),
    startsAt: new Int32Array(2 * capacity).fill(-1),
    levelHeads: reuse?.levelHeads ?? new Int32Array(LEVEL_SLOTS),
  }
}

/** Device pixels per CSS pixel, capped so the backing store stays drawable. */
function pixelRatio(width: number, height: number) {
  const fitsArea = Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, width * height))
  return Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO, fitsArea)
}

/** A 1x1 canvas that reads any CSS color back as sRGB. */
function createProbe() {
  const probe = document.createElement("canvas")
  probe.width = 1
  probe.height = 1
  return probe.getContext("2d", { willReadFrequently: true })
}

/**
 * Line opacities for a resolved line color, from its relative luminance.
 * Light colors keep the light-ink weights; darker ones move toward the
 * dark-ink weights.
 */
function lineWeights(
  probe: CanvasRenderingContext2D | null,
  color: string
): LineWeights {
  if (!probe) {
    return LIGHT_INK
  }
  probe.clearRect(0, 0, 1, 1)
  probe.fillStyle = "#fff"
  probe.fillStyle = color
  probe.fillRect(0, 0, 1, 1)
  const [red, green, blue] = probe.getImageData(0, 0, 1, 1).data
  // A 2.2 power is close enough to the sRGB curve for picking a weight.
  const luminance =
    0.2126 * (red / 255) ** 2.2 +
    0.7152 * (green / 255) ** 2.2 +
    0.0722 * (blue / 255) ** 2.2
  const darkness = clamp(
    (LIGHT_INK_LUMINANCE - luminance) /
      (LIGHT_INK_LUMINANCE - DARK_INK_LUMINANCE),
    0,
    1
  )
  return {
    minor: mix(LIGHT_INK.minor, DARK_INK.minor, darkness),
    index: mix(LIGHT_INK.index, DARK_INK.index, darkness),
  }
}

/**
 * Sums every hill over the lattice into `base`. Each hill circles a closed
 * orbit, once horizontally and twice vertically per loop, and falls off as
 * (1 + d²)^-1.5. The long tails let neighboring slopes run together.
 * Returns bounds that no height can pass: every basin at its deepest, or
 * every summit at its highest.
 */
function sampleGround(
  lattice: Lattice,
  hills: Hill[],
  drift: number,
  rise: number
): Bounds {
  const { cols, rows, step, base } = lattice
  const bounds = { low: 0, high: 0 }
  base.fill(0, 0, cols * rows)
  for (const hill of hills) {
    const angle = drift * TAU + hill.phase
    const centerX = hill.x + Math.cos(angle) * hill.orbit
    const centerY = hill.y + Math.sin(2 * angle) * hill.orbit * ORBIT_ASPECT
    const peak = hill.height * rise * (1 + BREATH * Math.sin(angle))
    bounds.low += Math.min(0, peak)
    bounds.high += Math.max(0, peak)
    for (let row = 0; row < rows; row++) {
      const dy = row * step - centerY
      const rowU = dy * hill.uy
      const rowV = dy * hill.vy
      const offset = row * cols
      for (let col = 0; col < cols; col++) {
        const dx = col * step - centerX
        const u = dx * hill.ux + rowU
        const v = dx * hill.vx + rowV
        const q = 1 + u * u + v * v
        base[offset + col] += peak / (q * Math.sqrt(q))
      }
    }
  }
  return bounds
}

/** The land's height at (x, y), read from `base` between lattice samples. */
function baseHeightAt(lattice: Lattice, x: number, y: number) {
  const { cols, rows, step, base } = lattice
  const col = clamp(x / step, 0, cols - 1)
  const row = clamp(y / step, 0, rows - 1)
  const left = Math.min(Math.floor(col), cols - 2)
  const top = Math.min(Math.floor(row), rows - 2)
  const sample = top * cols + left
  const across = col - left
  const upper = mix(base[sample], base[sample + 1], across)
  const lower = mix(base[sample + cols], base[sample + cols + 1], across)
  return mix(upper, lower, row - top)
}

/** The lattice rows or columns within `radius` of `center`, clamped. */
function latticeSpan(
  center: number,
  radius: number,
  step: number,
  count: number
) {
  return {
    first: Math.max(0, Math.ceil((center - radius) / step)),
    last: Math.min(count - 1, Math.floor((center + radius) / step)),
  }
}

/**
 * Copies the land into `heights`, then lifts it under the pointer by
 * `amount`, from 0 to 1. Within TERRACE_RADIUS the land levels off toward
 * its height under the pointer, so lines that crossed there part around
 * it. On that terrace a dome `dome` high rises, so a ring or two closes
 * over the pointer. Both meet the land at their rim with no slope, so the
 * lift has no edge, and only the samples inside the rim are touched.
 */
function liftGround(
  lattice: Lattice,
  lift: Lift,
  amount: number,
  dome: number
) {
  const { cols, rows, step, base, heights } = lattice
  heights.set(base.subarray(0, cols * rows))
  if (amount === 0) {
    return
  }
  const center = baseHeightAt(lattice, lift.x, lift.y)
  const flatten = TERRACE_FLATNESS * amount
  const terraceScale = 1 / TERRACE_RADIUS ** 2
  const domeScale = 1 / DOME_RADIUS ** 2
  const across = latticeSpan(lift.x, TERRACE_RADIUS, step, cols)
  const down = latticeSpan(lift.y, TERRACE_RADIUS, step, rows)
  for (let row = down.first; row <= down.last; row++) {
    const dy = row * step - lift.y
    for (let col = across.first; col <= across.last; col++) {
      const dx = col * step - lift.x
      const reach = dx * dx + dy * dy
      const terrace = reach * terraceScale
      if (terrace < 1) {
        const sample = row * cols + col
        // Both run from 1 at the center to 0 at their rim, level at each end.
        const leveling = flatten * (1 - easeInOut(terrace))
        const swell = Math.max(0, 1 - reach * domeScale) ** 2
        heights[sample] += leveling * (center - heights[sample]) + dome * swell
      }
    }
  }
}

function addPiece(trace: Trace, level: number, from: number, to: number) {
  const { lattice } = trace
  if (lattice.pieces.count === lattice.pieces.from.length) {
    lattice.pieces = growPieces(lattice.pieces)
  }
  const { pieces } = lattice
  const piece = pieces.count
  const slot = level - trace.lowest
  pieces.from[piece] = from
  pieces.to[piece] = to
  pieces.sameLevel[piece] = trace.lastOnLevel[slot]
  trace.lastOnLevel[slot] = piece
  pieces.count += 1
}

/**
 * Walks the current cell's edges clockwise and pairs up the crossings of
 * one level in order, so a saddle cell crossed four times gets two pieces.
 * Each piece runs from the crossing where the ground drops below the level
 * to the one where it climbs back above it.
 */
function addCellPieces(trace: Trace, level: number) {
  const { corners, edges } = trace
  const elevation = level * trace.interval
  let pending = -1
  let pendingClimbs = false
  for (let side = 0; side < 4; side++) {
    const startsBelow = corners[side] < elevation
    const endsBelow = corners[(side + 1) % 4] < elevation
    if (startsBelow === endsBelow) {
      continue
    }
    if (pending < 0) {
      pending = edges[side]
      pendingClimbs = startsBelow
      continue
    }
    if (pendingClimbs) {
      addPiece(trace, level, edges[side], pending)
    } else {
      addPiece(trace, level, pending, edges[side])
    }
    pending = -1
  }
}

/** Adds the pieces of every level that crosses the current cell. */
function traceCell(trace: Trace) {
  const { corners, interval } = trace
  const low = Math.min(corners[0], corners[1], corners[2], corners[3])
  const high = Math.max(corners[0], corners[1], corners[2], corners[3])
  const top = Math.floor(high / interval)
  for (let level = Math.ceil(low / interval); level <= top; level++) {
    // Level zero is never drawn, so flat ground draws nothing.
    if (level !== 0) {
      addCellPieces(trace, level)
    }
  }
}

/** Finds the pieces of every level in one pass over the cells. */
function findPieces(trace: Trace) {
  const { cols, rows, heights } = trace.lattice
  const { corners, edges } = trace
  trace.lattice.pieces.count = 0
  for (let row = 0; row < rows - 1; row++) {
    for (let col = 0; col < cols - 1; col++) {
      const sample = row * cols + col
      corners[0] = heights[sample]
      corners[1] = heights[sample + 1]
      corners[2] = heights[sample + cols + 1]
      corners[3] = heights[sample + cols]
      edges[0] = 2 * sample
      edges[1] = 2 * (sample + 1) + 1
      edges[2] = 2 * (sample + cols)
      edges[3] = 2 * sample + 1
      traceCell(trace)
    }
  }
}

/**
 * Writes where `elevation` crosses a lattice edge into `points` at `index`,
 * by linear interpolation from the edge's top or left end.
 */
function locateCrossing(
  lattice: Lattice,
  edge: number,
  elevation: number,
  points: Float32Array,
  index: number
) {
  const { cols, step, heights } = lattice
  const sample = Math.floor(edge / 2)
  const vertical = edge % 2 === 1
  const start = heights[sample]
  const end = heights[vertical ? sample + cols : sample + 1]
  const t = (elevation - start) / (end - start)
  const col = sample % cols
  const row = Math.floor(sample / cols)
  points[2 * index] = (vertical ? col : col + t) * step
  points[2 * index + 1] = (vertical ? row + t : row) * step
}

/** Which fade-in step a line belongs to: the shorter, the fainter. */
function fadeStep(points: Float32Array, count: number) {
  let length = 0
  for (let index = 1; index < count && length < FADE_IN_LENGTH; index++) {
    length += Math.hypot(
      points[2 * index] - points[2 * index - 2],
      points[2 * index + 1] - points[2 * index - 1]
    )
  }
  const step = Math.ceil((length / FADE_IN_LENGTH) * FADE_IN_STEPS)
  return clamp(step, 1, FADE_IN_STEPS) - 1
}

function appendLine(path: Path2D, points: Float32Array, count: number) {
  const last = 2 * (count - 1)
  // A ring ends where it started. Closing it joins the ends without caps.
  const isRing =
    count > 2 && points[last] === points[0] && points[last + 1] === points[1]
  const end = isRing ? count - 1 : count
  path.moveTo(points[0], points[1])
  for (let index = 1; index < end; index++) {
    path.lineTo(points[2 * index], points[2 * index + 1])
  }
  if (isRing) {
    path.closePath()
  }
}

/** Follows one line from `head` and adds it to the path for its length. */
function drawLine(
  lattice: Lattice,
  head: number,
  elevation: number,
  paths: Path2D[]
) {
  const { from, to, next, state, points } = lattice.pieces
  locateCrossing(lattice, from[head], elevation, points, 0)
  let count = 1
  let piece = head
  while (piece >= 0 && state[piece] !== DRAWN) {
    state[piece] = DRAWN
    locateCrossing(lattice, to[piece], elevation, points, count)
    count += 1
    piece = next[piece]
  }
  appendLine(paths[fadeStep(points, count)], points, count)
}

/** Links each piece of one level to the piece that starts where it ends. */
function linkLevel(lattice: Lattice, last: number) {
  const { startsAt } = lattice
  const { from, to, sameLevel, next, state } = lattice.pieces
  for (let piece = last; piece >= 0; piece = sameLevel[piece]) {
    startsAt[from[piece]] = piece
    state[piece] = UNJOINED
  }
  for (let piece = last; piece >= 0; piece = sameLevel[piece]) {
    const following = startsAt[to[piece]]
    next[piece] = following
    if (following >= 0) {
      state[following] = CONTINUES
    }
  }
}

/**
 * Joins one level's pieces into continuous lines. Lines that run off the
 * box are drawn from their open end first; what is left forms closed rings.
 */
function joinLevel(
  lattice: Lattice,
  last: number,
  elevation: number,
  paths: Path2D[]
) {
  const { startsAt } = lattice
  const { from, sameLevel, state } = lattice.pieces
  linkLevel(lattice, last)
  for (const wanted of JOIN_ORDER) {
    for (let piece = last; piece >= 0; piece = sameLevel[piece]) {
      if (state[piece] === wanted) {
        drawLine(lattice, piece, elevation, paths)
      }
    }
  }
  for (let piece = last; piece >= 0; piece = sameLevel[piece]) {
    startsAt[from[piece]] = -1
  }
}

const createPaths = () =>
  Array.from({ length: FADE_IN_STEPS }, () => new Path2D())

/**
 * Marching squares. Each level that crosses a lattice cell leaves one or two
 * pieces of line in it, placed by linear interpolation along the cell's
 * edges. Each level's pieces are then joined into continuous lines, so the
 * strokes stay smooth where cells meet.
 */
function traceContours(
  lattice: Lattice,
  bounds: Bounds,
  interval: number
): Contours {
  // One spare level on each side covers rounding in the summed heights.
  const lowest = Math.floor(bounds.low / interval) - 1
  const highest = Math.ceil(bounds.high / interval) + 1
  const levelCount = highest - lowest + 1
  if (lattice.levelHeads.length < levelCount) {
    lattice.levelHeads = new Int32Array(2 * levelCount)
  }
  const lastOnLevel = lattice.levelHeads.subarray(0, levelCount).fill(-1)
  const trace: Trace = {
    lattice,
    interval,
    lowest,
    lastOnLevel,
    corners: [0, 0, 0, 0],
    edges: [0, 0, 0, 0],
  }
  findPieces(trace)
  // Path2D has no way to clear a path, so each frame starts fresh ones.
  const contours: Contours = { minor: createPaths(), index: createPaths() }
  for (const [slot, last] of lastOnLevel.entries()) {
    const level = lowest + slot
    const paths = level % INDEX_EVERY === 0 ? contours.index : contours.minor
    if (last >= 0) {
      joinLevel(lattice, last, level * interval, paths)
    }
  }
  return contours
}

/**
 * Strokes each weight once per fade-in step, so lines neither gap nor
 * double-darken where they join.
 */
function strokeContours(
  context: CanvasRenderingContext2D,
  contours: Contours,
  weights: LineWeights,
  opacity: number
) {
  context.lineCap = "round"
  context.lineJoin = "round"
  for (const kind of ["minor", "index"] as const) {
    context.lineWidth = LINE_WIDTH[kind]
    for (const [step, path] of contours[kind].entries()) {
      const fade = (step + 1) / FADE_IN_STEPS
      context.globalAlpha = weights[kind] * opacity * fade
      context.stroke(path)
    }
  }
}

/**
 * An animated topographic map. Fine contour lines ring a handful of hills
 * and basins, every fifth line is heavier, and the edges dissolve into the
 * page. The land rises the first time it comes into view, drifts slowly on
 * a seamless loop and lifts under a mouse or pen.
 */
export function ContourField({
  color = "currentColor",
  duration = DEFAULT_DURATION,
  levels = DEFAULT_LEVELS,
  interactive = true,
  className,
  ...props
}: ContourFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Read by the frame loop, so a prop change never restarts it or the rise.
  const settings = useRef(INITIAL_SETTINGS)
  const clock = useRef<Clock>({ age: 0, drift: 0, risen: false })
  // The `color` prop the computed color was last read for.
  const colorRead = useRef(color)
  const redraw = useRef<(() => void) | null>(null)
  const readColor = useRef<(() => void) | null>(null)
  const settleColor = useRef<(() => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!(canvas && context)) {
      return
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const darkScheme = window.matchMedia("(prefers-color-scheme: dark)")
    const listeners = new AbortController()
    const { signal } = listeners
    const probe = createProbe()
    const lift: Lift = {
      hovering: false,
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
      strength: 0,
    }
    // The last mouse or pen position in the viewport, while it is on the page.
    const pointer = { x: 0, y: 0, onPage: false }
    // The box in CSS pixels. The backing store's size lives on the canvas.
    let width = 0
    let height = 0
    let hills: Hill[] = []
    let lattice: Lattice | null = null
    // The bounds of the land in `lattice.base`, and the rise it was sampled
    // at, or null when it must be sampled again.
    let ground: Bounds | null = null
    let groundRise = 0
    let strokeColor = getComputedStyle(canvas).color
    let weights = lineWeights(probe, strokeColor)
    let visible = false
    let frame = 0
    // When the clock last moved on and the land was last sampled.
    let previous = 0
    let sampled = 0
    let settleTimer = 0

    // Draws the land, sampling it again first when `resample` asks for the
    // drift to catch up or the cached land no longer matches the rise.
    const draw = (resample = false) => {
      context.clearRect(0, 0, width, height)
      const elapsed = riseSeconds(clock.current)
      const opacity = fadeAmount(elapsed)
      if (!lattice || opacity === 0) {
        return
      }
      const { interval } = settings.current
      const rise = riseAmount(elapsed)
      if (resample || !ground || groundRise !== rise) {
        ground = sampleGround(lattice, hills, clock.current.drift, rise)
        groundRise = rise
      }
      // The lift is part of the ground, so it rises in with the land.
      const amount = easeInOut(lift.strength)
      const dome = DOME_LEVELS * interval * amount * rise
      liftGround(lattice, lift, amount, dome)
      const bounds = { low: ground.low, high: ground.high + dome }
      const contours = traceContours(lattice, bounds, interval)
      context.strokeStyle = strokeColor
      strokeContours(context, contours, weights, opacity)
    }

    // Resolves `currentColor`, `var(--x)` or any CSS color. Read on changes,
    // never per frame, and redraws only when the color really changed.
    const updateColor = () => {
      const next = getComputedStyle(canvas).color
      if (next === strokeColor) {
        return false
      }
      strokeColor = next
      weights = lineWeights(probe, next)
      draw()
      return true
    }
    // Colors often transition, so read again once they settle, and keep
    // reading while they still change.
    const onSettled = () => {
      settleTimer = 0
      if (updateColor()) {
        settle()
      }
    }
    const settle = () => {
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(onSettled, THEME_SETTLE_MS)
    }
    // After a render, read again at most once per settle delay, so renders
    // in quick succession never push the read back.
    const settleSoon = () => {
      if (!settleTimer) {
        settleTimer = window.setTimeout(onSettled, THEME_SETTLE_MS)
      }
    }
    const onThemeChange = () => {
      updateColor()
      settle()
    }

    // Finds whether a mouse or pen is over the field, and where. The box is
    // measured here, on input, and never in the frame loop.
    const trackPointer = () => {
      const enabled =
        pointer.onPage &&
        visible &&
        settings.current.interactive &&
        !reducedMotion.matches
      if (!enabled) {
        lift.hovering = false
        return
      }
      const box = canvas.getBoundingClientRect()
      const x = pointer.x - box.left
      const y = pointer.y - box.top
      const inside =
        box.width > 0 &&
        box.height > 0 &&
        x >= 0 &&
        y >= 0 &&
        x <= box.width &&
        y <= box.height
      if (!inside) {
        lift.hovering = false
        return
      }
      // The lattice is laid out in CSS pixels before any transform, so a
      // scaled ancestor still puts the lift under the pointer.
      const latticeX = x * (width / box.width)
      const latticeY = y * (height / box.height)
      // A lift that has all but settled starts again under the pointer, so
      // no faint rise sweeps across the map to meet it.
      if (!lift.hovering && lift.strength < LIFT_JUMP_BELOW) {
        lift.x = latticeX
        lift.y = latticeY
      }
      lift.targetX = latticeX
      lift.targetY = latticeY
      lift.hovering = true
    }
    const onPointerMove = (event: PointerEvent) => {
      // Phones and tablets get the rise and the drift only.
      if (event.pointerType === "touch") {
        return
      }
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.onPage = true
      trackPointer()
    }
    const onPointerLeave = () => {
      pointer.onPage = false
      lift.hovering = false
    }
    // Scrolling moves the field under a pointer that stays still.
    const onScroll = () => {
      if (pointer.onPage) {
        trackPointer()
      }
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (!settings.current.interactive) {
        lift.hovering = false
      }
      // The rise and a moving lift draw every frame. The slow drift samples
      // the land at a far lower pace; between samples a moving lift is
      // drawn over the last one.
      const rising = !clock.current.risen
      const due = rising || now - sampled >= DRIFT_FRAME_MS
      if (!(due || liftIsMoving(lift))) {
        return
      }
      const seconds = previous > 0 ? (now - previous) / 1000 : 0
      const step = Math.min(seconds, MAX_FRAME_SECONDS)
      previous = now
      if (due) {
        sampled = now
      }
      advanceClock(clock.current, step, settings.current)
      easeLift(lift, step)
      draw(due)
    }

    // The clock runs only while the field is on screen, the tab is visible,
    // the box has a size and motion is allowed. Stopped means no pending
    // frame, and it resumes from the same moment.
    const sync = () => {
      if (reducedMotion.matches) {
        // One finished frame at full elevation, with no lift.
        clock.current.risen = true
        lift.hovering = false
        lift.strength = 0
      }
      const running =
        visible &&
        !document.hidden &&
        !reducedMotion.matches &&
        lattice !== null
      if (running && !frame) {
        previous = 0
        sampled = 0
        // Catches a theme change scoped below <body> while paused.
        updateColor()
        frame = requestAnimationFrame(tick)
      } else if (!running && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    // Sizes the backing store to the box, which may be a fraction of a pixel
    // wide. `devicePixels` is the exact count of device pixels it covers,
    // where the browser reports it.
    const resize = (
      nextWidth: number,
      nextHeight: number,
      devicePixels?: ResizeObserverSize
    ) => {
      const ratio = pixelRatio(nextWidth, nextHeight)
      // The reported device pixels are exact unless the ratio was capped.
      const exact =
        devicePixels !== undefined && ratio === (window.devicePixelRatio || 1)
      const pixelWidth = exact
        ? devicePixels.inlineSize
        : Math.round(nextWidth * ratio)
      const pixelHeight = exact
        ? devicePixels.blockSize
        : Math.round(nextHeight * ratio)
      const unchanged =
        nextWidth === width &&
        nextHeight === height &&
        pixelWidth === canvas.width &&
        pixelHeight === canvas.height
      if (unchanged) {
        return
      }
      width = nextWidth
      height = nextHeight
      canvas.width = pixelWidth
      canvas.height = pixelHeight
      const hasSize = pixelWidth > 0 && pixelHeight > 0
      if (hasSize) {
        // Maps CSS pixels onto the backing store as the browser shows it,
        // so hairlines land on device pixels and stay crisp.
        context.setTransform(
          pixelWidth / width,
          0,
          0,
          pixelHeight / height,
          0,
          0
        )
      }
      lattice = hasSize ? createLattice(width, height, lattice) : null
      hills = lattice
        ? createHills(width, height, lattice.cols * lattice.rows)
        : []
      ground = null
      sync()
      // Redraw in the same callback, so the canvas never flashes blank.
      draw()
    }

    // Dragging the window to a screen with another pixel ratio changes the
    // backing store without resizing the box. Only needed where the resize
    // observer cannot report device pixels.
    const watchPixelRatio = () => {
      const query = `(resolution: ${window.devicePixelRatio}dppx)`
      const onChange = () => {
        resize(width, height)
        watchPixelRatio()
      }
      window
        .matchMedia(query)
        .addEventListener("change", onChange, { once: true, signal })
    }

    const onMotionPreference = () => {
      sync()
      draw()
    }

    // A pending frame draws the new settings anyway.
    redraw.current = () => {
      if (!frame) {
        draw()
      }
    }
    readColor.current = updateColor
    settleColor.current = settleSoon

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries.at(-1)
      if (entry) {
        const { width: boxWidth, height: boxHeight } = entry.contentRect
        resize(boxWidth, boxHeight, entry.devicePixelContentBoxSize?.at(0))
      }
    })
    const viewObserver = new IntersectionObserver((entries) => {
      visible = entries.at(-1)?.isIntersecting ?? false
      sync()
    })
    const themeObserver = new MutationObserver(onThemeChange)

    // Device pixel boxes also change with the pixel ratio. Browsers without
    // them reject the option, and get the content box and a ratio watcher.
    try {
      resizeObserver.observe(canvas, { box: "device-pixel-content-box" })
    } catch {
      resizeObserver.observe(canvas)
      watchPixelRatio()
    }
    viewObserver.observe(canvas)
    // Theme switches toggle a class, style or data attribute on <html> or
    // <body>.
    for (const element of [document.documentElement, document.body]) {
      themeObserver.observe(element, {
        attributes: true,
        attributeFilter: ["class", "style", "data-theme"],
      })
    }
    darkScheme.addEventListener("change", onThemeChange, { signal })
    reducedMotion.addEventListener("change", onMotionPreference, { signal })
    document.addEventListener("visibilitychange", sync, { signal })
    // The field never takes pointer events, so it listens on the window and
    // lifts under headlines and buttons too.
    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
      signal,
    })
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
      signal,
    })
    document.documentElement.addEventListener("pointerleave", onPointerLeave, {
      signal,
    })

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(settleTimer)
      listeners.abort()
      resizeObserver.disconnect()
      viewObserver.disconnect()
      themeObserver.disconnect()
      redraw.current = null
      readColor.current = null
      settleColor.current = null
    }
  }, [])

  // Only the line spacing changes a still frame; the drift and the lift
  // read the rest on their next frame.
  useEffect(() => {
    const next = resolveSettings(duration, levels, interactive)
    const spacingChanged = next.interval !== settings.current.interval
    settings.current = next
    if (spacingChanged) {
      redraw.current?.()
    }
  }, [duration, levels, interactive])

  // A new `color` changes the computed color, so read it at once. A class,
  // a style or a theme switched on a wrapper can change it too without
  // touching <html>, so read it again once colors settle after a render.
  useEffect(() => {
    if (colorRead.current !== color) {
      colorRead.current = color
      readColor.current?.()
    }
    settleColor.current?.()
  })

  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        // The default edge fade: a soft oval, intersected with a gentle
        // ramp to nothing along every edge. Override `--fade-oval` to clear
        // space behind your copy, or add `[mask-image:none]` to remove it.
        "[--fade-oval:radial-gradient(ellipse_75%_80%_at_50%_50%,black_50%,transparent_100%)]",
        "[--fade-ramp:transparent,rgb(0_0_0/0.15)_2.5%,rgb(0_0_0/0.5)_5%,rgb(0_0_0/0.85)_7.5%,black_10%,black_90%,rgb(0_0_0/0.85)_92.5%,rgb(0_0_0/0.5)_95%,rgb(0_0_0/0.15)_97.5%,transparent]",
        "[--fade-x:linear-gradient(to_right,var(--fade-ramp))]",
        "[--fade-y:linear-gradient(to_bottom,var(--fade-ramp))]",
        "[mask-composite:intersect]",
        "[mask-image:var(--fade-oval),var(--fade-x),var(--fade-y)]",
        className
      )}
    >
      <canvas ref={canvasRef} className="block size-full" style={{ color }} />
    </div>
  )
}
