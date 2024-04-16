"use client";

import { cubicBezier, motion } from "framer-motion";

export default function FeatureCard8() {
  const variant1 = {
    initial: {
      y: 0,
      scale: 0.97,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: -45,
      scale: 1,
      boxShadow:
        "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant2 = {
    initial: {
      y: 30,
      opacity: 0,
      scale: 0.97,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: 10,
      opacity: 1,
      scale: 1,
      boxShadow:
        "rgba(245,40,145,0.05) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant3 = {
    initial: {
      x: 30,
      y: 20,
      opacity: 0,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      x: 5,
      y: 5,
      opacity: 1,
      boxShadow:
        "rgba(39,245,76,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.2,
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
        <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-1 overflow-hidden rounded-t-xl bg-transparent">
          <div className="relative flex flex-col items-center justify-center gap-y-2 px-10 py-20">
            <motion.div
              variants={variant1}
              className=" relative flex items-start gap-x-2 rounded-lg border border-neutral-400/20 bg-white p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="h-6 w-6 rounded-full bg-blue-500">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://avatar.vercel.sh/joshua"
                  alt="joshua"
                />
              </div>
              <div className="w-[calc(100%-3rem)]">
                <h3 className="text-base font-semibold">Mary</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  I think the design can be improved
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={variant2}
              className=" absolute inset-10 -bottom-14 z-[3] m-auto flex h-fit items-start gap-x-2 rounded-lg border border-neutral-400/20 bg-white p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="w-8 ">
                <div className="h-6 w-6 rounded-full bg-blue-500">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://avatar.vercel.sh/christina"
                    alt="christina"
                  />
                </div>
              </div>
              <div className="w-[calc(100%-3rem)]">
                <h3 className="text-base font-semibold">Joshua</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  On it ✅
                </p>
              </div>
              <motion.p
                variants={variant3}
                className="highlighted absolute -bottom-2 right-2 w-fit rounded-full border bg-cyan-500 px-2 py-0.5 text-xs text-white"
              >
                sent
              </motion.p>
            </motion.div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="text-xl font-semibold">Reply</h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Reply to other creators in app
          </p>
        </div>
      </motion.div>
    </div>
  );
}
