"use client";

import RetroGrid from "@/registry/components/magicui/retro-grid";

const RippleDemo = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 shadow-2xl">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
        Retro Grid
      </span>

      <RetroGrid />
    </div>
  );
};

export default RippleDemo;
