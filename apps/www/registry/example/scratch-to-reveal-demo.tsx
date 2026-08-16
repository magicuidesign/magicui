import { ScratchToReveal } from "@/registry/magicui/scratch-to-reveal"

const COVER_COLORS = ["#A97CF8", "#F38CB8", "#FDCC92"] as const

export default function ScratchToRevealDemo() {
  return (
    <ScratchToReveal
      width={280}
      height={180}
      minScratchPercentage={55}
      gradientColors={COVER_COLORS}
      className="bg-background flex max-w-full items-center justify-center rounded-2xl border shadow-sm"
    >
      <div className="flex size-full flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="text-4xl" aria-hidden="true">
          ✨
        </span>
        <p className="text-xl font-semibold">You found the surprise!</p>
        <p className="text-muted-foreground text-sm">
          Magic is in the details.
        </p>
      </div>
    </ScratchToReveal>
  )
}
