"use client";

import { cubicBezier, motion } from "framer-motion";

export default function FeatureCard4() {
  const variant1 = {
    initial: {
      x: 35,
      y: 5,
      scale: 0.8,
      rotate: -3,
      zIndex: 1,
      transition: {
        delay: 0.05,
        duration: 0.1,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow:
        "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.1,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant2 = {
    initial: {
      scale: 1.1,
      zIndex: 2,
      transition: {
        delay: 0.05,
        duration: 0.1,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      scale: 1,
      boxShadow:
        "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.1,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant3 = {
    initial: {
      x: -35,
      y: 5,
      scale: 0.8,
      rotate: 3,
      zIndex: 1,
      transition: {
        delay: 0.05,
        duration: 0.1,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow:
        "rgba(245,40,145,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.1,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative h-full w-full max-w-[32rem] transform-gpu rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] md:max-h-[500px]">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
      >
        <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-transparent p-10">
          <motion.div className="flex h-[230px] w-full items-center justify-between gap-x-4">
            <motion.div
              variants={variant1}
              className="z-[3] flex h-fit w-full  flex-col items-center justify-between gap-x-2 gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="h-8 w-8 rounded-full bg-pink-300">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/jack"
                  alt="jack"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 w-10 rounded-full bg-neutral-700/50"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-400/80"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-300/80"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-600/80"></div>
              </div>
            </motion.div>
            <motion.div
              variants={variant2}
              className="z-[3] flex h-fit w-full flex-col items-center justify-between gap-x-2 gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="h-8 w-8 rounded-full bg-pink-300">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/christina"
                  alt="christina"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 w-10 rounded-full bg-neutral-700/50"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-400/80"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-300/80"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-600/80"></div>
              </div>
            </motion.div>
            <motion.div
              variants={variant3}
              className="z-[3] flex h-fit w-full flex-col items-center justify-between gap-x-2 gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="h-8 w-8 rounded-full bg-pink-300">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/joshua"
                  alt="joshua"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 w-10 rounded-full bg-neutral-700/50"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-400/80"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-300/80"></div>
                <div className="h-2 w-10 rounded-full bg-neutral-600/80"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="text-xl font-semibold">Social</h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Write once, share with your friends
          </p>
        </div>
      </motion.div>
    </div>
  );
}
