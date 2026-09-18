"use client"

import { useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { MorphMask, type MorphMaskShape } from "@/registry/magicui/morph-mask"

interface Feature {
  title: string
  copy: string
  detail: string
  /** Every tile rests on the squircle and opens into its own shape. */
  shapes: readonly MorphMaskShape[]
  icon: ReactNode
}

const features: Feature[] = [
  {
    title: "Audit logs",
    copy: "Every change, accounted for.",
    detail:
      "Audit logs keep a searchable record of every workspace change for 365 days.",
    shapes: ["squircle", "clover"],
    icon: (
      <>
        <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="2.5" width="6" height="3" rx="1" />
        <path d="M9 11h6M9 15h4" />
      </>
    ),
  },
  {
    title: "Single sign-on",
    copy: "One identity across your workspace.",
    detail:
      "Single sign-on connects your team to Northbeam through your existing identity provider.",
    shapes: ["squircle", "circle"],
    icon: (
      <>
        <circle cx="8" cy="15" r="4" />
        <path d="m10.8 12.2 8.7-8.7M16.5 6.5l2 2M14 9l1.5 1.5" />
      </>
    ),
  },
  {
    title: "Usage alerts",
    copy: "Get notified before a project hits its limit.",
    detail:
      "Usage alerts notify workspace owners before a project reaches its monthly limit.",
    shapes: ["squircle", "hexagon"],
    icon: (
      <>
        <path d="M6 15.5V11a6 6 0 0 1 12 0v4.5l1.5 2.5h-15Z" />
        <path d="M10 21a2.2 2.2 0 0 0 4 0" />
      </>
    ),
  },
]

/** Seconds the tile morph takes. The card highlight's `duration-200` matches. */
const MORPH_SECONDS = 0.2

export default function MorphMaskDemo2() {
  // The pressed card, chosen by click or keyboard focus.
  const [selected, setSelected] = useState(0)
  // The card under the pointer. It previews the card without selecting it,
  // so the pressed state and the description below stay put.
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="bg-background text-foreground w-full rounded-xl border p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {features.map((feature, index) => {
          const pressed = index === selected
          const previewed = index === hovered && !pressed

          // The button fills the whole card, so the whole card responds. A
          // button may only hold text, so the icon tile sits beside it, over
          // its empty top padding. The highlight and the tile change in the
          // same render and settle over the same time.
          return (
            <div key={feature.title} className="relative">
              <button
                type="button"
                aria-pressed={pressed}
                onPointerEnter={() => setHovered(index)}
                onPointerLeave={() =>
                  setHovered((current) => (current === index ? null : current))
                }
                onFocus={() => setSelected(index)}
                onClick={() => setSelected(index)}
                className={cn(
                  "flex size-full cursor-pointer flex-col rounded-xl border p-5 pt-20 text-left transition-[background-color,border-color,box-shadow] duration-200 ease-out",
                  "focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]",
                  pressed && "bg-muted/50",
                  previewed && "bg-muted/25"
                )}
              >
                <span className="block font-medium">{feature.title}</span>
                <span className="text-muted-foreground mt-1 block text-sm">
                  {feature.copy}
                </span>
              </button>
              {/* The squircle sits inside its box, so the box starts a little
                  left of the text for the tile's edge to line up with it. */}
              <MorphMask
                aria-hidden="true"
                index={pressed || previewed ? 1 : 0}
                shapes={feature.shapes}
                duration={MORPH_SECONDS}
                className="pointer-events-none absolute top-3.5 left-3.5 w-14"
              >
                <span className="bg-foreground text-background grid place-items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-6"
                  >
                    {feature.icon}
                  </svg>
                </span>
              </MorphMask>
            </div>
          )
        })}
      </div>
      <p
        aria-live="polite"
        className="text-muted-foreground mt-5 min-h-10 text-sm"
      >
        {features[selected].detail}
      </p>
    </section>
  )
}
