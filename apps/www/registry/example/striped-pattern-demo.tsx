import { StripedPattern } from "@/registry/magicui/striped-pattern"

export default function StripedPatternDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <StripedPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
    </div>
  )
}
