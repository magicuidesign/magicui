"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Second it takes to complete one full shine cycle
   * AKA: Speed of the animation
   * (lower = faster)
   * @default 14
   */
  duration?: number;
  /**
   * Whether the animation should fade out after the fadeoutAfter duration
   * @default false
   */
  fadeout?: boolean;
  /**
   * Duration of the shine effect in seconds after it becomes active
   * Requires: `fadeout = {true}`
   * @default 15 (seconds)
   */
  fadeoutAfter?: number;
  /**
   * Duration of the fade out effect in seconds
   * @default 0.5
   */
  fadeoutDuration?: number;
  /**
   * Whether the animation should fade in when it starts
   * @default false
   */
  fadein?: boolean;
  /**
   * Duration of the fade in effect in seconds
   * @default 0.5
   */
  fadeinDuration?: number;
  /**
   * Delay in seconds before the animation starts after component mount
   * @default 0
   */
  delayLoad?: number;
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
  fadeout = false,
  fadeoutAfter = 15,
  fadeoutDuration = 0.5,
  fadein = false,
  fadeinDuration = 0.5,
  delayLoad = 0,
  shineColor = "#000000",
  className,
  style,
  ...props
}: ShineBorderProps) {
  const [isComplete, setIsComplete] = React.useState(false);
  const [hasStarted, setHasStarted] = React.useState(
    !fadein && delayLoad === 0,
  );
  const [isDelayComplete, setIsDelayComplete] = React.useState(delayLoad === 0);

  // Handle delay timer
  React.useEffect(() => {
    if (delayLoad > 0) {
      const delayTimer = setTimeout(() => {
        setIsDelayComplete(true);
        if (!fadein) {
          setHasStarted(true);
        }
      }, delayLoad * 1000);

      return () => clearTimeout(delayTimer);
    }
  }, [delayLoad, fadein]);

  React.useEffect(() => {
    if (fadein && isDelayComplete) {
      // Start the fade-in after delay is complete
      const fadeInTimer = setTimeout(() => {
        setHasStarted(true);
      }, 10); // Small delay to ensure the initial state is rendered

      return () => clearTimeout(fadeInTimer);
    }
  }, [fadein, isDelayComplete]);

  React.useEffect(() => {
    if (fadeoutAfter && fadeoutAfter > 0) {
      // Calculate total time: delay + fade-in + active animation time
      const totalDelay = delayLoad + (fadein ? fadeinDuration : 0);
      const timer = setTimeout(
        () => {
          setIsComplete(true);
        },
        (totalDelay + fadeoutAfter) * 1000,
      );

      return () => clearTimeout(timer);
    }
  }, [fadeoutAfter, delayLoad, fadein, fadeinDuration]);

  const shouldAnimate = !fadeoutAfter || !isComplete || !fadeout;

  // Calculate opacity based on fade states
  let opacity = 1;
  if (fadein && !hasStarted) {
    opacity = 0;
  } else if (fadeoutAfter && isComplete && fadeout) {
    opacity = 0;
  }

  // Calculate transition
  let transition: string | undefined;
  if (fadein && !hasStarted) {
    transition = `opacity ${fadeinDuration}s ease-in`;
  } else if (fadeout) {
    transition = `opacity ${fadeoutDuration}s ease-out`;
  }
  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          backgroundImage: `radial-gradient(transparent,transparent, ${
            Array.isArray(shineColor) ? shineColor.join(",") : shineColor
          },transparent,transparent)`,
          backgroundSize: "300% 300%",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
          opacity,
          transition,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
        shouldAnimate && "motion-safe:animate-shine",
        className,
      )}
      {...props}
    />
  );
}
