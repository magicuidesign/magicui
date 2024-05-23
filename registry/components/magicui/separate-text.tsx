"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SeparateTextProps {
    className?: string;
    upperText: string;
    lowerText: string;
    duration?: number
}

export default function SeparateText({
    className,
    upperText,
    lowerText,
    duration

}: SeparateTextProps) {

    const separate = {
        hidden: { opacity: 0, y: 0 },
        visible: (custom: number) => ({
            opacity: 1,
            y: custom * 5,
            transition: { duration: duration ? 1.5 : duration },
        }),
    };

  return (
    <div>
      <motion.h1
        custom = { -1 }
        variants = { separate }
        initial = "hidden"
        animate = "visible"
        className = { cn("text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]", className) }
      >
        { upperText }
      </motion.h1>
      
      <motion.h1
        custom = { 1 }
        variants = { separate }
        initial = "hidden"
        animate = "visible"
        className = { cn("text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]", className) }
      >
        { lowerText }
      </motion.h1>

    </div>
  );
}
