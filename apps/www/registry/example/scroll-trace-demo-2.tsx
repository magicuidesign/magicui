import { useId } from "react"

import { ScrollTrace } from "@/registry/magicui/scroll-trace"

interface Release {
  version: string
  title: string
  date: string
  label: string
  changes: string[]
  fixes?: string[]
}

const releases: Release[] = [
  {
    version: "v2.8",
    title: "Safer releases",
    date: "2026-10-28",
    label: "October 28, 2026",
    changes: [
      "Pause a rollout automatically when error rates climb.",
      "Compare build output between any two deployments.",
      "Restore environment variables from a saved snapshot.",
    ],
    fixes: [
      "Preview URLs now work for branch names with slashes.",
      "Large build caches no longer time out while uploading.",
      "The deploy button stays disabled while a rollback runs.",
    ],
  },
  {
    version: "v2.7",
    title: "Faster feedback",
    date: "2026-10-14",
    label: "October 14, 2026",
    changes: [
      "Share private previews with your whole team.",
      "Cached builds start up to 40% faster.",
    ],
    fixes: ["Live logs keep streaming past the ten-minute mark."],
  },
  {
    version: "v2.6.1",
    title: "Patch release",
    date: "2026-10-02",
    label: "October 2, 2026",
    changes: [
      "Deployment history shows times in your own time zone.",
      "CSV exports keep accented project names intact.",
    ],
  },
  {
    version: "v2.6",
    title: "Project insights",
    date: "2026-09-30",
    label: "September 30, 2026",
    changes: [
      "See how long each deployment step takes.",
      "Filter release history by branch or author.",
      "Export a release audit as CSV.",
      "Pin the checks you watch most to the project overview.",
    ],
    fixes: [
      "Sorting release history by duration is stable again.",
      "Branch filters no longer reset when you switch projects.",
    ],
  },
]

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-3.5 transition-transform duration-150 group-open/fixes:rotate-90 motion-reduce:transition-none"
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

function Fixes({ fixes }: { fixes: string[] }) {
  const noun = fixes.length === 1 ? "fix" : "fixes"

  return (
    <details className="group/fixes mt-3">
      <summary className="text-foreground focus-visible:ring-ring/50 -mx-1.5 inline-flex cursor-pointer list-none items-center gap-1 rounded-md px-1.5 py-0.5 text-sm font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] [&::-webkit-details-marker]:hidden">
        <Chevron />
        <span className="group-open/fixes:hidden">
          Show {fixes.length} {noun}
        </span>
        <span className="hidden group-open/fixes:inline">Hide {noun}</span>
      </summary>
      {/* No layout box while closed, so nothing hides under the next entry. */}
      <ul className="text-muted-foreground mt-2 hidden list-disc space-y-2 ps-4 text-sm leading-relaxed group-open/fixes:block">
        {fixes.map((fix) => (
          <li key={fix}>{fix}</li>
        ))}
      </ul>
    </details>
  )
}

export default function ScrollTraceDemo2() {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="bg-background h-[540px] w-full overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent,black_32px,black_calc(100%_-_48px),transparent)]"
    >
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-14">
        <header className="max-w-lg">
          <p className="text-muted-foreground text-sm font-medium">Changelog</p>
          <h2
            id={headingId}
            className="text-foreground mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Fresh from Dockyard
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            New features and fixes, newest first.
          </p>
        </header>

        <ScrollTrace
          curvature={0}
          colorFrom="#8b5cf6"
          colorTo="#ec4899"
          className="mt-10 space-y-14"
        >
          {releases.map((release) => (
            <article key={release.version} className="group">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-muted-foreground group-data-reached:text-foreground text-lg font-semibold tracking-tight transition-colors duration-150 motion-reduce:transition-none">
                  {release.version} · {release.title}
                </h3>
                <time
                  dateTime={release.date}
                  className="text-muted-foreground shrink-0 text-sm"
                >
                  {release.label}
                </time>
              </div>
              <ul className="text-muted-foreground mt-3 list-disc space-y-2 ps-4 text-sm leading-relaxed">
                {release.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
              {release.fixes && <Fixes fixes={release.fixes} />}
            </article>
          ))}
        </ScrollTrace>
      </div>
    </section>
  )
}
