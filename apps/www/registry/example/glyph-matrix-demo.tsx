"use client"

import { useTheme } from "next-themes"

import { GlyphMatrix } from "@/registry/magicui/glyph-matrix"

export default function GlyphMatrixDemo() {
  const { resolvedTheme } = useTheme()
  const themeColor = resolvedTheme === "dark" ? "#ffffff" : "#000000"
  // Stay neutral until the theme resolves so the first frame is visible in
  // both themes.
  const color = resolvedTheme ? themeColor : "#6B7280"

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
