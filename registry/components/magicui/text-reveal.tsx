"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useRef } from "react";

interface TextRevealByWordProps {
  text: string;
  containerClassName?: string;
  stickyClassName?: string;
  paragraphContainerClassName?: string;
  paragraphClassName?: string;
  defaultTextOpacityClassName?: string;
  highlightedWordClassName?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  containerClassName,
  stickyClassName,
  paragraphContainerClassName,
  paragraphClassName,
  defaultTextOpacityClassName,
  highlightedWordClassName,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[200vh]", containerClassName)}
    >
      <div
        className={cn(
          "sticky top-0 flex h-[50%] items-center bg-transparent px-0 py-[5rem]",
          stickyClassName,
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-4xl px-[1rem]",
            paragraphContainerClassName,
          )}
        >
          <p
            ref={targetRef}
            className={cn(
              "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl",
              paragraphClassName,
            )}
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  defaultTextOpacityClassName={defaultTextOpacityClassName}
                  highlightedWordClassName={highlightedWordClassName}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
  defaultTextOpacityClassName?: string;
  highlightedWordClassName?: string;
}

const Word: FC<WordProps> = ({
  children,
  progress,
  range,
  defaultTextOpacityClassName,
  highlightedWordClassName,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={cn("absolute opacity-30", defaultTextOpacityClassName)}>
        {children}
      </span>
      <motion.span
        style={{ opacity: opacity }}
        className={cn("text-black dark:text-white", highlightedWordClassName)}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
