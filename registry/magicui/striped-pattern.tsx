import { cn } from "@/lib/utils";
import React, { useId } from "react";

interface StripedPatternProps extends React.SVGProps<SVGSVGElement> {
  direction?: "left" | "right";
}

export function StripedPattern({
  direction = "left",
  className,
  width = 10,
  height = 10,
  ...props
}: StripedPatternProps) {
  const id = useId();
  const w = Number(width);
  const h = Number(height);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "absolute z-10 inset-0 pointer-events-none h-full w-full text-neutral-400/80",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          {direction === "left" ? (
            <>
              <line
                x1="0"
                y1={h}
                x2={w}
                y2="0"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1={-w}
                y1={h}
                x2="0"
                y2="0"
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1={w}
                y1={h}
                x2={w * 2}
                y2="0"
                stroke="currentColor"
                strokeWidth="1"
              />
            </>
          ) : (
            <>
              <line
                x1="0"
                y1="0"
                x2={w}
                y2={h}
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1={-w}
                y1="0"
                x2="0"
                y2={h}
                stroke="currentColor"
                strokeWidth="1"
              />
              <line
                x1={w}
                y1="0"
                x2={w * 2}
                y2={h}
                stroke="currentColor"
                strokeWidth="1"
              />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
