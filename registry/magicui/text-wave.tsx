"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

interface TextWaveProps {
  text: string;
  waveFrequency?: number;
  waveAmplitude?: number;
  color?: string;
  className?: string;
}

export const TextWave = ({
  text,
  waveFrequency = 0.5,
  waveAmplitude = 20,
  color = "currentColor",
  className,
}: TextWaveProps) => {
  return (
    <div
      className={cn(
        "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] font-bold leading-none [filter:url(#threshold)_blur(0.6px)] md:h-24 lg:text-[6rem]",
        className,
      )}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -waveAmplitude, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * waveFrequency * 0.08,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="inline-block"
          style={{ color }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};
