"use client";

import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type headings = 1 | 2 | 3 | 4 | 5 | 6;
type lineHeight = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";

interface GradualSpacingProps {
  heading?: headings;
  lineHeight?: lineHeight;
  text: string;
  duration?: number;
  delay?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
  textClassName?: string;
}

const standardProps = {
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
};

const lineHeightClasses: Record<lineHeight, string> = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

export default function GradualSpacing({
  heading = 1,
  text,
  duration = 0.5,
  delay = 0,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
  textClassName,
  lineHeight = "normal",
}: GradualSpacingProps) {
  let totalCharCount = 0;

  return (
    <motion.div {...standardProps} transition={{ delay }} className={className}>
      <AnimatePresence>
        <Heading
          heading={heading}
          props={{
            className: cn(
              "whitespace-pre-wrap",
              lineHeightClasses[lineHeight],
              textClassName
            ),
          }}
        >
          <div className="flex flex-wrap">
            {text.split(" ").map((word, wordIndex) => {
              const wordElement = (
                <div
                  key={`word-${wordIndex}`}
                  className={cn(
                    "inline-flex items-center",
                    lineHeightClasses[lineHeight]
                  )}
                >
                  {word.split("").map((char, charIndex) => {
                    const currentCharCount = totalCharCount++;
                    return (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        {...standardProps}
                        variants={framerProps}
                        transition={{
                          duration,
                          delay: currentCharCount * delayMultiple + delay,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                  {/* Add space after each word except the last one */}
                  {wordIndex < text.split(" ").length - 1 && (
                    <motion.span
                      {...standardProps}
                      variants={framerProps}
                      transition={{
                        duration,
                        delay: totalCharCount++ * delayMultiple + delay,
                      }}
                      className="inline-block w-[0.25em]"
                    >
                      &nbsp;
                    </motion.span>
                  )}
                </div>
              );
              return wordElement;
            })}
          </div>
        </Heading>
      </AnimatePresence>
    </motion.div>
  );
}

function Heading({
  heading,
  children,
  props,
}: {
  heading: headings;
  children: React.ReactNode;
  props: { [key: string]: any };
}) {
  if (heading === 1) return <h1 {...props}>{children}</h1>;
  if (heading === 2) return <h2 {...props}>{children}</h2>;
  if (heading === 3) return <h3 {...props}>{children}</h3>;
  if (heading === 4) return <h4 {...props}>{children}</h4>;
  if (heading === 5) return <h5 {...props}>{children}</h5>;
  return <h6 {...props}>{children}</h6>;
}
