import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherFieldPointerDemo() {
  return (
    <DitherField
      pattern="clouds"
      color="var(--foreground)"
      dotSize={2}
      intensity={0.3}
      className="bg-background flex h-72 w-full items-end justify-center rounded-lg border p-4 md:h-[400px] md:p-6"
    >
      <p className="bg-background/80 text-muted-foreground rounded-full border px-3 py-1 text-sm backdrop-blur">
        Hover, or touch and hold
      </p>
    </DitherField>
  )
}
