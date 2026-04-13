import { InkReveal } from "@/registry/magicui/ink-reveal"

const figures = [
  { label: "Net revenue", value: "$482,190", change: "+12.8%" },
  { label: "Conversion", value: "4.7%", change: "+0.6 pts" },
  { label: "Releases", value: "18", change: "This month" },
]

const CHART_WIDTH = 640
const CHART_HEIGHT = 210

const revenueLine =
  "M0 185 L25 179 L50 185 L75 165 L100 171 L125 155 L150 164 L175 140 L200 147 L225 112 L250 121 L275 105 L300 114 L325 83 L350 90 L375 73 L400 81 L425 50 L450 60 L475 43 L500 50 L525 26 L550 35 L575 18 L600 27 L640 10"

const releases = [
  { x: 175, y: 140, label: "v2.8" },
  { x: 325, y: 83, label: "v2.9" },
  { x: 525, y: 26, label: "v3.0" },
]

export default function InkRevealDemo() {
  return (
    <section className="bg-background text-foreground w-full px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
            Halden / Release intelligence
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Know which release moved revenue.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Halden connects every deploy to the numbers it changed, without a
            tracking plan.
          </p>
        </div>
        <InkReveal className="border-border rounded-xl border">
          <div className="bg-card text-foreground flex min-h-72 w-full sm:aspect-video sm:min-h-0">
            <aside className="border-border bg-muted/40 hidden w-36 shrink-0 border-r p-4 sm:block">
              <div className="mb-8 flex items-center gap-2 text-sm font-semibold">
                <span className="bg-foreground text-background grid size-6 place-items-center rounded-md text-xs">
                  H
                </span>
                Halden
              </div>
              <p className="text-muted-foreground mb-3 text-[10px] tracking-widest uppercase">
                Workspace
              </p>
              <nav aria-label="Halden workspace" className="space-y-1 text-xs">
                {[
                  { label: "Overview", id: "halden-overview" },
                  { label: "Revenue", id: "halden-revenue" },
                  { label: "Releases", id: "halden-releases" },
                ].map(({ label, id }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-foreground block rounded-md px-2 py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="border-border text-muted-foreground mt-8 border-t pt-3 text-[10px]">
                Production / All regions
              </div>
            </aside>
            <div
              id="halden-overview"
              className="flex min-w-0 flex-1 flex-col p-4 sm:p-6"
            >
              <div className="border-border mb-4 flex items-center justify-between gap-2 border-b pb-3">
                <div>
                  <p className="text-sm font-semibold">Revenue overview</p>
                  <p className="text-muted-foreground text-[10px]">
                    Every release. Measured.
                  </p>
                </div>
                <span className="border-border bg-background text-muted-foreground rounded-md border px-2 py-1 text-[10px]">
                  Last 30 days
                </span>
              </div>
              <dl
                id="halden-revenue"
                className="grid grid-cols-3 gap-2 sm:gap-4"
              >
                {figures.map(({ label, value, change }) => (
                  <div key={label} className="space-y-1">
                    <dt className="text-muted-foreground text-[9px] sm:text-xs">
                      {label}
                    </dt>
                    <dd className="text-base font-semibold tracking-tight tabular-nums sm:text-2xl">
                      {value}
                    </dd>
                    <dd className="text-muted-foreground text-[9px] sm:text-[10px]">
                      {change}
                    </dd>
                  </div>
                ))}
              </dl>
              <div
                id="halden-releases"
                className="relative mt-4 min-h-0 flex-1"
              >
                <div className="absolute inset-x-0 top-0 h-[calc(100%-1.25rem)]">
                  <svg
                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                    className="text-foreground size-full"
                    preserveAspectRatio="none"
                    role="img"
                    aria-labelledby="halden-chart-title"
                  >
                    <title id="halden-chart-title">
                      Revenue rises across three releases, reaching $482,190
                      this month.
                    </title>
                    {[30, 80, 130, 180].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2={CHART_WIDTH}
                        y2={y}
                        className="stroke-border"
                        strokeDasharray="3 5"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                    <path
                      d={`${revenueLine} V${CHART_HEIGHT} H0 Z`}
                      fill="currentColor"
                      fillOpacity="0.08"
                    />
                    <path
                      d={revenueLine}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {releases.map(({ x, y, label }) => (
                      <line
                        key={label}
                        x1={x}
                        y1={y}
                        x2={x}
                        y2={CHART_HEIGHT}
                        stroke="currentColor"
                        strokeOpacity="0.35"
                        strokeDasharray="3 4"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </svg>
                  {releases.map(({ x, y, label }) => (
                    <span
                      key={label}
                      aria-hidden="true"
                      className="border-foreground bg-card absolute size-2.5 -translate-1/2 rounded-full border-2"
                      style={{
                        left: `${(x / CHART_WIDTH) * 100}%`,
                        top: `${(y / CHART_HEIGHT) * 100}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-muted-foreground absolute inset-x-0 bottom-0 h-5 text-[10px] leading-5">
                  {releases.map(({ x, label }) => (
                    <span
                      key={label}
                      className="absolute -translate-x-1/2"
                      style={{ left: `${(x / CHART_WIDTH) * 100}%` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </InkReveal>
      </div>
    </section>
  )
}
