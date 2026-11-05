import { Dither } from "@/registry/magicui/dither"

export default function DitherPointerDemo() {
  return (
    <Dither
      pattern="clouds"
      color="var(--foreground)"
      dotSize={2}
      intensity={0.3}
      className="bg-background flex h-72 w-full items-end justify-center rounded-lg border p-4 select-none md:h-[400px] md:p-6"
    >
      <p className="bg-background/80 text-muted-foreground rounded-full border px-3 py-1 text-sm backdrop-blur">
        Hover, or touch and hold
      </p>
    </Dither>
  )
}
