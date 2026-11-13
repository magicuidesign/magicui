"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Dither } from "@/registry/magicui/dither"

export default function DitherPointerDemo() {
  const [interactive, setInteractive] = useState(true)

  return (
    <div className="bg-background relative flex h-72 w-full items-end justify-center overflow-hidden rounded-lg border p-4 select-none md:h-[400px] md:p-6">
      <Dither
        pattern="clouds"
        colors="var(--foreground)"
        dotSize={2}
        intensity={0.3}
        interactive={interactive}
      />
      <button
        type="button"
        aria-pressed={interactive}
        onClick={() => setInteractive((on) => !on)}
        className="bg-background/80 relative flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium backdrop-blur transition-[scale] duration-150 ease-out active:scale-[0.96]"
      >
        <span
          className={cn(
            "size-2 rounded-full",
            interactive ? "bg-emerald-500" : "bg-muted-foreground/40"
          )}
        />
        Mouse interaction {interactive ? "on" : "off"}
      </button>
    </div>
  )
}
