import { DitherField } from "@/registry/magicui/dither-field"

const patterns = ["horizon", "glow", "aurora", "waves", "clouds"] as const

export default function DitherFieldPatternsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3">
      {patterns.map((pattern) => (
        <DitherField
          key={pattern}
          pattern={pattern}
          className="bg-background flex h-32 items-end rounded-lg border p-3 md:h-40"
        >
          <code className="bg-background/80 rounded px-1.5 py-0.5 text-xs backdrop-blur">
            {pattern}
          </code>
        </DitherField>
      ))}
    </div>
  )
}
