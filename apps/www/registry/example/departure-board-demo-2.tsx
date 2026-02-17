import { DepartureBoard } from "@/registry/magicui/departure-board"

export default function DepartureBoardDemo2() {
  return (
    <section className="border-border bg-background text-foreground @container flex w-[48rem] max-w-full flex-col items-center gap-8 rounded-xl border px-6 py-14 text-center">
      <div className="space-y-3">
        <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
          Platform 01 · Spring release
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Your next chapter is boarding.
        </h2>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm text-balance">
          A calmer space to plan, build, and ship together.
        </p>
      </div>
      {/* Sized to the card, so the reading stays on one line on phones. */}
      <DepartureBoard className="text-[clamp(1.75rem,11cqi,3.75rem)]">
        LIVE MAR 14
      </DepartureBoard>
      <button
        type="button"
        className="bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-ring focus-visible:ring-offset-background rounded-lg px-5 py-2.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Reserve early access
      </button>
    </section>
  )
}
