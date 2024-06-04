"use client";


import { AnimatePresence, easeIn, easeOut, motion, animate } from "framer-motion";
import React, { CSSProperties } from "react";

interface PulsatingButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  buttonText: string;
}

export const PulsatingButton: React.FC<PulsatingButtonProps> = ({
  buttonColor,
  buttonTextColor,
  buttonText,
}) => {
  return (
      (
          <button
            className="relative bg-white w-[200px] p-[10px] flex justify-center items-center"
            style={{
              color: buttonColor,
              opacity: 1,
            }}
          >
            <div
              
            >
              <span
                className="relative block w-full h-full font-semibold"
                style={{ color: buttonTextColor }}
              >
                {buttonText}
              </span>
            </div>
              
          </button>
      )
    
  );
};

/**
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface AnimatedSubscribeButtonProps {
  brand: string;
  subscribeStatus: boolean;
  buttonTextColor?: string;
  initialText: string;
  changeText: string;
}

export const AnimatedSubscribeButton: React.FC<AnimatedSubscribeButtonProps> = ({
  brand,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          className="relative bg-white w-[200px] p-[10px] flex justify-center items-center"
          onClick={() => setIsSubscribed(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key='action'
            className="relative block w-full h-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: brand }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className="relative rounded-md w-[200px] border-none cursor-pointer p-[10px] flex items-center justify-center"
          style={{ backgroundColor: brand, color: buttonTextColor }}
          onClick={() => setIsSubscribed(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key='reaction'
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

*/