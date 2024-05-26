"use client";

import { cn } from "@/lib/utils";

type TColorProp = `#${string}` | `#${string}`[];

interface ShineBorderProps {
  borderRadius?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

export default function ShineBorder({
  borderRadius = 8,
  duration = 14,
  color = "#ffffff",
  className,
  children,
}: ShineBorderProps) {
  const colorProp = !(color instanceof Array) ? color : color.join(",");

  return (
    <div
      className={cn(
        "relative min-h-[60px] w-fit min-w-[300px] text-black dark:text-white",
        className,
      )}
    >
      <div
        style={
          {
            "--border-radius": `${borderRadius}px`,
            "--border-radius-child": `${borderRadius * 0.2}px`,
            "--animation": `shine-pulse ${duration}s linear infinite`,
            "--mask-linear-gradient": ` linear-gradient(${colorProp} 0 0) content-box,linear-gradient(${colorProp} 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${colorProp},transparent,transparent)`,
          } as React.CSSProperties
        }
        
        className={
          "before:[border-radius: var(--border-radius)] before:[background-size: 300% 300%] before:[mask-composite: exclude] before:[animation: var(--animation)] before:[-webkit-animation: var(--animation)] before:[ will-change: background-position] before:[mask: var(--mask-linear-gradient)] before:[-webkit-mask: var(--mask-linear-gradient)] before:[-webkit-mask-composite: xor] before:[background: var(--background-radial-gradient)] before:absolute before:inset-[0] before:left-0 before:top-0 before:-z-[1] before:aspect-square before:h-full before:w-full before:content-none"
        }
      ></div>
      <div
        className={
          "[border-radius: var(--border-radius-child)] absolute h-full w-full"
        }
      >
        {children}
      </div>
    </div>
  );
}
