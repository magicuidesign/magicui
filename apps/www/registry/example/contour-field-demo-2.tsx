import { cn } from "@/lib/utils"
import { ContourField } from "@/registry/magicui/contour-field"

export default function ContourFieldDemo2() {
  return (
    <div
      className={cn(
        "border-border bg-background text-foreground relative flex min-h-96 w-full items-center justify-center overflow-hidden rounded-lg border px-6 py-16",
        // A brand color token, lighter in dark mode.
        "[--brand:#6b21ef] dark:[--brand:#b78aff]"
      )}
    >
      <ContourField
        color="var(--brand)"
        className={cn(
          // Clears an oval behind the copy, which wraps on phones.
          "[--fade-oval:radial-gradient(ellipse_44%_50%_at_50%_52%,transparent_58%,black_100%)]",
          "md:[--fade-oval:radial-gradient(ellipse_320px_160px_at_50%_50%,transparent_45%,rgba(0,0,0,0.35)_70%,black_100%)]"
        )}
      />
      <div className="relative z-10 flex max-w-lg flex-col items-center gap-5 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Your first map takes four minutes
        </h2>
        <p className="text-muted-foreground text-balance">
          Connect a region and Meridian draws the rest.
        </p>
        <button
          type="button"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Create a workspace
        </button>
      </div>
    </div>
  )
}
