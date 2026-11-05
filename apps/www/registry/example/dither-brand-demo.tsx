import { Dither } from "@/registry/magicui/dither"

export default function DitherBrandDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
      <Dither
        pattern="glow"
        color={["#78350f", "#f59e0b", "#fef3c7"]}
        className="flex h-56 items-end rounded-xl border bg-[#140b02] p-4 text-amber-50 select-none md:h-80 md:p-6"
      >
        <p className="text-sm font-medium">Sodium</p>
      </Dither>
      <Dither
        pattern="aurora"
        color={["#164e63", "#06b6d4", "#cffafe"]}
        intensity={1.1}
        className="flex h-56 items-end rounded-xl border bg-[#020f14] p-4 text-cyan-50 select-none md:h-80 md:p-6"
      >
        <p className="text-sm font-medium">Glacier</p>
      </Dither>
    </div>
  )
}
