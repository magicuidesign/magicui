"use client"

import {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react"
import { motion, useInView, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

import { passSample62 } from "./peek-list-pass"

void passSample62(0)
export interface PeekListItem {
  /** Unique, stable key shared by the row and its preview. */
  id: string
  /** The row's large title. */
  title: ReactNode
  /** Fills the card. It is decorative and hidden from assistive technology. */
  preview: ReactNode
  /** A short label on the right, aligned to the title's first line. */
  meta?: ReactNode
  /** Renders the row as a link instead of a button. */
  href?: string
  /** Called when the row is activated. */
  onSelect?: () => void
}

export interface PeekListProps extends Omit<ComponentProps<"div">, "children"> {
  /**
   * The rows and their previews, in order.
   * @default Three sample rows
   */
  items?: PeekListItem[]
  /**
   * Width of the floating card in pixels. It never takes more than half of
   * the component's width, and the stacked panel always spans the full width.
   * @default 340
   */
  size?: number
  /**
   * Seconds for the card to glide to the pointer or a row. The picture swap
   * and the title's step forward follow the same timing.
   * @default 0.35
   */
  duration?: number
  /**
   * Walk the card through two rows once when the list first comes into view,
   * on devices with a fine pointer and without reduced motion.
   * @default true
   */
  intro?: boolean
}

/**
 * Pixels between the card and the pointer, or the hovered title. The card's
 * width is capped so that it always fits on one side of the pointer: half of
 * the component, less this gap on both sides (the `3rem` in `--card-width`).
 */
const CARD_GAP = 24

/** Pixels the active title steps forward (`translate-x-3`). */
const TITLE_STEP = 12

/** Pixels between a row-anchored card and the component's right edge. */
const EDGE_GAP = 16

/** The spring stops once it is within half a pixel of its target. */
const SPRING_REST_DELTA = 0.5

/** The entry demonstration: open on row two, glide to row three, let go. */
const INTRO_OPEN_MS = 200
const INTRO_MOVE_MS = 650
const INTRO_CLOSE_MS = 1500
/** Once the card has faded out, the list returns to its first row. */
const INTRO_RESET_MS = 1900

/** The intro waits until the list reaches the upper three quarters of the viewport. */
const INTRO_VIEW_MARGIN = "0px 0px -25% 0px" as const

/** The intro only plays where a pointer can hover the rows. */
const INTRO_MEDIA = "(hover: hover) and (pointer: fine)"

/**
 * Where the card goes: beside the pointer, or beside a row when the keyboard,
 * a tap or the intro drives the list. Both name the active row.
 */
type Anchor =
  | { kind: "pointer"; index: number; clientX: number; clientY: number }
  | { kind: "row"; index: number }

function DefaultPreview({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{label}</span>
        <span className="h-1.5 w-10 rounded-full bg-linear-to-r from-[#ffaa40] to-[#9c40ff]" />
      </div>
      <p className="text-5xl font-medium tracking-tight tabular-nums">
        {value}
      </p>
      <p className="text-muted-foreground text-sm text-pretty">{detail}</p>
    </div>
  )
}

const DEFAULT_ITEMS: PeekListItem[] = [
  {
    id: "reviews",
    title: "Release reviews",
    meta: "Product",
    preview: (
      <DefaultPreview
        label="Release reviews"
        value="41%"
        detail="less time from first draft to launch"
      />
    ),
  },
  {
    id: "migration",
    title: "Record migration",
    meta: "Data",
    preview: (
      <DefaultPreview
        label="Record migration"
        value="2.1M"
        detail="records moved in a single weekend"
      />
    ),
  },
  {
    id: "handoffs",
    title: "Support handoffs",
    meta: "Support",
    preview: (
      <DefaultPreview
        label="Support handoffs"
        value="12 hrs"
        detail="back for every team, every week"
      />
    ),
  },
]

type Handler<E> = ((event: E) => void) | undefined

/** Runs the consumer's handler first, then the list's own. */
function callAll<E>(...handlers: Handler<E>[]) {
  return (event: E) => {
    for (const handler of handlers) {
      handler?.(event)
    }
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/**
 * The card's left edge beside the pointer: past the hovered title when it
 * fits, so the title stays readable, then just past the pointer, then before
 * it.
 */
function besidePointer(
  pointerX: number,
  titleEnd: number,
  cardWidth: number,
  space: number
) {
  const pastTitle = Math.max(pointerX, titleEnd) + CARD_GAP
  if (pastTitle + cardWidth <= space) {
    return pastTitle
  }
  const pastPointer = pointerX + CARD_GAP
  if (pastPointer + cardWidth <= space) {
    return pastPointer
  }
  return pointerX - CARD_GAP - cardWidth
}

/**
 * Where a preview sits relative to the active one. Layers before it are
 * clipped shut towards the top and layers after it towards the bottom, so the
 * outgoing and incoming previews always share one moving edge.
 */
function layerState(index: number, activeIndex: number) {
  if (index === activeIndex) {
    return "active"
  }
  return index < activeIndex ? "before" : "after"
}

export function PeekList({
  items = DEFAULT_ITEMS,
  size = 340,
  duration = 0.35,
  intro = true,
  className,
  style,
  ref,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  onFocus,
  onBlur,
  ...props
}: PeekListProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, [])

  const [selectedId, setSelectedId] = useState(items[0]?.id)
  // True while a pointer, keyboard focus, a tap or the intro drives the list.
  const [open, setOpen] = useState(false)
  const selectedIndex = items.findIndex((item) => item.id === selectedId)
  const activeIndex = Math.max(0, selectedIndex)

  // A selection that left `items` falls back to the first row for good, so it
  // does not jump back when that item returns.
  const firstId = items[0]?.id
  if (selectedIndex === -1 && firstId !== undefined && selectedId !== firstId) {
    setSelectedId(firstId)
  }

  // Handlers read these between renders, so a burst of pointer events never
  // acts on stale state.
  const openRef = useRef(false)
  const activeIndexRef = useRef(activeIndex)
  const anchorRef = useRef<Anchor | null>(null)
  const closedAt = useRef(0)

  const reducedMotion = useReducedMotion()
  const inView = useInView(rootRef, { once: true, margin: INTRO_VIEW_MARGIN })
  const spring = {
    visualDuration: duration,
    bounce: 0,
    restDelta: SPRING_REST_DELTA,
  }
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)
  const introDone = useRef(false)
  const stopIntro = useRef<(() => void) | null>(null)

  const rowAt = (index: number) =>
    listRef.current?.querySelector<HTMLElement>(`[data-peek-row="${index}"]`) ??
    null

  const rowIndexOf = (target: EventTarget | null) => {
    if (!(target instanceof Element)) {
      return null
    }
    const row = target.closest<HTMLElement>("[data-peek-row]")
    if (!row || !listRef.current?.contains(row)) {
      return null
    }
    return Number(row.dataset.peekRow)
  }

  // CSS decides the layout: the card floats over the list in a container of
  // at least 36rem with a fine pointer, and is a static panel otherwise.
  const isFloating = () =>
    cardRef.current !== null &&
    getComputedStyle(cardRef.current).position === "absolute"

  // Reads layout once per pointer move or row change, never per frame.
  const place = (anchor: Anchor, instant: boolean) => {
    const root = rootRef.current
    const card = cardRef.current
    const row = rowAt(anchor.index)
    if (!root || !card || !row || !isFloating()) {
      return
    }

    const bounds = root.getBoundingClientRect()
    const width = card.offsetWidth
    const height = card.offsetHeight
    const title = row.querySelector<HTMLElement>("[data-peek-title]")
    // Offsets ignore the title's step forward, so it is added back.
    const titleEnd =
      (title ? title.offsetLeft + title.offsetWidth : 0) + TITLE_STEP

    let left = Math.max(titleEnd + CARD_GAP, bounds.width - width - EDGE_GAP)
    let top: number
    if (anchor.kind === "pointer" && !reducedMotion) {
      left = besidePointer(
        anchor.clientX - bounds.left,
        titleEnd,
        width,
        bounds.width
      )
      top = anchor.clientY - bounds.top - height / 2
    } else {
      // A row anchor, and reduced motion: still, beside the active row.
      const rowBounds = row.getBoundingClientRect()
      top = rowBounds.top - bounds.top + (rowBounds.height - height) / 2
    }

    const nextX = clamp(left, 0, Math.max(0, bounds.width - width))
    const nextY = clamp(top, 0, Math.max(0, bounds.height - height))
    if (instant || reducedMotion) {
      x.jump(nextX)
      y.jump(nextY)
    } else {
      x.set(nextX)
      y.set(nextY)
    }
  }

  const activate = (anchor: Anchor) => {
    const item = items[anchor.index]
    if (!item) {
      return
    }
    // A closed card appears in place. One still fading out glides back.
    const faded = performance.now() - closedAt.current > duration * 1000
    const instant = !openRef.current && faded
    openRef.current = true
    activeIndexRef.current = anchor.index
    anchorRef.current = anchor
    setSelectedId(item.id)
    setOpen(true)
    place(anchor, instant)
  }

  const follow = (anchor: Anchor) => {
    anchorRef.current = anchor
    place(anchor, false)
  }

  const close = () => {
    if (openRef.current) {
      closedAt.current = performance.now()
    }
    openRef.current = false
    setOpen(false)
  }

  const resetToFirst = () => {
    const first = items[0]
    if (first) {
      activeIndexRef.current = 0
      anchorRef.current = null
      setSelectedId(first.id)
    }
  }

  // Timers read the latest values, so a parent re-render never restarts or
  // strands the demonstration.
  const latest = useRef({
    activate,
    close,
    resetToFirst,
    intro,
    reducedMotion,
    items,
  })

  useLayoutEffect(() => {
    latest.current = {
      activate,
      close,
      resetToFirst,
      intro,
      reducedMotion,
      items,
    }
    openRef.current = open
    activeIndexRef.current = activeIndex

    // New items, a new size or a new layout can move the rows, so the card is
    // re-placed from a fresh read. A closed card jumps, so it never flies in.
    if (anchorRef.current) {
      place({ ...anchorRef.current, index: activeIndex }, !open)
    }
  })

  useEffect(() => {
    const current = latest.current
    if (!inView || introDone.current || !current.intro) {
      return
    }
    if (current.reducedMotion || current.items.length < 2) {
      return
    }
    if (!window.matchMedia(INTRO_MEDIA).matches) {
      return
    }

    const showRow = (index: number) =>
      latest.current.activate({ kind: "row", index })
    const timers = [
      setTimeout(() => showRow(1), INTRO_OPEN_MS),
      setTimeout(
        () => showRow(latest.current.items.length > 2 ? 2 : 0),
        INTRO_MOVE_MS
      ),
      setTimeout(() => latest.current.close(), INTRO_CLOSE_MS),
      setTimeout(() => {
        introDone.current = true
        latest.current.resetToFirst()
      }, INTRO_RESET_MS),
    ]
    const clearTimers = () => {
      for (const timer of timers) {
        clearTimeout(timer)
      }
    }
    stopIntro.current = clearTimers
    return clearTimers
  }, [inView])

  useEffect(
    () => () => {
      x.stop()
      y.stop()
    },
    [x, y]
  )

  // A pointer or keyboard focus takes over where the intro is, and an intro
  // that has not started yet never will.
  const interrupt = () => {
    introDone.current = true
    stopIntro.current?.()
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      return
    }
    const hovered = rowIndexOf(event.target)
    // Between rows, an open card keeps following the pointer.
    const index = hovered ?? (openRef.current ? activeIndexRef.current : null)
    if (index === null) {
      return
    }
    const anchor: Anchor = {
      kind: "pointer",
      index,
      clientX: event.clientX,
      clientY: event.clientY,
    }
    if (openRef.current && index === activeIndexRef.current) {
      follow(anchor)
    } else {
      activate(anchor)
    }
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") {
      close()
    }
  }

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    interrupt()
    const target: EventTarget = event.target
    const index = rowIndexOf(target)
    if (
      index !== null &&
      target instanceof Element &&
      target.matches(":focus-visible")
    ) {
      activate({ kind: "row", index })
    }
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      close()
    }
  }

  // Escape closes the card and keeps focus on the row. The next focus or
  // pointer move opens it again.
  const handleRowKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      close()
    }
  }

  // A tap, or an activation from assistive technology, shows the row's
  // preview and follows the row in one go.
  const handleRowClick = (index: number) => {
    if (!openRef.current || index !== activeIndexRef.current) {
      activate({ kind: "row", index })
    }
    items[index]?.onSelect?.()
  }

  return (
    <div
      {...props}
      ref={rootRef}
      data-open={open}
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "group/peek @container relative flex w-full flex-col",
        "[--card-width:min(var(--size),calc((100cqw-3rem)/2))]",
        className
      )}
      onPointerEnter={callAll(onPointerEnter, interrupt)}
      onPointerLeave={callAll(onPointerLeave, handlePointerLeave)}
      onPointerMove={callAll(onPointerMove, handlePointerMove)}
      onFocus={callAll(onFocus, handleFocus)}
      onBlur={callAll(onBlur, handleBlur)}
    >
      <ul
        ref={listRef}
        className={cn(
          "m-0 list-none p-0",
          items.length > 0 && "border-border border-t"
        )}
      >
        {items.map((item, index) => {
          const Row = item.href ? "a" : "button"
          return (
            <li key={item.id} className="border-border border-b">
              <Row
                data-peek-row={index}
                data-active={index === activeIndex}
                href={item.href}
                type={item.href ? undefined : "button"}
                onClick={() => handleRowClick(index)}
                onKeyDown={handleRowKeyDown}
                className={cn(
                  "group/row relative grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-4 text-left @xl:py-5",
                  "focus-visible:outline-foreground rounded-sm outline-offset-2 focus-visible:outline-2"
                )}
              >
                <span
                  data-peek-title=""
                  className={cn(
                    "text-foreground min-w-0 justify-self-start text-2xl font-medium tracking-tight break-words @xl:text-4xl @3xl:text-5xl",
                    // A row leaves quickly and the active one settles in, so
                    // only one title is ever stepped forward.
                    "transition-[opacity,translate] duration-[calc(var(--duration)*0.4)] ease-out",
                    "group-data-[active=true]/row:duration-(--duration)",
                    // While the list is engaged, other rows recede and the
                    // active title steps forward.
                    "group-data-[open=true]/peek:group-data-[active=false]/row:opacity-50",
                    "motion-safe:group-data-[open=true]/peek:group-data-[active=true]/row:translate-x-3"
                  )}
                >
                  {item.title}
                </span>
                {item.meta ? (
                  <span className="text-muted-foreground max-w-40 text-right text-sm text-pretty tabular-nums">
                    {item.meta}
                  </span>
                ) : null}
              </Row>
            </li>
          )
        })}
      </ul>
      {items.length > 0 ? (
        <motion.div
          ref={cardRef}
          aria-hidden="true"
          inert
          style={{ x, y }}
          className={cn(
            "pointer-events-none z-10",
            // Stacked, in narrow containers and on touch: a static panel
            // above the list that always shows the active preview.
            "relative order-first mb-6 aspect-[4/3] max-h-72 w-full",
            "not-pointer-fine:transform-none! @max-xl:transform-none!",
            // Floating, from 36rem with a fine pointer: a card over the list
            // that opens beside the pointer and glides after it.
            "@xl:pointer-fine:absolute @xl:pointer-fine:top-0 @xl:pointer-fine:left-0 @xl:pointer-fine:mb-0 @xl:pointer-fine:w-(--card-width)"
          )}
        >
          <div
            className={cn(
              "bg-card text-card-foreground border-border @container relative size-full overflow-hidden rounded-xl border shadow-sm",
              "transition-[opacity,scale] duration-[calc(var(--duration)*0.6)] ease-out",
              // The floating card is hidden until a row is active.
              "@xl:pointer-fine:group-data-[open=false]/peek:opacity-0",
              "motion-safe:@xl:pointer-fine:group-data-[open=false]/peek:scale-96"
            )}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                data-state={layerState(index, activeIndex)}
                className={cn(
                  "group/layer bg-card absolute inset-0 overflow-hidden",
                  // The incoming preview uncovers from the direction of
                  // travel while the outgoing one is cut away on the same
                  // edge, so there is never double text or an empty card.
                  "[clip-path:inset(0)] data-[state=after]:[clip-path:inset(100%_0_0_0)] data-[state=before]:[clip-path:inset(0_0_100%_0)]",
                  "motion-safe:transition-[clip-path] motion-safe:duration-(--duration) motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]"
                )}
              >
                <div
                  className={cn(
                    "size-full",
                    // Both previews drift with the cut, like a print being
                    // dealt over the last one.
                    "motion-safe:transition-[translate] motion-safe:duration-(--duration) motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "motion-safe:group-data-[state=after]/layer:translate-y-4 motion-safe:group-data-[state=before]/layer:-translate-y-4"
                  )}
                >
                  {item.preview}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}
