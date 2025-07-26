"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialWallProps {
  testimonials: Testimonial[];
  className?: string;
  direction?: "up" | "down";
  duration?: number;
  gap?: string;
}

export const TestimonialWall = ({
  testimonials,
  className,
  direction = "up",
  duration = 20,
  gap = "1.5rem",
}: TestimonialWallProps) => {
  const animationVariants = {
    up: { translateY: "-50%" },
    down: { translateY: "0%" },
  };

  const initialVariants = {
    up: { translateY: "0%" },
    down: { translateY: "-50%" },
  };

  return (
    <div
      className={cn("w-full overflow-hidden bg-background", className)}
      style={
        {
          "--gap": gap,
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <motion.div
        className="flex flex-col gap-[var(--gap)]"
        initial={initialVariants[direction]}
        animate={animationVariants[direction]}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...testimonials, ...testimonials].map(
          ({ text, image, name, role }, i) => (
            <div
              className="p-9 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full"
              key={i}
            >
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <img
                  width={40}
                  height={40}
                  src={image}
                  alt={name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5">
                    {name}
                  </div>
                  <div className="leading-5 opacity-60 tracking-tight">
                    {role}
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </motion.div>
    </div>
  );
};
