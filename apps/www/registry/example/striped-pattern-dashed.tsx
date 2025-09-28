import { StripedPattern } from "@/registry/magicui/striped-pattern"

export default function Component() {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <StripedPattern className="stroke-[0.3] [stroke-dasharray:8,4]" />
    </div>
  )
}
