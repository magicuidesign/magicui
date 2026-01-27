"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { LiquidSegment } from "@/registry/magicui/liquid-segment"

const plans = {
  monthly: { price: "$24", note: "Billed monthly. Cancel anytime." },
  annual: { price: "$19", note: "Billed yearly. Two months free." },
}

type Billing = keyof typeof plans

/** A new price fades up in step with the liquid instead of swapping hard. */
const fadeUp = cn(
  "motion-safe:transition-[opacity,translate] motion-safe:duration-200 motion-safe:ease-out",
  "starting:translate-y-1 starting:opacity-0"
)

export default function LiquidSegmentDemo() {
  const [billing, setBilling] = useState<Billing>("annual")
  const [hasSwitched, setHasSwitched] = useState(false)
  const plan = plans[billing]

  return (
    <div className="bg-card text-card-foreground flex w-md max-w-full flex-col gap-6 rounded-xl border p-6 shadow sm:p-8">
      <LiquidSegment
        aria-label="Billing period"
        className="w-full"
        value={billing}
        onValueChange={(next) => {
          setBilling(next)
          setHasSwitched(true)
        }}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "annual", label: "Annual" },
        ]}
      />
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Team</h2>
        <div key={billing} className={cn("space-y-1", hasSwitched && fadeUp)}>
          <p className="flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight">
              {plan.price}
            </span>
            <span className="text-muted-foreground">per seat, per month</span>
          </p>
          <p className="text-muted-foreground text-sm">{plan.note}</p>
        </div>
      </div>
      <button
        type="button"
        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/50 h-10 w-full cursor-pointer rounded-lg text-sm font-medium shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
      >
        Start free trial
      </button>
    </div>
  )
}
