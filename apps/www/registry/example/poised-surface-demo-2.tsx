import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"
import { Iphone } from "@/registry/magicui/iphone"
import { PoisedSurface } from "@/registry/magicui/poised-surface"

// The Iphone mock draws a 433 × 882 frame. These numbers come from its
// screen and island, so the app sits exactly in the screen and the island
// it covers is drawn again on top.
const PHONE = { width: 433, height: 882 }
const SCREEN = {
  x: 21.25,
  y: 19.25,
  width: 389.5,
  height: 843.5,
  radius: 55.75,
}
const ISLAND = { y: 30, width: 124, height: 37 }

// A neutral-200 bezel inside a neutral-300 hairline, so the light frame reads
// as a device rather than a white ring. The speaker slot is left out.
const frame = cn(
  "[&>svg>path[opacity]]:hidden",
  "[&>svg>g>path]:fill-neutral-300 dark:[&>svg>g>path]:fill-neutral-700",
  "[&>svg>g>path:last-child]:fill-neutral-200",
  "dark:[&>svg>g>path:last-child]:fill-neutral-800"
)

const percent = (part: number, whole: number) => `${(part / whole) * 100}%`

const screenStyle: CSSProperties = {
  left: percent(SCREEN.x, PHONE.width),
  top: percent(SCREEN.y, PHONE.height),
  width: percent(SCREEN.width, PHONE.width),
  height: percent(SCREEN.height, PHONE.height),
  borderRadius: `${percent(SCREEN.radius, SCREEN.width)} / ${percent(SCREEN.radius, SCREEN.height)}`,
}

const islandStyle: CSSProperties = {
  top: percent(ISLAND.y - SCREEN.y, SCREEN.height),
  width: percent(ISLAND.width, SCREEN.width),
  height: percent(ISLAND.height, SCREEN.height),
}

const COLLECTION = [
  { title: "Small rituals, better days", detail: "Journal · 4 min read" },
  { title: "Notes from the coast", detail: "Travel · 12 photos" },
  { title: "An idea for tomorrow", detail: "Draft · Edited 9:41" },
  { title: "Books for the long weekend", detail: "Reading list · 6 books" },
]

export default function PoisedSurfaceDemo2() {
  return (
    <section className="bg-background text-foreground w-full overflow-hidden rounded-2xl px-8 py-16">
      <div className="mx-auto grid max-w-4xl items-center gap-12 sm:grid-cols-2 sm:gap-16">
        <PoisedSurface
          pose="end"
          className="w-full max-w-68 justify-self-center rounded-[16.9%/8.3%] sm:justify-self-end"
        >
          <div className="ring-foreground/10 relative grid rounded-[inherit] ring-1 ring-inset">
            <Iphone aria-hidden="true" className={frame} />
            <div
              style={screenStyle}
              className="bg-card absolute flex flex-col overflow-hidden px-4 pt-12 pb-6"
            >
              <div
                aria-hidden="true"
                style={islandStyle}
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-neutral-950"
              />
              <p className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
                Fieldnotes · Today
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                A little more room to think.
              </h3>
              <div className="border-border bg-muted/40 mt-5 space-y-1 rounded-xl border p-3 text-xs">
                <p className="font-medium">The morning edit</p>
                <p className="text-foreground/70">
                  Three ideas worth keeping. One clear next step.
                </p>
              </div>
              <div className="mt-4 text-xs">
                <p className="mb-1 font-medium">Your collection</p>
                {COLLECTION.map((note) => (
                  <div
                    key={note.title}
                    className="border-border border-b py-2 last:border-b-0"
                  >
                    <p>{note.title}</p>
                    <p className="text-muted-foreground mt-0.5 text-[10px]">
                      {note.detail}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-auto pt-4 text-[10px]">
                All notes saved · Just for you
              </p>
            </div>
          </div>
        </PoisedSurface>
        <div className="max-w-md space-y-4">
          <p className="text-muted-foreground text-sm font-medium">
            Fieldnotes for iOS
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Your best ideas travel with you.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Capture the thought before it slips away. Fieldnotes keeps your
            writing, reading, and daily reflections together wherever the day
            takes you.
          </p>
          <a
            href="https://magicui.design/docs"
            className="inline-flex rounded-sm text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Explore Fieldnotes
          </a>
        </div>
      </div>
    </section>
  )
}
