import { DiaTextReveal } from "@/registry/magicui/dia-text-reveal"

export default function DiaTextRevealDemo4() {
  return (
    <div className="flex min-h-56 items-center justify-center p-8">
      <DiaTextReveal
        className="text-4xl font-bold tracking-tight"
        colors={["#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"]}
        delay={0.35}
        duration={2.4}
        text="Made with care"
      />
    </div>
  )
}
