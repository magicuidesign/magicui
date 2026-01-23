"use client"

import { useEffect, useRef, useState } from "react"
import type {
  ComponentProps,
  CSSProperties,
  KeyboardEvent,
  ReactNode,
} from "react"
import {
  animate,
  frame,
  motion,
  motionValue,
  useReducedMotion,
  type AnimationPlaybackControlsWithThen,
} from "motion/react"

import { cn } from "@/lib/utils"

import { passSample10 } from "./liquid-segment-pass"

void passSample10(0)
// Flight. Every timing is a share of `duration`, the seconds from a click
// until the liquid settles.
/** The front edge's spring takes this share of `duration`. */
const FRONT_SHARE = 0.37
/** The back edge holds for this share of `duration`, then springs for the rest. */
const BACK_HOLD = 0.09
/** Both edges spring with a light bounce. More makes the settle wobble. */
const BOUNCE = 0.1
/**
 * Extra length, in segments, past which a long hop starts to gather the liquid
 * about its middle. A one-segment hop never stretches this far.
 */
const GATHER_FROM = 0.75
/** The front never leads the back by more than this many extra segments. */
const MAX_LEAD = 1.25

// Shape.
/** The waist never draws thinner than this share of the pill's height. */
const THINNEST_WAIST = 0.6
/**
 * Stretch (extra length, in segments) at which the waist is about two thirds
 * drawn in. Below it the waist eases in slowly, so a settling pill stays crisp.
 */
const PINCH_STRETCH = 0.5
/**
 * Curve handles reach this share of the way along each half of the outline.
 * Below half, the neck curves on straight out of the caps, with no flat
 * shoulder, so the stretch reads as one body of liquid.
 */
const HANDLE_REACH = 0.4
/**
 * While the liquid travels, its waist slides this share of the outline toward
 * the back edge, so the mass reads as already moving forward.
 */
const WAIST_LAG = 0.08
/** Travel speed, in px per second, at which the waist has slid 3/4 of the way. */
const WAIST_LAG_SPEED = 400
/** Half of the 2.5em segment height, so the resting pill is a capsule. */
const PILL_RADIUS = "1.25em"

/** Shared by the buttons and their copy on the liquid, so both line up exactly. */
const SEGMENT_CLASS =
  "h-[2.5em] min-w-0 truncate px-[0.5em] text-center leading-[2.5em] font-medium"

/** Arrow keys and the step each one takes through the enabled options. */
const ARROW_STEPS: Record<string, number> = {
  ArrowLeft: -1,
  ArrowUp: -1,
  ArrowRight: 1,
  ArrowDown: 1,
}

export interface LiquidSegmentOption<T extends string = string> {
  value: T
  label: ReactNode
  disabled?: boolean
}

export interface LiquidSegmentProps<T extends string = string> extends Omit<
  ComponentProps<"div">,
  "children" | "defaultValue"
> {
  /**
   * The choices, from left to right. Each label renders twice: on the track
   * and on the liquid.
   * @default required
   */
  options: LiquidSegmentOption<T>[]
  /**
   * The selected value, when controlled.
   * @default undefined
   */
  value?: T
  /**
   * The initial value, when uncontrolled.
   * @default the first enabled option
   */
  defaultValue?: T
  /**
   * Called when the visitor picks a different option.
   * @default undefined
   */
  onValueChange?: (value: T) => void
  /**
   * Seconds from a click until the liquid settles on the new option.
   * @default 0.7
   */
  duration?: number
  /**
   * Fill of the liquid. If the labels on it need another color, set
   * `--label-color` through `className`, e.g. `[--label-color:white]`.
   * @default "var(--primary)"
   */
  color?: string
}

/** The row of segments, measured once at the start of each flight. */
interface Track {
  /** Width of the row, in px. */
  width: number
  /** Height of a segment, which is also the pill's height. */
  height: number
  /** Width of one segment. */
  segment: number
}

interface Outline {
  /** Left and right edges of the liquid, in px from the left of the row. */
  left: number
  right: number
  height: number
  segment: number
  /** Speed of the liquid's middle, in px per second, positive to the right. */
  drift: number
}

/**
 * The resting pill as a percentage inset, so it is right in server output and
 * follows any resize without measuring.
 */
function restingClip(index: number, count: number) {
  if (index < 0) {
    return "inset(50%)"
  }
  const left = (index / count) * 100
  const right = ((count - index - 1) / count) * 100
  return `inset(0 ${right}% 0 ${left}% round ${PILL_RADIUS})`
}

/**
 * Computed sizes keep sub-pixel precision, so the flight path lines up exactly
 * with the resting inset when one hands over to the other.
 */
function measureTrack(layer: HTMLElement, count: number): Track {
  const style = getComputedStyle(layer)
  const width = Number.parseFloat(style.width)
  const height = Number.parseFloat(style.height)
  return { width, height, segment: width / count }
}

/**
 * A segment narrower than the pill is tall leaves no room to stretch. A hidden
 * row measures NaN, which fails this too.
 */
function hasRoomToStretch(track: Track) {
  return track.segment >= track.height
}

/**
 * Long hops would stretch the liquid into one bar across every label. Past
 * GATHER_FROM, the extra length eases toward MAX_LEAD about the liquid's
 * middle, so it travels as one blob. The easing has no kink, so neither does
 * the motion, and a one-segment hop is drawn exactly as its edges move.
 */
function gather(left: number, right: number, segment: number) {
  const extra = (right - left) / segment - 1
  if (extra <= GATHER_FROM) {
    return { left, right }
  }
  const room = MAX_LEAD - GATHER_FROM
  const eased = GATHER_FROM + room * Math.tanh((extra - GATHER_FROM) / room)
  const middle = (left + right) / 2
  const half = ((1 + eased) * segment) / 2
  return { left: middle - half, right: middle + half }
}

/**
 * One closed outline: semicircular caps joined along the top and the bottom by
 * two curves each, which meet at a waist. The top and bottom mirror each other
 * about the centre line, the caps always keep the pill's full radius, and every
 * join is horizontal, so there is never a corner. With no stretch the outline
 * is exactly the resting pill.
 */
function outline({ left, right, height, segment, drift }: Outline) {
  const radius = height / 2
  const stretch = Math.max(0, (right - left - segment) / segment)
  const pinch = 1 - Math.exp(-((stretch / PINCH_STRETCH) ** 2))
  const halfWaist = radius * (1 - (1 - THINNEST_WAIST) * pinch)
  const waistTop = radius - halfWaist
  const waistBottom = radius + halfWaist

  const start = left + radius
  const end = Math.max(start, right - radius)
  const lag = WAIST_LAG * Math.tanh(drift / WAIST_LAG_SPEED)
  const waist = start + (end - start) * (0.5 - lag)
  const reachIn = (waist - start) * HANDLE_REACH
  const reachOut = (end - waist) * HANDLE_REACH

  const commands = [
    `M ${start} 0`,
    `C ${start + reachIn} 0 ${waist - reachIn} ${waistTop} ${waist} ${waistTop}`,
    `C ${waist + reachOut} ${waistTop} ${end - reachOut} 0 ${end} 0`,
    `A ${radius} ${radius} 0 0 1 ${end} ${height}`,
    `C ${end - reachOut} ${height} ${waist + reachOut} ${waistBottom} ${waist} ${waistBottom}`,
    `C ${waist - reachIn} ${waistBottom} ${start + reachIn} ${height} ${start} ${height}`,
    `A ${radius} ${radius} 0 0 1 ${start} 0`,
    "Z",
  ]
  return `path("${commands.join(" ")}")`
}

/**
 * The liquid's two edges and the clip they draw. They are plain motion values,
 * so a flight never re-renders React.
 */
function createLiquid(initialClip: string) {
  const left = motionValue(0)
  const right = motionValue(0)
  const clip = motionValue(initialClip)
  let running: AnimationPlaybackControlsWithThen[] = []
  // Each run gets a number; draws and endings from an older run are ignored.
  let generation = 0

  function stop() {
    generation += 1
    const stopping = running
    running = []
    for (const animation of stopping) {
      animation.stop()
    }
  }

  function rest(clipAtRest: string) {
    stop()
    clip.set(clipAtRest)
  }

  function place(index: number, track: Track) {
    left.jump(index * track.segment)
    right.jump((index + 1) * track.segment)
  }

  function run(
    track: Track,
    clipAtRest: string,
    start: (onUpdate: () => void) => AnimationPlaybackControlsWithThen[]
  ) {
    stop()
    const current = generation
    const draw = () => {
      if (current !== generation) {
        return
      }
      const edges = gather(left.get(), right.get(), track.segment)
      clip.set(
        outline({
          // The ends of the track are walls.
          left: Math.max(0, edges.left),
          right: Math.min(track.width, edges.right),
          height: track.height,
          segment: track.segment,
          drift: (left.getVelocity() + right.getVelocity()) / 2,
        })
      )
    }
    const settle = () => {
      if (current === generation) {
        rest(clipAtRest)
      }
    }
    // Both edges update in the same frame, so draw once after them.
    running = start(() => frame.preRender(draw))
    Promise.all(running).then(settle, settle)
  }

  /** The front edge leads, the back edge holds and then follows. */
  function fly(
    from: number,
    to: number,
    track: Track,
    duration: number,
    clipAtRest: string
  ) {
    // Mid-flight, both edges carry on from where they are.
    const fromRest = running.length === 0
    if (fromRest) {
      place(from, track)
    }
    const targetLeft = to * track.segment
    const targetRight = targetLeft + track.segment
    const forward = targetLeft + targetRight > left.get() + right.get()
    const front = forward ? right : left
    const back = forward ? left : right

    run(track, clipAtRest, (onUpdate) => [
      animate(front, forward ? targetRight : targetLeft, {
        type: "spring",
        visualDuration: duration * FRONT_SHARE,
        bounce: BOUNCE,
        onUpdate,
      }),
      animate(back, forward ? targetLeft : targetRight, {
        type: "spring",
        visualDuration: duration * (1 - BACK_HOLD),
        bounce: BOUNCE,
        delay: fromRest ? duration * BACK_HOLD : 0,
        onUpdate,
      }),
    ])
  }

  return { clip, stop, rest, fly }
}

/** Arrow keys move focus and selection together, as native radios do. */
function handleArrowKeys(event: KeyboardEvent<HTMLButtonElement>) {
  const { key } = event
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return
  }
  const step = ARROW_STEPS[key] ?? 0
  if (!step && key !== "Home" && key !== "End") {
    return
  }
  event.preventDefault()

  const group = event.currentTarget.parentElement
  const enabled = Array.from(
    group?.querySelectorAll<HTMLButtonElement>(":scope > button:enabled") ?? []
  )
  let next = enabled.indexOf(event.currentTarget) + step
  if (key === "Home") {
    next = 0
  }
  if (key === "End") {
    next = enabled.length - 1
  }
  // `at` wraps a step back from the first option around to the last.
  const target = enabled.at(next % enabled.length)
  target?.focus()
  target?.click()
}

export function LiquidSegment<T extends string = string>({
  options,
  value,
  defaultValue,
  onValueChange,
  duration = 0.7,
  color = "var(--primary)",
  className,
  style,
  ...props
}: LiquidSegmentProps<T>) {
  const firstEnabled = options.find((option) => !option.disabled)?.value
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  // A stored value the options no longer offer falls back like no value.
  const stored = options.some((option) => option.value === uncontrolled)
    ? uncontrolled
    : undefined
  const selected = value ?? stored ?? firstEnabled
  const index = options.findIndex((option) => option.value === selected)
  const selectedOption = index < 0 ? undefined : options[index]
  const tabStop =
    selectedOption && !selectedOption.disabled
      ? selectedOption.value
      : firstEnabled
  const count = options.length
  const clipAtRest = restingClip(index, count)

  const layer = useRef<HTMLDivElement>(null)
  const [liquid] = useState(() => createLiquid(clipAtRest))
  const shown = useRef({ index, count })
  const animated = useReducedMotion() === false

  // The liquid moves only when the selection does. A new selection flies from
  // the option the liquid shows; anything else (reduced motion, no previous
  // selection, new options) moves it directly. On mount nothing moves.
  useEffect(() => {
    const from = shown.current
    shown.current = { index, count }
    const sameOptions = from.count === count
    if (sameOptions && from.index === index) {
      // A new `duration` leaves a running flight alone; turning motion off
      // settles it.
      if (!animated) {
        liquid.rest(clipAtRest)
      }
      return
    }
    const node = layer.current
    const isHop = sameOptions && from.index >= 0 && index >= 0
    if (!(node && isHop && animated) || duration <= 0) {
      liquid.rest(clipAtRest)
      return
    }
    const track = measureTrack(node, count)
    if (!hasRoomToStretch(track)) {
      liquid.rest(clipAtRest)
      return
    }
    liquid.fly(from.index, index, track, duration, clipAtRest)
  }, [index, count, clipAtRest, animated, duration, liquid])

  // On unmount, stop both edges; any draw or ending still queued is ignored.
  useEffect(() => liquid.stop, [liquid])

  function select(next: T) {
    if (next === selected) {
      return
    }
    if (value === undefined) {
      setUncontrolled(next)
    }
    onValueChange?.(next)
  }

  return (
    <div
      {...props}
      dir="ltr"
      role="radiogroup"
      className={cn(
        "relative inline-grid max-w-full grid-cols-[repeat(var(--count),minmax(0,1fr))]",
        // Muted foreground on the muted track falls short of 4.5:1.
        "bg-muted text-foreground/60 rounded-full p-[0.25em] text-base",
        "ring-border ring-1 ring-inset",
        // From sm up a segment is at least 7.5em wide; longer labels widen it.
        "sm:min-w-[min(100%,calc(7.5em*var(--count)+0.5em))]",
        "[--label-color:var(--primary-foreground)]",
        className
      )}
      style={{ "--count": count, "--color": color, ...style } as CSSProperties}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          // biome-ignore lint/a11y/useSemanticElements: ARIA radio pattern, as native radios lack Home and End
          role="radio"
          aria-checked={option.value === selected}
          disabled={option.disabled}
          tabIndex={option.value === tabStop ? 0 : -1}
          dir="auto"
          className={cn(
            SEGMENT_CLASS,
            "cursor-pointer rounded-full transition-colors duration-150",
            "outline-foreground outline-offset-1 focus-visible:outline-2",
            "enabled:aria-[checked=false]:hover:text-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          onClick={() => select(option.value)}
          onKeyDown={handleArrowKeys}
        >
          {option.label}
        </button>
      ))}
      <motion.div
        ref={layer}
        aria-hidden="true"
        inert
        className={cn(
          // Placed on the grid row, so it covers exactly the buttons whatever
          // padding the track has.
          "pointer-events-none absolute inset-0 col-span-full row-[1/2]",
          "grid grid-cols-[repeat(var(--count),minmax(0,1fr))]",
          "rounded-[inherit] bg-(--color) text-(--label-color)",
          "motion-reduce:transition-[clip-path] motion-reduce:duration-160 motion-reduce:ease-out"
        )}
        style={{ clipPath: liquid.clip }}
      >
        {options.map((option) => (
          <span
            key={option.value}
            dir="auto"
            className={cn(SEGMENT_CLASS, option.disabled && "opacity-50")}
          >
            {option.label}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
