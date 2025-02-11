"use client";

import React, { useState, useEffect, useRef } from "react";

import { AnimatePresence, motion, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * @property {React.ReactNode} children - The child elements to be wrapped
 * @property {string} [className] - Optional CSS classes to be applied to the wrapper
 */
interface PointerWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A component that wraps content and adds a custom pointer animation when hovering
 * over the wrapped area. The pointer follows the mouse movement within the wrapped area.
 *
 * @component
 * @param {PointerWrapperProps} props - The component props
 */
export function PointerWrapper({ children, className }: PointerWrapperProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (rect) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      x.set(e.clientX - rect.left + scrollX);
      y.set(e.clientY - rect.top + scrollY);
    }
  }

  function handleMouseLeave() {
    setIsInside(false);
  }

  function handleMouseEnter() {
    setIsInside(true);
  }

  return (
    <div
      className={cn("relative", className)}
      ref={ref}
      style={{
        cursor: "none",
      }}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>{isInside && <Pointer x={x} y={y} />}</AnimatePresence>
      {children}
    </div>
  );
}

/**
 * @property {MotionValue<number>} x - The x-coordinate position of the pointer
 * @property {MotionValue<number>} y - The y-coordinate position of the pointer
 */
interface PointerProps {
  x: any;
  y: any;
}

/**
 * A custom pointer component that displays an animated arrow cursor
 *
 * @description Used internally by PointerWrapper to show the custom cursor
 *
 * @component
 * @param {PointerProps} props - The component props
 */
function Pointer({ x, y }: PointerProps): JSX.Element {
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 text-black transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-white"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
    </motion.div>
  );
}
