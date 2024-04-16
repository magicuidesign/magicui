"use client";

import { motion } from "framer-motion";

export default function FeatureCard1() {
  const variant1 = {
    initial: {
      scale: 0.87,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      scale: 0.8,
      boxShadow:
        "rgba(245,40,145,0.35) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
  };
  const variant2 = {
    initial: {
      y: -27,
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      y: -55,
      scale: 0.87,
      boxShadow:
        "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: "linear",
      },
    },
  };
  const variant3 = {
    initial: {
      y: -25,
      opacity: 0,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      y: -45,
      opacity: 1,
      scale: 1,
      boxShadow:
        "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "easeInOut",
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
    <div className="relative h-full w-full max-w-[32rem] transform-gpu rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] md:max-h-[500px]">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col justify-between"
      >
        <div className="flex h-full w-full items-center justify-center rounded-t-xl">
          <div className="relative flex flex-col items-center justify-center gap-y-2 p-10">
            <motion.div
              variants={variant1}
              className="z-[1] flex h-full w-full items-center justify-between gap-x-2 rounded-md border bg-white p-5 px-2.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="h-8 w-8 rounded-full bg-pink-300">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/jack"
                  alt="jack"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>

                <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
              </div>
            </motion.div>
            <motion.div
              variants={variant2}
              className="z-[2] flex h-full w-full items-center justify-between gap-x-2 rounded-md border bg-white p-5 px-2.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="h-8 w-8 rounded-full bg-pink-300">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/jane"
                  alt="jane"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
              </div>
            </motion.div>
            <motion.div
              variants={variant3}
              className="absolute bottom-0 z-[3] m-auto flex h-fit w-fit items-center justify-between gap-x-2 rounded-md border bg-white p-5 px-2.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="h-8 w-8 rounded-full bg-pink-300">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/jill"
                  alt="jill"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Instantly get notified about events
          </p>
        </div>
      </motion.div>
    </div>
  );
}
