import { PluckedRule } from "@/registry/magicui/plucked-rule"

const features = [
  {
    title: "Live vessel ETAs",
    description:
      "Plan the handoff with arrival times that move with your cargo.",
  },
  {
    title: "Customs holds, flagged early",
    description: "Give your broker time to clear the next bottleneck.",
  },
  {
    title: "Demurrage before it bills",
    description:
      "Know which containers need a pickup before the clock runs out.",
  },
]

export default function PluckedRuleDemo() {
  return (
    <div className="bg-background text-foreground w-full px-6 pt-10 pb-4 sm:px-10 sm:pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="pb-8">
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-widest uppercase">
            Tidewater
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Every container, one timeline
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed text-pretty">
            From the first port call to the last mile, keep your freight and
            your team on the same page.
          </p>
        </div>
        <PluckedRule />
        <div className="grid gap-7 pt-10 pb-2 sm:grid-cols-3 sm:pb-16">
          {features.map((feature) => (
            <div key={feature.title}>
              <h3 className="text-sm font-medium text-balance">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
