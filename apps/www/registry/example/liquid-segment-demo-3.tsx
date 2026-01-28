"use client"

import { useId, useState } from "react"

import { LiquidSegment } from "@/registry/magicui/liquid-segment"

const descriptions: Record<string, string> = {
  daily: "A short summary in your inbox every morning.",
  weekly: "Your week in focus, delivered every Monday.",
  monthly: "The bigger picture, on the first of each month.",
}

export default function LiquidSegmentDemo3() {
  const headingId = useId()
  const [frequency, setFrequency] = useState("weekly")
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="bg-card text-card-foreground flex w-xl max-w-full flex-col gap-5 rounded-xl border p-4 shadow sm:p-6">
      <div className="space-y-1">
        <h2 id={headingId} className="font-semibold">
          Release digest
        </h2>
        <p className="text-muted-foreground text-sm">
          {descriptions[frequency]}
        </p>
      </div>
      <LiquidSegment
        aria-labelledby={headingId}
        color="#9c40ff"
        className="w-full text-sm [--label-color:white] sm:text-base"
        value={frequency}
        onValueChange={setFrequency}
        options={[
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly", disabled: true },
        ]}
      />
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          setSubscribed(true)
        }}
      >
        <input
          type="email"
          required
          aria-label="Email"
          autoComplete="email"
          placeholder="you@company.com"
          className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:text-sm"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/50 h-9 shrink-0 cursor-pointer rounded-md px-4 text-sm font-medium shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
        >
          Subscribe
        </button>
      </form>
      <p aria-live="polite" className="text-muted-foreground text-xs">
        {subscribed
          ? "Check your inbox to confirm your subscription."
          : "Yearly recaps are coming soon."}
      </p>
    </div>
  )
}
