import { DiaTextReveal } from "@/registry/magicui/dia-text-reveal"

export default function DiaTextRevealDemo3() {
  return (
    <div className="text-foreground flex min-h-64 items-center justify-center p-8">
      <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
        Learn to{" "}
        <DiaTextReveal
          repeat
          repeatDelay={1.2}
          text={["build faster", "ship smarter", "scale easier"]}
        />
      </h1>
    </div>
  )
}
