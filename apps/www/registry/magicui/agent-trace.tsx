"use client"

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type RefObject,
} from "react"
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  type Transition,
} from "motion/react"

import { cn } from "@/lib/utils"

import { passSample27 } from "./agent-trace-pass"

void passSample27(0)
export interface AgentTraceStep {
  /** What the step does, shown on one line. */
  label: string
  /**
   * Seconds the step runs, shown beside it once done.
   * @default 1.2
   */
  duration?: number
}

const DEFAULT_STEPS: readonly AgentTraceStep[] = [
  { label: "Read the bug report", duration: 1 },
  { label: "Trace the failing test", duration: 1.4 },
  { label: "Patch the date parser", duration: 0.6 },
  { label: "Run the full suite", duration: 1.5 },
  { label: "Open a pull request", duration: 0.7 },
]
const DEFAULT_RESULT = "Pull request #482 is ready for review"
/** The result when custom steps come without one. */
const CUSTOM_RESULT = "Done"
/** Seconds for a step without its own `duration`. */
const DEFAULT_STEP_SECONDS = 1.2
const DEFAULT_REPEAT_DELAY = 3.6

/**
 * Playback floor for each step and for the hold, so a hand-off (or the
 * landing) is never swallowed by the next.
 */
const MIN_STEP_SECONDS = 0.4
/** Share of the circle the working arc covers before it closes. */
const ARC_LENGTH = 0.3

/** One row on: short and without overshoot, so it never hangs between rows. */
const HIGHLIGHT_STEP: Transition = { duration: 0.25, ease: [0.25, 1, 0.5, 1] }
const LANDING_SPRING: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.9,
}
const ARC_ARRIVE: Transition = {
  duration: 0.2,
  ease: [0.2, 0.7, 0.3, 1],
}
const ARC_CLOSE: Transition = { duration: 0.24, ease: [0.3, 0, 0.2, 1] }
const RESULT_ARRIVE: Transition = {
  scale: LANDING_SPRING,
  opacity: { duration: 0.16 },
}
const INSTANT: Transition = { duration: 0 }

interface Timing {
  /** Milliseconds after the state change. */
  delay?: number
  /** Milliseconds the change takes. */
  duration: number
  ease?: string
}

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)"
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)"
const EASE_OUT = "cubic-bezier(0, 0, 0.2, 1)"

/**
 * The CSS side of a hand-off, timed from the moment a step's time runs out.
 * The highlight, the arc and the result disc use the motion transitions
 * above. The check, the next spinner and the highlight all start on that
 * frame, so a highlighted row never shows only a waiting dot. `Undo` timings
 * play when a line goes back to waiting.
 */
const HANDOFF = {
  dot: { duration: 160, ease: EASE_IN },
  trackIn: { duration: 200 },
  trackOut: { duration: 240 },
  ringClose: { duration: 240, ease: EASE_IN },
  ringUndo: { duration: 180 },
  checkDraw: {
    duration: 200,
    ease: "cubic-bezier(0.65, 0, 0.35, 1)",
  },
  checkUndo: { duration: 180 },
  rail: { duration: 200, ease: EASE_OUT },
  threadRun: { delay: 40, duration: 300 },
  threadUndo: { duration: 220, ease: EASE_OUT },
  labelTone: { duration: 300, ease: EASE_OUT },
  sheenIn: { delay: 160, duration: 180 },
  sheenOut: { duration: 180 },
  time: { duration: 160 },
  divider: { duration: 200 },
  counter: { duration: 180 },
  resultIn: { delay: 120, duration: 320, ease: EASE_OUT },
  resultUndo: { duration: 160 },
  totalTone: { duration: 300 },
  /** Before a loop the finished list fades out, resets unseen, fades in. */
  loopOut: { duration: 180, ease: EASE_OUT },
  loopIn: { duration: 220, ease: EASE_OUT },
} satisfies Record<string, Timing>

function timingStyle({
  delay = 0,
  duration,
  ease = EASE,
}: Timing): CSSProperties {
  return {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: ease,
  }
}

const RING = { cx: 10, cy: 10, r: 7, strokeWidth: 2 }
const CHECK_PATH = "m7 10 2 2 4-4"

const ROW_CLASS =
  "relative grid h-10 grid-cols-[1.25rem_minmax(0,1fr)_3rem] items-center gap-x-3 px-3"
const LABEL_CELL_CLASS = "col-start-2 row-start-1 truncate font-medium"
const TIME_CELL_CLASS = "text-end text-xs tabular-nums"
const FADE_CLASS = "transition-opacity motion-reduce:transition-none"

type StepState = "waiting" | "working" | "done"

/** Three tones, so progress reads at a glance even without the glyphs. */
const LABEL_TONE_CLASS: Record<StepState, string> = {
  waiting: "text-muted-foreground",
  working: "text-foreground",
  done: "text-foreground/75",
}

/**
 * The rail spans from below this line's glyph to above the next one's, with
 * the same 2px gap at both ends. A waiting dot is smaller than a ring, so the
 * rail reaches further while its line (and so the next one) still waits.
 */
const RAIL_STATE_CLASS: Record<StepState, string> = {
  waiting: "-translate-y-1.25 scale-y-150",
  working: "translate-y-0 scale-y-125",
  done: "translate-y-0 scale-y-100",
}

interface TraceRow {
  key: string
  label: string
  seconds: number
}

interface Playhead {
  /** The working step, or the number of steps once the trace has finished. */
  index: number
  /**
   * `fade`: the finished list fades out before a loop. `rewound`: it is back
   * at the start, and CSS transitions stay off until the next hand-off, so
   * nothing plays backwards while the list fades in.
   */
  phase: "run" | "fade" | "rewound"
}

const START: Playhead = { index: 0, phase: "run" }
const REWOUND: Playhead = { index: 0, phase: "rewound" }

const formatSeconds = (seconds: number) => `${seconds.toFixed(1)}s`

function stepState(order: number, active: number): StepState {
  if (order < active) {
    return "done"
  }
  if (order === active) {
    return "working"
  }
  return "waiting"
}

/** Finite seconds clamp to 0 and up; anything else takes the fallback. */
function toSeconds(value: number | undefined, fallback: number) {
  if (value === undefined || !Number.isFinite(value)) {
    return fallback
  }
  return Math.max(0, value)
}

/** Keys from each label and its occurrence, so repeated labels stay apart. */
function toRows(steps: readonly AgentTraceStep[]): TraceRow[] {
  const seen = new Map<string, number>()
  return steps.map((step) => {
    const occurrence = (seen.get(step.label) ?? 0) + 1
    seen.set(step.label, occurrence)
    return {
      key: `${step.label}#${occurrence}`,
      label: step.label,
      seconds: toSeconds(step.duration, DEFAULT_STEP_SECONDS),
    }
  })
}

/**
 * What the clock times at this point: the seconds a step shows, and how long
 * it plays for. Playback never drops below the floor, so it always runs.
 */
function clockSpan(
  rows: TraceRow[],
  active: number,
  fading: boolean,
  repeatDelay: number
) {
  if (fading) {
    const fade = HANDOFF.loopOut.duration / 1000
    return { seconds: fade, playSeconds: fade }
  }
  const seconds = rows.at(active)?.seconds ?? repeatDelay
  return { seconds, playSeconds: Math.max(seconds, MIN_STEP_SECONDS) }
}

function nextPlayhead(
  active: number,
  finished: boolean,
  fading: boolean
): Playhead {
  if (fading) {
    return REWOUND
  }
  if (finished) {
    return { index: active, phase: "fade" }
  }
  return { index: active + 1, phase: "run" }
}

/** Writes outside React, and only when the visible text actually changes. */
function writeText(element: Element | null | undefined, text: string) {
  if (element && element.textContent !== text) {
    element.textContent = text
  }
}

/**
 * Follows the setting live, so turning it on mid-run settles the trace. False
 * on the server and in the first client render, so both match; a layout
 * effect, so a client-side mount never paints a moving first frame.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return reduced
}

/** False on the server and in the first client render, so the clock waits. */
function useTabVisible() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])
  return visible
}

/**
 * A ref callback for the pause control. When it leaves while it has focus (a
 * single play finishing, or the steps emptied), focus moves to the root
 * instead of the page. React runs a ref's cleanup before it removes the
 * element, so the button is still focused then. The root is focusable only
 * for that moment, unless the user made it so.
 */
function useFocusHandOff(root: RefObject<HTMLDivElement | null>) {
  return useCallback(
    (button: HTMLButtonElement) => () => {
      const container = root.current
      if (!container || document.activeElement !== button) {
        return
      }
      if (!container.hasAttribute("tabindex")) {
        container.tabIndex = -1
        container.addEventListener(
          "blur",
          () => container.removeAttribute("tabindex"),
          { once: true }
        )
      }
      container.focus({ preventScroll: true })
    },
    [root]
  )
}

interface TracePlaybackOptions {
  rows: TraceRow[]
  repeatDelay: number
  loop: boolean
  /** Shows the finished trace and keeps the clock still. */
  reduced: boolean
  /** Off screen, in a hidden tab, or paused by the viewer. */
  halted: boolean
  /** Holds the `data-time` cells the clock writes into. */
  root: RefObject<HTMLDivElement | null>
  total: RefObject<HTMLSpanElement | null>
}

/**
 * One clock drives the trace: each step's time, the hold, then the fade
 * before a loop. It writes the running times outside React, so React renders
 * once per hand-off, and pausing it pauses everything.
 */
function useTracePlayback({
  rows,
  repeatDelay,
  loop,
  reduced,
  halted,
  root,
  total,
}: TracePlaybackOptions) {
  const clock = useRef({ key: "", progress: 0 })
  const [playhead, setPlayhead] = useState(START)

  // Start over whenever the labels change; new timings alone keep the place.
  const planKey = useMemo(
    () => JSON.stringify(rows.map((row) => row.label)),
    [rows]
  )
  const [playedPlanKey, setPlayedPlanKey] = useState(planKey)
  if (playedPlanKey !== planKey) {
    setPlayedPlanKey(planKey)
    setPlayhead(START)
  }

  const active = reduced ? rows.length : Math.min(playhead.index, rows.length)
  const finished = active === rows.length
  const fading = finished && playhead.phase === "fade"
  const elapsed = rows
    .slice(0, active)
    .reduce((sum, row) => sum + row.seconds, 0)
  const stopped = rows.length === 0 || halted || reduced || (finished && !loop)
  const { seconds, playSeconds } = clockSpan(rows, active, fading, repeatDelay)
  // Leaves out the timings, so changing one resumes at the same point.
  const clockKey = `${planKey}:${active}:${fading}`

  useEffect(() => {
    if (stopped) {
      return
    }
    const stepTime = root.current?.querySelector(`[data-time="${active}"]`)
    const totalTime = total.current
    // A fade cut short by a pause starts over, since the list came back.
    let progress =
      !fading && clock.current.key === clockKey ? clock.current.progress : 0
    // Progress from 0 to 1 rather than seconds, so the keyframes always differ
    // and a zero-second step or hold still plays for its floor.
    const playback = animate(0, 1, {
      duration: playSeconds,
      ease: "linear",
      onUpdate: (value) => {
        progress = value
        if (!finished) {
          writeText(stepTime, formatSeconds(value * seconds))
          writeText(totalTime, formatSeconds(elapsed + value * seconds))
        }
      },
      onComplete: () => setPlayhead(nextPlayhead(active, finished, fading)),
    })
    playback.time = progress * playSeconds
    return () => {
      clock.current = { key: clockKey, progress }
      playback.stop()
    }
  }, [
    active,
    clockKey,
    elapsed,
    fading,
    finished,
    playSeconds,
    root,
    seconds,
    stopped,
    total,
  ])

  return {
    active,
    finished,
    fading,
    rewound: playhead.phase === "rewound",
    elapsed,
    stopped,
  }
}

export interface AgentTraceProps extends Omit<
  ComponentProps<"div">,
  "children"
> {
  /**
   * The steps to work through, in order.
   * @default five sample steps that add up to 5.2s
   */
  steps?: readonly AgentTraceStep[]
  /**
   * The line shown once every step is done.
   * @default "Pull request #482 is ready for review" with the sample steps, otherwise "Done"
   */
  result?: string
  /**
   * Seconds the finished trace holds before it plays again.
   * @default 3.6
   */
  repeatDelay?: number
  /**
   * Accent color of the spinner, check marks and connecting line, set as
   * `--color`.
   * @default "#9c40ff"
   */
  color?: string
  /**
   * Plays again after `repeatDelay`. When `false`, plays once and rests on
   * the result.
   * @default true
   */
  loop?: boolean
}

export function AgentTrace({
  steps,
  result,
  repeatDelay = DEFAULT_REPEAT_DELAY,
  color = "#9c40ff",
  loop = true,
  className,
  style,
  ref,
  ...props
}: AgentTraceProps) {
  const root = useRef<HTMLDivElement>(null)
  const total = useRef<HTMLSpanElement>(null)
  useImperativeHandle(ref, () => root.current as HTMLDivElement, [])

  const inView = useInView(root, { amount: 0.25 })
  const tabVisible = useTabVisible()
  const reduced = usePrefersReducedMotion()
  const handOffFocus = useFocusHandOff(root)
  const [paused, setPaused] = useState(false)
  const rows = useMemo(() => toRows(steps ?? DEFAULT_STEPS), [steps])
  const outcome = result ?? (steps ? CUSTOM_RESULT : DEFAULT_RESULT)
  const { active, finished, fading, rewound, elapsed, stopped } =
    useTracePlayback({
      rows,
      repeatDelay: toSeconds(repeatDelay, DEFAULT_REPEAT_DELAY),
      loop,
      reduced,
      halted: !inView || !tabVisible || paused,
      root,
      total,
    })

  const showPause = rows.length > 0 && (loop || !finished)
  // Out of sight while the result holds, unless paused there or focused.
  const pauseHidden = finished && !paused
  // Back in view while stopped, so a pause never leaves the list blank.
  const listHidden = fading && !stopped
  const listFade = timingStyle(listHidden ? HANDOFF.loopOut : HANDOFF.loopIn)
  const highlightTransition = reduced || rewound ? INSTANT : HIGHLIGHT_STEP

  const rootStyle = {
    "--color": color,
    "--play-state": stopped ? "paused" : "running",
    ...style,
  } as CSSProperties

  return (
    <div
      {...props}
      ref={root}
      style={rootStyle}
      className={cn(
        "border-border bg-card relative w-full max-w-md rounded-xl border p-1.5 text-start text-sm",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none",
            FADE_CLASS,
            listHidden && "opacity-0",
            // Every part jumps back to the start in one update.
            rewound && "[&_*]:transition-none!"
          )}
          style={listFade}
        >
          <motion.div
            className="bg-muted absolute inset-x-0 top-0 h-10 rounded-lg"
            initial={false}
            animate={{ y: `${active * 100}%` }}
            transition={highlightTransition}
          />
          {rows.map((row, order) => (
            <StepRow
              key={row.key}
              order={order}
              label={row.label}
              seconds={row.seconds}
              state={stepState(order, active)}
              intoResult={order === rows.length - 1}
              reduced={reduced}
            />
          ))}
          <ResultRow
            result={outcome}
            counter={`${active}/${rows.length}`}
            finished={finished}
            instant={reduced || rewound}
          />
        </div>
        <div className="absolute end-3 bottom-0 flex h-10 items-center gap-1">
          {showPause && (
            <button
              ref={handOffFocus}
              type="button"
              aria-label="Pause animation"
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
              className={cn(
                "text-muted-foreground relative flex size-6 items-center justify-center rounded-md transition",
                // A 32px hit area around the 24px button.
                "before:absolute before:-inset-1",
                "hover:bg-foreground/10 hover:text-foreground",
                "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                pauseHidden &&
                  "pointer-events-none opacity-0 focus-visible:pointer-events-auto focus-visible:opacity-100",
                "motion-reduce:hidden"
              )}
            >
              <PlaybackIcon paused={paused} />
            </button>
          )}
          <span
            aria-hidden="true"
            className={cn(FADE_CLASS, listHidden && "opacity-0")}
            style={listFade}
          >
            <span
              ref={total}
              className={cn(
                TIME_CELL_CLASS,
                "block min-w-[4ch] transition-colors motion-reduce:transition-none",
                finished ? "text-foreground" : "text-foreground/60",
                rewound && "transition-none"
              )}
              style={timingStyle(HANDOFF.totalTone)}
            >
              {formatSeconds(elapsed)}
            </span>
          </span>
        </div>
      </div>
      {rows.length > 0 && (
        <ol className="sr-only">
          {rows.map((row) => (
            <li key={row.key}>{row.label}</li>
          ))}
        </ol>
      )}
      <p className="sr-only">{outcome}</p>
    </div>
  )
}

interface StepRowProps {
  order: number
  label: string
  seconds: number
  state: StepState
  /** The last step: its thread runs into the result row. */
  intoResult: boolean
  reduced: boolean
}

function StepRow({
  order,
  label,
  seconds,
  state,
  intoResult,
  reduced,
}: StepRowProps) {
  const working = state === "working"
  const done = state === "done"

  return (
    <div className={ROW_CLASS}>
      <StepGlyph state={state} reduced={reduced} />
      {/* Centred under the glyph, from its lower edge to the next glyph. */}
      <span
        className={cn(
          "absolute start-[calc(1.375rem-0.75px)] top-3/4 h-1/2 w-[1.5px] origin-top",
          "transition-[translate,scale] motion-reduce:transition-none",
          RAIL_STATE_CLASS[state],
          // The result row has no glyph until it lands, so no grey rail leads
          // into it; only the colored thread runs down on landing.
          !intoResult && "bg-border"
        )}
        style={timingStyle(HANDOFF.rail)}
      >
        <span
          className={cn(
            "absolute inset-0 origin-top bg-(--color) transition-[scale] motion-reduce:transition-none",
            done ? "scale-y-100" : "scale-y-0"
          )}
          style={timingStyle(done ? HANDOFF.threadRun : HANDOFF.threadUndo)}
        />
      </span>
      <span
        className={cn(
          LABEL_CELL_CLASS,
          "transition-colors motion-reduce:transition-none",
          LABEL_TONE_CLASS[state]
        )}
        style={timingStyle(HANDOFF.labelTone)}
      >
        {label}
      </span>
      <span
        className={cn(
          LABEL_CELL_CLASS,
          "max-w-full justify-self-start",
          // A narrow muted band clipped to a transparent copy of the label.
          "via-muted-foreground bg-linear-to-r from-transparent from-40% via-50% to-transparent to-60%",
          "bg-size-[300%_100%] bg-clip-text bg-no-repeat text-transparent",
          "animate-agent-trace-sheen motion-reduce:animate-none",
          FADE_CLASS,
          working
            ? "opacity-100 [animation-play-state:var(--play-state)]"
            : "opacity-0 [animation-play-state:paused]"
        )}
        style={timingStyle(working ? HANDOFF.sheenIn : HANDOFF.sheenOut)}
      >
        {label}
      </span>
      <span
        data-time={order}
        className={cn(
          TIME_CELL_CLASS,
          "text-foreground/60 col-start-3 row-start-1",
          FADE_CLASS,
          state === "waiting" ? "opacity-0" : "opacity-100"
        )}
        style={timingStyle(HANDOFF.time)}
      >
        {formatSeconds(working ? 0 : seconds)}
      </span>
    </div>
  )
}

function StepGlyph({ state, reduced }: { state: StepState; reduced: boolean }) {
  const working = state === "working"
  const done = state === "done"

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-5 overflow-visible fill-none"
    >
      <circle
        cx={10}
        cy={10}
        r={3}
        className={cn(
          "fill-muted-foreground/50 origin-center transition-[opacity,scale] [transform-box:fill-box] motion-reduce:transition-none",
          state === "waiting" ? "scale-100 opacity-100" : "scale-40 opacity-0"
        )}
        style={timingStyle(HANDOFF.dot)}
      />
      {/* The unfilled track the working arc turns on. */}
      <circle
        {...RING}
        className={cn(
          "stroke-foreground/15 dark:stroke-foreground/10",
          FADE_CLASS,
          working ? "opacity-100" : "opacity-0"
        )}
        style={timingStyle(working ? HANDOFF.trackIn : HANDOFF.trackOut)}
      />
      <circle
        {...RING}
        className={cn(
          "fill-(--color)/14 stroke-(--color)",
          FADE_CLASS,
          done ? "opacity-100" : "opacity-0"
        )}
        style={timingStyle(done ? HANDOFF.ringClose : HANDOFF.ringUndo)}
      />
      {/* Reduced motion never has a working step, so it skips the arc. */}
      {!reduced && (
        <AnimatePresence initial={false}>
          {working && (
            // Stays mounted and turning until the arc has closed into a ring.
            <g
              key="arc"
              className="origin-center animate-spin [animation-duration:900ms] [animation-play-state:var(--play-state)] [transform-box:fill-box] motion-reduce:animate-none"
            >
              <motion.circle
                {...RING}
                strokeLinecap="round"
                // A lighter tint on dark surfaces, so the arc outshines its track.
                className="stroke-(--color) dark:[stroke:color-mix(in_oklab,var(--color),white_35%)]"
                initial={{ opacity: 0, scale: 0.6, pathLength: ARC_LENGTH }}
                animate={{ opacity: 1, scale: 1, pathLength: ARC_LENGTH }}
                exit={{ pathLength: 1, transition: ARC_CLOSE }}
                transition={ARC_ARRIVE}
              />
            </g>
          )}
        </AnimatePresence>
      )}
      <CheckMark drawn={done} className="stroke-(--color)" />
    </svg>
  )
}

function CheckMark({
  drawn,
  className,
}: {
  drawn: boolean
  className: string
}) {
  return (
    <path
      d={CHECK_PATH}
      pathLength={1}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "transition-[stroke-dashoffset,opacity] [stroke-dasharray:1] motion-reduce:transition-none",
        drawn
          ? "opacity-100 [stroke-dashoffset:0]"
          : "opacity-0 [stroke-dashoffset:1]",
        className
      )}
      style={timingStyle(drawn ? HANDOFF.checkDraw : HANDOFF.checkUndo)}
    />
  )
}

interface ResultRowProps {
  result: string
  counter: string
  finished: boolean
  /** Reduced motion, or the jump back to the start before a loop. */
  instant: boolean
}

function ResultRow({ result, counter, finished, instant }: ResultRowProps) {
  return (
    <div className={ROW_CLASS}>
      {/* As wide as the highlight, so their edges line up. */}
      <span
        className={cn(
          "bg-border absolute inset-x-0 top-0 h-px",
          FADE_CLASS,
          finished && "opacity-0"
        )}
        style={timingStyle(HANDOFF.divider)}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="size-5 overflow-visible fill-none"
      >
        <motion.g
          initial={false}
          animate={
            finished ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }
          }
          transition={instant ? INSTANT : RESULT_ARRIVE}
        >
          <circle cx={10} cy={10} r={8} className="fill-(--color)" />
          <CheckMark drawn={finished} className="stroke-background" />
        </motion.g>
      </svg>
      <span
        className={cn(
          LABEL_CELL_CLASS,
          "text-muted-foreground pe-3 tabular-nums transition-[opacity,translate] motion-reduce:transition-none",
          finished ? "-translate-y-1.5 opacity-0" : "translate-y-0 opacity-100"
        )}
        style={timingStyle(HANDOFF.counter)}
      >
        {counter}
      </span>
      <span
        className={cn(
          LABEL_CELL_CLASS,
          "text-foreground pe-3 transition-[opacity,translate] motion-reduce:transition-none",
          finished ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
        style={timingStyle(finished ? HANDOFF.resultIn : HANDOFF.resultUndo)}
      >
        {result}
      </span>
    </div>
  )
}

function PlaybackIcon({ paused }: { paused: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      strokeWidth={1.5}
      strokeLinejoin="round"
      className="size-3.5 fill-current stroke-current"
    >
      {paused ? (
        <path d="M3.5 2v8L10 6Z" />
      ) : (
        <>
          <rect x={2.75} y={2} width={1.5} height={8} />
          <rect x={7.75} y={2} width={1.5} height={8} />
        </>
      )}
    </svg>
  )
}
