"use client";

import { PointerWrapper } from "@/registry/magicui/pointer";
import { DotPattern } from "@/registry/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function PointerDemo1() {
  return (
    <PointerWrapper className="w-full">
      <div className="relative h-[500px] w-full flex items-center justify-center overflow-hidden rounded-lg border bg-background">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
          Pointer
        </p>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    </PointerWrapper>
  );
}
