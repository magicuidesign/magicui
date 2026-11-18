import { AgentTrace } from "@/registry/magicui/agent-trace"

export default function AgentTraceDemo() {
  return (
    <section className="bg-background text-foreground w-full min-w-0 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <p className="border-border text-muted-foreground mb-4 rounded-full border px-3 py-1 text-xs font-medium">
          Introducing Tern
        </p>
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          <span className="block">Hand it the ticket.</span>{" "}
          <span className="block">Get back a pull request.</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed text-pretty">
          Tern reads the bug, writes the fix and runs your tests before anyone
          is paged.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="bg-foreground text-background focus-visible:ring-ring focus-visible:ring-offset-background rounded-lg px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Start for free
          </button>
          <button
            type="button"
            className="border-border focus-visible:ring-ring focus-visible:ring-offset-background rounded-lg border px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            See how it works
          </button>
        </div>
        <div className="mt-10 flex w-full justify-center">
          <AgentTrace />
        </div>
      </div>
    </section>
  )
}
