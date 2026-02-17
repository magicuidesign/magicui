"use client"

import { useState } from "react"

import { DepartureBoard } from "@/registry/magicui/departure-board"

const START_PLACE = 4_718
const PRIORITY_JUMP = 250
/** Quick turns, so the digits passed on the way never read as a number. */
const TURN_DURATION = 0.6

const formatPlace = (place: number) => `#${place.toLocaleString("en-US")}`

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  )
}

export default function DepartureBoardDemo3() {
  const [place, setPlace] = useState(START_PLACE)
  const moved = place !== START_PLACE

  return (
    <section className="border-border bg-background text-foreground @container flex w-[28rem] max-w-full flex-col items-center gap-6 rounded-xl border px-5 py-12 text-center">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your place in line</h2>
        <p className="text-muted-foreground text-sm text-balance">
          The next wave of early access opens on Friday.
        </p>
      </div>
      {/* Sized to the card, so the number fits on phones. */}
      <DepartureBoard
        duration={TURN_DURATION}
        className="text-[clamp(2.25rem,17cqi,3.75rem)]"
      >
        {formatPlace(place)}
      </DepartureBoard>
      {/* Once used, the pass turns into a quiet outline with a check. */}
      <button
        type="button"
        aria-disabled={moved}
        onClick={() => setPlace(START_PLACE - PRIORITY_JUMP)}
        className="bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-ring focus-visible:ring-offset-background aria-disabled:border-border aria-disabled:bg-background aria-disabled:text-foreground inline-flex items-center gap-2 rounded-lg border border-transparent px-5 py-2.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-disabled:pointer-events-none"
      >
        {moved && <CheckIcon />}
        {moved ? "Priority pass applied" : "Use a priority pass"}
      </button>
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {moved
          ? `You moved up ${PRIORITY_JUMP} places to ${formatPlace(place)}.`
          : `Skip ${PRIORITY_JUMP} places in one go.`}
      </p>
    </section>
  )
}
