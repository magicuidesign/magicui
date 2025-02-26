"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[];
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          "--background-radial-gradient": `radial-gradient(transparent,transparent, ${Array.isArray(shineColor) ? shineColor.join(",") : shineColor},transparent,transparent)`,
          backgroundImage: "var(--background-radial-gradient)",
          backgroundSize: "300% 300%",
          mask: "var(--mask-linear-gradient)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] p-[--border-width] will-change-[background-position] motion-safe:animate-shine",
        className,
      )}
      {...props}
    />
  );
}
