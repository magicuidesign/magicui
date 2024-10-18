"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  duration,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
  decimalPlaces?: number;
  duration?: number; // duration in s
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const formatter = useRef(new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })).current;

  const updateDom = useCallback((latest: number) => {
    if (ref.current) {
      ref.current.textContent = formatter.format(Number(latest.toFixed(decimalPlaces)));
    }
  }, [formatter, decimalPlaces]);

  useEffect(() => {
    if (!isInView) return;

    const timeoutId = setTimeout(() => {
      if (duration === undefined) {
        motionValue.set(direction === "down" ? 0 : value);
      } else {
        const controls = animate(motionValue, direction === "down" ? 0 : value, {
          duration,
          ease: "easeOut",
        });
        return () => controls.stop();
      }
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [isInView, value, direction, duration, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = (duration === undefined ? springValue : motionValue).on("change", updateDom);
    return unsubscribe;
  }, [duration, springValue, motionValue, updateDom]);

  // Initial update
  useEffect(() => {
    updateDom(motionValue.get());
  }, [updateDom, motionValue]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-black dark:text-white tracking-wider",
        className,
      )}
      ref={ref}
    />
  );
}
