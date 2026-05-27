"use client"

import { useState } from "react"

import { PoisedSurface } from "@/registry/magicui/poised-surface"

const FEATURES = [
  "Unlimited projects and collections",
  "Private team workspaces",
  "Priority support from real people",
  "Single sign-on and audit logs",
]

export default function PoisedSurfaceDemo3() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="bg-background text-foreground w-full space-y-8 overflow-hidden rounded-2xl px-6 py-16 sm:px-10">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-balance">
          Less admin. More shipping.
        </h2>
        <p className="text-muted-foreground text-sm text-balance">
          A workspace that grows at your team&apos;s pace.
        </p>
      </div>
      <PoisedSurface className="mx-auto max-w-3xl">
        <div className="border-border bg-card text-card-foreground grid gap-8 rounded-[inherit] border p-6 sm:grid-cols-2 sm:p-8">
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm font-medium">
              Studio · Team plan
            </p>
            <h3 className="text-3xl font-semibold tabular-nums">
              ${annual ? 24 : 29}
              <span className="text-muted-foreground text-sm font-normal">
                {" "}
                / seat / month
              </span>
            </h3>
            <p className="text-muted-foreground text-sm">
              Shared projects, unlimited notes, and a calmer way to work.
            </p>
            <button
              type="button"
              aria-pressed={annual}
              onClick={() => setAnnual((current) => !current)}
              className="border-border hover:bg-muted aria-pressed:bg-muted rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Pay yearly · save 17%
            </button>
            <p aria-live="polite" className="text-muted-foreground text-xs">
              {annual
                ? "$288 per seat, billed yearly."
                : "$29 per seat, billed monthly."}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <ul className="space-y-3 text-sm">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="bg-foreground mt-1.75 size-1.5 shrink-0 rounded-full"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://magicui.design/docs"
                className="bg-foreground text-background rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Start your trial
              </a>
              <a
                href="https://magicui.design/docs"
                className="rounded-sm text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Read the docs
              </a>
            </div>
          </div>
        </div>
      </PoisedSurface>
    </section>
  )
}
