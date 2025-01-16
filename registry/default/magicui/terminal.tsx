"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedSpanProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
}: AnimatedSpanProps) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className={cn("font-regular grid font-mono text-sm", className)}
  >
    {children}
  </motion.div>
);

interface TerminalProps {
  typingText?: string;
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const Terminal = ({
  typingText = "Create Magical Landing Pages",
  children,
  className,
  duration = 100,
}: TerminalProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    let completed = false;

    const typingEffect = setInterval(() => {
      if (i < typingText.length) {
        setDisplayedText(typingText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
        if (!completed) {
          completed = true;
          setTypingComplete(true);
        }
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [typingText, duration]);

  return (
    <div
      className={cn(
        "z-0 min-h-[300px] w-full max-w-lg rounded-xl border border-border bg-background",
        className,
      )}
    >
      <div className="flex flex-col gap-y-2 border-b border-border p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre className="p-4">
        <code className="grid">
          <div className="font-regular font-mono text-sm">{displayedText}</div>
          {typingComplete && <div className="grid pt-5">{children}</div>}
        </code>
      </pre>
    </div>
  );
};
