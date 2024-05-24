"use client";

import { cn } from "@/lib/utils";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect } from "react";
const defaultIcons = [
  "https://framerusercontent.com/images/5usrgId9ZEo1bpHmL0oKtTgLJzo.png",
  "https://framerusercontent.com/images/m0r9CEC7s8GDYqPAIylgXfSXjCQ.png",
  "https://framerusercontent.com/images/5j0KooTXnfLHLvSGXkrzt1O55M.png",
  "https://framerusercontent.com/images/gxkLfDA9rOJraf3kfJEp4YhdXE.png",
  "https://framerusercontent.com/images/ur44bCj1MAeA7KjGi0QSxmmXFo.png",
  "https://framerusercontent.com/images/gxkLfDA9rOJraf3kfJEp4YhdXE.png",
  "https://framerusercontent.com/images/aYfpGVMF7lqlwp2wi4b7tYuc.png",
  "https://framerusercontent.com/images/ihXmZVj5s0wJqyzSgactVlobZP8.png",
  "https://framerusercontent.com/images/ur44bCj1MAeA7KjGi0QSxmmXFo.png",
  "https://framerusercontent.com/images/NQ1zyMV5E5ArtDZaD45T9TEdIs.png",
  "https://framerusercontent.com/images/OqGegBiGOyPSMRBg6G2gzuitue8.png",
  "https://framerusercontent.com/images/ihXmZVj5s0wJqyzSgactVlobZP8.png",
  "https://framerusercontent.com/images/NQ1zyMV5E5ArtDZaD45T9TEdIs.png",
  "https://framerusercontent.com/images/qt9ZvdXWfV28hj9g3LKehkPC21I.png",
  "https://framerusercontent.com/images/OqGegBiGOyPSMRBg6G2gzuitue8.png",
  "https://framerusercontent.com/images/XftcAkP54gtpwFG7yhhpL2LaTSU.png",
  "https://framerusercontent.com/images/OqGegBiGOyPSMRBg6G2gzuitue8.png",
  "https://framerusercontent.com/images/XftcAkP54gtpwFG7yhhpL2LaTSU.png",
  "https://framerusercontent.com/images/ikwvX8GzVDVwuEa4HVGAwRWdA6Y.png",
  "https://framerusercontent.com/images/q4d6GHk00IYWVEaRoh1pWEosteE.png",
  "https://framerusercontent.com/images/w3kCPWojhnIuYQvTn9YuWpWGHWs.png",
  "https://framerusercontent.com/images/ByJFTylbIgnNnYzCqDs3UwabBPI.png",
  "https://framerusercontent.com/images/5j0KooTXnfLHLvSGXkrzt1O55M.png",
  "https://framerusercontent.com/images/5usrgId9ZEo1bpHmL0oKtTgLJzo.png",
  "https://framerusercontent.com/images/XftcAkP54gtpwFG7yhhpL2LaTSU.png",
];
const defaultDurations = [1, 1.2, 1.3];
const defaultEases = ["linear", "easeInOut", "easeInOut"];
const defaultTranslates = [160, 230, 320];

interface RotatingCircles {
  icons?: string[];
  children?: React.ReactNode;
  className?: string;
  durationInner?: number;
  durationMiddle?: number;
  durationOuter?: number;
  easeInner?: string;
  easeMiddle?: string;
  easeOuter?: string;
  translateInner?: number;
  translateMiddle?: number;
  translateOuter?: number;
}

const RotatingCircles: React.FC<RotatingCircles> = ({
  icons = defaultIcons,
  children,
  className,
  durationInner = defaultDurations[0],
  durationMiddle = defaultDurations[1],
  durationOuter = defaultDurations[2],
  easeInner = defaultEases[0],
  easeMiddle = defaultEases[1],
  easeOuter = defaultEases[2],
  translateInner = defaultTranslates[0],
  translateMiddle = defaultTranslates[1],
  translateOuter = defaultTranslates[2],
}) => {
  const { scrollYProgress } = useScroll();
  const controlsInner = useAnimation();
  const controlsMiddle = useAnimation();
  const controlsOuter = useAnimation();

  const rotateInner = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateMiddle = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateOuter = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleScroll = () => {
      controlsInner.start({
        rotate: rotateInner.get(),
        transition: { duration: durationInner, ease: easeInner },
      });
      controlsMiddle.start({
        rotate: rotateMiddle.get(),
        transition: { duration: durationMiddle, ease: easeMiddle },
      });
      controlsOuter.start({
        rotate: rotateOuter.get(),
        transition: { duration: durationOuter, ease: easeOuter },
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    controlsInner,
    controlsMiddle,
    controlsOuter,
    rotateInner,
    rotateMiddle,
    rotateOuter,
  ]);
  return (
    <div>
      {/* Container of the rotating circles */}
      <div className="flex h-screen items-center justify-center">
        <div className="relative flex h-[800px] w-[700px] items-center justify-center overflow-hidden rounded-full sm:h-[800px]">
          {/* Box Content */}
          <div
            className={cn(
              className,
              "z-10 h-80 w-56 rounded-md border bg-white p-4 shadow",
            )}
          >
            {children}
          </div>
          {/* End of Box Content */}

          {/* InnerCircle */}
          <motion.div
            className="absolute flex h-full w-full items-center justify-center"
            animate={controlsInner}
          >
            {icons.map((src, index) => (
              <motion.div
                key={index}
                className="circle-item absolute h-5 w-5 overflow-hidden rounded-full"
                style={{
                  background: `url(${src}) center/cover no-repeat`,
                  transform: `rotate(${(360 / icons.length) * index}deg) translate(${translateInner}px)`,
                }}
              />
            ))}
          </motion.div>
          {/* Middle Circle */}
          <motion.div
            className="absolute flex h-full w-full items-center justify-center"
            animate={controlsMiddle}
          >
            {icons.map((src, index) => (
              <motion.div
                key={index}
                className="circle-item absolute h-10 w-10 overflow-hidden rounded-full"
                style={{
                  background: `url(${src}) center/cover no-repeat`,
                  transform: `rotate(${(360 / icons.length) * index}deg) translate(${translateMiddle}px)`,
                }}
              />
            ))}
          </motion.div>
          {/* Outer Circle */}
          <motion.div
            className="absolute flex h-full w-full items-center justify-center"
            animate={controlsOuter}
          >
            {icons.map((src, index) => (
              <motion.div
                key={index}
                className="circle-item absolute h-12 w-12 overflow-hidden rounded-full sm:h-10 sm:w-10 md:h-12 md:w-12"
                style={{
                  background: `url(${src}) center/cover no-repeat`,
                  transform: `rotate(${(360 / icons.length) * index}deg) translate(${translateOuter}px)`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RotatingCircles;
