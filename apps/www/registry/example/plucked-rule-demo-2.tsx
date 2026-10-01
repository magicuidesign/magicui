import { PluckedRule } from "@/registry/magicui/plucked-rule"

/**
 * Each row's rule is tuned a little differently, so the table rings out
 * like strings strummed by hand.
 */
const features = [
  {
    name: "Seats",
    starter: "3",
    team: "Unlimited",
    amplitude: 11,
    frequency: 8.2,
  },
  {
    name: "Audit log",
    starter: "7 days",
    team: "1 year",
    amplitude: 9,
    frequency: 7.6,
  },
  {
    name: "SSO",
    starter: "—",
    team: "Included",
    amplitude: 12,
    frequency: 8.8,
  },
  {
    name: "Support response",
    starter: "2 days",
    team: "4 hours",
    amplitude: 10,
    frequency: 7.9,
  },
  {
    name: "Data residency",
    starter: "US",
    team: "US or EU",
    amplitude: 11.5,
    frequency: 8.5,
  },
]

/** Each row's rule plucks itself a little after the one above it. */
const STAGGER_SECONDS = 0.11

export default function PluckedRuleDemo2() {
  return (
    <div className="bg-background text-foreground w-full px-5 py-10 sm:px-10">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl font-semibold tracking-tight text-balance">
          Compare plans
        </h2>
        <p className="text-muted-foreground mt-2 text-sm text-pretty">
          Start with a small crew. Make room for the whole operation.
        </p>
        <div className="text-muted-foreground mt-6 flex gap-3 pb-4 text-xs font-medium">
          <span className="min-w-0 flex-1">Feature</span>
          <span className="w-16 text-right sm:w-24">Starter</span>
          <span className="w-20 text-right sm:w-24">Team</span>
        </div>
        {features.map((feature, index) => (
          <div key={feature.name}>
            <PluckedRule
              amplitude={feature.amplitude}
              frequency={feature.frequency}
              duration={1}
              delay={0.4 + index * STAGGER_SECONDS}
            />
            <div className="flex items-center gap-3 py-5 text-xs sm:text-sm">
              <span className="min-w-0 flex-1 font-medium">{feature.name}</span>
              <span className="text-muted-foreground w-16 text-right sm:w-24">
                {feature.starter}
              </span>
              <span className="w-20 text-right sm:w-24">{feature.team}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
