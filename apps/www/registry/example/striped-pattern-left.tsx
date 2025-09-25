import { StripedPattern } from "../magicui/striped-pattern"

export default function StripedPatternLeft() {
  return (
    <div className="bg-background relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <StripedPattern />
    </div>
  )
}
