"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, Variants } from "motion/react";
import { ElementType, useEffect, useRef, useState } from "react";

type AnimationType = "text" | "word" | "character";
type AnimationVariant =
  | "fadeIn"
  | "fadeLeft"
  | "fadeRight"
  | "blur"
  | "blurFade"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

interface TextAnimateProps extends MotionProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: ElementType;
  startOnView?: boolean;
  by?: AnimationType;
  animation?: AnimationVariant;
}

const defaultVariants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  },
  fadeRight: {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  },

  blurFade: {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 },
      },
    }),
  },
  slideUp: {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      },
    }),
  },
  slideDown: {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      },
    }),
  },
  slideLeft: {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      },
    }),
  },
  slideRight: {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      },
    }),
  },
  scaleUp: {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        scale: {
          type: "spring",
          damping: 15,
          stiffness: 300,
        },
      },
    }),
  },
  scaleDown: {
    hidden: {
      scale: 1.5,
      opacity: 0,
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        scale: {
          type: "spring",
          damping: 15,
          stiffness: 300,
        },
      },
    }),
  },
};

export default function TextAnimate({
  children,
  delay = 0.1,
  duration = 1,
  variants,
  className,
  as: Component = "div",
  startOnView = false,
  by = "word",
  animation = "fadeIn",
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [shouldAnimate, setShouldAnimate] = useState(!startOnView);
  const elementRef = useRef<HTMLElement | null>(null);

  // Use provided variants or default variants based on animation type
  const selectedVariants = variants || {
    ...defaultVariants[animation],
    visible: (i: number) => ({
      ...(defaultVariants[animation].visible as (i: number) => any)(i),
      transition: {
        delay: i * delay,
        duration: duration,
      },
    }),
  };

  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [startOnView]);

  const getAnimatedElements = () => {
    switch (by) {
      case "character":
        return children.split("").map((char, i) => (
          <motion.span key={i} variants={selectedVariants} custom={i}>
            {char}
          </motion.span>
        ));
      case "word":
        return children.split(" ").map((word, i) => (
          <motion.span key={i} variants={selectedVariants} custom={i}>
            {word}{" "}
          </motion.span>
        ));
      default:
        return (
          <motion.span variants={selectedVariants} custom={0}>
            {children}
          </motion.span>
        );
    }
  };

  return (
    <MotionComponent
      ref={elementRef}
      variants={selectedVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      className={cn("text-4xl font-bold", className)}
      {...props}
    >
      {getAnimatedElements()}
    </MotionComponent>
  );
}
