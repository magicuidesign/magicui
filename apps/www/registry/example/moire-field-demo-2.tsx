import { MoireField } from "@/registry/magicui/moire-field"

export default function MoireFieldDemo2() {
  return (
    <div className="border-border bg-background text-foreground relative flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border px-6 py-12 [--rings:#9c40ff] md:px-24 dark:[--rings:#9e7aff]">
      {/* A gentle fade toward the corners, intersected with a clearing sized
          to the copy and a short fade before the border on each side. */}
      <MoireField
        color="var(--rings)"
        size={6}
        bands={8}
        duration={36}
        className="mask-[radial-gradient(black_45%,transparent),radial-gradient(ellipse_260px_105px_at_center,transparent_70%,black),linear-gradient(to_right,transparent,black_32px,black_calc(100%-32px),transparent),linear-gradient(transparent,black_32px,black_calc(100%-32px),transparent)] mask-intersect"
      />
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-5 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Your next deploy, side by side
        </h2>
        <p className="text-muted-foreground text-sm text-balance md:text-base">
          Connect a repository and Overlay compares the rest.
        </p>
        <button
          type="button"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/50 inline-flex h-10 items-center justify-center rounded-lg px-6 text-sm font-medium shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
        >
          Create a workspace
        </button>
      </div>
    </div>
  )
}
