import { Dither, type DitherPattern } from "@/registry/magicui/dither"

const patterns = [
  "horizon",
  "glow",
  "aurora",
  "waves",
  "clouds",
  "gruvbox-dusk",
  "nord-orbit",
  "kanagawa-moonrise",
  "orbit",
  "meridian",
  "eclipse-rose",
  "ridgeline",
  "contour",
  "dunes",
  "eclipse-nord",
  "orb",
  "veil",
] as const satisfies readonly DitherPattern[]

export default function DitherPatternsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {patterns.map((pattern) => (
        <Dither
          key={pattern}
          pattern={pattern}
          dotSize={1}
          className="bg-background flex aspect-4/3 items-end overflow-hidden rounded-lg border p-2 select-none"
        >
          <code className="bg-background/80 text-foreground relative rounded-md border px-1.5 py-0.5 font-mono text-xs backdrop-blur">
            {pattern}
          </code>
        </Dither>
      ))}
    </div>
  )
}
