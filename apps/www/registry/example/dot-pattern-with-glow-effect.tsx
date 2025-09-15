"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/registry/magicui/dot-pattern";

export default function DotPatternWithGlowEffectDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}
