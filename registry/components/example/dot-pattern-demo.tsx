"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/registry/components/magicui/dot-pattern";
import RadialGradient from "@/registry/components/magicui/radial-gradient";

const DotPatternDemo = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 shadow-2xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Dot Pattern
      </p>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
        )}
      />
      <RadialGradient from="rgba(120,119,198,0.3)" to="rgba(0,0,0,0.0)" />
    </div>
  );
};

export default DotPatternDemo;
