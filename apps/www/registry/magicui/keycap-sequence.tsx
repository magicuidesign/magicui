"use client"

import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type ComponentProps,
  type CSSProperties,
} from "react"
import {
  animate,
  motion,
  motionValue,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type MotionValueSegmentWithTransition,
} from "motion/react"

import { cn } from "@/lib/utils"

import { passSample16 } from "./keycap-sequence-pass"

void passSample16(0)
const DEFAULT_KEYS = ["⌘", "K"]

// A finger bottoming out: the key accelerates into a hard stop, no rebound.
const DOWN_STROKE = { duration: 0.08, ease: [0.45, 0, 0.9, 0.55] } as const

// The release springs back and settles in about 0.2 seconds. Its small
// overshoot is clamped away, so the face stops dead at rest.
const RELEASE_SPRING = {
  type: "spring",
  stiffness: 720,
  damping: 38,
  mass: 1,
  restDelta: 0.03,
  restSpeed: 0.5,
} as const

// The rhythm of one play, as fractions of `duration`, the same for any number
// of keys. The keys go down one after another across CHORD_SPREAD, the last
// key holds for LAST_KEY_HOLD, then they let go in reverse across another
// CHORD_SPREAD. The release spring settles in about 0.2 seconds, so at the
// default duration every key is back at rest just before the play ends.
const CHORD_SPREAD = 0.2
const LAST_KEY_HOLD = 0.36

const SPOKEN_NAMES = new Map([
  ["⌘", "Command"],
  ["⇧", "Shift"],
  ["⌥", "Option"],
  ["⌃", "Control"],
  ["↵", "Return"],
  ["↩", "Return"],
  ["⏎", "Return"],
  ["⎋", "Escape"],
  ["Esc", "Escape"],
  ["⌫", "Delete"],
  ["⌦", "Forward Delete"],
  ["⇥", "Tab"],
  ["⇪", "Caps Lock"],
  ["␣", "Space"],
  ["↑", "Up Arrow"],
  ["↓", "Down Arrow"],
  ["←", "Left Arrow"],
  ["→", "Right Arrow"],
])

// Text and emoji presentation selectors (U+FE0E and U+FE0F) change how a
// glyph is drawn, not what it means.
const VARIATION_SELECTORS = /[\uFE0E\uFE0F]/g

// The text presentation selector, which draws a symbol such as ↩ as a plain
// glyph rather than an emoji.
const TEXT_PRESENTATION = "\uFE0E"

function toSpokenPhrase(labels: string[]) {
  return labels
    .map((label) => {
      const glyph = label.replace(VARIATION_SELECTORS, "")
      return SPOKEN_NAMES.get(glyph) ?? label
    })
    .join(" ")
}

// A single letter or digit, set in the site's sans like word labels.
const LETTER_OR_DIGIT = /^[\p{L}\p{N}]$/u

// Built on first use rather than when the module loads, so browsers without
// Intl.Segmenter fall back to counting code points instead of failing.
let graphemes: Intl.Segmenter | undefined

/**
 * Whether a label is what a reader sees as one character, like "⌘", or
 * "↩" with a presentation selector.
 */
function isOneGlyph(label: string) {
  if (typeof Intl.Segmenter !== "function") {
    return Array.from(label.replace(VARIATION_SELECTORS, "")).length === 1
  }
  graphemes ??= new Intl.Segmenter()
  return Array.from(graphemes.segment(label)).length === 1
}

interface KeyItem {
  id: string
  label: string
  press: MotionValue<number>
}

/**
 * One entry per key, each with its own press value at rest. Ids count the
 * repeats of a label, so ["G", "G"] gets stable, unique keys.
 */
function toKeyItems(labels: string[]): KeyItem[] {
  const repeats = new Map<string, number>()

  return labels.map((label) => {
    const repeat = repeats.get(label) ?? 0
    repeats.set(label, repeat + 1)

    return { id: `${label}-${repeat}`, label, press: motionValue(0) }
  })
}

/**
 * One play over every key: modifiers go down first and the last key lands
 * last, then they let go in reverse order.
 */
function buildPlay(presses: MotionValue<number>[], duration: number) {
  const lastIndex = presses.length - 1
  const stagger = lastIndex === 0 ? 0 : (CHORD_SPREAD * duration) / lastIndex
  const lastKeyUpAt = stagger * lastIndex + LAST_KEY_HOLD * duration

  return presses.flatMap((press, index): MotionValueSegmentWithTransition[] => {
    const downAt = stagger * index
    const releaseAt = lastKeyUpAt + stagger * (lastIndex - index)
    // A key always finishes its down stroke before it lets go.
    const upAt = Math.max(downAt + DOWN_STROKE.duration, releaseAt)

    return [
      [press, [0, 1], { ...DOWN_STROKE, at: downAt }],
      [press, [1, 0], { ...RELEASE_SPRING, at: upAt }],
    ]
  })
}

export interface KeycapSequenceProps extends Omit<
  ComponentProps<"kbd">,
  "children"
> {
  /**
   * Labels in pressing order, modifiers first.
   * @default ["⌘", "K"]
   */
  keys?: string[]
  /**
   * Key height in pixels.
   * @default 24
   */
  size?: number
  /**
   * Seconds for one press and release. Plays start `duration + repeatDelay`
   * seconds apart, whatever the number of keys.
   * @default 1.1
   */
  duration?: number
  /**
   * Seconds to wait after the keys scroll into view.
   * @default 0.25
   */
  delay?: number
  /**
   * Seconds to pause after a play before the next one starts.
   * @default 1.8
   */
  repeatDelay?: number
  /**
   * Screen reader text. Defaults to the key names, such as "Command K".
   * @default undefined
   */
  "aria-label"?: string
}

// Static parts of a key, merged once rather than on every render. Each key is
// a box that never moves, holding a bottom edge and the face that rides on it.
const KEYCAP_CLASS =
  "pointer-events-none relative inline-flex h-[1em] shrink-0 rounded-md select-none"

// A one-character key is a square. A word key grows with its label, but is
// never narrower than a square one.
const SINGLE_KEYCAP_CLASS = cn(KEYCAP_CLASS, "w-[1em]")
const WORD_KEYCAP_CLASS = cn(KEYCAP_CLASS, "min-w-[1em]")

// The bottom edge peeks out below the face. It only fills the lower half, so a
// pressed face uncovers the page above it rather than more edge.
const EDGE_CLASS =
  "absolute inset-x-0 top-1/2 bottom-0 rounded-[inherit] bg-(--keycap-edge-color)"

// The face stops `--keycap-edge` short of the key's bottom.
const FACE_CLASS = cn(
  "border-border bg-card relative flex grow items-center justify-center",
  "h-[calc(100%-var(--keycap-edge))] rounded-[inherit] border"
)
const WORD_FACE_CLASS = cn(FACE_CLASS, "px-[0.3em]")

// A pressed face takes the pressed tone set on the root: a step darker in
// light, lighter in dark, where a faint shadow along the top edge also shows
// it sinking in.
const SHADE_CLASS = cn(
  "absolute inset-0 rounded-[inherit] bg-(--keycap-pressed)",
  "dark:shadow-[inset_0_1px_2px_rgb(0_0_0/0.45)]"
)

// One size for every label, letters, words and symbols alike, and never below
// 10px. Trimmed to cap height and baseline, so centering the legend in the face
// centers what the eye sees rather than the font's line box. Browsers without
// text-box support, such as Firefox, center the line box instead.
const LEGEND_CLASS = cn(
  "text-foreground relative leading-none font-medium whitespace-nowrap",
  "text-[length:max(0.5em,10px)] [text-box:trim-both_cap_alphabetic]"
)
const TEXT_LEGEND_CLASS = cn(LEGEND_CLASS, "font-sans")
// Symbols such as ⌘ ⇧ ↩ come from the system font, so they share one design
// and weight instead of falling back to a different font glyph by glyph, and
// are always drawn as text, never as emoji.
const SYMBOL_LEGEND_CLASS = cn(
  LEGEND_CLASS,
  "[font-family:system-ui,sans-serif] [font-variant-emoji:text]"
)
// The return arrow is drawn higher and wider than ⌘ and ⇧, so it is moved
// down to their optical center and scaled to their size.
const RETURN_LEGEND_CLASS = cn(
  SYMBOL_LEGEND_CLASS,
  "translate-y-[0.14em] scale-[0.92]"
)

interface Legend {
  className: string
  text: string
}

/**
 * How a label is set. Words, letters and digits stay as written. A lone symbol
 * gets the text presentation selector, so "↩" never turns into an emoji.
 */
function toLegend(label: string, isSingle: boolean): Legend {
  const glyph = label.replace(VARIATION_SELECTORS, "")
  if (!isSingle || LETTER_OR_DIGIT.test(glyph)) {
    return { className: TEXT_LEGEND_CLASS, text: label }
  }

  // Only a single code point takes a selector; emoji sequences stay as written.
  const isOneCodePoint = Array.from(glyph).length === 1
  return {
    className: glyph === "↩" ? RETURN_LEGEND_CLASS : SYMBOL_LEGEND_CLASS,
    text: isOneCodePoint ? `${glyph}${TEXT_PRESENTATION}` : label,
  }
}

interface KeycapProps {
  label: string
  press: MotionValue<number>
}

function Keycap({ label, press }: KeycapProps) {
  // Clamped, so the release spring's overshoot never lifts the face above rest.
  const depth = useTransform(press, [0, 1], [0, 1])
  // A pressed face sinks the full height of the bottom edge (`--keycap-edge`
  // on the root), so the edge disappears under it in either theme.
  const faceY = useMotionTemplate`calc(var(--keycap-edge) * ${depth})`
  const isSingle = isOneGlyph(label)
  const legend = toLegend(label, isSingle)

  return (
    <span
      aria-hidden="true"
      className={isSingle ? SINGLE_KEYCAP_CLASS : WORD_KEYCAP_CLASS}
    >
      <span className={EDGE_CLASS} />

      <motion.span
        className={isSingle ? FACE_CLASS : WORD_FACE_CLASS}
        style={{ y: faceY }}
      >
        <motion.span className={SHADE_CLASS} style={{ opacity: depth }} />
        <span className={legend.className}>{legend.text}</span>
      </motion.span>
    </span>
  )
}

/** What the root reaches into the running schedule for. */
interface Schedule {
  /** Starts a play now, unless one is already running. */
  play: () => void
  /** Waits `delay` again when in view and visible, or drops the wait. */
  resume: () => void
}

export function KeycapSequence({
  keys = DEFAULT_KEYS,
  size = 24,
  duration = 1.1,
  delay = 0.25,
  repeatDelay = 1.8,
  "aria-label": ariaLabel,
  onPointerEnter,
  className,
  style,
  ref,
  ...props
}: KeycapSequenceProps) {
  const rootRef = useRef<HTMLElement>(null)
  const schedule = useRef<Schedule | null>(null)
  // The loop only runs by itself while at least half is on screen. A pointer
  // or a tap can replay it whenever it is visible at all.
  const inView = useInView(rootRef, { amount: 0.5 })
  const inViewRef = useRef(inView)
  const reducedMotion = useReducedMotion()

  // Compared by value: a fresh array of the same labels restarts nothing, and
  // new labels always get fresh press values that start at rest.
  const joinedKeys = JSON.stringify(keys)
  const labels = useMemo(() => JSON.parse(joinedKeys) as string[], [joinedKeys])
  const items = useMemo(() => toKeyItems(labels), [labels])
  const canPlay = !reducedMotion && items.length > 0

  useImperativeHandle(ref, () => rootRef.current as HTMLElement, [])

  // Crossing the half-way line only arms or drops the pending wait. A play
  // that is already running always finishes, so no key snaps back mid-chord.
  useEffect(() => {
    inViewRef.current = inView
    schedule.current?.resume()
  }, [inView])

  useEffect(() => {
    if (!canPlay) {
      return
    }

    const presses = items.map((item) => item.press)
    let timer: ReturnType<typeof setTimeout> | undefined
    let animation: ReturnType<typeof animate> | undefined
    let playing = false
    let cancelled = false

    // Arms the next play, but only while in view and in a visible tab, so a
    // shortcut out of sight keeps no timer at all.
    const wait = (seconds: number) => {
      clearTimeout(timer)
      // A non-finite pause arms no timer.
      if (!Number.isFinite(seconds)) {
        return
      }
      if (inViewRef.current && !document.hidden) {
        timer = setTimeout(play, seconds * 1_000)
      }
    }

    const resume = () => {
      if (!playing) {
        wait(delay)
      }
    }

    const play = () => {
      // Pointer entry during a play does nothing, so nothing stutters.
      if (cancelled || playing) {
        return
      }
      clearTimeout(timer)
      playing = true

      // Plays start a fixed period apart, whatever the number of keys, so
      // shortcuts with the same timings keep their spacing.
      const nextAt = performance.now() + (duration + repeatDelay) * 1_000

      // A failed play puts the keys back at rest; a finished one is there
      // already. Either way the loop carries on.
      const end = (completed: boolean) => {
        if (cancelled) {
          return
        }
        playing = false
        if (!completed) {
          for (const press of presses) {
            press.set(0)
          }
        }
        wait(Math.max(0, nextAt - performance.now()) / 1_000)
      }

      animation = animate(buildPlay(presses, duration))
      animation.finished.then(
        () => end(true),
        () => end(false)
      )
    }

    schedule.current = { play, resume }
    wait(delay)
    document.addEventListener("visibilitychange", resume)

    return () => {
      cancelled = true
      clearTimeout(timer)
      document.removeEventListener("visibilitychange", resume)
      animation?.stop()
      for (const press of presses) {
        press.set(0)
      }
      schedule.current = null
    }
  }, [canPlay, items, duration, delay, repeatDelay])

  return (
    <kbd
      {...props}
      ref={rootRef}
      style={{ "--keycap-size": `${size}px`, ...style } as CSSProperties}
      className={cn(
        // A chord stays on one row and keeps its width inside a flex parent.
        "inline-flex shrink-0 flex-nowrap gap-[0.15em] whitespace-nowrap",
        "text-[length:var(--keycap-size)]",
        // The bottom edge below each face: how tall it is, and a color one
        // step stronger than the border, so it reads as the key's depth. Light
        // keeps it to 1px like the border lines; dark, where it is fainter,
        // uses 2px. A pressed face sinks exactly this far.
        "[--keycap-edge:1px]",
        "dark:[--keycap-edge:2px]",
        "[--keycap-edge-color:color-mix(in_oklab,var(--border),var(--foreground)_10%)]",
        "dark:[--keycap-edge-color:var(--input)]",
        // The pressed face's tone: muted, a step closer to the foreground, so
        // the whole face visibly changes. Dark takes the bigger step.
        "[--keycap-pressed:color-mix(in_oklab,var(--muted),var(--foreground)_5%)]",
        "dark:[--keycap-pressed:color-mix(in_oklab,var(--muted),var(--foreground)_10%)]",
        // Room above the keys as tall as the edge below the faces, so the faces
        // sit on the center line and text beside them lines up.
        "pt-(--keycap-edge)",
        className
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        schedule.current?.play()
      }}
    >
      <span className="sr-only">{ariaLabel ?? toSpokenPhrase(labels)}</span>
      {items.map((item) => (
        <Keycap key={item.id} label={item.label} press={item.press} />
      ))}
    </kbd>
  )
}
