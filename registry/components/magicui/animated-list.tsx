"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionProps,
  motion,
  useIsPresent,
} from "framer-motion";
import React, { ReactElement, useEffect, useRef, useState } from "react";

export function AnimatedList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const childQueue = useRef(React.Children.toArray(children));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Update the queue when the children prop changes
    childQueue.current = React.Children.toArray(children);

    // Start or restart the interval to add children every 1 second
    clearInterval(intervalRef.current!); // Clear any existing interval
    intervalRef.current = setInterval(() => {
      setItems((prevItems) => {
        if (childQueue.current.length > 0) {
          // Dequeue the next child and add it to the list of items
          const nextChild = childQueue.current.shift();
          return [nextChild, ...prevItems];
        } else {
          // When no children are left in the queue, clear the interval
          clearInterval(intervalRef.current!);
        }
        return prevItems;
      });
    }, 1300);

    // Cleanup the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [children]); // Depend on children, so it restarts when children change

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <AnimatePresence>
        {items.map((item, index) => (
          <AnimatedListItem key={(item as ReactElement)?.key || index}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
}

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const isPresent = useIsPresent();
  const animations: MotionProps = {
    style: {
      position: isPresent ? "static" : "absolute",
      width: "100%",
      margin: "0 auto",
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout>
      {children}
    </motion.div>
  );
}
