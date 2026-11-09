import { AgentTrace } from "@/registry/magicui/agent-trace"

export default function AgentTraceDemo3() {
  return (
    <section className="bg-background text-foreground w-full min-w-0 p-4 sm:p-8">
      <div className="border-border bg-card mx-auto max-w-md rounded-xl border">
        <header className="border-border border-b px-4 py-3">
          <h2 className="text-sm font-semibold">Ticket #7316</h2>
        </header>
        <p className="text-muted-foreground px-4 py-5 text-sm text-pretty">
          Refund order 90412 and let Priya know.
        </p>
        <div className="border-border border-t p-1.5">
          <AgentTrace
            loop={false}
            className="max-w-none border-0 bg-transparent p-0"
            steps={[
              { label: "Find the order", duration: 0.8 },
              { label: "Check the refund policy", duration: 1.9 },
              { label: "Issue the refund", duration: 1.2 },
              { label: "Email Priya", duration: 0.6 },
            ]}
            result="Refunded $84.00 and emailed Priya"
          />
        </div>
      </div>
    </section>
  )
}
