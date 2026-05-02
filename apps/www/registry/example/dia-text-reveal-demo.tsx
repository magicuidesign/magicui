import { DiaTextReveal } from "@/registry/magicui/dia-text-reveal"

export default function DiaTextRevealDemo() {
  return (
    <div className="flex min-h-64 items-center justify-center p-8">
      <DiaTextReveal
        className="text-4xl font-bold tracking-tight"
        text="Magic UI"
        colors={["#A97CF8", "#F38CB8", "#FDCC92"]}
      />
    </div>
  )
}
