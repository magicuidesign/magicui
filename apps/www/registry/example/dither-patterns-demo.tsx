"use client"

import { Dither, DITHER_PATTERNS } from "@/registry/magicui/dither"

export default function DitherPatternsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {DITHER_PATTERNS.map((pattern) => (
        <div
          key={pattern}
          className="bg-background relative flex aspect-4/3 items-end overflow-hidden rounded-lg border p-2 select-none"
        >
          <Dither pattern={pattern} />
          <code className="bg-background/80 text-foreground relative rounded-md border px-1.5 py-0.5 font-mono text-xs backdrop-blur">
            {pattern}
          </code>
        </div>
      ))}
    </div>
  )
}
