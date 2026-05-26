import type { CSSProperties } from "react"

import { PoisedSurface } from "@/registry/magicui/poised-surface"
import { Safari } from "@/registry/magicui/safari"

// The app covers Safari's screen, below its toolbar (52 of 753 units).
const SAFARI_TOOLBAR = `${(52 / 753) * 100}%`

const GRAPHICS = ["Scoreboard", "Team lineup", "Match moments", "Player stats"]

const SETTINGS = [
  { label: "Position", value: "Top left" },
  { label: "Theme", value: "Club colours" },
  { label: "Transition", value: "Slide in · 300 ms" },
]

function PitchLines() {
  return (
    <div
      aria-hidden="true"
      className="border-foreground/10 absolute inset-3 hidden rounded-sm border @md:block @3xl:inset-5"
    >
      <div className="border-foreground/10 absolute inset-y-0 left-1/2 border-l" />
      <div className="border-foreground/10 absolute top-1/2 left-1/2 aspect-square h-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border" />
      <div className="border-foreground/10 absolute inset-y-[22%] left-0 w-[12%] border border-l-0" />
      <div className="border-foreground/10 absolute inset-y-[22%] right-0 w-[12%] border border-r-0" />
    </div>
  )
}

export default function PoisedSurfaceDemo() {
  return (
    <section className="bg-background text-foreground w-full overflow-hidden rounded-2xl px-2 py-16 sm:px-10 sm:py-8">
      <div className="@container mx-auto w-4xl max-w-full">
        <div className="mb-10 flex flex-col items-center gap-4 px-2 text-center @3xl:mb-8 @3xl:flex-row @3xl:items-end @3xl:justify-between @3xl:px-0 @3xl:text-left">
          <h2 className="max-w-md text-3xl font-semibold tracking-tight text-balance @lg:text-4xl">
            Put your next broadcast in a league of its own.
          </h2>
          <div className="flex max-w-xs flex-col items-center gap-4 @3xl:items-start">
            <p className="text-muted-foreground text-sm text-balance">
              Connected scores, lineups, and match moments, ready for your next
              stream.
            </p>
            <a
              href="https://magicui.design/docs"
              className="bg-foreground text-background inline-flex rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Explore Match Studio
            </a>
          </div>
        </div>
        <PoisedSurface>
          <div className="border-border bg-card @container relative grid overflow-hidden rounded-[inherit] border">
            {/* On a narrow card the app drops the browser frame and sets its own height. */}
            <Safari
              url="studio.matchday.app"
              aria-hidden="true"
              className="@max-md:hidden"
            />
            <div
              style={{ "--safari-toolbar": SAFARI_TOOLBAR } as CSSProperties}
              className="bg-card z-20 flex flex-col overflow-hidden p-4 @md:absolute @md:inset-0 @md:top-(--safari-toolbar) @md:p-5 @3xl:p-7"
            >
              <div className="flex items-center justify-between gap-2 text-xs @3xl:text-sm">
                <p className="font-semibold">
                  Match Studio
                  <span className="text-muted-foreground hidden font-normal @md:inline">
                    {" "}
                    / North League · Matchday 12
                  </span>
                </p>
                <span className="border-border text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Live preview
                </span>
              </div>
              <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-3 @md:mt-4 @md:grid-cols-[1fr_2fr] @md:gap-4 @3xl:mt-6 @3xl:grid-cols-[13rem_1fr] @3xl:gap-6">
                <div className="hidden min-h-0 flex-col gap-3 @md:flex @3xl:gap-4">
                  <div className="border-border rounded-lg border p-2 text-xs @3xl:text-sm">
                    <p className="text-muted-foreground px-2 py-1.5 text-xs font-medium tracking-wide uppercase">
                      Your graphics
                    </p>
                    {GRAPHICS.map((graphic, index) => (
                      <p
                        key={graphic}
                        className={
                          index === 0
                            ? "bg-muted rounded-md px-2 py-1.5 font-medium"
                            : "text-muted-foreground px-2 py-1.5"
                        }
                      >
                        {graphic}
                      </p>
                    ))}
                  </div>
                  <div className="border-border hidden rounded-lg border p-3 text-sm @3xl:block">
                    <p className="text-muted-foreground text-xs">Match feed</p>
                    <p className="mt-1 flex items-center gap-2 font-medium">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Synced 2s ago
                    </p>
                  </div>
                </div>
                <div className="flex min-h-0 flex-col gap-3 @3xl:gap-4">
                  <div className="bg-muted relative flex aspect-video min-h-0 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-lg @md:block @md:aspect-auto @md:flex-1">
                    <PitchLines />
                    <p className="text-foreground/70 text-xs font-medium tracking-wide uppercase @md:hidden">
                      Matchday 12
                    </p>
                    <div className="flex items-center gap-2 rounded-md bg-neutral-950 px-2.5 py-1 text-xs font-semibold text-white tabular-nums ring-1 ring-white/10 @md:absolute @md:top-3 @md:left-3 @3xl:top-5 @3xl:left-5 @3xl:gap-3 @3xl:px-3 @3xl:py-1.5 @3xl:text-sm">
                      <span>ATL</span>
                      <span className="rounded bg-white/15 px-1.5">2 – 1</span>
                      <span>CIT</span>
                      <span className="font-medium text-white/60">67:42</span>
                    </div>
                    <div className="border-border bg-background absolute bottom-3 left-3 hidden rounded-md border px-2.5 py-1.5 text-xs @md:block @3xl:bottom-5 @3xl:left-5 @3xl:px-4 @3xl:py-2.5 @3xl:text-sm">
                      <p className="text-muted-foreground">Goal · 67&apos;</p>
                      <p className="font-semibold">Maya Okafor, Atlas FC</p>
                    </div>
                  </div>
                  <div className="border-border flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-xs @md:hidden">
                    <span className="text-muted-foreground">Match feed</span>
                    <span className="flex items-center gap-2 font-medium">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Synced 2s ago
                    </span>
                  </div>
                  <div className="hidden grid-cols-3 gap-4 @3xl:grid">
                    {SETTINGS.map((setting) => (
                      <div
                        key={setting.label}
                        className="border-border rounded-lg border px-3 py-2.5"
                      >
                        <p className="text-muted-foreground text-xs">
                          {setting.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium">
                          {setting.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-2 gap-y-1 text-xs @3xl:text-sm">
                    <span className="text-muted-foreground">
                      All changes saved
                    </span>
                    <span className="font-medium">Ready to broadcast ↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PoisedSurface>
      </div>
    </section>
  )
}
