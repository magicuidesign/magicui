"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { ExpandingFrame } from "@/registry/magicui/expanding-frame"

const team = ["Maya", "Jules", "Theo"] as const
type Person = (typeof team)[number]

interface Engineer {
  initial: string
  /** A ring in one of MagicUI's shine border colors. */
  ring: string
  /** Hours on call this week. */
  hours: number
}

const people: Record<Person, Engineer> = {
  Maya: { initial: "M", ring: "ring-[#FFBE7B]", hours: 72 },
  Jules: { initial: "J", ring: "ring-[#A07CFE]", hours: 48 },
  Theo: { initial: "T", ring: "ring-[#FE8FB5]", hours: 48 },
}

const week: { day: string; date: number; primary: Person; backup: Person }[] = [
  { day: "M", date: 15, primary: "Maya", backup: "Theo" },
  { day: "T", date: 16, primary: "Maya", backup: "Theo" },
  { day: "W", date: 17, primary: "Jules", backup: "Maya" },
  { day: "T", date: 18, primary: "Jules", backup: "Maya" },
  { day: "F", date: 19, primary: "Theo", backup: "Jules" },
  { day: "S", date: 20, primary: "Theo", backup: "Jules" },
  { day: "S", date: 21, primary: "Maya", backup: "Theo" },
]
const today = 17

const schedules = ["Platform", "Billing", "Mobile"]

/** Consecutive days with the same person, merged into one shift. */
function shiftsFor(role: "primary" | "backup") {
  const shifts: { person: Person; start: number; days: number }[] = []
  for (const [index, entry] of week.entries()) {
    const last = shifts.at(-1)
    if (last?.person === entry[role]) {
      last.days += 1
    } else {
      shifts.push({ person: entry[role], start: index, days: 1 })
    }
  }
  return shifts
}

const rows = [
  { label: "Primary", shifts: shiftsFor("primary") },
  { label: "Backup", shifts: shiftsFor("backup") },
]

// The chrome around the rota fills the margins the resting frame hides, so
// it comes into view as the frame opens. Frames narrower than `22rem` have
// no room for the rails, so they keep only the bars and centre the rota.
const chrome = "border-border bg-muted/40 text-foreground/70 shrink-0"
const bar = cn(chrome, "flex h-[9cqw] items-center gap-2 px-[4cqw]")
const rail = cn(
  chrome,
  "hidden w-[var(--frame-inset)] flex-col gap-1.5 px-[2cqw] py-[4cqw] motion-reduce:w-auto",
  "@min-[22rem]:flex"
)

// An initial in a ring. Names are given in text beside it, so screen readers
// skip it.
function Avatar({ person }: { person: Person }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-background text-foreground flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] leading-none font-medium ring-[1.5px] @min-[22rem]:size-5",
        people[person].ring
      )}
    >
      {people[person].initial}
    </span>
  )
}

function SchedulesRail() {
  return (
    <div className={cn(rail, "border-r")}>
      <p className="text-foreground truncate font-medium">Schedules</p>
      <ul className="space-y-1">
        {schedules.map((name, index) => (
          <li
            key={name}
            className={cn(
              "flex items-center gap-1.5 rounded-md p-1",
              index === 0 && "bg-muted text-foreground font-medium"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                index === 0 ? "bg-foreground" : "bg-muted-foreground/50"
              )}
            />
            <span className="min-w-0 truncate">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HoursRail() {
  return (
    <div className={cn(rail, "border-l")}>
      <p className="text-foreground truncate font-medium">This week</p>
      <ul className="space-y-2">
        {team.map((person) => (
          <li key={person} className="flex items-center gap-1.5 p-1">
            <Avatar person={person} />
            <span className="sr-only">{person}</span>
            <span className="tabular-nums">{people[person].hours}h</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Rota() {
  return (
    <div className="border-border bg-background flex flex-col rounded-2xl border text-[10px] @min-[22rem]:text-[11px]">
      {/* The schedule's name sits in the band above the resting frame. */}
      <div className={cn(bar, "border-b")}>
        <span className="text-foreground font-semibold tracking-tight">
          Relay
        </span>
        <span aria-hidden="true">/</span>
        <span className="truncate">Platform team</span>
      </div>

      <div className="flex min-h-0 flex-1">
        <SchedulesRail />

        {/*
          The resting frame shows this column. Before it arrives, the frame
          shows about the middle half of the rota, and the padding keeps the
          text inside that. Narrow frames have no rails, so the column spans
          the frame and the same padding on each side centres the rota. These
          widths match `inset={28}` and the default `scale`.
        */}
        <div className="bg-background flex min-w-0 flex-1 flex-col justify-center px-[28cqw] @min-[22rem]:px-[8cqw]">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-xs font-semibold tracking-tight @min-[22rem]:text-sm">
              Platform on-call
            </h3>
            <span className="border-border bg-muted ml-auto hidden rounded-full border px-2 py-0.5 font-medium @min-[22rem]:block">
              Covered
            </span>
          </div>
          <p className="text-muted-foreground hidden @min-[22rem]:block">
            June 15–21 · UTC
          </p>

          <div className="mt-2 grid grid-cols-7 gap-x-1 gap-y-0.5 @min-[22rem]:mt-3 @min-[22rem]:gap-1">
            {week.map((entry) => (
              <span
                key={entry.date}
                className="text-muted-foreground flex flex-col items-center text-[9px] tabular-nums @min-[22rem]:text-[11px]"
              >
                <span className="hidden @min-[22rem]:block">{entry.day}</span>
                <span
                  className={cn(
                    "text-foreground flex size-3.5 items-center justify-center rounded-full font-medium @min-[22rem]:size-5",
                    entry.date === today && "bg-foreground text-background"
                  )}
                >
                  {entry.date}
                </span>
              </span>
            ))}
            {rows.map((row) => (
              <div
                key={row.label}
                className="col-span-7 grid grid-cols-subgrid gap-y-0.5 @min-[22rem]:gap-y-1"
              >
                <span className="text-muted-foreground col-span-7 pt-0.5 leading-3 @min-[22rem]:pt-1 @min-[22rem]:leading-4">
                  {row.label}
                </span>
                {/* Every shift sits in a tile. On narrow frames a one-day
                    column is about as wide as the avatar, so it shows the
                    avatar alone. */}
                {row.shifts.map((shift) => (
                  <div
                    key={shift.start}
                    className={cn(
                      "text-foreground flex h-6 min-w-0 items-center justify-center gap-1 font-medium @min-[22rem]:h-8",
                      "@min-[22rem]:border-border @min-[22rem]:bg-muted @min-[22rem]:rounded-md @min-[22rem]:border",
                      shift.days > 1 && "bg-muted rounded-md"
                    )}
                    style={{
                      gridColumn: `${shift.start + 1} / span ${shift.days}`,
                    }}
                  >
                    <Avatar person={shift.person} />
                    {/* A name needs two days of room on a wide frame. */}
                    <span
                      className={cn(
                        "truncate",
                        shift.days > 1 ? "@max-[26rem]:sr-only" : "sr-only"
                      )}
                    >
                      {shift.person}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* The smallest frames keep to the rota itself. */}
          <p className="border-border mt-2 flex items-center gap-1.5 border-t pt-1.5 leading-3.5 @max-[16rem]:hidden @min-[22rem]:mt-4 @min-[22rem]:pt-3 @min-[22rem]:leading-4">
            <span className="size-1.5 shrink-0 rounded-full bg-[#A07CFE]" />
            <span className="truncate font-medium">Jules is on call</span>
            <span className="text-muted-foreground ml-auto hidden shrink-0 @min-[22rem]:inline">
              until Fri 09:00
            </span>
          </p>
        </div>

        <HoursRail />
      </div>

      {/* The escalation policy sits in the band below the resting frame. */}
      <div className={cn(bar, "border-t")}>
        <span className="truncate">Escalates to backup after 5 min</span>
        <button
          type="button"
          className="border-border bg-background text-foreground focus-visible:outline-ring ml-auto hidden h-6 shrink-0 rounded-md border px-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 @min-[22rem]:block"
        >
          Request a swap
        </button>
      </div>
    </div>
  )
}

export default function ExpandingFrameDemo3() {
  const page = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: page })
  // The page's edges fade while the hero is in view, softening what the fold
  // cuts, and are sharp again before the open frame reaches them.
  const fade = useTransform(scrollY, [0, 160], [40, 0])
  const maskImage = useTransform(() =>
    fade.get() > 0
      ? `linear-gradient(transparent, #000 ${fade.get()}px, #000 calc(100% - ${fade.get()}px), transparent)`
      : "none"
  )

  return (
    <motion.div
      ref={page}
      style={{ maskImage }}
      className="bg-background text-foreground @container-size relative h-[540px] w-screen max-w-full overflow-y-auto"
    >
      {/* Room below the frame, so its pin releases on short screens too. On
          narrow screens the frame spans the page, as the text keeps its own
          margin. */}
      <div className="mx-auto max-w-md pt-12 pb-40">
        <div className="px-6 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Relay · On-call
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
            A quieter week starts here.
          </h2>
          <p className="text-muted-foreground mt-2 text-sm text-balance">
            Clear ownership, covered handoffs and room to switch off.
          </p>
        </div>

        <ExpandingFrame
          inset={28}
          travel={260}
          frameClassName="aspect-square rounded-2xl"
          className="mt-8"
        >
          <Rota />
        </ExpandingFrame>

        <div className="mt-8 px-6 text-center">
          <p className="text-sm font-medium">Every handoff, accounted for.</p>
          <p className="text-muted-foreground mt-1 text-sm">
            The right person is always in the loop.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
