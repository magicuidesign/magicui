"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

interface WavyTextProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
}
const WavyText = ({
  word,
  className,
  variant,
  duration = 0.5,
}: WavyTextProps) => {
  const defaultVariants = {
    hidden: { y: 10 },
    visible: { y: -10 },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => word.split(""), [word]);
  return (
    <div className="overflow-hidden py-2">
      <div className="flex justify-center space-x-2">
        <AnimatePresence>
          {characters.map((char, i) => (
            <motion.h1
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={combinedVariants}
              transition={{
                yoyo: Infinity,
                duration: duration,
                delay: i * 0.2,
              }}
              className={cn(
                className,
                "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
              )}
            >
              {char}
            </motion.h1>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WavyText;
