"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/registry/components/magicui/grid-pattern";
import RadialGradient from "@/registry/components/magicui/radial-gradient";

const GridPatternDemo = () => {
  return (
    <div className="border rounded-lg h-full w-full relative flex justify-center items-center bg-background overflow-hidden p-20">
      <p className="text-5xl font-medium tracking-tighter whitespace-nowrap text-black dark:text-white z-10">
        Grid Pattern
      </p>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [6, 6],
          [10, 5],
          [13, 3],
        ]}
        className={cn(
          "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
          "skew-y-12 inset-x-0 inset-y-[-30%] h-[200%]"
        )}
      />
      <RadialGradient from="rgba(120,119,198,0.3)" to="rgba(0,0,0,0.0)" />
    </div>
  );
};

export default GridPatternDemo;
