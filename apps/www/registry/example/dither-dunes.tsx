import { Dither } from "@/registry/magicui/dither"

export default function DitherDunes() {
  return (
    <Dither
      pattern="dunes"
      className="flex h-64 w-full max-w-2xl flex-col rounded-xl border p-6 text-[#e0def4] select-none md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-widest text-[#c4a7e7] uppercase">
            Live music
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
            Dune Festival
          </h3>
          <p className="mt-1 text-sm text-[#e0def4]">
            Three nights under open sky, Wadi Rum, Jordan.
          </p>
        </div>
        <p className="shrink-0 rounded-md border border-[#6e6a86] px-3 py-1.5 text-center text-sm leading-tight">
          <span className="block text-xs text-[#908caa]">OCT</span>
          <span className="text-lg font-semibold">14</span>
        </p>
      </div>
    </Dither>
  )
}
