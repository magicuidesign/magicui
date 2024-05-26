import { NeonGradientCard } from "@/registry/components/magicui/neon-gradient-card";

export default async function NeonGradientCardDemo() {
  return (
    <NeonGradientCard className="max-w-sm items-center justify-center text-center">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Neon Gradient Card
      </span>
    </NeonGradientCard>
  );
}
