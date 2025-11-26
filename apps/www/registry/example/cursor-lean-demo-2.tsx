import { CursorLean, CursorLeanLabel } from "@/registry/magicui/cursor-lean"

export function CursorLeanDemo2() {
  return (
    <section className="bg-background border-border text-foreground dark:bg-card w-full rounded-xl border px-6 py-16 text-center">
      <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
        Make room for deep work
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
        Less busywork.
        <br />
        More momentum.
      </h2>
      <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm leading-relaxed text-pretty">
        Bring your team&apos;s projects, decisions, and next steps into one calm
        workspace with Tally.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <CursorLean distance={120}>
          <button
            type="button"
            className="bg-foreground text-background focus-visible:outline-ring h-12 rounded-full border border-transparent px-6 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <CursorLeanLabel>Start your workspace</CursorLeanLabel>
          </button>
        </CursorLean>
        <CursorLean distance={120}>
          <button
            type="button"
            className="border-border bg-background text-foreground focus-visible:outline-ring h-12 rounded-full border px-6 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <CursorLeanLabel>Book a walkthrough</CursorLeanLabel>
          </button>
        </CursorLean>
      </div>
      <p className="text-muted-foreground mt-8 text-xs">
        Free for teams of up to five. No credit card needed.
      </p>
    </section>
  )
}
