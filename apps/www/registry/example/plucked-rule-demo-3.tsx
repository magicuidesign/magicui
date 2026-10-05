import { cn } from "@/lib/utils"
import { PluckedRule } from "@/registry/magicui/plucked-rule"

const buttonBase = cn(
  "inline-flex h-9 items-center justify-center rounded-lg px-4",
  "text-sm font-medium shadow-xs transition-colors outline-none",
  "focus-visible:ring-ring/50 focus-visible:ring-[3px]"
)

export default function PluckedRuleDemo3() {
  return (
    <div className="bg-background text-foreground w-full px-4 py-10 sm:px-10 sm:py-14">
      <div className="bg-card text-card-foreground mx-auto max-w-2xl rounded-xl border shadow-sm">
        <div className="px-6 pt-8 pb-12 sm:px-10 sm:pt-10">
          <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            Tidewater for teams
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            See every shipment before it lands
          </h2>
        </div>
        <PluckedRule
          size={2}
          amplitude={40}
          colorFrom="#9c40ff"
          colorTo="#ffaa40"
        />
        <div className="px-6 pt-12 pb-8 sm:px-10 sm:pb-10">
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed text-pretty sm:text-base">
            Connect your carriers in an afternoon. Arrival times, customs holds
            and demurrage land on one timeline your whole team can read.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className={cn(
                buttonBase,
                "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              Start tracking
            </button>
            <button
              type="button"
              className={cn(
                buttonBase,
                "bg-background hover:bg-accent hover:text-accent-foreground border",
                "dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
              )}
            >
              Book a demo
            </button>
          </div>
          <p className="text-muted-foreground mt-4 text-xs">
            Free for your first 100 containers. No card required.
          </p>
        </div>
      </div>
    </div>
  )
}
