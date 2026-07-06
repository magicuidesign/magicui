import { useId } from "react"
import type { ReactNode } from "react"

import { ScrollTrace } from "@/registry/magicui/scroll-trace"

interface StepProps {
  title: string
  description: string
  children: ReactNode
}

function Step({ title, description, children }: StepProps) {
  return (
    <article className="group">
      <h3 className="text-muted-foreground group-data-reached:text-foreground text-lg font-semibold tracking-tight transition-colors duration-150 motion-reduce:transition-none">
        {title}
      </h3>
      <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
        {description}
      </p>
      <div className="mt-4 max-w-md rounded-lg border p-3 text-xs">
        {children}
      </div>
    </article>
  )
}

export default function ScrollTraceDemo() {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="bg-background h-[540px] w-full overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent,black_32px,black_calc(100%_-_48px),transparent)]"
    >
      <div className="mx-auto max-w-2xl px-6 py-12 sm:py-14">
        <header className="max-w-lg">
          <p className="text-muted-foreground text-sm font-medium">
            How it works
          </p>
          <h2
            id={headingId}
            className="text-foreground mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            From first push to production
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Every commit becomes a preview, and every approved preview becomes a
            release.
          </p>
        </header>

        <ScrollTrace className="mt-10 space-y-16">
          <Step
            title="Connect a repository"
            description="Point Dockyard at a repository and it detects the framework and build settings."
          >
            <code className="block truncate">$ dockyard link</code>
            <p className="text-muted-foreground mt-1 font-mono">
              Next.js detected · pnpm build
            </p>
          </Step>

          <Step
            title="Preview every branch"
            description="Every push gets its own URL, so reviewers open a link instead of pulling code."
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono">feat/search</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-500" />
                Ready · 18s
              </span>
            </div>
            <div className="text-muted-foreground mt-2 flex items-center justify-between gap-2">
              <span className="font-mono">fix/cart-total</span>
              <span>Building</span>
            </div>
          </Step>

          <Step
            title="Ship when checks pass"
            description="Production only updates once the build and the test suite are green."
          >
            <ul className="space-y-2">
              <li className="flex justify-between gap-2">
                <span>Build</span>
                <span>Passed · 41s</span>
              </li>
              <li className="flex justify-between gap-2">
                <span>Tests</span>
                <span>212 passed</span>
              </li>
              <li className="text-muted-foreground flex justify-between gap-2">
                <span>Production rollout</span>
                <span>Healthy</span>
              </li>
            </ul>
          </Step>

          <Step
            title="Roll back with one click"
            description="Restore any earlier release in seconds, without waiting for a rebuild."
          >
            <div className="flex justify-between gap-2">
              <span className="font-mono">release-248</span>
              <span>Current</span>
            </div>
            <div className="text-muted-foreground mt-2 flex justify-between gap-2">
              <span className="font-mono">release-247</span>
              <span>Restorable</span>
            </div>
          </Step>
        </ScrollTrace>

        <footer className="mt-16 flex flex-col items-start gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-foreground font-semibold">
              Your first deploy takes about a minute.
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Free for personal projects, no credit card required.
            </p>
          </div>
          <button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/50 inline-flex h-9 shrink-0 items-center rounded-md px-4 text-sm font-medium outline-none focus-visible:ring-[3px]"
          >
            Start deploying
          </button>
        </footer>
      </div>
    </section>
  )
}
