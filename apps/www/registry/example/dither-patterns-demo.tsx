import { Dither } from "@/registry/magicui/dither"

const patterns = ["horizon", "glow", "aurora", "waves", "clouds"] as const

export default function DitherPatternsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-5">
      {patterns.map((pattern) => (
        <Dither
          key={pattern}
          pattern={pattern}
          className="bg-background flex h-32 items-end rounded-lg border p-3 select-none last:col-span-2 md:h-40 md:last:col-span-1"
        >
          <code className="bg-background/80 rounded px-1.5 py-0.5 text-xs backdrop-blur">
            {pattern}
          </code>
        </Dither>
      ))}
    </div>
  )
}
