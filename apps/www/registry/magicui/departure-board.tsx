"use client"

import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  type ComponentProps,
} from "react"

import { cn } from "@/lib/utils"

import { passSample6 } from "./departure-board-pass"

void passSample6(0)
const DEFAULT_CHARACTER_SETS = [
  "0123456789",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
]
const DEFAULT_DURATION = 1
const DEFAULT_DELAY = 0

/**
 * Joins the sets into one effect dependency, so a new array holding the same
 * sets does not restart the board.
 */
const SET_SEPARATOR = "\u0000"

const WHITESPACE = /\s/u
/** Punctuation and symbols outside every set sit between flaps as glyphs. */
const PUNCTUATION = /^[\p{P}\p{S}]$/u
const DIGIT = /^\d$/u
/** A digit after one of these continues a number instead of leading it. */
const NUMBER_PART = /^[\d.,]$/u
/** What a flap shows before it flips in. */
const BLANK = ""
const FLAP_SELECTOR = "[data-departure-flap]"

/** Each flap starts this long after the one before it... */
const STAGGER_MS = 30
/** ...but every flap starts within this long of the first one. */
const MAX_START_SPREAD_MS = 150
/** `duration` covers a 10-turn flip: 8 fast turns, then 1.5 and 2.5 times. */
const TURN_UNITS = 12
const SECOND_LAST_TURN = 1.5
const LAST_TURN = 2.5
const MIN_ENTRY_TURNS = 4
const MAX_TURNS = 10

/** The upper leaf falls for 60% of a turn; the lower leaf takes the rest. */
const UPPER_LEAF_SHARE = 0.6
/** Starts slow and gathers speed toward the hinge. */
const FALL_EASING = "cubic-bezier(0.47, 0, 0.85, 0.45)"
/** The lower face darkens as the falling leaf covers it. */
const SHADE = { filter: ["brightness(1)", "brightness(0.84)"] }
/** The landing bounce comes on top of `duration`. */
const REBOUND_ANGLE = 5
const REBOUND_UP_MS = 45
const REBOUND_DOWN_MS = 65

const VISIBLE_RATIO = 1 / 3
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

/** No font size of its own: the board takes the size of the text around it. */
const ROOT =
  "inline-flex max-w-full font-mono font-medium text-foreground tabular-nums"
const BOARD = [
  "flex max-w-full flex-wrap gap-x-[0.45em] gap-y-[0.12em] select-none",
  // Lets `justify-center` on the root center wrapped rows.
  "[justify-content:inherit]",
].join(" ")
const TERM = "inline-flex gap-[0.12em]"
/**
 * Proportional, so narrow marks like the comma do not float in a wide
 * monospace box, and muted, so the flaps lead.
 */
const GLYPH = "h-[1.3em] font-sans leading-[1.3em] text-muted-foreground"
const FLAP = [
  // `isolate` keeps the hinge's z-index inside the flap and lets Safari clip
  // the turning leaves to the rounded corners. The muted fill shows through
  // the sub-pixel join between the halves instead of the page.
  "relative isolate inline-block h-[1.3em] w-[0.74em] shrink-0 overflow-hidden",
  "rounded-[0.14em] bg-muted shadow-sm ring-1 ring-border",
  // The hinge: one hairline across the whole flap, above every face and
  // leaf, centered on the join between the halves so it covers it.
  "after:pointer-events-none after:absolute after:inset-x-0",
  "after:top-[calc(50%-0.5px)] after:z-10 after:h-px after:content-['']",
  "after:bg-border dark:after:bg-background",
].join(" ")
const FACE = [
  "pointer-events-none absolute inset-0 rounded-[inherit] bg-muted",
  "text-center leading-[1.3em]",
].join(" ")
const UPPER_HALF = [
  "[clip-path:inset(0_0_50%_0)]",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]",
].join(" ")
const LOWER_HALF = "[clip-path:inset(50%_0_0_0)]"
const UPPER_FACE = `${FACE} ${UPPER_HALF}`
const LOWER_FACE = `${FACE} ${LOWER_HALF}`
/** Leaves rest hidden; their keyframes hold opacity at 1 while they turn. */
const UPPER_LEAF = `${UPPER_FACE} opacity-0`
const LOWER_LEAF = `${LOWER_FACE} opacity-0`

export interface DepartureBoardProps extends ComponentProps<"span"> {
  /** The text to show. When it changes, only the characters that differ flip. */
  children: string | number
  /**
   * Sets of characters a flap flips through, in order. Each string is one
   * set, such as "0123456789". Characters in no set do not flip.
   * @default ["0123456789", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"]
   */
  characterSets?: string[]
  /**
   * Seconds one flap takes to flip into place. Flaps start one after
   * another, so longer text takes a little longer.
   * @default 1
   */
  duration?: number
  /**
   * Seconds to wait before the board first flips in.
   * @default 0
   */
  delay?: number
  /**
   * Start when a third of the board scrolls into view.
   * @default true
   */
  startOnView?: boolean
}

/** One character of the text: a flap, or a glyph that sits between flaps. */
interface Cell {
  /** Its position in the text. Keys the element, so a flap keeps its node. */
  id: string
  character: string
  /** Punctuation or a symbol in no set, which never flips. */
  glyph: boolean
  /** The first digit of a number, which never spins through a leading zero. */
  leadsNumber: boolean
}

/**
 * What the board does with new props.
 * - entry: the first text with flaps flips in from blank flaps
 * - walk: the flaps whose character changed flip on to it
 * - show: the text goes up at once, with no flipping
 * - idle: the text has not changed
 */
type Mode = "entry" | "walk" | "show" | "idle"

/** The next turn of a flap. */
interface Step {
  /** The character this turn lands on. */
  next: string
  /** Turns left, counting this one, so the last two can slow down. */
  turnsLeft: number
}

/** What a flap's faces show, and whether it is flipping. */
interface FlapState {
  /** Upper face, lower face, upper leaf and lower leaf, in DOM order. */
  faces: string[]
  /** Flipping, or waiting to start. */
  flipping: boolean
}

/** Everything the board keeps between renders. */
interface Board {
  /** The text the flaps show, or are flipping to. */
  text: string
  /** Where flaps, glyphs and spaces fall in `text`. */
  layout: string
  /** The first text with flaps has started to flip in, or was shown. */
  entered: boolean
  /** The sets the flaps flip through. */
  drums: string[][]
  /** Milliseconds one fast turn takes. */
  fastTurnMs: number
  /** Animations still playing, so `stop` can cancel them all. */
  animations: Set<Animation>
  flaps: WeakMap<Element, FlapState>
  /** Bumped by `stop`, so flips started before it take no further turns. */
  generation: number
}

const hinge = (angle: number) => `perspective(2.8em) rotateX(${angle}deg)`

function swing(from: number, to: number): Keyframe[] {
  return [
    { opacity: 1, transform: hinge(from) },
    { opacity: 1, transform: hinge(to) },
  ]
}

/** The last fall of a flip: down to the face, a small lift, and back. */
function landing(dropMs: number): Keyframe[] {
  const total = dropMs + REBOUND_UP_MS + REBOUND_DOWN_MS
  return [
    { offset: 0, opacity: 1, transform: hinge(90) },
    {
      offset: dropMs / total,
      opacity: 1,
      transform: hinge(0),
      easing: "ease-out",
    },
    {
      offset: (dropMs + REBOUND_UP_MS) / total,
      opacity: 1,
      transform: hinge(REBOUND_ANGLE),
      easing: "ease-in",
    },
    { offset: 1, opacity: 1, transform: hinge(0) },
  ]
}

/** How many fast turns the next turn lasts, so the last two slow down. */
function turnLength(turnsLeft: number) {
  if (turnsLeft === 1) {
    return LAST_TURN
  }
  if (turnsLeft === 2) {
    return SECOND_LAST_TURN
  }
  return 1
}

/** Seconds as milliseconds. A value that is not a finite number falls back. */
function toMs(seconds: number, fallback: number) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : fallback
  return safeSeconds * 1000
}

/** The gap between flap starts, so every flap starts close to the first. */
function staggerGap(count: number) {
  if (count < 2) {
    return 0
  }
  return Math.min(STAGGER_MS, MAX_START_SPREAD_MS / (count - 1))
}

/** Cancelling an animation rejects its `finished` promise with an AbortError. */
function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError"
}

function isGlyph(character: string, setKey: string) {
  return PUNCTUATION.test(character) && !setKey.includes(character)
}

/** Splits text into terms of cells. Whitespace separates terms. */
function cellsOf(text: string, setKey: string): Cell[][] {
  const characters = Array.from(text)
  const terms: Cell[][] = []
  let term: Cell[] = []

  for (const [index, character] of characters.entries()) {
    if (WHITESPACE.test(character)) {
      if (term.length > 0) {
        terms.push(term)
        term = []
      }
      continue
    }
    const previous = characters[index - 1] ?? ""
    term.push({
      id: String(index),
      character,
      glyph: isGlyph(character, setKey),
      leadsNumber: DIGIT.test(character) && !NUMBER_PART.test(previous),
    })
  }

  if (term.length > 0) {
    terms.push(term)
  }
  return terms
}

/** Where flaps and glyphs fall. Text only flips between equal layouts. */
function layoutOf(terms: Cell[][]) {
  return terms
    .map((term) => term.map((cell) => (cell.glyph ? "." : "#")).join(""))
    .join(" ")
}

/** The characters a flap shows over `turns` turns, landing on drum[end]. */
function walkTo(drum: string[], end: number, turns: number) {
  return Array.from({ length: turns }, (_, step) => {
    const index = (end - turns + 1 + step) % drum.length
    return drum[(index + drum.length) % drum.length]
  })
}

/**
 * 4 to 10 turns by a fixed rule, so neighboring flaps land apart. The first
 * digit of a number stays past the start of its set on the way, so the
 * board never reads as a number with a leading zero.
 */
function entryWalk(
  to: string,
  drums: string[][],
  position: number,
  leadsNumber: boolean
) {
  const drum = drums.find((set) => set.includes(to))
  if (!drum) {
    return []
  }
  const end = drum.indexOf(to)
  const turns = MIN_ENTRY_TURNS + ((position * 5) % 7)
  if (leadsNumber) {
    return walkTo(drum, end, Math.max(1, Math.min(turns, end)))
  }
  return walkTo(drum, end, turns)
}

/** Forward along a shared set, at most 10 turns; one turn if none is shared. */
function changeWalk(from: string, to: string, drums: string[][]) {
  if (from === to) {
    return []
  }
  const drum = drums.find((set) => set.includes(from) && set.includes(to))
  if (!drum) {
    return [to]
  }
  const end = drum.indexOf(to)
  const distance = (end - drum.indexOf(from) + drum.length) % drum.length
  return walkTo(drum, end, Math.min(distance, MAX_TURNS))
}

function stepAlong(walk: string[]): Step | undefined {
  if (walk.length === 0) {
    return
  }
  return { next: walk[0], turnsLeft: walk.length }
}

function modeOf({
  still,
  entered,
  textChanged,
  sameLayout,
}: {
  still: boolean
  entered: boolean
  textChanged: boolean
  sameLayout: boolean
}): Mode {
  // Reduced motion, or no animations at all: show the text at once.
  if (still) {
    return "show"
  }
  // The first text with flaps flips in from blank flaps.
  if (!entered) {
    return "entry"
  }
  // Text of a different shape has no flaps to flip from.
  if (!sameLayout) {
    return "show"
  }
  return textChanged ? "walk" : "idle"
}

/** Reduced motion, or no Web Animations (as in jsdom tests). */
function isStill(root: Element) {
  if (typeof root.animate !== "function") {
    return true
  }
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION).matches
  )
}

function createBoard(text: string, layout: string): Board {
  return {
    text,
    layout,
    entered: false,
    drums: [],
    fastTurnMs: 0,
    animations: new Set(),
    flaps: new WeakMap(),
    generation: 0,
  }
}

function flapsIn(root: Element) {
  return Array.from(root.querySelectorAll<HTMLElement>(FLAP_SELECTOR))
}

function finalCharacter(flap: HTMLElement) {
  return flap.dataset.departureFlap ?? ""
}

function facesShowing(character: string) {
  return [character, character, character, character]
}

function flapState(board: Board, flap: Element) {
  let state = board.flaps.get(flap)
  if (!state) {
    state = {
      faces: Array.from(flap.children, (face) => face.textContent ?? ""),
      flipping: false,
    }
    board.flaps.set(flap, state)
  }
  return state
}

/** Writes the faces that differ, and remembers what the flap shows. */
function paint(board: Board, flap: Element, faces: string[]) {
  for (const [index, face] of Array.from(flap.children).entries()) {
    const character = faces[index] ?? ""
    if (face.textContent !== character) {
      face.textContent = character
    }
  }
  flapState(board, flap).faces = faces
}

/** Starts an animation that `stop` can cancel. */
function play(
  board: Board,
  element: Element,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options: KeyframeAnimationOptions
) {
  const animation = element.animate(keyframes, options)
  board.animations.add(animation)
  animation.onfinish = () => {
    board.animations.delete(animation)
  }
  return animation
}

/** Stops every flip and shows the final text at once. */
function stop(board: Board, root: Element) {
  board.generation += 1
  for (const animation of board.animations) {
    animation.cancel()
  }
  board.animations.clear()
  for (const flap of flapsIn(root)) {
    paint(board, flap, facesShowing(finalCharacter(flap)))
    flapState(board, flap).flipping = false
  }
}

/** One turn: the old character falls away and the next one lands. */
async function turn(
  board: Board,
  flap: Element,
  { next, turnsLeft }: Step,
  generation: number
) {
  const [, lowerFace, upperLeaf, lowerLeaf] = Array.from(flap.children)
  const shown = flapState(board, flap).faces[0] ?? BLANK
  const turnMs = board.fastTurnMs * turnLength(turnsLeft)
  const fallMs = turnMs * UPPER_LEAF_SHARE
  const dropMs = turnMs - fallMs

  // The old character falls away on the upper leaf, revealing the next one
  // behind it, and the lower leaf brings the next one down.
  paint(board, flap, [next, shown, shown, next])
  play(board, upperLeaf, swing(0, -90), {
    duration: fallMs,
    easing: FALL_EASING,
  })
  const drop =
    turnsLeft === 1
      ? play(board, lowerLeaf, landing(dropMs), {
          delay: fallMs,
          duration: dropMs + REBOUND_UP_MS + REBOUND_DOWN_MS,
        })
      : play(board, lowerLeaf, swing(90, 0), {
          delay: fallMs,
          duration: dropMs,
        })
  await play(board, lowerFace, SHADE, { duration: turnMs, easing: "ease-in" })
    .finished
  if (generation !== board.generation) {
    return
  }

  // The lower leaf now covers the face, so swapping it never shows.
  paint(board, flap, [next, next, shown, next])
  await drop.finished
}

/**
 * Turns a flap until it shows its final character. The final character is
 * read before every turn, so new text takes over once the current turn lands.
 */
function turnOn(
  board: Board,
  flap: HTMLElement,
  firstStep: Step | undefined,
  generation: number
): Promise<void> {
  if (generation !== board.generation) {
    return Promise.resolve()
  }
  const state = flapState(board, flap)
  const step =
    firstStep ??
    stepAlong(
      changeWalk(state.faces[0] ?? BLANK, finalCharacter(flap), board.drums)
    )
  if (!step) {
    state.flipping = false
    return Promise.resolve()
  }
  return turn(board, flap, step, generation).then(() =>
    turnOn(board, flap, undefined, generation)
  )
}

/** Starts a flap flipping toward its final character after `waitMs`. */
function flip(
  board: Board,
  root: Element,
  flap: HTMLElement,
  waitMs: number,
  firstStep?: () => Step | undefined
) {
  const generation = board.generation
  flapState(board, flap).flipping = true

  // Waits are empty animations, so `stop` cancels them too.
  const wait: Promise<unknown> =
    waitMs > 0
      ? play(board, flap, [], { duration: waitMs }).finished
      : Promise.resolve()

  wait
    .then(() => turnOn(board, flap, firstStep?.(), generation))
    .catch((error: unknown) => {
      // Stopped from outside or broken mid-turn: show the final text.
      if (generation === board.generation) {
        stop(board, root)
      }
      // `stop` aborts animations on purpose. Anything else is a bug.
      if (!isAbortError(error)) {
        throw error instanceof Error ? error : new Error(String(error))
      }
    })
}

/** Flips the flaps whose character changed, on from what each one shows. */
function flipChanges(board: Board, root: Element, flaps: HTMLElement[]) {
  // React has just written the new text onto the faces that changed. Put
  // back what each flap was showing, so it flips on from there.
  for (const flap of flaps) {
    paint(board, flap, flapState(board, flap).faces)
  }

  // A flap that is flipping already turns on to its new character itself.
  const waiting = flaps.filter((flap) => {
    const state = flapState(board, flap)
    return !state.flipping && state.faces[0] !== finalCharacter(flap)
  })
  const gap = staggerGap(waiting.length)
  for (const [order, flap] of waiting.entries()) {
    flip(board, root, flap, order * gap)
  }
}

/**
 * Blanks the flaps that flip in and flips them in, on view or at once.
 * Returns the cleanup.
 */
function enter(
  board: Board,
  root: Element,
  flaps: HTMLElement[],
  cells: Cell[],
  { delayMs, startOnView }: { delayMs: number; startOnView: boolean }
) {
  const entering = flaps.flatMap((flap, position) => {
    const { leadsNumber } = cells[position]
    const walk = entryWalk(
      finalCharacter(flap),
      board.drums,
      position,
      leadsNumber
    )
    return walk.length > 0 ? [{ flap, position, leadsNumber }] : []
  })

  // Before paint: blank the flaps that flip in, the final character on the
  // rest (characters in no set never flip).
  const enteringFlaps = new Set(entering.map(({ flap }) => flap))
  for (const flap of flaps) {
    const shown = enteringFlaps.has(flap) ? BLANK : finalCharacter(flap)
    paint(board, flap, facesShowing(shown))
  }

  if (entering.length === 0) {
    board.entered = flaps.length > 0
    return
  }

  const generation = board.generation
  const gap = staggerGap(entering.length)
  let observer: IntersectionObserver | undefined

  const start = () => {
    observer?.disconnect()
    // Stopped since (reduced motion turned on), or already started.
    if (generation !== board.generation || board.entered) {
      return
    }
    board.entered = true
    for (const [order, { flap, position, leadsNumber }] of entering.entries()) {
      // Read the final character when the flap starts, in case it changed.
      const firstStep = () =>
        stepAlong(
          entryWalk(finalCharacter(flap), board.drums, position, leadsNumber)
        )
      flip(board, root, flap, delayMs + order * gap, firstStep)
    }
  }

  if (startOnView && typeof IntersectionObserver === "function") {
    observer = new IntersectionObserver(
      (entries) => {
        const latest = entries.at(-1)
        if (latest && latest.intersectionRatio >= VISIBLE_RATIO) {
          start()
        }
      },
      { threshold: VISIBLE_RATIO }
    )
    observer.observe(root)
  } else {
    start()
  }

  return () => {
    observer?.disconnect()
  }
}

export function DepartureBoard({
  children,
  characterSets = DEFAULT_CHARACTER_SETS,
  duration = DEFAULT_DURATION,
  delay = DEFAULT_DELAY,
  startOnView = true,
  className,
  ref,
  ...props
}: DepartureBoardProps) {
  const text = String(children)
  const setKey = characterSets.join(SET_SEPARATOR)
  const terms = useMemo(() => cellsOf(text, setKey), [text, setKey])
  const rootRef = useRef<HTMLSpanElement>(null)
  const boardRef = useRef<Board | null>(null)

  useImperativeHandle(ref, () => rootRef.current as HTMLSpanElement, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const layout = layoutOf(terms)
    const board = boardRef.current ?? createBoard(text, layout)
    boardRef.current = board

    const textChanged = board.text !== text
    const sameLayout = board.layout === layout
    board.text = text
    board.layout = layout
    board.drums = setKey.split(SET_SEPARATOR).map((set) => Array.from(set))
    board.fastTurnMs = toMs(duration, DEFAULT_DURATION) / TURN_UNITS

    const flaps = flapsIn(root)
    const mode = modeOf({
      still: isStill(root),
      entered: board.entered,
      textChanged,
      sameLayout,
    })

    if (mode === "show") {
      stop(board, root)
      board.entered = flaps.length > 0
      return
    }
    if (mode === "walk") {
      flipChanges(board, root, flaps)
      return
    }
    if (mode === "idle") {
      return
    }
    const cells = terms.flat().filter((cell) => !cell.glyph)
    return enter(board, root, flaps, cells, {
      delayMs: toMs(delay, DEFAULT_DELAY),
      startOnView,
    })
  }, [text, setKey, terms, duration, delay, startOnView])

  // Turning on reduced motion stops a flip in progress and shows the text.
  // Unmounting cancels whatever is still playing.
  useEffect(() => {
    const root = rootRef.current
    const board = boardRef.current
    if (!root || !board) {
      return
    }
    const query =
      typeof window.matchMedia === "function"
        ? window.matchMedia(REDUCED_MOTION)
        : undefined
    const onChange = () => {
      if (query?.matches) {
        stop(board, root)
        board.entered = flapsIn(root).length > 0
      }
    }
    query?.addEventListener("change", onChange)

    return () => {
      query?.removeEventListener("change", onChange)
      stop(board, root)
      // A remount, as in Strict Mode, plays the entry again.
      board.entered = false
    }
  }, [])

  return (
    <span {...props} ref={rootRef} className={cn(ROOT, className)}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        dir="auto"
        translate="no"
        data-nosnippet=""
        className={BOARD}
      >
        {terms.map((term) => (
          <span key={term[0].id} className={TERM}>
            {term.map((cell) =>
              cell.glyph ? (
                <span key={cell.id} className={GLYPH}>
                  {cell.character}
                </span>
              ) : (
                <span
                  key={cell.id}
                  data-departure-flap={cell.character}
                  className={FLAP}
                >
                  <span className={UPPER_FACE}>{cell.character}</span>
                  <span className={LOWER_FACE}>{cell.character}</span>
                  <span className={UPPER_LEAF}>{cell.character}</span>
                  <span className={LOWER_LEAF}>{cell.character}</span>
                </span>
              )
            )}
          </span>
        ))}
      </span>
    </span>
  )
}
