"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/registry/components/magicui/grid-pattern";
import RadialGradient from "@/registry/components/magicui/radial-gradient";

const GridPatternDashed = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 shadow-2xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Grid Pattern
      </p>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      <RadialGradient from="rgba(120,119,198,0.3)" to="rgba(0,0,0,0.0)" />
    </div>
  );
};

export default GridPatternDashed;
