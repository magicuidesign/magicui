import { useId } from "react"

import { cn } from "@/lib/utils"
import { ScrollTrace } from "@/registry/magicui/scroll-trace"

interface RoadmapItem {
  status: string
  dot: string
  title: string
  description: string
  note: string
  included?: string[]
}

const items: RoadmapItem[] = [
  {
    status: "Shipped",
    dot: "bg-muted-foreground",
    title: "Preview environments",
    description:
      "Review a running branch together, leave feedback in context and promote the exact build everyone approved.",
    note: "Available on every plan",
    included: [
      "A private URL for every branch and pull request",
      "Comments pinned to the page they are about",
    ],
  },
  {
    status: "In progress",
    dot: "bg-muted-foreground",
    title: "Multi-region releases",
    description:
      "Roll out to each region in turn, with health checks that hold the release before customers notice a problem.",
    note: "Private beta · November 2026",
    included: [
      "Ordered rollouts across up to six regions",
      "Automatic pause when a health check fails",
      "Per-region traffic and error dashboards",
      "Instant rollback for a single region",
    ],
  },
  {
    status: "Planned",
    dot: "bg-muted-foreground/50",
    title: "Release policies",
    description:
      "Set approval rules, deployment windows and owners once, and give every project the same path to production.",
    note: "Early 2027 · Scope still open",
  },
]

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5 transition-transform duration-150 group-open/included:rotate-90 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function Included({ points }: { points: string[] }) {
  return (
    <details className="group/included mt-3">
      <summary className="text-foreground focus-visible:ring-ring/50 -mx-1.5 inline-flex cursor-pointer list-none items-center gap-1 rounded-md px-1.5 py-0.5 text-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] [&::-webkit-details-marker]:hidden">
        <Chevron />
        <span className="group-open/included:hidden">What&apos;s included</span>
        <span className="hidden group-open/included:inline">Hide details</span>
      </summary>
      {/* No layout box while closed, so nothing hides under the next item. */}
      <ul className="text-muted-foreground mt-2 hidden list-disc space-y-1.5 ps-4 text-sm leading-relaxed group-open/included:block">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </details>
  )
}

export default function ScrollTraceDemo3() {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="bg-background h-[540px] w-full overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent,black_32px,black_calc(100%_-_48px),transparent)]"
    >
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-14">
        <header className="max-w-xl">
          <p className="text-muted-foreground text-sm font-medium">Roadmap</p>
          <h2
            id={headingId}
            className="text-foreground mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Where Dockyard is headed
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            What shipped this quarter, what we are building now and what comes
            next.
          </p>
        </header>

        {/* A wider gutter from sm leaves room for the stronger bow. */}
        <ScrollTrace curvature={24} className="mt-10 space-y-18 sm:ps-20">
          {items.map((item) => (
            <article key={item.title} className="group">
              <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs">
                <span className={cn("size-1.5 rounded-full", item.dot)} />
                {item.status}
              </span>
              <h3 className="text-muted-foreground group-data-reached:text-foreground mt-3 text-xl font-semibold tracking-tight transition-colors duration-150 motion-reduce:transition-none">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-prose leading-relaxed">
                {item.description}
              </p>
              <p className="text-muted-foreground mt-3 text-sm">{item.note}</p>
              {item.included && <Included points={item.included} />}
            </article>
          ))}
        </ScrollTrace>

        <footer className="mt-16 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            Updated monthly. Dates are estimates and can move.
          </p>
        </footer>
      </div>
    </section>
  )
}
