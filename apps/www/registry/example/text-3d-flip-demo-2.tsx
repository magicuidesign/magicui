import Text3DFlip from "@/registry/magicui/text-3d-flip"

export default function Text3DFlipDemo2() {
  return (
    <Text3DFlip
      className="bg-background font-serif text-2xl sm:text-5xl md:text-[56px]"
      textClassName="bg-background text-foreground"
      flipTextClassName="bg-background text-foreground"
      rotateDirection="top"
      staggerDuration={0.03}
      staggerFrom="center"
    >
      Design for failure
    </Text3DFlip>
  )
}
