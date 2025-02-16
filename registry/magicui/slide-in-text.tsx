"use client";

import type React from "react";
import { motion } from "motion/react";

interface SlideInTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  children?: number;
}

export const SlideInText: React.FC<SlideInTextProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  children = 0.1,
}) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: children, delayChildren: i * delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: "-100vw",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          transition={{ duration: duration }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SlideInText;
