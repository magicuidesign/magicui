"use client"

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react"
import { motion, useInView, type Transition, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

import { passSample27 } from "./live-island-pass"

void passSample27(0)
export interface LiveIslandUpdate {
  /** Short headline of the update. */
  title: string
  /** One line of supporting copy. */
  description?: string
  /** When it happened, such as "2m ago". Shown muted after the title. */
  time?: string
  /** An inline SVG; it is sized for you. */
  icon?: ReactNode
  /** Tint of this update's icon square. Falls back to the `color` prop. */
  color?: string
}

export interface LiveIslandProps extends Omit<
  ComponentProps<"div">,
  "children"
> {
  /**
   * Updates shown one at a time, in order.
   * @default three sample updates: a payment, a signup and a deploy
   */
  updates?: LiveIslandUpdate[]
  /** Text on the resting pill. @default "Live" */
  label?: string
  /** Seconds the pill takes to open; closing is a little quicker. @default 0.6 */
  duration?: number
  /** Seconds each update stays open before the next one. @default 2.5 */
  repeatDelay?: number
  /**
   * Colour of the live dot, and of icon squares without their own colour.
   * Sets `--color`.
   * @default "#00C9A7"
   */
  color?: string
  /**
   * Called with an update's index and the update each time it opens.
   * @default undefined
   */
  onUpdateOpen?: (index: number, update: LiveIslandUpdate) => void
}

type Phase = "rest" | "opening" | "hold" | "closing"

type MorphState = "closed" | "open"

interface Cycle {
  /** Content key of the updates this cycle runs through. */
  key: string
  /** Those updates, kept so an open update can close after its content changed. */
  updates: LiveIslandUpdate[]
  index: number
  phase: Phase
  /** Whether the loop has left its first rest, which is shorter. */
  started: boolean
}

const DEFAULT_DURATION = 0.6
const DEFAULT_REPEAT_DELAY = 2.5
const DEFAULT_COLOR = "#00C9A7"
/** Seconds before the first update opens. */
const FIRST_REST = 0.25
/** Seconds the closed pill rests before the next update opens. */
const REST = 1
/** Length of the closing phase as a share of `duration`. */
const CLOSE_RATIO = 0.9
/** One calm spring with the smallest overshoot. */
const OPEN_BOUNCE = 0.1

const NEXT_PHASE: Record<Phase, Phase> = {
  rest: "opening",
  opening: "hold",
  hold: "closing",
  closing: "rest",
}

/**
 * Type sizes in em, matching `text-base`, `text-sm` and `text-xs`, so a
 * font-size class on the root scales the text along with the surface.
 */
const TEXT_BASE = "text-[1em] leading-[1.5]"
const TEXT_SM = "text-[0.875em] leading-[1.43]"
const TEXT_XS = "text-[0.75em] leading-[1.33]"

/**
 * A soft card: in light mode a faint ring and two soft shadows, in dark mode
 * a hairline border and a gentle inner glow.
 */
const SURFACE = cn(
  "border bg-card text-card-foreground",
  "border-transparent shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
  "dark:border-border dark:shadow-[inset_0_-20px_80px_-20px_#ffffff1f]"
)

/**
 * Hover lifts the surface a little: a deeper shadow in light mode, a brighter
 * hairline in dark mode. The size stays put, so a morph is never measured
 * mid-hover.
 */
const SURFACE_HOVER = cn(
  "transition-[box-shadow,border-color] duration-200",
  "hover:shadow-[0_0_0_1px_rgba(0,0,0,.05),0_4px_8px_rgba(0,0,0,.06),0_16px_32px_rgba(0,0,0,.07)]",
  "dark:hover:border-ring/50 dark:hover:shadow-[inset_0_-20px_80px_-20px_#ffffff1f]"
)

/** The resting pill fits its label; the open notification takes the full width. */
const SURFACE_VARIANTS: Variants = {
  closed: { width: "auto", height: "2.5em", borderRadius: "1.25em" },
  open: { width: "100%", height: "4.75em", borderRadius: "1em" },
}

const SHOW_WHEN_OPEN: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

const SHOW_WHEN_CLOSED: Variants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
}

/** Timing of the surface, of the resting label and of the notification. */
type MorphTransitions = Record<"surface" | "resting" | "content", Transition>

const INSTANT: MorphTransitions = {
  surface: { duration: 0 },
  resting: { duration: 0 },
  content: { duration: 0 },
}

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const DEFAULT_UPDATES: LiveIslandUpdate[] = [
  {
    title: "Payment received",
    description: "Nora Ellis · annual plan · $264",
    time: "now",
    color: "#00C9A7",
    icon: (
      <Glyph>
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M2 10h20" />
      </Glyph>
    ),
  },
  {
    title: "New signup",
    description: "Theo Reed started a Pro trial",
    time: "2m ago",
    color: "#FFB800",
    icon: (
      <Glyph>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6" />
        <path d="M22 11h-6" />
      </Glyph>
    ),
  },
  {
    title: "Deploy complete",
    description: "Storefront is live on production",
    time: "5m ago",
    color: "#1E86FF",
    icon: (
      <Glyph>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </Glyph>
    ),
  },
]

/** Falls back to the default for zero, negative or non-finite timing. */
function positiveOr(value: number, fallback: number) {
  return Number.isFinite(value) && value > 0 ? value : fallback
}

/** Changes when the visible copy changes, not when the array is recreated. */
function getUpdatesKey(updates: LiveIslandUpdate[]) {
  return updates
    .map(({ title, description = "", time = "" }) =>
      [title, description, time].join("|")
    )
    .join("\n")
}

function createCycle(key: string, updates: LiveIslandUpdate[]): Cycle {
  return { key, updates, index: 0, phase: "rest", started: false }
}

function isOpenPhase(phase: Phase) {
  return phase === "opening" || phase === "hold"
}

function nextCycle(cycle: Cycle): Cycle {
  const phase = NEXT_PHASE[cycle.phase]
  // The next update is picked only while the pill is closed.
  const index =
    phase === "rest" ? (cycle.index + 1) % cycle.updates.length : cycle.index
  return { ...cycle, phase, index, started: true }
}

/** Holding at rest or while closing opens the current update first. */
function holdOpen(cycle: Cycle): Cycle {
  if (isOpenPhase(cycle.phase)) {
    return cycle
  }
  return { ...cycle, phase: "hold", started: true }
}

/** Without motion, each press shows the next update directly. */
function showNextUpdate(cycle: Cycle): Cycle {
  return { ...cycle, index: (cycle.index + 1) % cycle.updates.length }
}

/**
 * Restarts from the first update of new content. An open update closes
 * first, so its text is never swapped in view; the swap waits for the rest.
 */
function getCycleForContent(
  cycle: Cycle,
  key: string,
  updates: LiveIslandUpdate[],
  reduced: boolean
): Cycle {
  if (reduced || cycle.phase === "rest") {
    return createCycle(key, updates)
  }
  if (isOpenPhase(cycle.phase)) {
    return { ...cycle, phase: "closing" }
  }
  return cycle
}

function getPhaseSeconds(cycle: Cycle, opening: number, hold: number) {
  const seconds: Record<Phase, number> = {
    rest: cycle.started ? REST : FIRST_REST,
    opening,
    hold,
    closing: opening * CLOSE_RATIO,
  }
  return seconds[cycle.phase]
}

function getMorphTransitions(
  open: boolean,
  duration: number
): MorphTransitions {
  if (open) {
    return {
      // Width, height and radius move together on one calm spring.
      surface: { type: "spring", duration, bounce: OPEN_BOUNCE },
      // The label stays while the pill starts to grow...
      resting: { duration: duration * 0.2, delay: duration * 0.3 },
      // ...and the notification fades in only once there is room for it.
      content: {
        duration: duration * 0.3,
        delay: duration * 0.5,
        ease: "easeOut",
      },
    }
  }

  return {
    // The notification fades out before the surface starts to shrink...
    content: { duration: duration * 0.2, ease: "easeIn" },
    surface: {
      type: "spring",
      duration: duration * 0.7,
      delay: duration * 0.2,
      bounce: 0,
    },
    // ...and the label returns as the pill settles.
    resting: {
      duration: duration * 0.25,
      delay: duration * 0.3,
      ease: "easeOut",
    },
  }
}

function getActionLabel(reduced: boolean, held: boolean) {
  if (reduced) {
    return "Show next update"
  }
  return held ? "Resume updates" : "Pause updates"
}

/** Read in an effect, so the server and the first client render agree. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return reduced
}

function usePageVisible() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible")
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])

  return visible
}

interface CycleOptions {
  updates: LiveIslandUpdate[]
  /** Seconds an update takes to open. */
  opening: number
  /** Seconds an update stays open. */
  hold: number
  reduced: boolean
  /** Whether the island is on screen in a visible tab. */
  visible: boolean
}

/** Runs the rest, opening, hold and closing loop, and the press-to-hold. */
function useLiveIslandCycle({
  updates,
  opening,
  hold,
  reduced,
  visible,
}: CycleOptions) {
  const key = getUpdatesKey(updates)
  const [cycle, setCycle] = useState(() => createCycle(key, updates))
  const [held, setHeld] = useState(false)

  // New content releases a hold and starts again from the first update. A
  // parent that re-renders with an equal inline array keeps the loop going.
  const contentChanged = cycle.key !== key
  const reconciled = contentChanged
    ? getCycleForContent(cycle, key, updates, reduced)
    : cycle
  if (reconciled !== cycle) {
    setCycle(reconciled)
  }
  if (contentChanged && held) {
    setHeld(false)
  }

  // Until an open update has closed, the cycle keeps showing the old content.
  const shown = contentChanged ? cycle.updates : updates
  const count = shown.length
  const { index } = cycle
  const open = count > 0 && (reduced || isOpenPhase(cycle.phase))
  const running = count > 0 && visible && !held && !reduced

  // One timer drives the loop. It restarts on every phase change and stops
  // while held, off-screen, in a hidden tab or with reduced motion.
  useEffect(() => {
    if (!running) {
      return
    }
    const timer = window.setTimeout(
      () => setCycle(nextCycle),
      getPhaseSeconds(cycle, opening, hold) * 1000
    )
    return () => window.clearTimeout(timer)
  }, [running, cycle, opening, hold])

  function toggle() {
    if (reduced) {
      setCycle(showNextUpdate)
      return
    }
    setHeld((wasHeld) => !wasHeld)
    setCycle(holdOpen)
  }

  return {
    update: shown.at(index),
    index,
    open,
    held,
    toggle,
    contentKey: cycle.key,
  }
}

function PausedTag() {
  return (
    <span
      className={cn(
        "text-muted-foreground flex shrink-0 items-center gap-[0.375em]",
        TEXT_XS
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-[1em] shrink-0"
      >
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
      Paused
    </span>
  )
}

/** The resting pill: a live dot and the label. */
function RestingLabel({
  label,
  state,
  transition,
}: {
  label: string
  state: MorphState
  transition: Transition
}) {
  return (
    <motion.span
      initial={false}
      animate={state}
      variants={SHOW_WHEN_CLOSED}
      transition={transition}
      className="pointer-events-none flex min-w-0 items-center gap-[0.5em]"
    >
      <span
        aria-hidden="true"
        className="size-[0.5em] shrink-0 rounded-full bg-(--color)"
      />
      <span className={cn("truncate font-medium", TEXT_SM)}>{label}</span>
    </motion.span>
  )
}

interface IslandNotificationProps {
  update: LiveIslandUpdate
  held: boolean
  state: MorphState
  transition: Transition
}

/** The open state: an icon square, the title with its time, and one line. */
function IslandNotification({
  update,
  held,
  state,
  transition,
}: IslandNotificationProps) {
  const tint = update.color
    ? ({ "--color": update.color } as CSSProperties)
    : undefined

  return (
    <motion.span
      initial={false}
      animate={state}
      variants={SHOW_WHEN_OPEN}
      transition={transition}
      className={cn(
        "pointer-events-none absolute inset-y-0 flex items-center gap-[0.75em] px-[1em]",
        // Laid out at the open width and centred on the surface throughout,
        // so the words never move or reflow while the surface grows.
        "left-[calc(50%-50cqw)] w-[100cqw]"
      )}
    >
      <span
        aria-hidden="true"
        style={tint}
        className={cn(
          "flex size-[2.5em] shrink-0 items-center justify-center rounded-[0.75em]",
          "[&_svg]:size-[1.25em] [&_svg]:shrink-0",
          // A pale square with the icon in the same hue, a shade deeper in
          // light mode so it reads on the pale square.
          "bg-(--color)/15 text-[color-mix(in_oklab,var(--color),black_25%)]",
          "dark:bg-(--color)/20 dark:text-(--color)"
        )}
      >
        {update.icon ?? (
          <span className="size-[0.5em] rounded-full bg-current" />
        )}
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-w-0 items-baseline gap-[0.25em]">
          <span className={cn("truncate font-medium", TEXT_BASE)}>
            {update.title}
          </span>
          {update.time && (
            <>
              <span aria-hidden="true" className="text-muted-foreground">
                ·
              </span>
              <span
                className={cn(
                  "text-muted-foreground shrink-0 whitespace-nowrap",
                  TEXT_XS
                )}
              >
                {update.time}
              </span>
            </>
          )}
        </span>
        {update.description && (
          <span className={cn("text-muted-foreground truncate", TEXT_SM)}>
            {update.description}
          </span>
        )}
      </span>

      {held && <PausedTag />}
    </motion.span>
  )
}

export function LiveIsland({
  updates = DEFAULT_UPDATES,
  label = "Live",
  duration = DEFAULT_DURATION,
  repeatDelay = DEFAULT_REPEAT_DELAY,
  color = DEFAULT_COLOR,
  onUpdateOpen,
  ref,
  className,
  style,
  ...props
}: LiveIslandProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  // The handle is read only after mount, once the root ref is attached.
  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, [])

  const inView = useInView(rootRef)
  const pageVisible = usePageVisible()
  const reduced = usePrefersReducedMotion()
  const opening = positiveOr(duration, DEFAULT_DURATION)

  const { update, index, open, held, toggle, contentKey } = useLiveIslandCycle({
    updates,
    opening,
    hold: positiveOr(repeatDelay, DEFAULT_REPEAT_DELAY),
    reduced,
    visible: inView && pageVisible,
  })

  // Read through a ref, so a new callback or an equal inline update does not
  // count as another opening.
  const latest = useRef({ onUpdateOpen, update })
  useEffect(() => {
    latest.current = { onUpdateOpen, update }
  })

  useEffect(() => {
    const current = latest.current
    if (open && current.update) {
      current.onUpdateOpen?.(index, current.update)
    }
  }, [open, index, contentKey])

  const rootStyle = { "--color": color, ...style } as CSSProperties
  const rootClassName = cn(
    // Reserves the open footprint from the first render. The fixed width
    // also sizes shrink-to-fit parents, and a minimum height rather than a
    // fixed one lets `absolute inset-0` fill the caller's container.
    "@container relative mx-auto flex min-h-[4.75em] w-[24em] max-w-full min-w-[6em]",
    "items-center justify-center text-base",
    className
  )

  if (!update) {
    // No updates: a static pill, not a button that does nothing.
    return (
      <div {...props} ref={rootRef} style={rootStyle} className={rootClassName}>
        <span
          className={cn(
            "flex h-[2.5em] items-center rounded-full px-[1em]",
            SURFACE
          )}
        >
          <span className={cn("font-medium", TEXT_SM)}>{label}</span>
        </span>
      </div>
    )
  }

  const state: MorphState = open ? "open" : "closed"
  const transitions = reduced ? INSTANT : getMorphTransitions(open, opening)

  return (
    <div {...props} ref={rootRef} style={rootStyle} className={rootClassName}>
      <motion.button
        type="button"
        aria-pressed={reduced ? undefined : held}
        onClick={toggle}
        initial={false}
        animate={state}
        variants={SURFACE_VARIANTS}
        transition={transitions.surface}
        className={cn(
          // The padding sizes the resting pill around its label. Capped at
          // the reserved size, so the spring never resizes the root.
          "relative flex max-h-[4.75em] max-w-full shrink-0 items-center justify-center",
          "cursor-pointer overflow-hidden px-[1em] text-left",
          SURFACE,
          SURFACE_HOVER,
          "focus-visible:ring-ring focus-visible:ring-offset-background",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        )}
      >
        <RestingLabel
          label={label}
          state={state}
          transition={transitions.resting}
        />

        <IslandNotification
          update={update}
          held={held}
          state={state}
          transition={transitions.content}
        />

        <span className="sr-only">{getActionLabel(reduced, held)}</span>
      </motion.button>
    </div>
  )
}
