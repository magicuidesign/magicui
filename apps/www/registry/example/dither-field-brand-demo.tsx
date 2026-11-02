import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherFieldBrandDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <DitherField
        pattern="glow"
        color={["#78350f", "#f59e0b", "#fef3c7"]}
        className="flex h-80 items-end rounded-xl border bg-[#140b02] p-6 text-amber-50"
      >
        <p className="text-sm font-medium">Sodium</p>
      </DitherField>
      <DitherField
        pattern="aurora"
        color={["#164e63", "#06b6d4", "#cffafe"]}
        intensity={1.1}
        className="flex h-80 items-end rounded-xl border bg-[#020f14] p-6 text-cyan-50"
      >
        <p className="text-sm font-medium">Glacier</p>
      </DitherField>
    </div>
  )
}
