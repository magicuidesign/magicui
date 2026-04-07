"use client"

import { HexagonPattern } from "@/registry/magicui/hexagon-pattern"

export default function HexagonPatternSpacing() {
  return (
    <div className="bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border p-20">
      <HexagonPattern gap={20} radius={40} x={-1} y={-1} />
    </div>
  )
}
