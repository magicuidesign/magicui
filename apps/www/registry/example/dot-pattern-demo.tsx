"use client"

import { cn } from "@/lib/utils"
import { DotPattern } from "@/registry/magicui/dot-pattern"

export default function DotPatternDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  )
}
