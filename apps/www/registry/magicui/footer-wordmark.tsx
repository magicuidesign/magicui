"use client"

import { useLayoutEffect, useRef } from "react"
import type { ComponentProps, CSSProperties } from "react"

import { cn } from "@/lib/utils"

import { passSample47 } from "./footer-wordmark-pass"

void passSample47(0)
/** Font size, in px, at which the word is measured; large keeps em precise. */
const RULER_SIZE = 1_000
/** Font size, in px, at which an edge letter is drawn to find its ink. */
const SCAN_SIZE = 200
/** Alpha below which a scanned pixel counts as empty, so faint noise isn't ink. */
const INK_FLOOR = 16
/** Px at RULER_SIZE within which an ink edge on the advance may be clamped. */
const CLAMP_TOLERANCE = 0.5
/** Measurements kept for reuse across mounts; the cache restarts past this. */
const CACHE_LIMIT = 32
/** Most seconds between the first rank starting and the last one. */
const STAGGER = 0.2
/** Most seconds between neighboring ranks, so short words still cascade. */
const MAX_STEP = 0.06
/** Share of the word that must be on screen before it rises. */
const VIEW_THRESHOLD = 0.2
/** Width of the word before it is measured, in em per character. */
const ESTIMATED_ADVANCE = 0.58
/** Height of the word before it is measured, in em. */
const ESTIMATED_HEIGHT = 0.72
/** Whitespace inside the name, which never breaks the line. */
const SPACES = /\s/g
/** What every space becomes, so it keeps its width and never wraps. */
const NO_BREAK_SPACE = "\u00a0"
/** Quotes around a font family name. */
const QUOTES = /^["']|["']$/g

const letterClassName = cn(
  "relative inline-block align-top",
  // Line the ink's top up with the box's top, then hide it under the floor.
  "top-[calc(var(--wordmark-lift,0)*1em)]",
  "translate-y-[calc((var(--wordmark-height)+0.04)*1em)]",
  "group-data-[state=visible]/wordmark:translate-y-0",
  // Nothing transitions until the word rises, and then only the rise.
  // Measuring, late fonts and reduced motion change the letters at once.
  "transition-none duration-(--duration) ease-[cubic-bezier(0.2,0.9,0.18,1)]",
  "delay-[calc(var(--delay)+var(--rank)*var(--step))]",
  "motion-safe:group-data-[state=visible]/wordmark:transition-transform"
)

export interface FooterWordmarkProps extends ComponentProps<"div"> {
  /** The name to set. */
  children: string
  /**
   * Seconds one letter takes to rise.
   * @default 0.9
   */
  duration?: number
  /**
   * Seconds to wait after the trigger before the first letter moves.
   * @default 0
   */
  delay?: number
  /**
   * Share of the ink height, from 0 to 0.5, cut off the bottom of the letters.
   * @default 0
   */
  crop?: number
  /**
   * Wait until a fifth of the word is in view. When false, rise on mount.
   * @default true
   */
  startOnView?: boolean
}

/** What the fit is measured from, read from the root. */
interface WordmarkFont {
  /** The canvas font at RULER_SIZE. */
  ruler: string
  /** The canvas font at SCAN_SIZE. */
  scan: string
  /** The page's tracking, in em. */
  tracking: number
  /** Changes whenever the text, its font or the loaded fonts change. */
  key: string
}

/** The fit of one word, in em. */
interface Measurement {
  /** Each letter's margin-inline-start. */
  margins: number[]
  /** Each letter's box width. */
  widths: number[]
  /** The ink width of the word, which sets its font size. */
  fit: number
  /** The ink height of the word. */
  height: number
  /** How far the ink's top sits below the top of a letter's box. */
  lift: number
  /** False when the word wasn't rendered and only canvas measured it. */
  laidOut: boolean
}

/** Kept measurements, keyed by text, font and loaded fonts. */
const measurements = new Map<string, Measurement>()
/** The key of the laid-out measurement each word currently shows. */
const shownKeys = new WeakMap<HTMLElement, string>()
/** Observers waiting for a word measured while hidden to show. */
const hiddenWords = new WeakMap<HTMLElement, IntersectionObserver>()
let rulerContext: CanvasRenderingContext2D | null | undefined

/** One canvas shared by every measure. It is never added to the page. */
function getRulerContext() {
  if (rulerContext === undefined) {
    rulerContext = document
      .createElement("canvas")
      .getContext("2d", { willReadFrequently: true })
  }
  return rulerContext
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0)
}

/** The family names in a font-family list, unquoted and in lowercase. */
function toFamilyNames(fontFamily: string) {
  return new Set(
    fontFamily
      .split(",")
      .map((family) => family.trim().replace(QUOTES, "").toLowerCase())
  )
}

/**
 * How many of the word's own font faces have loaded. It grows when one of
 * them arrives, and fonts loading elsewhere on the page don't change it.
 */
function countLoadedFaces(fontFamily: string) {
  const families = toFamilyNames(fontFamily)
  let count = 0
  for (const face of document.fonts ?? []) {
    const family = face.family.replace(QUOTES, "").toLowerCase()
    if (face.status === "loaded" && families.has(family)) {
      count += 1
    }
  }
  return count
}

/** Reads the font the word is set in. Reads style only, never layout. */
function readFont(root: HTMLElement): WordmarkFont {
  const style = getComputedStyle(root)
  const toCanvasFont = (size: number) =>
    `${style.fontStyle} ${style.fontWeight} ${size}px ${style.fontFamily}`
  const tracking =
    (Number.parseFloat(style.letterSpacing) || 0) /
    Number.parseFloat(style.fontSize)
  return {
    ruler: toCanvasFont(RULER_SIZE),
    scan: toCanvasFont(SCAN_SIZE),
    tracking,
    // The same font name measures differently before and after it loads.
    key: [
      root.textContent,
      toCanvasFont(RULER_SIZE),
      tracking,
      style.textTransform,
      countLoadedFaces(style.fontFamily),
    ].join("|"),
  }
}

/** Each letter, then each neighboring pair, which carries the kerning. */
function withPairs(letters: string[]) {
  const pairs = letters
    .slice(1)
    .map((letter, index) => `${letters[index]}${letter}`)
  return [...letters, ...pairs]
}

/**
 * A hidden line of text pieces at RULER_SIZE. Laid out inside the word, the
 * pieces inherit everything the letters are drawn with, so kerning,
 * ligatures, case and spacing match exactly, which canvas can't promise.
 */
function createRuler(pieces: string[]) {
  const ruler = document.createElement("span")
  ruler.style.position = "absolute"
  ruler.style.visibility = "hidden"
  ruler.style.whiteSpace = "pre"
  ruler.style.fontSize = `${RULER_SIZE}px`
  for (const piece of pieces) {
    const span = document.createElement("span")
    // An inline-block is its own run, so it isn't kerned to its neighbor.
    span.style.display = "inline-block"
    span.textContent = piece
    ruler.append(span)
  }
  return ruler
}

/**
 * Reads each piece's laid-out width in em. The computed width ignores
 * transforms above the word, and is "auto" when the word isn't rendered,
 * which returns undefined.
 */
function readWidths(ruler: HTMLElement) {
  const widths = Array.from(
    ruler.children,
    (span) => Number.parseFloat(getComputedStyle(span).width) / RULER_SIZE
  )
  return widths.every((width) => Number.isFinite(width)) ? widths : undefined
}

/**
 * Draws a glyph whose ink sits inside its advance and reads its pixels, to
 * find where the ink starts or ends, in em from the glyph's origin. Returns
 * undefined when there is no ink or the pixels can't be trusted.
 */
function scanInkEdge(
  context: CanvasRenderingContext2D,
  text: string,
  font: string,
  side: "start" | "end"
) {
  context.font = font
  const glyph = context.measureText(text)
  const { canvas } = context
  // The advance and the ink height, plus a pixel of room on every side.
  canvas.width = Math.ceil(glyph.width) + 2
  canvas.height =
    Math.ceil(glyph.actualBoundingBoxAscent + glyph.actualBoundingBoxDescent) +
    2
  // Resizing the canvas clears it and resets its context, so set the font again.
  context.font = font
  context.fillText(text, 1, 1 + glyph.actualBoundingBoxAscent)

  const { data, width, height } = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  )
  /** The darkest alpha in a column of pixels, from 0 to 1. */
  const columnInk = (x: number) => {
    let ink = 0
    for (let y = 0; y < height; y++) {
      ink = Math.max(ink, data[(y * width + x) * 4 + 3])
    }
    return ink / 255
  }

  const step = side === "start" ? 1 : -1
  let column = side === "start" ? 0 : width - 1
  while (column >= 0 && column < width && columnInk(column) < INK_FLOOR / 255) {
    column += step
  }
  // No ink at all, or ink on the canvas border: the readback was noise.
  if (column <= 0 || column >= width - 1) {
    return
  }
  // Antialiasing makes the edge column as opaque as the share of it the ink
  // covers, which places the edge within a fraction of a pixel.
  const coverage = columnInk(column)
  const edge = side === "start" ? column + 1 - coverage : column + coverage
  return (edge - 1) / SCAN_SIZE
}

/**
 * Finds where a glyph's ink starts or ends, in em from its origin. Canvas
 * metrics report this exactly, except that WebKit reports the advance edge
 * whenever the ink sits inside the advance. Only that case is drawn and
 * scanned, so most browsers never read a pixel.
 */
function findInkEdge(
  context: CanvasRenderingContext2D,
  glyph: TextMetrics,
  text: string,
  font: WordmarkFont,
  side: "start" | "end"
) {
  const edge =
    side === "start"
      ? -glyph.actualBoundingBoxLeft
      : glyph.actualBoundingBoxRight
  const advanceEdge = side === "start" ? 0 : glyph.width
  if (Math.abs(edge - advanceEdge) > CLAMP_TOLERANCE) {
    return edge / RULER_SIZE
  }
  return scanInkEdge(context, text, font.scan, side)
}

/**
 * Measures the word in its font. It writes the ruler first, then reads the
 * ruler's widths and the letters from one layout, then works on canvas.
 */
function measureWordmark(
  word: HTMLElement,
  font: WordmarkFont
): Measurement | undefined {
  const context = getRulerContext()
  const spans = Array.from(word.children) as HTMLElement[]
  if (!context || spans.length === 0) {
    return
  }

  const ruler = createRuler(
    withPairs(spans.map((span) => span.textContent ?? ""))
  )
  word.append(ruler)
  const laidOut = readWidths(ruler)
  // innerText applies text-transform, so `uppercase` is measured as drawn.
  const texts = spans.map((span) => span.innerText || span.textContent || "")
  ruler.remove()

  context.font = font.ruler
  context.fontKerning = "normal"
  const toEm = (px: number) => px / RULER_SIZE
  const glyphs = texts.map((text) => context.measureText(text))
  // A word that isn't rendered, inside display: none, has no layout to read.
  const advances =
    laidOut ??
    withPairs(texts).map((piece) => toEm(context.measureText(piece).width))
  const lastIndex = texts.length - 1
  const widths = advances.slice(0, texts.length)
  const pairWidths = advances.slice(texts.length)
  // The space before each letter: the pair's kerning plus the tracking.
  const gaps = widths.map((width, index) => {
    if (index === 0) {
      return 0
    }
    return pairWidths[index - 1] - widths[index - 1] - width + font.tracking
  })
  const ascent = Math.max(
    0,
    ...glyphs.map((glyph) => toEm(glyph.actualBoundingBoxAscent))
  )
  const descent = Math.max(
    0,
    ...glyphs.map((glyph) => toEm(glyph.actualBoundingBoxDescent))
  )
  // Where the baseline sits in a box with line-height 1, measured from its top.
  const { fontBoundingBoxAscent, fontBoundingBoxDescent } = glyphs[0]
  const baseline =
    (1 + toEm(fontBoundingBoxAscent - fontBoundingBoxDescent)) / 2
  // A letter without measurable ink counts as ink from edge to edge.
  const inkStart = findInkEdge(context, glyphs[0], texts[0], font, "start") ?? 0
  const inkEnd =
    findInkEdge(context, glyphs[lastIndex], texts[lastIndex], font, "end") ??
    widths[lastIndex]

  return {
    // Pull the first letter out to its ink and end the last letter's box at
    // its ink, so the letters span the ink of the word and nothing more.
    margins: gaps.map((gap, index) => (index === 0 ? -inkStart : gap)),
    widths: widths.map((width, index) =>
      index === lastIndex ? inkEnd : width
    ),
    // From the first letter's ink to the last letter's ink.
    fit: Math.max(
      sum(widths.slice(0, lastIndex)) + sum(gaps) + inkEnd - inkStart,
      0.001
    ),
    height: ascent + descent,
    lift: ascent - baseline,
    laidOut: laidOut !== undefined,
  }
}

/** Writes a measurement to the letters and the word, without reading. */
function applyMeasurement(word: HTMLElement, measurement: Measurement) {
  const spans = Array.from(word.children) as HTMLElement[]
  for (const [index, span] of spans.entries()) {
    span.style.marginInlineStart = `${measurement.margins[index]}em`
    span.style.width = `${measurement.widths[index]}em`
  }
  word.style.setProperty("--wordmark-fit", String(measurement.fit))
  word.style.setProperty("--wordmark-height", String(measurement.height))
  word.style.setProperty("--wordmark-lift", String(measurement.lift))
}

/**
 * Measures the word again the first time it shows on screen. A word measured
 * while hidden, inside display: none, only has the canvas fallback, which
 * sees neither the page's layout nor its text-transform.
 */
function measureWhenShown(word: HTMLElement) {
  if (hiddenWords.has(word) || typeof IntersectionObserver === "undefined") {
    return
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      updateWordmark(word)
    }
  })
  observer.observe(word)
  hiddenWords.set(word, observer)
}

/** Stops waiting for the word to show, once it is measured or unmounted. */
function stopWaiting(word: HTMLElement) {
  hiddenWords.get(word)?.disconnect()
  hiddenWords.delete(word)
}

/**
 * Brings the word's fit up to date. Nothing happens while its text and font
 * are unchanged, an earlier measurement of the same text and font is reused,
 * and only otherwise is the word measured.
 */
function updateWordmark(word: HTMLElement) {
  const root = word.parentElement
  if (!root) {
    return
  }
  const font = readFont(root)
  if (shownKeys.get(word) === font.key) {
    return
  }
  const measurement = measurements.get(font.key) ?? measureWordmark(word, font)
  // From here the word shows something new, so its old key no longer holds.
  shownKeys.delete(word)
  if (!measurement) {
    stopWaiting(word)
    return
  }
  applyMeasurement(word, measurement)
  // A canvas-only measurement is shown but not kept, and the word is
  // measured again from its layout once it shows.
  if (!measurement.laidOut) {
    measureWhenShown(word)
    return
  }
  stopWaiting(word)
  if (measurements.size >= CACHE_LIMIT) {
    measurements.clear()
  }
  measurements.set(font.key, measurement)
  shownKeys.set(word, font.key)
}

export function FooterWordmark({
  children,
  duration = 0.9,
  delay = 0,
  crop = 0,
  startOnView = true,
  className,
  ...props
}: FooterWordmarkProps) {
  const wordRef = useRef<HTMLSpanElement>(null)
  // Composed accents stay one letter, and edge spaces have no ink and would
  // hold the word off the edges.
  const letters = Array.from(
    children.normalize("NFC").trim().replace(SPACES, NO_BREAK_SPACE)
  )
  const hasLetters = letters.length > 0
  const lastRank = Math.floor((letters.length - 1) / 2)
  const step = Math.min(MAX_STEP, STAGGER / Math.max(1, lastRank))
  const occurrences = new Map<string, number>()

  // Keep the fit current on every render, since a changed prop, class or
  // style can change the text or its font, and none of those can be listed
  // as dependencies. An unchanged render costs one style read and a key
  // comparison; only a new text or font measures.
  useLayoutEffect(() => {
    if (wordRef.current) {
      updateWordmark(wordRef.current)
    }
  })

  useLayoutEffect(() => {
    const word = wordRef.current
    if (!word) {
      return
    }
    // A web font that finishes loading changes the metrics, not the name.
    const update = () => updateWordmark(word)
    const fonts = document.fonts
    fonts?.addEventListener("loadingdone", update)
    return () => {
      fonts?.removeEventListener("loadingdone", update)
      stopWaiting(word)
    }
  }, [])

  useLayoutEffect(() => {
    const word = wordRef.current
    // The word rises once and stays up, even when its props change. An empty
    // word waits, so a name that arrives later still rises.
    if (!(word && hasLetters) || word.dataset.state) {
      return
    }

    let active = true
    let observer: IntersectionObserver | undefined
    const reveal = () => {
      observer?.disconnect()
      // A word that was hidden until now gets its fit from the layout first.
      updateWordmark(word)
      // Commit the hidden position first, so the transition has a start.
      word.getBoundingClientRect()
      word.dataset.state = "visible"
    }
    const start = () => {
      if (!active) {
        return
      }
      // Catch up with any font that loaded since the last measure, while the
      // letters are still below the floor, so nothing changes size once they
      // show. Usually nothing changed and this only compares a key.
      updateWordmark(word)
      const reduceMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches
      // With reduced motion there is no rise to watch, so the word is
      // simply there. The setting is read once here, and a later change is
      // still honored, since the letters only transition under motion-safe.
      if (
        reduceMotion ||
        !startOnView ||
        typeof IntersectionObserver === "undefined"
      ) {
        reveal()
        return
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= VIEW_THRESHOLD) {
            reveal()
          }
        },
        { threshold: VIEW_THRESHOLD }
      )
      observer.observe(word)
    }

    // Wait for fonts, so the word never rises in one font and lands in
    // another. A font that fails to load still lets the word show.
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(start, start)

    return () => {
      active = false
      observer?.disconnect()
    }
  }, [hasLetters, startOnView])

  return (
    <div
      className={cn(
        // flow-root keeps the clip box's negative top margin inside the root.
        "@container relative flow-root w-full",
        // The sides clip at the ink, so the empty advance after the last
        // letter never makes the page scroll sideways.
        "overflow-x-clip",
        "text-foreground font-semibold tracking-[-0.03em]",
        className
      )}
      {...props}
    >
      <span className="sr-only">{children}</span>
      <span
        ref={wordRef}
        aria-hidden="true"
        dir="ltr"
        className={cn(
          "group/wordmark block whitespace-nowrap",
          "pointer-events-none rounded-[inherit] select-none",
          // At this size, the ink of the word spans the container exactly.
          "text-[length:calc(100cqi/var(--wordmark-fit))] leading-none",
          // Draw the letters exactly as the ruler measured them: the gaps
          // carry the tracking, and the canvas sees no ligatures, font
          // features or size-dependent optical sizing.
          "tracking-normal [font-kerning:normal] [font-variant-caps:normal]",
          "[font-feature-settings:normal] [font-variant-ligatures:none]",
          "[font-optical-sizing:none]",
          // The bottom edge is the floor. The top edge sits 0.02em above the
          // ink so antialiased tops are never shaved.
          "box-content h-[calc(var(--wordmark-floor)*1em)]",
          "-mt-[0.02em] overflow-y-clip pt-[0.02em]"
        )}
        style={
          {
            // Fonts with an optical size axis keep the cut the ruler sees.
            fontVariationSettings: `"opsz" ${RULER_SIZE}`,
            // Estimates for the server render, replaced once measured.
            "--wordmark-fit": hasLetters
              ? letters.length * ESTIMATED_ADVANCE
              : 1,
            "--wordmark-height": hasLetters ? ESTIMATED_HEIGHT : 0,
            "--wordmark-floor":
              "calc(var(--wordmark-height) * (1 - var(--crop)))",
            "--crop": Math.min(0.5, Math.max(0, crop)),
            "--duration": `${duration}s`,
            "--delay": `${delay}s`,
            "--step": `${step}s`,
          } as CSSProperties
        }
      >
        {letters.map((letter, index) => {
          const occurrence = (occurrences.get(letter) ?? 0) + 1
          occurrences.set(letter, occurrence)
          // The two edge letters rise first and the middle one last.
          const rank = Math.min(index, letters.length - 1 - index)
          return (
            <span
              key={`${letter}-${occurrence}`}
              className={letterClassName}
              style={{ "--rank": rank } as CSSProperties}
            >
              {letter}
            </span>
          )
        })}
      </span>
    </div>
  )
}
