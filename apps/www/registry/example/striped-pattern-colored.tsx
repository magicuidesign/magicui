import { StripedPattern } from "@/registry/magicui/striped-pattern"

export default function StripedPatternColored() {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <StripedPattern className="stroke-[0.3] text-orange-500/60" />
    </div>
  )
}
