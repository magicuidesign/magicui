"use client";

import { motion, Variants, ForwardRefComponent, HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type ElementType = "h1" | "h2" | "h3" | "h4" | "p";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: ElementType;
}

export default function WordFadeIn({
  words,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0 },
    visible: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
  as = "h1",
}: WordFadeInProps) {
  const _words = words.split(" ");

  const MotionComponent = motion[as] as ForwardRefComponent<HTMLElement, HTMLMotionProps<ElementType>>;

  return (
    <MotionComponent
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]",
        className,
      )}
    >
      {_words.map((word, i) => (
        <motion.span key={word} variants={variants} custom={i}>
          {word}{" "}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
