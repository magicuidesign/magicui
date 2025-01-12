"use client";

import { cn } from "@/lib/utils";

export function LineShadowText({
  text = "SHADOW",
  shadowColor = "black",
  className,
}: {
  text?: string;
  shadowColor?: string;
  className?: string;
}) {
  return (
    <span
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn(
        "relative inline-flex",

        // positioning
        "after:absolute after:left-[0.04em] after:top-[0.04em] after:content-[attr(data-text)]",

        // color
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",

        // text
        "after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",

        // animation
        "after:animate-line-shadow",

        className,
      )}
      data-text={text}
    >
      {text}
    </span>
  );
}
