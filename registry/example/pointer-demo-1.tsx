"use client";

import { PointerWrapper } from "@/registry/magicui/pointer";

export default function PointerDemo1() {
  return (
    <PointerWrapper>
      <div className="relative flex size-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Pointer
        </span>
      </div>
    </PointerWrapper>
  );
}
