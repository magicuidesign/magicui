"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/registry/magicui/dot-pattern";

export default function DotPatternLinearGradient() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
    </div>
  );
}
