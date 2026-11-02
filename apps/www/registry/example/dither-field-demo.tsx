import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherFieldDemo() {
  return (
    <DitherField
      pattern="horizon"
      color={["var(--dither-low)", "var(--dither-mid)", "var(--dither-high)"]}
      className="bg-background flex h-[420px] w-full flex-col items-center justify-center gap-4 rounded-lg border px-4 pb-28 text-center select-none [--dither-high:#4c1d95] [--dither-low:#c4b5fd] [--dither-mid:#7c3aed] md:h-[500px] md:gap-6 md:px-6 md:pb-24 dark:[--dither-high:#ede9fe] dark:[--dither-low:#2e1065] dark:[--dither-mid:#8b5cf6]"
    >
      <h1 className="max-w-xl text-3xl font-semibold tracking-tighter text-balance sm:text-4xl md:text-6xl">
        Light, rendered one dot at a time
      </h1>
      <p className="text-muted-foreground max-w-md text-sm text-balance md:text-base">
        An ordered-dither field that follows your theme, your brand colors and
        your pointer.
      </p>
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        <button
          type="button"
          className="bg-foreground text-background h-9 rounded-full px-4 text-sm font-medium whitespace-nowrap md:h-10 md:px-5"
        >
          Get started
        </button>
        <button
          type="button"
          className="bg-background/80 h-9 rounded-full border px-4 text-sm font-medium whitespace-nowrap backdrop-blur md:h-10 md:px-5"
        >
          Learn more
        </button>
      </div>
    </DitherField>
  )
}
