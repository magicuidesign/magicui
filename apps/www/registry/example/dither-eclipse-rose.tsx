import { Dither } from "@/registry/magicui/dither"

const perks = [
  "Unlimited eclipses",
  "Priority rendering",
  "Team sharing",
] as const

export default function DitherEclipseRose() {
  return (
    <Dither
      pattern="eclipse-rose"
      className="h-96 w-full max-w-sm rounded-xl border p-6 text-[#e0def4] select-none"
    >
      <h3 className="text-sm font-medium text-[#c4a7e7]">Studio</h3>
      <p className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">$19</span>
        <span className="text-sm text-[#908caa]">per month</span>
      </p>
      <ul className="mt-5 space-y-2 text-sm">
        {perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#ebbcba]" />
            {perk}
          </li>
        ))}
      </ul>
    </Dither>
  )
}
