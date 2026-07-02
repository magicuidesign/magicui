"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { GlyphMatrix } from "@/registry/magicui/glyph-matrix"

export default function GlyphMatrixDemo() {
  const { resolvedTheme } = useTheme()
  // Start neutral so the first frame is visible in both themes, then adopt
  // the resolved theme color once it's known.
  const [color, setColor] = useState("#6B7280")

  useEffect(() => {
    if (!resolvedTheme) return
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000")
  }, [resolvedTheme])

  return (
    <div className="border-border bg-background relative h-[400px] w-full overflow-hidden rounded-lg border">
      <GlyphMatrix
        glyphs="01·•+*/\<>="
        cellSize={14}
        mutationRate={0.04}
        interval={90}
        fadeBottom={0.6}
        color={color}
      />
    </div>
  )
}
