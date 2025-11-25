import { CursorLean, CursorLeanLabel } from "@/registry/magicui/cursor-lean"

export function CursorLeanDemo() {
  return (
    <section className="bg-background border-border text-foreground dark:bg-card flex w-full flex-col items-center rounded-xl border px-6 py-20 text-center">
      <p className="mb-5 rounded-full border border-violet-300 px-3 py-1 text-xs font-medium tracking-widest text-violet-700 uppercase dark:border-violet-700 dark:text-violet-300">
        Meet Folio
      </p>
      <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
        Your best work deserves a home.
      </h2>
      <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed text-pretty">
        Turn your projects into a portfolio you are proud to share. Publish in
        minutes, then get back to making things.
      </p>
      <div className="mt-14 flex justify-center">
        <CursorLean>
          <button
            type="button"
            className="focus-visible:outline-ring rounded-full border border-transparent bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:active:scale-[0.98]"
          >
            <CursorLeanLabel>Create your portfolio</CursorLeanLabel>
          </button>
        </CursorLean>
      </div>
      <a
        href="https://magicui.design/docs/templates/portfolio"
        className="text-muted-foreground hover:text-foreground focus-visible:outline-ring mt-10 rounded-sm text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Explore the template
      </a>
      <p className="text-muted-foreground mt-6 text-xs">
        Free to start. No credit card needed.
      </p>
    </section>
  )
}
