import { AgentTrace } from "@/registry/magicui/agent-trace"

export default function AgentTraceDemo2() {
  return (
    <section className="bg-background text-foreground w-full min-w-0 p-4 sm:p-8">
      <div className="mx-auto w-full max-w-md sm:p-6">
        <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
          Deploys
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-balance">
          Every push, checked before it ships.
        </h2>
        <p className="text-muted-foreground mt-3 mb-6 text-sm leading-relaxed text-pretty">
          Merge with confidence: every release passes the same checks on its way
          to production.
        </p>
        <AgentTrace
          color="#0f9d6b"
          steps={[
            { label: "Install dependencies", duration: 1.8 },
            { label: "Type-check", duration: 0.9 },
            { label: "Run 412 tests", duration: 3.4 },
            { label: "Build", duration: 2.2 },
            { label: "Promote to production", duration: 0.6 },
          ]}
          result="Live on production"
        />
      </div>
    </section>
  )
}
