import type { ReactNode } from "react"

import { InkReveal } from "@/registry/magicui/ink-reveal"

const releases = [
  { version: "v3.0", name: "Faster checkout", shipped: "Today" },
  { version: "v2.9", name: "Annual plans", shipped: "Oct 21" },
  { version: "v2.8", name: "Team billing", shipped: "Oct 14" },
]

const dailyRevenue = [
  { day: "Mon", share: 28 },
  { day: "Tue", share: 41 },
  { day: "Wed", share: 34 },
  { day: "Thu", share: 58 },
  { day: "Fri", share: 49 },
  { day: "Sat", share: 76 },
  { day: "Sun", share: 88 },
]

const weekly = [
  { label: "Revenue growth", value: "+12.8%" },
  { label: "Releases shipped", value: "4" },
  { label: "New customers", value: "218" },
]

const timeline = (
  <div className="flex h-full flex-col">
    <p className="text-muted-foreground text-xs">Production</p>
    <ol className="mt-3 flex flex-1 flex-col justify-around text-xs">
      {releases.map(({ version, name, shipped }) => (
        <li key={version} className="flex items-center gap-2">
          <span className="bg-foreground size-1.5 shrink-0 rounded-full" />
          <span className="flex-1 truncate font-medium">
            {name} <span className="text-muted-foreground">{version}</span>
          </span>
          <span className="text-muted-foreground shrink-0">{shipped}</span>
        </li>
      ))}
    </ol>
  </div>
)

const attribution = (
  <div className="flex h-full flex-col">
    <p className="text-muted-foreground text-xs">Attributed revenue</p>
    <p className="text-xl font-semibold tracking-tight tabular-nums">$68,420</p>
    <div
      aria-hidden="true"
      className="border-border mt-3 flex min-h-0 flex-1 items-end gap-1.5 border-b"
    >
      {dailyRevenue.map(({ day, share }, index) => (
        <div
          key={day}
          className={
            index === dailyRevenue.length - 1
              ? "bg-foreground flex-1 rounded-t-sm"
              : "bg-muted-foreground/30 flex-1 rounded-t-sm"
          }
          style={{ height: `${share}%` }}
        />
      ))}
    </div>
    <p className="text-muted-foreground mt-2 text-xs">Checkout v3.0, 7 days</p>
  </div>
)

const digest = (
  <div className="flex h-full flex-col">
    <p className="text-muted-foreground text-xs">October 20 to 26</p>
    <p className="font-semibold tracking-tight">A strong week.</p>
    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
      Checkout v3.0 lifted conversion by 0.6 points across all regions.
    </p>
    <dl className="border-border divide-border mt-auto divide-y border-t text-xs">
      {weekly.map(({ label, value }) => (
        <div key={label} className="flex justify-between gap-2 py-2">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="font-medium tabular-nums">{value}</dd>
        </div>
      ))}
    </dl>
  </div>
)

const features: {
  title: string
  copy: string
  delay: number
  art: ReactNode
}[] = [
  {
    title: "Release timeline",
    copy: "One shared record of what shipped and what changed.",
    delay: 0,
    art: timeline,
  },
  {
    title: "Revenue attribution",
    copy: "See the revenue behind each product decision.",
    delay: 0.2,
    art: attribution,
  },
  {
    title: "Weekly digest",
    copy: "Your team's progress, ready for Monday morning.",
    delay: 0.4,
    art: digest,
  },
]

export default function InkRevealDemo2() {
  return (
    <section className="bg-background text-foreground w-full px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 space-y-2">
          <p className="text-muted-foreground text-xs font-medium">
            Built for product teams
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            The full story of every ship.
          </h2>
        </div>
        {/* Each card spans three shared rows, so frames and titles line up. */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-x-6 md:gap-y-3">
          {features.map(({ title, copy, delay, art }) => (
            <article
              key={title}
              className="flex flex-col gap-3 md:row-span-3 md:grid md:grid-rows-subgrid"
            >
              <InkReveal
                delay={delay}
                className="border-border bg-card h-full rounded-xl border"
              >
                <div className="aspect-[4/3] p-4">{art}</div>
              </InkReveal>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
