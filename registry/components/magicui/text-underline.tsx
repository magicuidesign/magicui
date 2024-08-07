"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
  word: string;
  duration?: number;
  className?: string;
  color?: string | string[];
  lineStrokeWidth?: number | string;
  startPlacement?: "left" | "right";
  endPlacement?: "left" | "right";
}

export default function TextUnderline({
  word,
  duration = 0.5,
  className,
  color = "#000000",
  lineStrokeWidth = "0.1rem",
  startPlacement = "right",
  endPlacement = "left",
}: Props) {
  const lineStroke =
    typeof lineStrokeWidth === "number"
      ? `${lineStrokeWidth}px`
      : lineStrokeWidth;

  const textVariants = {
    initial: {
      backgroundSize: `0% ${lineStroke}`,
      backgroundPosition: `${startPlacement} bottom`,
    },
    hover: {
      backgroundSize: `100% ${lineStroke}`,
      backgroundPosition: `${endPlacement} bottom`,
    },
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, ${Array.isArray(color) ? color.join(",") : `${color}, ${color}`})`,
    transitionDuration: `${duration}s`,
  };

  return (
    <motion.div
      whileHover="hover"
      variants={textVariants}
      initial="initial"
      animate="initial"
    >
      <motion.span
        className={cn(
          "bg-no-repeat !inline bg-right-bottom transition-[background-size] ease-linear hover:bg-left-bottom",
          className,
        )}
        style={backgroundStyle}
        variants={textVariants}
      >
        {word}
      </motion.span>
    </motion.div>
  );
}
