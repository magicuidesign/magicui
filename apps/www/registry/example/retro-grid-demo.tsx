"use client"

import { RetroGrid } from "@/registry/magicui/retro-grid"

export default function RetroGridDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <span className="pointer-events-none z-10 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent">
        Retro Grid
      </span>

      <RetroGrid />
    </div>
  )
}
