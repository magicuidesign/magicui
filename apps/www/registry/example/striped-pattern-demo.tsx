import { cn } from "@/lib/utils"

import { StripedPattern } from "../magicui/striped-pattern"

export default function StripedPatternDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <StripedPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  )
}
