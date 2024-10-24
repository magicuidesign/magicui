"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  className?: string;
  text: string;
  scrollHeight?: string;
  stickyHeight?: string;
  textWidth?: string;
  alignX?: "left" | "right" | "center";
  alignY?: "top" | "bottom" | "center";
  stickyOffset?: number | "center";
  stickyPaddingTop?: number;
  children?: ReactNode;
}

const alignmentMap = {
  x: {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  },
  y: {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
  },
} as const;

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  children,
  scrollHeight = "100vh",
  stickyHeight = "100vh",
  textWidth,
  alignX = "center",
  alignY = "center",
  stickyOffset = "center",
  stickyPaddingTop,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const words = text.split(" ");
  const top =
    stickyOffset === "center"
      ? `calc(50% - ${stickyHeight} / 2)`
      : stickyOffset;

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 w-full", className)}
      style={{ height: `calc(${scrollHeight} + 100vh)` }}
    >
      <div
        className={cn(
          "sticky mx-auto flex max-h-screen w-full max-w-4xl bg-transparent px-4",
          alignmentMap.x[alignX],
          alignmentMap.y[alignY],
        )}
        style={{
          height: stickyHeight,
          top,
          paddingTop: stickyPaddingTop,
        }}
      >
        <div className="absolute inset-0 block size-full">{children}</div>
        <p
          className="flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          style={{ width: textWidth }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word
                key={`${word}-${i}`}
                progress={scrollYProgress}
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="text-black dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
