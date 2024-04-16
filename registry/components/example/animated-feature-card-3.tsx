"use client";

import { cubicBezier, motion } from "framer-motion";

export default function FeatureCard3() {
  const variant1 = {
    initial: {
      y: 4,
      scale: 0.5,
      opacity: 0,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: -2,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant2 = {
    initial: {
      y: -2,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: 8,
      opacity: 1,
      scale: 1.05,
      boxShadow:
        "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.3,
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
    <div className="relative h-full w-full max-w-[32rem] transform-gpu rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] md:max-h-[500px]">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col justify-between"
      >
        <motion.div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-2 overflow-hidden rounded-t-xl p-8">
          <motion.p
            variants={variant1}
            className="w-fit rounded-full border px-2 text-[15px]"
          >
            Make it Pop ✨
          </motion.p>
          <motion.div
            variants={variant2}
            className="flex max-w-[300px] items-start gap-x-2 rounded-lg border border-neutral-300 border-neutral-400/20 bg-white p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex h-6 w-6 shrink-0 rounded-full bg-blue-500">
              <img
                className="h-full w-full rounded-full object-cover"
                src="https://avatar.vercel.sh/jane"
                alt="jane"
              />
            </div>
            <div>
              <h3 className="text-base font-semibold">Josh</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </motion.div>
        </motion.div>
        <div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="text-xl font-semibold">AI Co-Pilot</h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Use AI to make your writing stand out
          </p>
        </div>
      </motion.div>
    </div>
  );
}
