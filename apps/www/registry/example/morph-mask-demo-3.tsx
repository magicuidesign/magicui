"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { MorphMask, type MorphMaskShape } from "@/registry/magicui/morph-mask"

// Defined outside render: a function counts as the same shape only while it
// is the same function.
const shapes: readonly MorphMaskShape[] = [
  "squircle",
  "hexagon",
  // Eight soft scallops, from a radius function of the demo's own.
  (angle) => 0.76 + 0.07 * Math.cos(angle * 8),
]

const steps = [
  {
    label: "Connect",
    title: "Bring your team together",
    copy: "Connect your GitHub workspace with one secure authorization.",
  },
  {
    label: "Import",
    title: "Your history, ready to publish",
    copy: "Import merged pull requests and turn them into your first release.",
  },
  {
    label: "Go live",
    title: "Make every release count",
    copy: "Publish a changelog that keeps your customers in the loop.",
  },
]

/**
 * The old step lifts 4px and fades, and the new one rises in just behind
 * it, so the two barely overlap and the badge numeral stays sharp.
 */
const swap = {
  initial: { opacity: 0, y: 4 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.08, duration: 0.15, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.12, ease: "easeIn" },
  },
} as const

/**
 * With reduced motion, the step changes at once and nothing moves. It
 * animates the same keys as `swap`, so the server, which cannot know the
 * preference, renders the same styles as the client.
 */
const instantSwap = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0, transition: { duration: 0 } },
  exit: { opacity: 0, y: 0, transition: { duration: 0 } },
} as const

export default function MorphMaskDemo3() {
  // GitHub is already connected, so setup resumes on the import step.
  const [index, setIndex] = useState(1)
  const step = steps[index]
  const reduced = useReducedMotion()
  const stepSwap = reduced ? instantSwap : swap

  return (
    <section className="bg-background text-foreground w-full space-y-8 rounded-xl border p-6 sm:p-8">
      <fieldset
        aria-label="Setup steps"
        className="flex min-w-0 flex-wrap gap-2"
      >
        {steps.map((item, position) => (
          <Button
            key={item.label}
            type="button"
            size="sm"
            variant={position === index ? "default" : "outline"}
            aria-pressed={position === index}
            onClick={() => setIndex(position)}
          >
            {position < index && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
            {item.label}
          </Button>
        ))}
      </fieldset>
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <MorphMask shapes={shapes} index={index} className="w-20 shrink-0">
          {/* Only the digits swap; the badge itself never fades. */}
          <div className="bg-primary text-primary-foreground grid place-items-center *:col-start-1 *:row-start-1">
            <AnimatePresence initial={false}>
              <motion.span
                key={index}
                {...stepSwap}
                className="text-[28px] font-semibold tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
        </MorphMask>
        <div
          aria-live="polite"
          className="grid max-w-xs *:col-start-1 *:row-start-1"
        >
          <AnimatePresence initial={false}>
            <motion.div key={index} {...stepSwap} className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">
                Step {index + 1} of {steps.length}
              </p>
              <h3 className="text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.copy}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
