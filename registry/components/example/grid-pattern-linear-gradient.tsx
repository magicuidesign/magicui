"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/registry/components/magicui/grid-pattern";
import LinearGradient from "@/registry/components/magicui/linear-gradient";

const GridPatternDemo2 = () => {
  return (
    <div className="border rounded-lg h-full w-full relative flex justify-center items-center bg-background overflow-hidden">
      <p className="text-5xl font-medium tracking-tighter whitespace-nowrap text-black dark:text-white z-10">
        Grid Pattern
      </p>
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        // squares={[
        //   [4, 4],
        //   [5, 1],
        //   [8, 2],
        //   [6, 6],
        //   [10, 5],
        //   [13, 3],
        // ]}
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
