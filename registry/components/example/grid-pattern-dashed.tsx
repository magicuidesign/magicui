"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/registry/components/magicui/grid-pattern";
import RadialGradient from "@/registry/components/magicui/radial-gradient";

const GridPatternDashed = () => {
  return (
    <div className="border rounded-lg h-full w-full relative flex justify-center items-center bg-background overflow-hidden">
      <p className="text-5xl font-medium tracking-tighter whitespace-nowrap text-black dark:text-white z-10">
        Grid Pattern
      </p>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "absolute w-full h-full inset-0 stroke-white/10 fill-white/10",
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      <RadialGradient from="rgba(120,119,198,0.3)" to="rgba(0,0,0,0.0)" />
    </div>
  );
};

export default GridPatternDashed;
