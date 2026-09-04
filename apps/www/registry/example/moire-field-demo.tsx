import { MoireField } from "@/registry/magicui/moire-field"

export default function MoireFieldDemo() {
  return (
    <div className="border-border bg-background text-foreground relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border px-6">
      {/* The default edge fade, intersected with a soft clearing behind the
          copy and a short fade before the border on each side. */}
      <MoireField className="mask-[radial-gradient(ellipse_74%_82%_at_center,black_38%,transparent_100%),radial-gradient(ellipse_var(--clearing)_265px_at_center,transparent_55%,black_100%),linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent),linear-gradient(transparent,black_24px,black_calc(100%-24px),transparent)] mask-intersect [--clearing:250px] md:[--clearing:340px]" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <p className="text-xs font-medium tracking-[0.18em] uppercase">
          Overlay for release teams
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">
          Small changes, plainly visible
        </h1>
        <p className="text-muted-foreground max-w-lg text-sm leading-relaxed text-balance md:text-base">
          Compare any two deploys and see exactly which requests, queries and
          screens moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/50 inline-flex h-10 items-center justify-center rounded-lg px-6 text-sm font-medium shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
          >
            Start free
          </button>
          <button
            type="button"
            className="bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 dark:border-input inline-flex h-10 items-center justify-center rounded-lg border px-6 text-sm font-medium shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
          >
            Read the docs
          </button>
        </div>
      </div>
    </div>
  )
}
