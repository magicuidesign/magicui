"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionProps,
  useInView,
  Variants,
} from "motion/react";
import { ElementType, useRef } from "react";

type AnimationType = "text" | "word" | "character" | "line";
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
  | "scaleDown"
  | "pullup";

interface TextAnimateProps extends MotionProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: ElementType;
  by?: AnimationType;
  startOnView?: boolean;
  animation?: AnimationVariant;
}

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          y: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      }),
      exit: {
        opacity: 0,
        y: 20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  fadeLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, x: -20 },
      show: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * 0.1,
          x: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      }),
      exit: {
        opacity: 0,
        x: -20,
        transition: {
          x: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  fadeRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, x: 20 },
      show: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * 0.1,
          x: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      }),
      exit: {
        opacity: 0,
        x: 20,
        transition: {
          x: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: (i: number) => ({
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: i * 0.1,
          filter: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      }),
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: {
          filter: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  blurFade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
      show: (i: number) => ({
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          delay: i * 0.1,
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      }),
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 50, opacity: 0 },
      show: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: i * 0.1,
          y: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      }),
      exit: {
        y: -50,
        opacity: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -50, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        y: 50,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 50, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: {
          x: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
      exit: {
        x: -50,
        opacity: 0,
        transition: {
          x: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -50, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: {
          x: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
      exit: {
        x: 50,
        opacity: 0,
        transition: {
          x: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          scale: {
            duration: 0.3,
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
          opacity: { duration: 0.3 },
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: {
          scale: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: {
          delay: i * 0.1,
          scale: {
            duration: 0.3,
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
          opacity: { duration: 0.3 },
        },
      }),
      exit: {
        scale: 1.5,
        opacity: 0,
        transition: {
          scale: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
  pullup: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 100, opacity: 0 },
      show: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay: i * 0.05,
          y: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      }),
      exit: {
        y: -100,
        opacity: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.3 },
        },
      },
    },
  },
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.6,
  variants,
  className,
  as: Component = "div",
  startOnView = false,
  by = "word",
  animation = "fadeIn",
  ...props
}: TextAnimateProps) {
  const MotionComponent = motion.create(Component);

  // Use provided variants or default variants based on animation type
  const variantsWithTransition = animation
    ? defaultItemAnimationVariants[animation]
    : { container: defaultContainerVariants, item: defaultItemVariants };

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const shouldAnimate = startOnView ? inView : true;

  console.log(animation, variantsWithTransition);

  return (
    <AnimatePresence mode="popLayout">
      {shouldAnimate && (
        <MotionComponent
          ref={ref}
          variants={variantsWithTransition.container}
          initial="hidden"
          animate="show"
          exit="exit"
          className={cn("", className)}
          {...props}
        >
          {by === "character" ? (
            children.split("").map((char, i) => (
              <motion.span
                key={`${by}-${char}-${i}`}
                variants={variantsWithTransition.item}
                custom={i}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))
          ) : by === "word" ? (
            children.split(" ").map((word, i) => (
              <motion.span
                key={`${by}-${word}-${i}`}
                variants={variantsWithTransition.item}
                custom={i}
                className="inline-block whitespace-pre"
              >
                {word}{" "}
              </motion.span>
            ))
          ) : (
            <motion.span variants={variantsWithTransition.item} custom={0}>
              {children}
            </motion.span>
          )}
        </MotionComponent>
      )}
    </AnimatePresence>
  );
}
