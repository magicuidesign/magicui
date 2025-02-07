"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/registry/magicui/interactive-grid-pattern";

export default function InteractiveGridPatternDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Interactive Grid Pattern
      </p>
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
    </div>
  );
}
