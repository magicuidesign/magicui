import { FooterWordmark } from "@/registry/magicui/footer-wordmark"

export default function FooterWordmarkDemo2() {
  return (
    <footer className="bg-card text-card-foreground border-border w-5xl max-w-full overflow-hidden rounded-xl border px-6 pt-8 sm:px-10 sm:pt-10">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-sm text-xl font-medium tracking-tight text-balance sm:text-2xl">
          Every decision starts with a clearer view.
        </p>
        <p className="text-muted-foreground text-xs sm:text-sm">
          © 2026 Northline Analytics
        </p>
      </div>
      <FooterWordmark crop={0.3}>Northline</FooterWordmark>
    </footer>
  )
}
