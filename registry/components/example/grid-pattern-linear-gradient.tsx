"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/registry/components/magicui/grid-pattern";
import LinearGradient from "@/registry/components/magicui/linear-gradient";

const GridPatternDemo2 = () => {
  return (
    <div className="border rounded-lg h-full w-full relative flex justify-center items-center bg-background overflow-hidden p-20">
      <p className="text-5xl font-medium tracking-tighter text-black dark:text-white z-10 whitespace-pre-wrap text-center">
        Grid Pattern
      </p>
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "absolute w-full h-full inset-0 stroke-white/10 fill-white/10",
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
      <LinearGradient
        to="rgba(120,119,198,0.3)"
        from="rgba(0,0,0,0.0)"
        direction="bottom right"
      />
    </div>
  );
};

export default GridPatternDemo2;
