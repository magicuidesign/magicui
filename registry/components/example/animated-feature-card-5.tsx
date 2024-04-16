"use client";

import { cubicBezier, motion } from "framer-motion";

export default function FeatureCard5() {
  const variant1 = {
    initial: {
      viewBox: "0 -950 366 1408",
      filter: "saturate(0.3)",
      opacity: 0.5,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      viewBox: "0 -60 366 310",
      filter: "saturate(1)",
      opacity: 1,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant2 = {
    initial: {
      y: 0,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: 0,
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
        className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
      >
        <div className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-t-xl bg-transparent p-10">
          <div className="relative h-[150px] w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200/50 bg-white dark:border-neutral-700/50 dark:bg-neutral-900">
            <motion.p
              variants={variant2}
              className="absolute left-5 top-5 w-fit text-[15px]"
            >
              +245%
            </motion.p>
            <motion.svg
              variants={variant1}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              viewBox="0 -950 366 1408"
            >
              <path
                fill="url(#a)"
                d="M0 193c109.5 0 260.5-52.5 366-192.5v907H0V193Z"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1={183}
                  x2={183}
                  y1={0.5}
                  y2={262}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#22c55e" />
                  <stop offset={1} stopColor="#15803d" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>
        </div>
        <div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="text-xl font-semibold">Growth</h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Invest and watch your money grow
          </p>
        </div>
      </motion.div>
    </div>
  );
}
