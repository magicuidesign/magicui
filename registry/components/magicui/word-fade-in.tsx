"use client";

import { cn } from "@/lib/utils";
import { Variants, motion } from "framer-motion";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  wordVariants?: Variants;
}

export default function WordFadeIn({
  words,
  delay = 0.15,
  wordVariants = {
    hidden: { opacity: 0 },
    visible: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
}: WordFadeInProps) {
  const _words = words.split(" ");

  return (
    <motion.h1
      variants={wordVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className,
      )}
    >
      {_words.map((word, i) => (
        <motion.span key={word} variants={wordVariants} custom={i}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.h1>
  );
}
