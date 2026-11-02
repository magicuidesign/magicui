import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherFieldDemo() {
  return (
    <DitherField
      pattern="horizon"
      color={["var(--dither-low)", "var(--dither-mid)", "var(--dither-high)"]}
      className="bg-background flex h-[500px] w-full flex-col items-center justify-center gap-6 rounded-lg border px-6 text-center [--dither-high:#4c1d95] [--dither-low:#c4b5fd] [--dither-mid:#7c3aed] dark:[--dither-high:#ede9fe] dark:[--dither-low:#2e1065] dark:[--dither-mid:#8b5cf6]"
    >
      <h1 className="max-w-xl text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
        Light, rendered one dot at a time
      </h1>
      <p className="text-muted-foreground max-w-md text-balance">
        An ordered-dither field that follows your theme, your brand colours and
        your pointer.
      </p>
      <div className="flex gap-3 pb-24">
        <button
          type="button"
          className="bg-foreground text-background h-10 rounded-full px-5 text-sm font-medium"
        >
          Get started
        </button>
        <button
          type="button"
          className="bg-background/80 h-10 rounded-full border px-5 text-sm font-medium backdrop-blur"
        >
          Read the docs
        </button>
      </div>
    </DitherField>
  )
}
