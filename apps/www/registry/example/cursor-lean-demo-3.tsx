import { CursorLean, CursorLeanLabel } from "@/registry/magicui/cursor-lean"

export function CursorLeanDemo3() {
  return (
    <section className="bg-background text-foreground w-full p-6 sm:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          A home for every stage.
        </h2>
        <p className="text-muted-foreground mt-3 text-sm text-pretty">
          Start a side project or grow your studio with Folio.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="border-border bg-background dark:bg-card flex flex-col rounded-xl border p-5">
          <h3 className="font-semibold">Personal</h3>
          <p className="mt-4 text-3xl font-semibold">
            $0
            <span className="text-muted-foreground text-sm font-normal">
              {" "}
              / month
            </span>
          </p>
          <p className="text-muted-foreground mt-4 mb-8 flex-1 text-sm leading-relaxed">
            One beautiful portfolio with everything you need to share your first
            projects.
          </p>
          <button
            type="button"
            className="border-border focus-visible:outline-ring h-12 w-full rounded-full border px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Start for free
          </button>
        </div>
        <div className="border-foreground bg-background dark:bg-card flex flex-col rounded-xl border p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Pro</h3>
            <span className="bg-muted rounded-full px-2 py-1 text-xs">
              Recommended
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold">
            $12
            <span className="text-muted-foreground text-sm font-normal">
              {" "}
              / month
            </span>
          </p>
          <p className="text-muted-foreground mt-4 mb-8 flex-1 text-sm leading-relaxed">
            Your own domain, unlimited projects, and insights into who is
            discovering your work.
          </p>
          <CursorLean distance={120} offset={16} className="w-full">
            <button
              type="button"
              className="bg-foreground text-background focus-visible:outline-ring h-12 w-full rounded-full border border-transparent px-6 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <CursorLeanLabel>Build with Pro</CursorLeanLabel>
            </button>
          </CursorLean>
        </div>
        <div className="border-border bg-background dark:bg-card flex flex-col rounded-xl border p-5">
          <h3 className="font-semibold">Studio</h3>
          <p className="mt-4 text-3xl font-semibold">
            $29
            <span className="text-muted-foreground text-sm font-normal">
              {" "}
              / month
            </span>
          </p>
          <p className="text-muted-foreground mt-4 mb-8 flex-1 text-sm leading-relaxed">
            A shared home for your team&apos;s work, with collaborative editing
            and client review.
          </p>
          <button
            type="button"
            className="border-border focus-visible:outline-ring h-12 w-full rounded-full border px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Choose Studio
          </button>
        </div>
      </div>
    </section>
  )
}
