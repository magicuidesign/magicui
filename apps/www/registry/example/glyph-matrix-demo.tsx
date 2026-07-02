import { GlyphMatrix } from "@/registry/magicui/glyph-matrix"

export default function GlyphMatrixDemo() {
  return (
    <div className="border-border bg-background relative h-[400px] w-full overflow-hidden rounded-lg border">
      <GlyphMatrix
        glyphs="01·•+*/\\<>="
        cellSize={14}
        mutationRate={0.04}
        interval={90}
        fadeBottom={0.6}
      />
    </div>
  )
}
