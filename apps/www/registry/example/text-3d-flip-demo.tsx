import Text3DFlip from "@/registry/magicui/text-3d-flip"

export default function Text3DFlipDemo() {
  return (
    <Text3DFlip
      className="bg-background font-serif text-2xl sm:text-5xl md:text-[56px]"
      textClassName="bg-background text-foreground"
      flipTextClassName="bg-background text-foreground"
      rotateDirection="top"
      staggerDuration={0.03}
      staggerFrom="first"
      transition={{ type: "spring", damping: 25, stiffness: 160 }}
    >
      Stay hungry, stay foolish
    </Text3DFlip>
  )
}
