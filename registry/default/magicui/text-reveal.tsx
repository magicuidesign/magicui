"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string | string[];
  className?: string;
  children?: ReactNode;
  side?: "left" | "center" | "right";
}

const justifyMap = {
  left: "justify-start",
  center: "center",
  right: "justify-end",
};

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
  children,
  side = "center",
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const lines = typeof text === "string" ? [text] : text;
  const fullLength = lines.join(" ").split(" ").length;

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0 h-[200vh] w-full", className)}
    >
      <div
        className={`sticky top-0 mx-auto flex h-[50%] w-full items-center bg-transparent px-[1rem] py-[5rem] ${justifyMap[side]}`}
      >
        <div className="absolute right-0 top-0 size-full">{children}</div>
        <p
          className={
            "flex flex-col gap-1 p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {lines.map((line, lineIndex) => {
            const words = line.split(" ");
            return (
              <span key={lineIndex} className="flex flex-wrap">
                {words.map((word, i) => {
                  const globalWordIndex =
                    lines.slice(0, lineIndex).join(" ").split(" ").length +
                    i -
                    1;
                  const start = globalWordIndex / fullLength;
                  const end = start + 1 / fullLength;
                  return (
                    <Word
                      key={i}
                      progress={scrollYProgress}
                      range={[start, end]}
                    >
                      {word}
                    </Word>
                  );
                })}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <motion.span style={{ opacity }} className={"text-black dark:text-white"}>
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
