"use client"

import {
  Children,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
} from "react"

import { cn } from "@/lib/utils"

import { passSample49 } from "./ink-reveal-pass"

void passSample49(0)
export interface InkRevealProps extends ComponentProps<"div"> {
  /**
   * Length of the reveal, in seconds.
   * @default 1.5
   */
  duration?: number
  /**
   * Seconds to wait after the frame comes into view.
   * @default 0
   */
  delay?: number
  /**
   * Color of the ink at the stain's edge.
   * @default "var(--muted-foreground)"
   */
  color?: string
  /**
   * Color of the cover. Match it to the surface behind the frame.
   * @default "var(--background)"
   */
  background?: string
}

const DEFAULT_DURATION = 1.5

/** Most buffer pixels per CSS pixel, so the edge is drawn at screen density. */
const MAX_DENSITY = 2
/** Most buffer pixels per frame, which bounds memory and work on big frames. */
const MAX_PIXELS = 1_200_000
/** Spacing of the grid that holds the stain's shapes and tear, in CSS pixels. */
const COARSE_CELL_PX = 2
/** Least spacing of that grid, in buffer pixels, so it stays coarser than them. */
const MIN_COARSE_SPACING = 2
/** Side of the square tiles that let a frame skip pixels that cannot change. */
const TILE_SIZE = 16
/** How much larger than its changed tiles an upload may grow to save a call. */
const BAND_SLACK = 1.5
/** Milliseconds of map building per animation frame, shared by every instance. */
const BUILD_BUDGET_MS = 5
/** The map starts building when the frame is about one viewport away. */
const BUILD_MARGIN = "100% 0px"
/** Milliseconds a new size must hold before the map is rebuilt for it. */
const SETTLE_MS = 150
/** Longest step of the clock, so a stalled or hidden page resumes in place. */
const MAX_STEP_MS = 100
/** Share of the frame, or of the viewport for a tall frame, in view to start. */
const ENTRY_SHARE = 0.25
const ENTRY_STEPS = 20
const ENTRY_THRESHOLDS = Array.from(
  { length: ENTRY_STEPS + 1 },
  (_, step) => step / ENTRY_STEPS
)
/** A step just past the exact entry share absorbs rounding in measurements. */
const ENTRY_SLACK = 1.05

/** Where the three stains start, as fractions of width and height. */
const BLOOMS = [
  [0.34, 0.62],
  [0.71, 0.3],
  [0.56, 0.84],
] as const

// The large shapes are measured in short sides of the frame, so the stain
// keeps its shape at any size. Frequencies are cycles per short side.
const WARP_FREQUENCY = 2.3 // pushes points before measuring: lobes and bays
const WARP_AMPLITUDE = 0.2
const LOBE_FREQUENCY = 9 // wobbles the lobes
const LOBE_AMPLITUDE = 0.05
const TEAR_FREQUENCY = 31 // tears the edge
const TEAR_AMPLITUDE = 0.02
// The fibers are measured in CSS pixels, so every frame has the same grain.
const FIBER_WAVELENGTH_PX = 3.5
const FIBER_AMPLITUDE_PX = 1.25

/** Share of the duration in which the paper is eaten. */
const REVEAL_END = 0.72
/** Share of the duration after which the ink starts to dry. */
const DRY_START = 0.45
/** Width of the tide-line behind the edge, in CSS pixels. It narrows a little. */
const RIM_START_PX = 2.5
const RIM_END_PX = 2
/**
 * Contrast of the tide-line with the paper, in steps of lightness out of 255.
 * Tuned by eye so it reads as the same faint line on light and dark paper.
 */
const LIGHT_PAPER_CONTRAST = 20
const DARK_PAPER_CONTRAST = 38
const MID_LIGHTNESS = 127.5
/** Least opacity of a fully saturated ink, so a tinted line keeps its hue. */
const HUE_OPACITY = 0.45
/** Width of the soft steps on both sides of the tide-line, in buffer pixels. */
const EDGE_PX = 1.25
const INK_STEPS = 255
const EDGE_STEPS = 32
/** Steps in the table that paces the edge by revealed area. */
const COVERAGE_LEVELS = 512

const LATTICE_SIZE = 256
const PRNG_MODULUS = 2_147_483_647
const PRNG_MULTIPLIER = 48_271

type Noise = (x: number, y: number) => number
type Rgba = [number, number, number, number]

interface BufferSize {
  width: number
  height: number
  /** Buffer pixels per CSS pixel. */
  density: number
}

interface StainMap extends BufferSize {
  /** The short side in buffer pixels. */
  short: number
  /** In short sides. */
  blooms: (readonly [number, number])[]
  noise: Noise
  /**
   * The shapes and tear, sampled every `spacing` buffer pixels. Released once
   * the pixels are built.
   */
  coarse: Float32Array
  spacing: number
  coarseWidth: number
  coarseHeight: number
  /** How far the stain travels to reach each pixel, in buffer pixels. */
  values: Float32Array
  tilesX: number
  tileRows: number
  tileLow: Float32Array
  tileHigh: Float32Array
  /** For each level between `low` and `high`, the share of pixels reached. */
  coverage: Float64Array
  /** Coarse rows first, then pixel rows, then the rows counted for coverage. */
  row: number
  low: number
  high: number
  ready: boolean
}

interface Palette {
  paper: number
  paperRgba: Rgba
  /** Ink at its peak opacity. */
  inkRgba: Rgba
  /** Ink from clear to its peak opacity. */
  ink: Uint32Array
  /** From ink to paper across the edge, repainted as the ink dries. */
  edge: Uint32Array
  edgeBytes: Uint8ClampedArray
}

interface Player {
  image: ImageData
  pixels: Uint32Array
  palette: Palette
  /** Tiles that are fully revealed and already written as clear. */
  cleared: Uint8Array
  /** Per tile row, the first and last tile the last frame changed. */
  dirtyLeft: Int32Array
  dirtyRight: Int32Array
  drawn: boolean
}

interface Frame {
  /** How far the paper's edge has travelled, in buffer pixels. */
  front: number
  /** Width of the tide-line behind the edge, in buffer pixels. */
  rim: number
  /** From 1 while wet to 0 once dry. */
  wetness: number
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1)

/** Smooth value noise in -0.5..0.5 with one cycle per unit, for x, y >= 0. */
function createNoise(seed: number): Noise {
  // Lehmer PRNG. Every integer seed maps to its own non-zero state.
  const period = PRNG_MODULUS - 1
  let state = (((seed % period) + period) % period) + 1
  const lattice = new Float32Array(LATTICE_SIZE * LATTICE_SIZE)
  for (let i = 0; i < lattice.length; i++) {
    state = (state * PRNG_MULTIPLIER) % PRNG_MODULUS
    lattice[i] = state / PRNG_MODULUS - 0.5
  }
  const at = (x: number, y: number) =>
    lattice[(y % LATTICE_SIZE) * LATTICE_SIZE + (x % LATTICE_SIZE)]

  return (x, y) => {
    const ix = Math.floor(x)
    const iy = Math.floor(y)
    const u = smooth(x - ix)
    const v = smooth(y - iy)
    const top = lerp(at(ix, iy), at(ix + 1, iy), u)
    const bottom = lerp(at(ix, iy + 1), at(ix + 1, iy + 1), u)
    return lerp(top, bottom, v)
  }
}

/** A stable number per instance, so neighboring frames get different stains. */
function seedFrom(id: string) {
  let seed = 0
  for (const char of id) {
    seed = (seed * 31 + (char.codePointAt(0) ?? 0)) % PRNG_MODULUS
  }
  return seed
}

/** `count` floats, on the previous array's memory when it is big enough. */
function floats(count: number, previous?: Float32Array) {
  const bytes = count * Float32Array.BYTES_PER_ELEMENT
  if (previous && previous.buffer.byteLength >= bytes) {
    return new Float32Array(previous.buffer, 0, count)
  }
  return new Float32Array(count)
}

/** A map to build row by row. A rebuild reuses the previous map's memory. */
function createStainMap(
  { width, height, density }: BufferSize,
  seed: number,
  previous: StainMap | null
): StainMap {
  const short = Math.min(width, height)
  // The seed also mirrors the blooms, for more variety between neighbors.
  const flipX = seed % 2 === 1
  const flipY = Math.floor(seed / 2) % 2 === 1
  const blooms = BLOOMS.map(
    ([x, y]) =>
      [
        ((flipX ? 1 - x : x) * width) / short,
        ((flipY ? 1 - y : y) * height) / short,
      ] as const
  )
  // In buffer pixels with a floor, so a low density on a very tall frame
  // never makes the grid finer than the buffer that MAX_PIXELS bounds.
  const spacing = Math.max(COARSE_CELL_PX * density, MIN_COARSE_SPACING)
  const coarseWidth = Math.ceil(width / spacing) + 1
  const coarseHeight = Math.ceil(height / spacing) + 1
  const tilesX = Math.ceil(width / TILE_SIZE)
  const tileRows = Math.ceil(height / TILE_SIZE)
  const tiles = tilesX * tileRows
  return {
    width,
    height,
    density,
    short,
    blooms,
    noise: previous?.noise ?? createNoise(seed),
    coarse: floats(coarseWidth * coarseHeight, previous?.coarse),
    spacing,
    coarseWidth,
    coarseHeight,
    values: floats(width * height, previous?.values),
    tilesX,
    tileRows,
    tileLow: floats(tiles, previous?.tileLow).fill(Number.POSITIVE_INFINITY),
    tileHigh: floats(tiles, previous?.tileHigh).fill(Number.NEGATIVE_INFINITY),
    coverage: previous?.coverage.fill(0) ?? new Float64Array(COVERAGE_LEVELS),
    row: 0,
    low: 0,
    high: 0,
    ready: false,
  }
}

/** How far the stain travels to reach a point, before fibers, in buffer pixels. */
function shapeAt({ noise, blooms, short }: StainMap, x: number, y: number) {
  const u = x / short
  const v = y / short
  // The odd offsets keep the noise layers from lining up.
  const warpX = noise(u * WARP_FREQUENCY, v * WARP_FREQUENCY)
  const warpY = noise(u * WARP_FREQUENCY + 17, v * WARP_FREQUENCY + 29)
  const pu = u + warpX * WARP_AMPLITUDE
  const pv = v + warpY * WARP_AMPLITUDE

  let nearest = Number.POSITIVE_INFINITY
  for (const [bx, by] of blooms) {
    nearest = Math.min(nearest, (pu - bx) ** 2 + (pv - by) ** 2)
  }
  const lobe = noise(u * LOBE_FREQUENCY + 41, v * LOBE_FREQUENCY + 7)
  const tear = noise(u * TEAR_FREQUENCY + 3, v * TEAR_FREQUENCY + 53)
  const reach =
    Math.sqrt(nearest) + lobe * LOBE_AMPLITUDE + tear * TEAR_AMPLITUDE
  return reach * short
}

function buildCoarseRow(stain: StainMap, row: number) {
  const { coarse, coarseWidth, spacing } = stain
  for (let column = 0; column < coarseWidth; column++) {
    coarse[row * coarseWidth + column] = shapeAt(
      stain,
      column * spacing,
      row * spacing
    )
  }
}

/** The coarse grid, smoothly interpolated, plus fibers per pixel. */
function buildPixelRow(stain: StainMap, row: number) {
  const { width, density, coarse, spacing, coarseWidth, noise, values } = stain
  const { tilesX, tileLow, tileHigh } = stain
  const gridY = (row + 0.5) / spacing
  const above = Math.floor(gridY)
  const fy = gridY - above
  const fiberLength = FIBER_WAVELENGTH_PX * density
  const fiberY = (row + 0.5) / fiberLength + 67
  const fiberScale = FIBER_AMPLITUDE_PX * density
  const tileRow = Math.floor(row / TILE_SIZE) * tilesX

  for (let x = 0; x < width; x++) {
    const gridX = (x + 0.5) / spacing
    const left = Math.floor(gridX)
    const fx = gridX - left
    const top = above * coarseWidth + left
    const bottom = top + coarseWidth
    const shape = lerp(
      lerp(coarse[top], coarse[top + 1], fx),
      lerp(coarse[bottom], coarse[bottom + 1], fx),
      fy
    )
    const fiber = noise((x + 0.5) / fiberLength, fiberY)

    const index = row * width + x
    values[index] = shape + fiber * fiberScale
    // Read back, so the bounds match the stored, rounded value exactly.
    const value = values[index]
    const tile = tileRow + Math.floor(x / TILE_SIZE)
    tileLow[tile] = Math.min(tileLow[tile], value)
    tileHigh[tile] = Math.max(tileHigh[tile], value)
  }
}

/** The range of all values, from the tiles' bounds. Frees the coarse grid. */
function measureRange(stain: StainMap) {
  const { tileLow, tileHigh } = stain
  let low = Number.POSITIVE_INFINITY
  let high = Number.NEGATIVE_INFINITY
  for (let tile = 0; tile < tileLow.length; tile++) {
    low = Math.min(low, tileLow[tile])
    high = Math.max(high, tileHigh[tile])
  }
  stain.low = low
  stain.high = high
  stain.coarse = new Float32Array(0)
}

/** Adds one row of pixels to the coverage count. */
function countRow(
  { values, width, coverage, low, high }: StainMap,
  row: number
) {
  const scale = COVERAGE_LEVELS / (high - low || 1)
  const end = (row + 1) * width
  for (let i = row * width; i < end; i++) {
    const level = Math.floor((values[i] - low) * scale)
    coverage[Math.min(level, COVERAGE_LEVELS - 1)]++
  }
}

/** Turns the count into the share of pixels reached at each level. */
function accumulateCoverage({ coverage, width, height }: StainMap) {
  const pixels = width * height
  let total = 0
  for (let level = 0; level < COVERAGE_LEVELS; level++) {
    total += coverage[level]
    coverage[level] = total / pixels
  }
}

/**
 * Builds rows until the deadline: the coarse grid, then the pixels, then the
 * coverage count. The map is ready after the last row.
 */
function buildRows(stain: StainMap, deadline: number) {
  const pixelsFrom = stain.coarseHeight
  const countFrom = pixelsFrom + stain.height
  const rows = countFrom + stain.height
  while (stain.row < rows && performance.now() < deadline) {
    const { row } = stain
    if (row < pixelsFrom) {
      buildCoarseRow(stain, row)
    } else if (row < countFrom) {
      buildPixelRow(stain, row - pixelsFrom)
    } else {
      countRow(stain, row - countFrom)
    }
    stain.row++
    if (stain.row === countFrom) {
      measureRange(stain)
    }
  }
  if (stain.row === rows) {
    accumulateCoverage(stain)
    stain.ready = true
  }
}

/** The edge position that reveals the given share of the frame. */
function frontFor({ coverage, low, high }: StainMap, share: number) {
  if (share <= 0) {
    // Short of the nearest pixel, so the first frame is plain paper.
    return low - EDGE_PX
  }
  let level = 0
  while (level < COVERAGE_LEVELS - 1 && coverage[level] < share) {
    level++
  }
  const below = level > 0 ? coverage[level - 1] : 0
  const step = coverage[level] - below
  const within = step > 0 ? (share - below) / step : 1
  return lerp(low, high, (level + within) / COVERAGE_LEVELS)
}

/** Where the edge and its ink are at a progress from 0 to 1. */
function frameAt(stain: StainMap, progress: number): Frame {
  // The reach eases out and the area it covers grows faster than it, so the
  // stain opens quickly and closes its last corners quietly and on time.
  const reveal = Math.min(progress / REVEAL_END, 1)
  const reach = 1 - (1 - reveal) ** 2
  const rim = lerp(RIM_START_PX, RIM_END_PX, reveal) * stain.density
  // After the last corner the edge keeps going, so its ink leaves the frame
  // instead of lingering in it.
  const overrun = clamp01((progress - REVEAL_END) / (1 - REVEAL_END))
  return {
    front:
      reveal < 1
        ? frontFor(stain, reach ** 1.5)
        : stain.high + EDGE_PX + overrun * rim,
    rim,
    wetness: 1 - smooth(clamp01((progress - DRY_START) / (1 - DRY_START))),
  }
}

/** Paper ahead of the edge, a thin tide-line behind it, then the children. */
function shadeTile(
  stain: StainMap,
  { pixels, palette }: Player,
  column: number,
  tileRow: number,
  { front, rim, wetness }: Frame
) {
  const { width, height, values } = stain
  const left = column * TILE_SIZE
  const top = tileRow * TILE_SIZE
  const right = Math.min(left + TILE_SIZE, width)
  const bottom = Math.min(top + TILE_SIZE, height)
  const half = EDGE_PX / 2
  const inkScale = wetness * INK_STEPS

  for (let y = top; y < bottom; y++) {
    const end = y * width + right
    for (let i = y * width + left; i < end; i++) {
      const ahead = values[i] - front
      if (ahead >= half) {
        pixels[i] = palette.paper
      } else if (ahead > -half) {
        const t = (ahead + half) / EDGE_PX
        pixels[i] = palette.edge[Math.round(t * EDGE_STEPS)]
      } else {
        // Even across the tide-line, with a soft step to clear on its inside.
        const strength = clamp01((ahead + half + rim) / EDGE_PX)
        pixels[i] = palette.ink[Math.round(strength * inkScale)]
      }
    }
  }
}

function clearTile(
  stain: StainMap,
  { pixels }: Player,
  column: number,
  tileRow: number
) {
  const { width, height } = stain
  const left = column * TILE_SIZE
  const top = tileRow * TILE_SIZE
  const right = Math.min(left + TILE_SIZE, width)
  const bottom = Math.min(top + TILE_SIZE, height)
  for (let y = top; y < bottom; y++) {
    pixels.fill(0, y * width + left, y * width + right)
  }
}

/** Shades only the tiles the edge or its ink touch, and notes each row's span. */
function shade(stain: StainMap, player: Player, frame: Frame) {
  const { tilesX, tileRows, tileLow, tileHigh } = stain
  const { cleared, dirtyLeft, dirtyRight } = player
  const paperFrom = frame.front + EDGE_PX / 2
  const clearTo = frame.front - EDGE_PX / 2 - frame.rim
  paintEdge(player.palette, frame.wetness)

  for (let tileRow = 0; tileRow < tileRows; tileRow++) {
    let first = tilesX
    let last = -1
    for (let column = 0; column < tilesX; column++) {
      const tile = tileRow * tilesX + column
      // Tiles still all paper are already drawn, and cleared ones stay clear.
      if (cleared[tile] === 0 && tileLow[tile] < paperFrom) {
        if (tileHigh[tile] <= clearTo) {
          clearTile(stain, player, column, tileRow)
          cleared[tile] = 1
        } else {
          shadeTile(stain, player, column, tileRow, frame)
        }
        first = Math.min(first, column)
        last = column
      }
    }
    dirtyLeft[tileRow] = first
    dirtyRight[tileRow] = last
  }
}

/**
 * Uploads what the last frame changed in bands of tile rows, each from its
 * first to its last changed tile, so stains spreading apart never upload the
 * paper between them.
 */
function putDirty(
  context: CanvasRenderingContext2D,
  { image, dirtyLeft, dirtyRight }: Player
) {
  const rows = dirtyLeft.length
  let row = 0
  while (row < rows) {
    let first = dirtyLeft[row]
    let last = dirtyRight[row]
    let changed = last - first + 1
    let end = row + 1
    // Neighboring rows join the band, saving a call, while it stays close to
    // the tiles that changed.
    while (end < rows && last >= first && dirtyRight[end] >= dirtyLeft[end]) {
      const joinedFirst = Math.min(first, dirtyLeft[end])
      const joinedLast = Math.max(last, dirtyRight[end])
      const joinedChanged = changed + dirtyRight[end] - dirtyLeft[end] + 1
      const joinedArea = (joinedLast - joinedFirst + 1) * (end + 1 - row)
      if (joinedArea > joinedChanged * BAND_SLACK) {
        break
      }
      first = joinedFirst
      last = joinedLast
      changed = joinedChanged
      end++
    }
    if (last >= first) {
      const x = first * TILE_SIZE
      const y = row * TILE_SIZE
      const width = (last + 1) * TILE_SIZE - x
      const height = end * TILE_SIZE - y
      context.putImageData(image, 0, 0, x, y, width, height)
    }
    row = end
  }
}

/** Packs colors as pixels. Writing bytes keeps RGBA order on any platform. */
function packRamp(bytes: Uint8ClampedArray, colorAt: (t: number) => Rgba) {
  const steps = bytes.length / 4 - 1
  for (let step = 0; step <= steps; step++) {
    bytes.set(colorAt(step / steps), step * 4)
  }
}

/** Ink under paper, mixed with premultiplied alpha so the edge never darkens. */
function paintEdge(palette: Palette, wetness: number) {
  const [inkRed, inkGreen, inkBlue, inkAlpha] = palette.inkRgba
  const [paperRed, paperGreen, paperBlue, paperAlpha] = palette.paperRgba
  const under = (inkAlpha / 255) * wetness
  packRamp(palette.edgeBytes, (t) => {
    const cover = (paperAlpha / 255) * smooth(t)
    const alpha = cover + under * (1 - cover)
    const mix = (inkByte: number, paperByte: number) =>
      alpha > 0
        ? (paperByte * cover + inkByte * under * (1 - cover)) / alpha
        : 0
    return [
      mix(inkRed, paperRed),
      mix(inkGreen, paperGreen),
      mix(inkBlue, paperBlue),
      alpha * 255,
    ]
  })
}

const lightness = ([red, green, blue]: Rgba) =>
  0.2126 * red + 0.7152 * green + 0.0722 * blue

/**
 * The tide-line's opacity. Light or dark paper sets the contrast it aims for,
 * so the line looks the same in both themes whatever the ink.
 */
function rimOpacity(ink: Rgba, paper: Rgba) {
  const paperLightness = lightness(paper)
  const contrast =
    paperLightness < MID_LIGHTNESS ? DARK_PAPER_CONTRAST : LIGHT_PAPER_CONTRAST
  const distance = Math.max(Math.abs(lightness(ink) - paperLightness), 1)
  const [red, green, blue] = ink
  const saturation =
    (Math.max(red, green, blue) - Math.min(red, green, blue)) / 255
  return Math.min(Math.max(contrast / distance, saturation * HUE_OPACITY), 1)
}

function createPalette(color: Rgba, paperRgba: Rgba): Palette {
  const [red, green, blue, alpha] = color
  const inkRgba: Rgba = [red, green, blue, alpha * rimOpacity(color, paperRgba)]

  const paperBytes = new Uint8ClampedArray(paperRgba)
  const inkBytes = new Uint8ClampedArray((INK_STEPS + 1) * 4)
  packRamp(inkBytes, (t) => [red, green, blue, inkRgba[3] * t])
  const edgeBytes = new Uint8ClampedArray((EDGE_STEPS + 1) * 4)
  return {
    paper: new Uint32Array(paperBytes.buffer)[0],
    paperRgba,
    inkRgba,
    ink: new Uint32Array(inkBytes.buffer),
    edge: new Uint32Array(edgeBytes.buffer),
    edgeBytes,
  }
}

/**
 * Reads the canvas's computed ink and paper colors as bytes by painting them
 * on a 1×1 canvas, so variables and any color syntax work.
 */
function resolvePalette(canvas: HTMLCanvasElement): Palette | null {
  const { color, backgroundColor } = getComputedStyle(canvas)
  const sample = document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true })
  if (!sample) {
    return null
  }
  sample.canvas.width = 1
  sample.canvas.height = 1

  const readBytes = (fill: string): Rgba => {
    sample.clearRect(0, 0, 1, 1)
    sample.fillStyle = fill
    sample.fillRect(0, 0, 1, 1)
    const [red, green, blue, alpha] = sample.getImageData(0, 0, 1, 1).data
    return [red, green, blue, alpha]
  }
  return createPalette(readBytes(color), readBytes(backgroundColor))
}

// Every instance shares one build budget per animation frame, so a page with
// many reveals still builds without long frames.
let budgetFrame = -1
let budgetDeadline = 0

function buildDeadline(frameTime: number) {
  if (frameTime !== budgetFrame) {
    budgetFrame = frameTime
    budgetDeadline = performance.now() + BUILD_BUDGET_MS
  }
  return budgetDeadline
}

function bufferSize(cssWidth: number, cssHeight: number): BufferSize {
  const screenDensity = Math.min(window.devicePixelRatio || 1, MAX_DENSITY)
  const fits = Math.sqrt(MAX_PIXELS / (cssWidth * cssHeight))
  const density = Math.min(screenDensity, fits)
  return {
    width: Math.max(1, Math.round(cssWidth * density)),
    height: Math.max(1, Math.round(cssHeight * density)),
    density,
  }
}

/**
 * The steps at which entry is checked. A frame many viewports tall never
 * shows a large share of itself, so the exact share it needs is a step too.
 */
function entryThresholds(cssWidth: number, cssHeight: number) {
  const needed =
    Math.min(cssWidth, window.innerWidth) *
    Math.min(cssHeight, window.innerHeight) *
    ENTRY_SHARE
  const exact = Math.min(needed / (cssWidth * cssHeight), 1)
  return [...ENTRY_THRESHOLDS, exact, Math.min(exact * ENTRY_SLACK, 1)]
}

/** Whether a quarter of the frame, or of the viewport for a tall frame, shows. */
function isInView({
  isIntersecting,
  intersectionRect,
  boundingClientRect,
  rootBounds,
}: IntersectionObserverEntry) {
  if (!isIntersecting) {
    return false
  }
  // A cross-origin frame reports no root, so the window stands in for it.
  const rootWidth = rootBounds?.width ?? window.innerWidth
  const rootHeight = rootBounds?.height ?? window.innerHeight
  const width = Math.min(boundingClientRect.width, rootWidth)
  const height = Math.min(boundingClientRect.height, rootHeight)
  const visible = intersectionRect.width * intersectionRect.height
  return visible > 0 && visible >= width * height * ENTRY_SHARE
}

function toMilliseconds(seconds: number, fallback: number) {
  return (Number.isFinite(seconds) ? Math.max(0, seconds) : fallback) * 1000
}

export function InkReveal({
  children,
  className,
  style,
  duration = DEFAULT_DURATION,
  delay = 0,
  color = "var(--muted-foreground)",
  background = "var(--background)",
  ...props
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const id = useId()
  const [done, setDone] = useState(false)
  const hasChildren = Children.toArray(children).length > 0

  // Read once, when the frame enters, so a new value never disturbs a reveal.
  const timingRef = useRef({ duration, delay })
  useEffect(() => {
    timingRef.current = { duration, delay }
  }, [duration, delay])

  useEffect(() => {
    const canvas = canvasRef.current
    if (done || !hasChildren || !canvas) {
      return
    }
    const context = canvas.getContext("2d")
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)")
    if (!context || reducedMotion.matches) {
      setDone(true)
      return
    }

    const seed = seedFrom(id)
    /** The last size that held, which the map is built for. */
    let size: BufferSize | null = null
    let stain: StainMap | null = null
    let player: Player | null = null
    let entry: IntersectionObserver | null = null
    let near = false
    let entered = false
    let playing = false
    let durationMs = 0
    let elapsed = 0
    let previousTime = -1
    let frame = 0
    let delayTimer = 0
    let settleTimer = 0

    const schedule = () => {
      if (!frame && stain && (playing || !stain.ready)) {
        frame = requestAnimationFrame(tick)
      }
    }

    /** Builds the map for the size that held, once the frame is near. */
    const build = () => {
      if (near && size) {
        stain = createStainMap(size, seed, stain)
        schedule()
      }
    }

    const approach = () => {
      if (!near) {
        near = true
        nearby.disconnect()
        build()
      }
    }

    const start = (map: StainMap): Player | null => {
      // Resolved at the start of play, so a theme change before it counts.
      const palette = resolvePalette(canvas)
      if (!palette) {
        return null
      }
      const image = context.createImageData(map.width, map.height)
      const pixels = new Uint32Array(image.data.buffer)
      pixels.fill(palette.paper)
      // Resizing clears the canvas, and its CSS paper covers the frame until
      // the first frame is drawn.
      canvas.width = map.width
      canvas.height = map.height
      return {
        image,
        pixels,
        palette,
        cleared: new Uint8Array(map.tilesX * map.tileRows),
        dirtyLeft: new Int32Array(map.tileRows),
        dirtyRight: new Int32Array(map.tileRows),
        drawn: false,
      }
    }

    // Set up as play becomes possible, so the first frame of play only draws.
    const prepare = (map: StainMap) => {
      player = start(map)
      if (player) {
        schedule()
      } else {
        setDone(true)
      }
    }

    const draw = (map: StainMap, active: Player, progress: number) => {
      shade(map, active, frameAt(map, progress))
      if (active.drawn) {
        putDirty(context, active)
        return
      }
      context.putImageData(active.image, 0, 0)
      // The CSS paper covered the frame until now.
      canvas.style.background = "transparent"
      active.drawn = true
    }

    const tick = (time: number) => {
      frame = 0
      if (!stain) {
        return
      }
      if (!stain.ready) {
        buildRows(stain, buildDeadline(time))
        schedule()
        return
      }
      if (!playing) {
        return
      }
      if (!player) {
        prepare(stain)
        return
      }

      // Frame by frame, clamped, so a slow device stretches the reveal a
      // little and a hidden tab resumes where it was.
      elapsed +=
        previousTime < 0 ? 0 : Math.min(time - previousTime, MAX_STEP_MS)
      previousTime = time
      const progress = durationMs > 0 ? Math.min(elapsed / durationMs, 1) : 1
      draw(stain, player, progress)
      if (progress < 1) {
        schedule()
      } else {
        setDone(true)
      }
    }

    const begin = () => {
      playing = true
      // From here a resize only stretches the buffer for the time left,
      // which is invisible, so the map is no longer rebuilt.
      window.clearTimeout(settleTimer)
      if (stain?.ready) {
        prepare(stain)
      } else {
        schedule()
      }
    }

    const onEntry = (entries: IntersectionObserverEntry[]) => {
      const last = entries.at(-1)
      if (!(last && isInView(last))) {
        return
      }
      entry?.disconnect()
      entered = true
      approach()
      const timing = timingRef.current
      durationMs = toMilliseconds(timing.duration, DEFAULT_DURATION)
      delayTimer = window.setTimeout(begin, toMilliseconds(timing.delay, 0))
    }

    const settle = (next: BufferSize, cssWidth: number, cssHeight: number) => {
      size = next
      // Watched from the first real size, so entry is measured on a real box,
      // and again on each new size, whose exact entry share differs.
      if (!entered) {
        entry?.disconnect()
        entry = new IntersectionObserver(onEntry, {
          threshold: entryThresholds(cssWidth, cssHeight),
        })
        entry.observe(canvas)
      }
      build()
    }

    // Built from about a viewport away, so it is normally ready on arrival.
    const nearby = new IntersectionObserver(
      (entries) => {
        if (entries.some(({ isIntersecting }) => isIntersecting)) {
          approach()
        }
      },
      { rootMargin: BUILD_MARGIN }
    )
    nearby.observe(canvas)

    const resize = new ResizeObserver(([{ contentRect }]) => {
      const { width, height } = contentRect
      // A frame without size yet (an image still loading, a closed panel)
      // hides nothing, so wait for one instead of finishing.
      if (!(width && height) || playing) {
        return
      }
      const next = bufferSize(width, height)
      window.clearTimeout(settleTimer)
      if (!size) {
        settle(next, width, height)
        return
      }
      if (next.width === size.width && next.height === size.height) {
        return
      }
      // A size that is still changing, as while a page loads or a window is
      // dragged, is built for only once it has held.
      settleTimer = window.setTimeout(
        () => settle(next, width, height),
        SETTLE_MS
      )
    })
    resize.observe(canvas)

    // Reduced motion turned on mid-reveal stops it and shows the children.
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        cancelAnimationFrame(frame)
        frame = 0
        playing = false
        window.clearTimeout(delayTimer)
        window.clearTimeout(settleTimer)
        setDone(true)
      }
    }
    reducedMotion.addEventListener("change", onMotionChange)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(delayTimer)
      window.clearTimeout(settleTimer)
      nearby.disconnect()
      entry?.disconnect()
      resize.disconnect()
      reducedMotion.removeEventListener("change", onMotionChange)
    }
  }, [done, hasChildren, id])

  return (
    <div
      {...props}
      className={cn("relative isolate overflow-hidden", className)}
      style={
        {
          "--ink-color": color,
          "--ink-background": background,
          ...style,
        } as CSSProperties
      }
    >
      {!done && hasChildren && (
        // Its CSS background is the paper until the first frame is drawn.
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-[2147483647] size-full",
            "rounded-[inherit] bg-(--ink-background) text-(--ink-color)",
            "motion-reduce:hidden print:hidden noscript:hidden"
          )}
        />
      )}
      {children}
    </div>
  )
}
