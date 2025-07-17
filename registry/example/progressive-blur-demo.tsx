"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

export default function ProgressiveBlurDemo() {
  return (
    <div className="relative w-full border rounded-xl">
      <ScrollArea className="relative h-[400px] overflow-hidden">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="flex h-20 w-full items-center justify-center rounded-xl bg-card border"
            >
              {index}
            </div>
          ))}
        </div>
        <ProgressiveBlur position="bottom" height="10%" />
      </ScrollArea>
    </div>
  );
}
