"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/registry/components/magicui/dot-pattern";

const DotPatternDemo = () => {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Dot Pattern
      </p>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
};

export default DotPatternDemo;
