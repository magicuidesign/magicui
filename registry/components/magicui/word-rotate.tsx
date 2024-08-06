"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
} from "framer-motion";

import { cn } from "@/lib/utils";

type ElementType = "h1" | "h2" | "h3" | "h4" | "p";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<ElementType>;
  as?: ElementType;
  className?: string;
}

export default function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  as = "h1",
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  const MotionComponent = motion[as] as ForwardRefComponent<
    HTMLElement,
    HTMLMotionProps<ElementType>
  >;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <MotionComponent
          key={words[index]}
          className={cn(className)}
          {...framerProps}
        >
          {words[index]}
        </MotionComponent>
      </AnimatePresence>
    </div>
  );
}
