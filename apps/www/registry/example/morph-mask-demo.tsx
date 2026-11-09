import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MorphMask } from "@/registry/magicui/morph-mask"

const navigation = ["Releases", "Drafts", "Readers", "Settings"]

const changes = [
  { label: "Scheduled releases", color: "bg-[#9c40ff]" },
  { label: "Faster GitHub import", color: "bg-[#ffaa40]" },
  { label: "Slack link previews", color: "bg-foreground/40" },
]

const olderReleases = [
  { version: "v4.1", title: "Winter release" },
  { version: "v4.0", title: "Custom domains" },
  { version: "v3.9", title: "Team roles" },
  { version: "v3.8", title: "Usage alerts" },
]

/**
 * A releases screen measured in the mask's own units: positions in percent
 * of the mask and type in `cqw`, so it scales as one piece. Every shape
 * keeps the area that holds the text and marks, so a morph only re-crops
 * the surfaces that run to the edge: the header, the sidebar rule and the
 * open release card.
 *
 * Under 24rem the screen drops the sidebar and a few details for larger
 * type. From 32rem the type steps down, so the screen reads as an app
 * rather than a close-up.
 */
function ReleasesScreen() {
  return (
    <div className="bg-muted dark:bg-muted/50 relative text-[length:4.2cqw] leading-normal @sm/mask:text-[length:2.9cqw] @lg/mask:text-[length:2.3cqw]">
      <div className="absolute inset-x-0 top-0 h-[30%] border-b" />
      <div className="absolute inset-x-[29%] bottom-[72.5%] flex items-center justify-between gap-[1em] @sm/mask:inset-x-[28%]">
        <div className="flex items-center gap-[0.45em]">
          <span
            aria-hidden="true"
            className="bg-foreground size-[1em] shrink-0 rounded-[0.3em]"
          />
          <span className="font-semibold">Northbeam</span>
        </div>
        <span className="bg-foreground text-background hidden rounded-[0.4em] px-[0.6em] py-[0.15em] font-medium @sm/mask:inline">
          Publish
        </span>
      </div>

      <div className="absolute top-[30%] bottom-0 left-0 hidden w-[35%] border-r @sm/mask:block" />
      <ul className="text-foreground/70 absolute top-[36%] left-[20%] hidden space-y-[0.6em] @sm/mask:block">
        {navigation.map((item) => (
          <li key={item} className="first:text-foreground first:font-medium">
            {item}
          </li>
        ))}
      </ul>

      {/* The card runs past the right edge, so each shape crops it anew. */}
      <div className="absolute top-[34%] -right-[4%] bottom-[19%] left-[25%] flex flex-col gap-[1em] @sm/mask:top-[35%] @sm/mask:left-[38%]">
        <article className="bg-background dark:bg-card shrink-0 rounded-[0.6em] border p-[0.9em] shadow-sm">
          <div className="flex items-center gap-[0.45em]">
            <span className="rounded-full border px-[0.5em] font-medium tabular-nums">
              v4.2
            </span>
            <h3 className="font-semibold">Spring release</h3>
          </div>
          <p className="text-muted-foreground mt-[0.25em] hidden @sm/mask:block">
            May 14 · 24 changes
          </p>
          <ul className="mt-[0.6em] space-y-[0.3em]">
            {changes.map((change, position) => (
              <li
                key={change.label}
                className={cn(
                  "flex items-center gap-[0.45em]",
                  // The narrow screen has room for two changes.
                  position > 1 && "hidden @sm/mask:flex"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-[0.45em] shrink-0 rounded-full",
                    change.color
                  )}
                />
                {change.label}
              </li>
            ))}
          </ul>
        </article>

        {/* A row that would run past the bottom wraps into a second column,
            which is clipped, so the list always ends on a whole row. The
            inset is a margin, since overflow still paints in padding. */}
        <ul className="text-foreground/70 mx-[0.9em] flex min-h-0 flex-1 flex-col flex-wrap content-start gap-y-[0.5em] overflow-hidden">
          {olderReleases.map((release) => (
            <li key={release.version} className="w-full">
              <span className="text-foreground font-medium tabular-nums">
                {release.version}
              </span>{" "}
              {release.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function MorphMaskDemo() {
  return (
    // A @container has no intrinsic width, so w-full collapses to the padding
    // inside a shrink-to-fit parent. w-screen capped by max-w-full fills it.
    <section className="bg-background text-foreground @container w-screen max-w-full rounded-xl border p-6 sm:p-10">
      {/* Side by side when the preview is wide enough, stacked otherwise. */}
      {/* Every shape sits about 11% inside the mask, so the mask needs no
          gap of its own: the outline already clears the copy by ~60px. */}
      <div className="grid grid-cols-1 items-center justify-items-center gap-4 @4xl:grid-cols-[minmax(0,24rem)_minmax(0,580px)] @4xl:justify-center @4xl:gap-0">
        <div className="space-y-5 text-center @4xl:text-left">
          <p className="text-muted-foreground text-sm font-medium">
            Northbeam Changelog
          </p>
          <h2 className="mx-auto max-w-sm text-4xl font-semibold tracking-tight text-balance @4xl:mx-0">
            Every release, on one page.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-sm leading-relaxed @4xl:mx-0">
            Northbeam turns merged pull requests into a changelog your customers
            actually read.
          </p>
          <div className="flex flex-wrap justify-center gap-3 @4xl:justify-start">
            <Button type="button">Start free</Button>
            <Button type="button" variant="outline">
              See a sample
            </Button>
          </div>
        </div>
        <MorphMask className="@container/mask w-full max-w-[440px] @4xl:max-w-none">
          <ReleasesScreen />
        </MorphMask>
      </div>
    </section>
  )
}
