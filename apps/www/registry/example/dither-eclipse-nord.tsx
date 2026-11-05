import { DitherField } from "@/registry/magicui/dither-field"

export default function DitherEclipseNord() {
  return (
    <DitherField
      pattern="eclipse-nord"
      className="flex h-96 w-full flex-col items-center pt-12 text-center text-[#eceff4] select-none md:pt-16"
    >
      <p className="text-sm text-[#88c0d0]">Last 90 days</p>
      <p className="mt-2 text-6xl font-semibold tracking-tighter tabular-nums md:text-8xl">
        99.99%
      </p>
      <p className="mt-2 text-sm text-[#d8dee9]">
        Uptime across every region, with zero data loss.
      </p>
    </DitherField>
  )
}
