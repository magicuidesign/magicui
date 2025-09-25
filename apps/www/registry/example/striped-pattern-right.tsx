import { StripedPattern } from "../magicui/striped-pattern"

export default function StripedPatternRight() {
  return (
    <div className="bg-background relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <StripedPattern direction="right" />
    </div>
  )
}
