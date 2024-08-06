"use client";

import {
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";

type ElementType = "h1" | "h2" | "h3" | "h4" | "p";

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
  as?: ElementType;
}

export default function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
  as = "h1",
}: WordPullUpProps) {
  const MotionComponent = motion[as] as ForwardRefComponent<
    HTMLElement,
    HTMLMotionProps<ElementType>
  >;

  return (
    <MotionComponent
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {words.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "8px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
