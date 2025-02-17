"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

/**
 * @property {React.ReactNode} children - The child elements to be wrapped
 */
interface PointerWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * A component that wraps content and adds a custom pointer animation when hovering
 * over the wrapped area. The pointer follows the mouse movement within the wrapped area.
 *
 * @component
 * @param {PointerWrapperProps} props - The component props
 */
export function PointerWrapper({
  children,
  className,
  ...props
}: PointerWrapperProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState<boolean>(false);

  useEffect(() => {
    function updateRect() {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    }

    // Initial rect calculation
    updateRect();

    // Update rect on window resize
    window.addEventListener("resize", updateRect);

    return () => {
      window.removeEventListener("resize", updateRect);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (rect) {
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    }
  }

  function handleMouseLeave() {
    setIsInside(false);
  }

  function handleMouseEnter() {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
      setIsInside(true);
    }
  }

  return (
    <div
      ref={ref}
      className={cn("relative cursor-none", className)}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      {...props}
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
      className="pointer-events-none absolute z-50 h-4 w-4 rounded-full"
      style={{
        top: y,
        left: x,
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
        className="h-6 w-6 translate-x-[-12px] translate-y-[-10px] rotate-[-70deg] stroke-white text-black"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
    </motion.div>
  );
}
