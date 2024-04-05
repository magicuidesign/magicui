"use client";

import { cn } from "@/lib/utils";
import Marquee from "@/registry/components/magicui/marquee";
import { cubicBezier, motion } from "framer-motion";

export default function FeatureCard7() {
  const variant1 = {
    initial: {
      y: 0,
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: -10,
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
      y: 15,
      x: 2,
      opacity: 0,
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: 10,
      x: -3,
      display: "flex",
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1,
        duration: 0.25,
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

  const logos = [
    {
      name: "Microsoft",
      img: "https://cdn.simpleicons.org/microsoft/000/fff",
    },
    {
      name: "Apple",
      img: "https://cdn.simpleicons.org/apple/000/fff",
    },
    {
      name: "Google",
      img: "https://cdn.simpleicons.org/google/000/fff",
    },
    {
      name: "Facebook",
      img: "https://cdn.simpleicons.org/facebook/000/fff",
    },
    {
      name: "LinkedIn",
      img: "https://cdn.simpleicons.org/linkedin/000/fff",
    },
    {
      name: "Twitter",
      img: "https://cdn.simpleicons.org/twitter/000/fff",
    },
  ];

  const Logo = ({ name, img }: { name: string; img: string }) => {
    return (
      <div className={cn("h-12 w-12 cursor-pointer")}>
        <img src={img} alt={name} />
      </div>
    );
  };

  return (
    <div className="relative h-full w-full transform-gpu rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] md:max-h-[500px] md:max-w-[500px]">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col items-start justify-between gap-y-5"
      >
        <div className="group relative flex h-[300px] w-full cursor-pointer flex-col items-center justify-center gap-y-1 overflow-hidden rounded-t-xl border-b border-neutral-200 p-4 dark:border-neutral-800 ">
          <div className="relative flex flex-col items-center justify-center gap-y-2 px-10">
            <Marquee className="[--gap:3rem]">
              {logos.map((logo, idx) => (
                <div className={cn("h-12 w-12 cursor-pointer")} key={idx}>
                  <img src={logo.img} />
                </div>
              ))}
            </Marquee>
            <Marquee className="[--gap:3rem]">
              {logos.map((logo, idx) => (
                <div className={cn("h-12 w-12 cursor-pointer")} key={idx}>
                  <img src={logo.img} />
                </div>
              ))}
            </Marquee>
            <Marquee className="[--gap:3rem]">
              {logos.map((logo, idx) => (
                <div className={cn("h-12 w-12 cursor-pointer")} key={idx}>
                  <img src={logo.img} />
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-y-1 px-5 pb-4">
          <h2 className="text-xl font-semibold">Reply</h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Easily reply to the other people
          </p>
        </div>
      </motion.div>
    </div>
  );
}
