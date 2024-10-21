"use client";

import React, { useState, useEffect, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
}

export default function RippleButton({
  className,
  children,
  rippleColor = "#ffffff",
  duration = "600ms",
  ...props
}: RippleButtonProps) {
  const [buttonRipples, setButtonRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([]);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = { x, y, size, key: Date.now() };
    setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  useEffect(() => {
    if (buttonRipples.length > 0) {
      const lastRipple = buttonRipples[buttonRipples.length - 1];
      const timeout = setTimeout(() => {
        setButtonRipples((prevRipples) =>
          prevRipples.filter((ripple) => ripple.key !== lastRipple.key),
        );
      }, parseInt(duration));
      return () => clearTimeout(timeout);
    }
  }, [buttonRipples, duration]);

  return (
    <button
      className={cn(
        "relative overflow-hidden text-center cursor-pointer flex justify-center items-center rounded-lg text-white bg-black-500 px-4 py-2 border-2",
        className,
      )}
      onClick={createRipple}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <span className="absolute inset-0 pointer-events-none">
        {buttonRipples.map((ripple) => (
          <span
            className="absolute animate-rippling bg-white opacity-30 rounded-full"
            key={ripple.key}
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              top: `${ripple.y}px`,
              left: `${ripple.x}px`,
              backgroundColor: rippleColor,
              transform: `scale(0)`,
            }}
          />
        ))}
      </span>
    </button>
  );
}
