import { cn } from "@/lib/utils"
import { ContourField } from "@/registry/magicui/contour-field"

export default function ContourFieldDemo() {
  return (
    <div className="border-border bg-background text-foreground relative h-[500px] w-full overflow-hidden rounded-lg border">
      <ContourField
        className={cn(
          // Clears an oval behind the copy, so the land frames the headline.
          // On phones it hugs the text and sits a little low to keep the
          // buttons clear, and the lines run down the sides.
          "[--fade-oval:radial-gradient(ellipse_45%_48%_at_50%_54%,transparent_60%,black_100%)]",
          "md:[--fade-oval:radial-gradient(ellipse_340px_220px_at_50%_50%,transparent_55%,rgba(0,0,0,0.3)_80%,rgba(0,0,0,0.7)_100%,black_130%)]"
        )}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
          Meridian for platform teams
        </p>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
          See the shape of your traffic
        </h2>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed text-balance md:text-base">
          Every request, region and slow path, mapped live so problems stand out
          before customers feel them.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Start free
          </button>
          <button
            type="button"
            className="border-border bg-background hover:bg-accent focus-visible:ring-ring rounded-md border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Book a demo
          </button>
        </div>
      </div>
    </div>
  )
}
