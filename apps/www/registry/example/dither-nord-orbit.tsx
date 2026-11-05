import { Dither } from "@/registry/magicui/dither"

const stats = [
  { label: "Regions", value: "34" },
  { label: "Uptime", value: "99.99%" },
  { label: "Latency", value: "12 ms" },
] as const

export default function DitherNordOrbit() {
  return (
    <Dither
      pattern="nord-orbit"
      className="flex h-80 w-full max-w-xl flex-col justify-between rounded-xl border p-6 text-[#eceff4] select-none md:p-8"
    >
      <div>
        <h3 className="text-2xl font-semibold tracking-tight">Global edge</h3>
        <p className="mt-1 max-w-xs text-sm text-[#d8dee9]">
          Your app runs close to every user, on every continent.
        </p>
      </div>
      <dl className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs tracking-wide text-[#d8dee9] uppercase">
              {stat.label}
            </dt>
            <dd className="text-xl font-semibold tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Dither>
  )
}
