"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { ExpandingFrame } from "@/registry/magicui/expanding-frame"

// Outline icons on a 16 px grid, one path each.
const icons = {
  libraries:
    "M8 2.5 13.5 5.25 8 8 2.5 5.25 8 2.5ZM2.5 8 8 10.75 13.5 8M2.5 10.75 8 13.5l5.5-2.75",
  previews:
    "M2.5 4.25c0-.97.78-1.75 1.75-1.75h7.5c.97 0 1.75.78 1.75 1.75v7.5c0 .97-.78 1.75-1.75 1.75h-7.5c-.97 0-1.75-.78-1.75-1.75v-7.5ZM2.5 6h11",
  releases: "M8 13.5v-11M3.75 6.75 8 2.5l4.25 4.25",
  feed: "M3 3.5a9.5 9.5 0 0 1 9.5 9.5M3 7.5A5.5 5.5 0 0 1 8.5 13M3.5 12.5h.01",
  guide: "M4 2.5h5.5L12 5v8.5H4v-11ZM9.5 2.5V5H12M6.5 8h3M6.5 10.5h3",
}

const features = [
  { title: "Shared libraries", icon: icons.libraries },
  { title: "Instant previews", icon: icons.previews },
  { title: "One-click releases", icon: icons.releases },
]

const changelog = [
  {
    kind: "New",
    dot: "bg-[#9c40ff]",
    text: "Libraries sync everywhere",
    id: "#2184",
  },
  {
    kind: "Improved",
    dot: "bg-[#ffaa40]",
    text: "Previews build 2x faster",
    id: "#2131",
  },
  {
    kind: "Fixed",
    dot: "bg-muted-foreground",
    text: "Exports keep font weights",
    id: "#2097",
  },
]

const releases = [
  { version: "4.2", date: "Jun 24, 2026" },
  { version: "4.1", date: "Apr 30, 2026" },
  { version: "4.0", date: "Feb 12, 2026" },
  { version: "3.9", date: "Dec 4, 2025" },
  { version: "3.8", date: "Oct 9, 2025" },
]

const stats = [
  { value: "12", label: "New features" },
  { value: "38", label: "Fixes" },
  { value: "4", label: "Integrations" },
]

const contributors = ["AK", "MR", "JS", "LT"]

// The house gradient, used only for small accents.
const accent = "bg-linear-to-r from-[#ffaa40] to-[#9c40ff]"

// The window's chrome is tinted, so the open frame shows where it ends.
const chrome = "border-border bg-muted/40 text-foreground/70 shrink-0"

// The bars fill the bands the resting frame hides above and below.
const bar = cn(chrome, "flex h-7 items-center gap-3 px-3 @min-[40rem]:h-12")

// Before it arrives, the frame shows the middle 70% of a narrow surface and
// 46% of a wide one. The headline, the tiles and the changelog's text stay
// inside a slightly narrower track, so that first view cuts through no word
// or card. These widths match `inset={14}`; retune them if you change it.
const firstView = "w-[67cqw] @min-[40rem]:w-[42cqw]"
const firstViewMax = "max-w-[67cqw] @min-[40rem]:max-w-[42cqw]"

// Narrow frames have no rails, so the changelog shares the tiles' column and
// their padding. Wide frames let it span the column: its middle track is the
// first view, and the kind and id tracks fill in as the frame settles.
const changelogCard = "w-[67cqw] @min-[40rem]:w-full"
const changeRow = cn(
  "grid grid-cols-[0_minmax(0,1fr)_0] items-center px-2 @min-[30rem]:px-2.5",
  "@min-[40rem]:grid-cols-[minmax(0,1fr)_42cqw_minmax(0,1fr)] @min-[40rem]:px-0"
)

// Wide frames fill the side margins the resting frame hides with rails.
const rail = cn(
  chrome,
  "hidden w-[var(--frame-inset)] flex-col gap-3 py-4 motion-reduce:w-auto",
  "@min-[40rem]:flex @min-[40rem]:px-3 @min-[56rem]:px-4"
)

function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-3.5 shrink-0", className)}
    >
      <path d={path} />
    </svg>
  )
}

function TopBar() {
  return (
    <div className={cn(bar, "border-b @min-[40rem]:px-4")}>
      <p className="text-foreground flex items-center gap-1.5 font-semibold tracking-tight">
        <span className={cn(accent, "size-3 rounded-[4px]")} />
        Forma
      </p>
      <span className="hidden @min-[30rem]:inline">Changelog</span>
      <span className="ml-auto hidden @min-[40rem]:inline">Docs</span>
      <span className="ml-auto @min-[40rem]:ml-0">Pricing</span>
      <button
        type="button"
        className="border-border bg-background text-foreground focus-visible:outline-ring hidden h-7 rounded-md border px-2.5 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 @min-[40rem]:block"
      >
        Subscribe
      </button>
    </div>
  )
}

function BottomBar() {
  return (
    <div className={cn(bar, "justify-between border-t @min-[40rem]:px-4")}>
      <span className="truncate">Released June 24, 2026</span>
      <span className="hidden shrink-0 @min-[30rem]:inline">
        forma.app/changelog/4.2
      </span>
    </div>
  )
}

function ReleasesRail() {
  return (
    <div className={cn(rail, "border-r")}>
      <p className="text-foreground font-medium">Releases</p>
      <ol className="-mx-1.5 space-y-0.5">
        {releases.map((release, index) => (
          <li
            key={release.version}
            className={cn(
              "rounded-md px-1.5 py-1",
              index === 0 && "bg-muted text-foreground"
            )}
          >
            <span className="flex items-center gap-1.5 font-medium tabular-nums">
              {release.version}
              {index === 0 && (
                <span className={cn(accent, "size-1.5 rounded-full")} />
              )}
            </span>
            <span className="block truncate tabular-nums">{release.date}</span>
          </li>
        ))}
      </ol>
      <p className="mt-auto flex items-center gap-1.5">
        <Icon path={icons.feed} className="size-3" />
        <span className="truncate">RSS feed</span>
      </p>
    </div>
  )
}

function StatsRail() {
  return (
    <div className={cn(rail, "border-l")}>
      <p className="text-foreground font-medium">In 4.2</p>
      <dl className="space-y-2.5">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="truncate">{stat.label}</dt>
            <dd className="text-foreground text-sm font-semibold tabular-nums @min-[56rem]:text-base">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="border-border border-t pt-3">
        <p className="truncate">Contributors</p>
        <div className="mt-1.5 flex -space-x-1">
          {contributors.map((initials) => (
            <span
              key={initials}
              className="border-border bg-background text-foreground flex size-5 items-center justify-center rounded-full border text-[8px] font-medium @min-[56rem]:size-6 @min-[56rem]:text-[9px]"
            >
              {initials}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-auto flex items-center gap-1.5">
        <Icon path={icons.guide} className="size-3" />
        <span className="truncate">Upgrading</span>
      </p>
    </div>
  )
}

function Announcement() {
  return (
    <div
      className={cn(
        "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-4 @min-[40rem]:gap-5",
        // Narrow frames have no rails, so the content keeps clear of the
        // margin the resting frame hides.
        "px-[calc(var(--frame-inset)+0.5rem)] @min-[40rem]:px-6 @min-[56rem]:px-8"
      )}
    >
      <div className="relative flex flex-col items-center text-center">
        {/* A quiet grid behind the headline, fading out at its edges. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-x-20 -inset-y-8",
            "bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]",
            "bg-[size:24px_24px] bg-center",
            "[mask-image:radial-gradient(closest-side,#000,transparent)]"
          )}
        />
        <span className="border-border bg-background relative flex items-center gap-2 rounded-full border px-2.5 py-0.5 font-medium">
          <span className={cn(accent, "size-1.5 rounded-full")} />
          Forma 4.2
        </span>
        <h3 className="relative mt-3 text-2xl font-semibold tracking-tight whitespace-nowrap @min-[40rem]:text-3xl">
          4.2 has shipped
        </h3>
        <p
          className={cn(
            firstViewMax,
            "text-muted-foreground relative mt-1.5 text-balance @min-[40rem]:text-sm"
          )}
        >
          Shared libraries, instant previews and one-click releases.
        </p>
      </div>

      <ul
        className={cn(
          firstView,
          "grid gap-2 @min-[30rem]:grid-cols-3 @min-[40rem]:gap-3"
        )}
      >
        {features.map((feature) => (
          <li
            key={feature.title}
            className="border-border bg-card flex min-w-0 items-center gap-2.5 rounded-lg border p-2 @min-[30rem]:flex-col @min-[30rem]:items-start @min-[30rem]:p-2.5 @min-[56rem]:flex-row @min-[56rem]:items-center"
          >
            <span className="border-border bg-background text-foreground flex size-6 shrink-0 items-center justify-center rounded-md border">
              <Icon path={feature.icon} />
            </span>
            <span className="min-w-0 font-medium text-balance">
              {feature.title}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          changelogCard,
          "border-border overflow-hidden rounded-lg border"
        )}
      >
        <p
          className={cn(
            changeRow,
            "border-border bg-muted/50 text-foreground/70 h-7 border-b"
          )}
        >
          {/* Heads the kind pills, which the widest frames show. */}
          <span className="col-start-1 row-start-1 ml-3 hidden @min-[64rem]:block">
            Type
          </span>
          <span className="text-foreground col-start-2 row-start-1 font-medium">
            Changelog
          </span>
          <span className="col-start-2 row-start-1 justify-self-end tabular-nums @min-[40rem]:col-start-3 @min-[40rem]:pr-3">
            54 changes
          </span>
        </p>
        <ul>
          {changelog.map((change) => (
            <li
              key={change.id}
              className={cn(
                changeRow,
                "border-border h-8 border-b last:border-b-0"
              )}
            >
              {/* The widest frames have room for a labelled pill. */}
              <span className="border-border ml-3 hidden w-20 items-center gap-1.5 rounded-full border px-1.5 py-px font-medium @min-[64rem]:flex">
                <span
                  className={cn(change.dot, "size-1.5 shrink-0 rounded-full")}
                />
                {change.kind}
              </span>
              <span className="col-start-2 flex min-w-0 items-center gap-1.5">
                <span className="flex shrink-0 @min-[64rem]:hidden">
                  <span className={cn(change.dot, "size-1.5 rounded-full")} />
                  <span className="sr-only">{change.kind}</span>
                </span>
                <span className="truncate">{change.text}</span>
              </span>
              <span className="text-muted-foreground col-start-3 hidden justify-self-end pr-3 tabular-nums @min-[40rem]:inline">
                {change.id}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ReleaseNotes() {
  return (
    <div className="bg-background flex flex-col text-[11px] @min-[56rem]:text-xs">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <ReleasesRail />
        <Announcement />
        <StatsRail />
      </div>
      <BottomBar />
    </div>
  )
}

export default function ExpandingFrameDemo2() {
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
      <div className="mx-auto max-w-xl px-6 pt-12 pb-8 text-center">
        <p className="text-muted-foreground text-sm font-medium">
          The next chapter of Forma
        </p>
        <h2 className="mt-2 text-[1.75rem] leading-tight font-semibold tracking-tight text-balance @min-[40rem]:text-4xl">
          Less between idea and launch.
        </h2>
        <button
          type="button"
          className="bg-primary text-primary-foreground focus-visible:outline-ring mt-5 h-8 rounded-md px-4 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          What’s new in 4.2
        </button>
      </div>

      <ExpandingFrame inset={14} scale={1}>
        <ReleaseNotes />
      </ExpandingFrame>

      <div className="px-6 py-10 text-center">
        <p className="text-sm font-medium">Built for the whole team.</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Included in every Forma workspace, today.
        </p>
      </div>
    </motion.div>
  )
}
