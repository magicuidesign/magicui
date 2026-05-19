import { GlyphMatrix } from "@/registry/magicui/glyph-matrix"

export default function GlyphMatrixDemo() {
    return (
        <div className="relative w-full h-full bg-background rounded-lg border border-border overflow-hidden">
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
