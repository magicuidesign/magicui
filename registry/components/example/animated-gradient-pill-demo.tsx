import { cn } from "@/lib/utils";
import AnimatedGradientPill from "@/registry/components/magicui/animated-gradient-pill";
import { ChevronRight } from "lucide-react";

export default async function AnimatedGradientPillDemo() {
  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center">
      <AnimatedGradientPill>
        🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-border" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          Introducing Magic UI
        </span>
        <ChevronRight className="ml-1 h-4 w-4 text-gray-500" />
      </AnimatedGradientPill>
    </div>
  );
}
