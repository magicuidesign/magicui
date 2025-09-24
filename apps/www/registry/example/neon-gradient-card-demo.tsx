import { NeonGradientCard } from "@/registry/magicui/neon-gradient-card"

export default function NeonGradientCardDemo() {
  return (
    <NeonGradientCard className="max-w-sm items-center justify-center text-center">
      <span className="pointer-events-none z-10 h-full bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-3xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl xl:text-6xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Neon Gradient Card
      </span>
    </NeonGradientCard>
  )
}
