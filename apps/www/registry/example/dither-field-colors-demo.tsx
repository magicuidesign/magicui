import {
  DitherField,
  type DitherColor,
  type DitherPattern,
} from "@/registry/magicui/dither-field"

const tiles: {
  label: string
  pattern: DitherPattern
  color: DitherColor
  intensity?: number
  className: string
}[] = [
  {
    label: "Ink on paper",
    pattern: "horizon",
    color: "#0a0a0a",
    className: "bg-white text-neutral-950",
  },
  {
    label: "Chalk on slate",
    pattern: "horizon",
    color: "#fafafa",
    className: "bg-neutral-950 text-white",
  },
  {
    label: "Sodium",
    pattern: "glow",
    color: ["#78350f", "#f59e0b", "#fef3c7"],
    className: "bg-[#140b02] text-amber-50",
  },
  {
    label: "Glacier",
    pattern: "aurora",
    color: ["#164e63", "#06b6d4", "#cffafe"],
    intensity: 1.1,
    className: "bg-[#020f14] text-cyan-50",
  },
]

export default function DitherFieldColorsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {tiles.map((tile) => (
        <DitherField
          key={tile.label}
          pattern={tile.pattern}
          color={tile.color}
          intensity={tile.intensity}
          className={`flex h-48 items-start rounded-xl border p-4 select-none md:h-64 ${tile.className}`}
        >
          <p className="text-sm font-medium">{tile.label}</p>
        </DitherField>
      ))}
    </div>
  )
}
