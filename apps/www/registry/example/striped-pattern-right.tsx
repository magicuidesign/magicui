import { StripedPattern } from "@/registry/magicui/striped-pattern"

export default function StripedPatternRight() {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <StripedPattern direction="right" />
    </div>
  )
}
