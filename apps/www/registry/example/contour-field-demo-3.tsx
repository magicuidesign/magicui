import { ContourField } from "@/registry/magicui/contour-field"

const stats = [
  {
    label: "Uptime",
    figure: "99.98%",
    caption: "A steady signal through every deployment.",
  },
  {
    label: "Median latency",
    figure: "41 ms",
    caption: "From the edge to your customers, without the guesswork.",
  },
]

export default function ContourFieldDemo3() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
      <div className="border-border bg-card text-card-foreground relative flex h-72 flex-col overflow-hidden rounded-xl border p-6 md:col-span-2 md:row-span-2 md:h-auto md:min-h-80">
        {/* A card among cards stays still under the pointer. */}
        <ContourField
          interactive={false}
          // Clears an oval behind the figure in the top left corner.
          className="[--fade-oval:radial-gradient(ellipse_250px_130px_at_140px_68px,transparent_60%,black_100%)]"
        />
        <div className="relative z-10 flex flex-col gap-2">
          <p className="text-muted-foreground text-sm font-medium">Coverage</p>
          <p className="text-3xl font-semibold tracking-tight">38 regions</p>
          <p className="text-muted-foreground text-sm">
            Traced end to end, every 15 seconds.
          </p>
        </div>
      </div>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-border bg-card text-card-foreground flex flex-col gap-2 rounded-xl border p-6"
        >
          <p className="text-muted-foreground text-sm font-medium">
            {stat.label}
          </p>
          <p className="text-3xl font-semibold tracking-tight tabular-nums">
            {stat.figure}
          </p>
          <p className="text-muted-foreground text-sm">{stat.caption}</p>
        </div>
      ))}
    </div>
  )
}
