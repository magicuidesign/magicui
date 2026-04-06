"use client"

import { cn } from "@/lib/utils"
import { HexagonPattern } from "@/registry/magicui/hexagon-pattern"

export default function HexagonPatternLinearGradient() {
  return (
    <div className="bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border p-20">
      <HexagonPattern
        radius={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
    </div>
  )
}
