import { DepartureBoard } from "@/registry/magicui/departure-board"

const stats = [
  { value: "18,640", label: "Teams on the platform" },
  { value: "99.98%", label: "Uptime over the last 90 days" },
  { value: "41", label: "Countries with active teams" },
]

/** Each board starts a moment after the one to its left. */
const BOARD_STAGGER = 0.05

export default function DepartureBoardDemo() {
  return (
    <section className="bg-background text-foreground w-[64rem] max-w-full px-4 py-12">
      <div className="mb-8 space-y-2 text-center">
        <p className="text-muted-foreground text-sm font-medium">
          By the numbers
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-balance">
          Shipping for teams around the world
        </h2>
      </div>
      <div className="border-border @container rounded-xl border">
        <div className="divide-border grid divide-y @2xl:grid-cols-3 @2xl:divide-x @2xl:divide-y-0">
          {stats.map(({ value, label }, index) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 px-3 py-8 text-center"
            >
              {/* In three columns, sized to the card so each number fills its column. */}
              <DepartureBoard
                delay={index * BOARD_STAGGER}
                className="text-5xl @2xl:text-[clamp(2.25rem,6cqi,3.75rem)]"
              >
                {value}
              </DepartureBoard>
              <p className="text-muted-foreground text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
