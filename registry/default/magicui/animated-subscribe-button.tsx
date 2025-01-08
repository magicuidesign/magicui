"use client";

import { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

interface AnimatedSubscribeButtonProps extends HTMLMotionProps<"button"> {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  ref?: React.Ref<HTMLButtonElement>;
}

export const AnimatedSubscribeButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedSubscribeButtonProps
>(
  (
    {
      buttonColor,
      subscribeStatus,
      buttonTextColor,
      changeText,
      initialText,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

    return (
      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.button
            ref={ref}
            className="relative flex h-10 w-[200px] items-center justify-center overflow-hidden rounded-md bg-white outline outline-1 outline-black"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setIsSubscribed(false);
              onClick?.(e);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
          >
            <motion.span
              ref={ref}
              key="action"
              className="relative flex h-full w-full items-center justify-center font-semibold"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              style={{ color: buttonColor }}
            >
              {changeText}
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            className="relative flex h-10 w-[200px] cursor-pointer items-center justify-center rounded-md border-none"
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
            onClick={(e) => {
              setIsSubscribed(true);
              onClick?.(e);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
          >
            <motion.span
              key="reaction"
              className="relative flex items-center justify-center font-semibold"
              initial={{ x: 0 }}
              exit={{ x: 50, transition: { duration: 0.1 } }}
            >
              {initialText}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    );
  },
);

AnimatedSubscribeButton.displayName = "AnimatedSubscribeButton";
