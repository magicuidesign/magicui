import { FooterWordmark } from "@/registry/magicui/footer-wordmark"

export default function FooterWordmarkDemo3() {
  return (
    <section className="bg-background text-foreground flex min-h-[calc(100svh-3rem)] w-5xl max-w-full flex-col justify-end gap-10">
      <div className="flex flex-col items-start gap-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Make room for the next idea.
          </h2>
          <p className="text-muted-foreground text-sm">
            A shared canvas for thoughtful teams.
          </p>
        </div>
        <button
          type="button"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/50 inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium shadow-xs transition-all outline-none focus-visible:ring-[3px]"
        >
          Start a workspace
        </button>
      </div>
      <FooterWordmark className="font-serif font-normal tracking-normal">
        Tesserine
      </FooterWordmark>
    </section>
  )
}
