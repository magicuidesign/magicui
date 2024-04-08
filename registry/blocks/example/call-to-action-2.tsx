"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Marquee from "@/registry/components/magicui/marquee";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  BarChart,
  ChevronRight,
  File,
  Globe,
  HeartHandshake,
  Rss,
  Shield,
} from "lucide-react";
import { useEffect, useId, useRef } from "react";

const tiles = [
  {
    icon: <HeartHandshake className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <Globe className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <File className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <Shield className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <Rss className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <BarChart className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px] filter"></div>
    ),
  },
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const randomTiles1 = shuffleArray([...tiles]);
const randomTiles2 = shuffleArray([...tiles]);
const randomTiles3 = shuffleArray([...tiles]);
const randomTiles4 = shuffleArray([...tiles]);

const Card = (card: { icon: JSX.Element; bg: JSX.Element }) => {
  const id = useId();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: Math.random() * 2, ease: "easeOut", duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn(
        "relative size-20 cursor-pointer overflow-hidden rounded-2xl border p-4",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      {card.icon}
      {card.bg}
    </motion.div>
  );
};

export default function CallToAction() {
  return (
    <section id="cta">
      <div className="py-14">
        <div className="container flex w-full flex-col items-center justify-center p-4">
          <div className="relative flex w-full max-w-[1000px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border">
            <Marquee
              reverse
              className="-delay-[200ms] [--duration:20s]"
              repeat={4}
            >
              {randomTiles1.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <Marquee reverse className="[--duration:30s]" repeat={4}>
              {randomTiles2.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              className="-delay-[200ms] [--duration:20s]"
              repeat={4}
            >
              {randomTiles3.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <Marquee reverse className="[--duration:30s]" repeat={4}>
              {randomTiles4.map((review, idx) => (
                <Card key={idx} {...review} />
              ))}
            </Marquee>
            <div className="absolute z-10">
              <div className="mx-auto size-24 rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md dark:bg-black/10 lg:size-32">
                <HeartHandshake className="mx-auto size-16 text-black dark:text-white lg:size-24" />
              </div>
              <div className="z-10 mt-4 flex flex-col items-center text-center text-primary">
                <h1 className="text-3xl font-bold lg:text-4xl">
                  Stop wasting time on design.
                </h1>
                <p className="mt-2">
                  Start your 7-day free trial. No credit card required.
                </p>
                <a
                  href="/"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: "outline",
                    }),
                    "group mt-4 rounded-[2rem] px-6",
                  )}
                >
                  Get Started
                  <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </a>
              </div>
              <div className="absolute inset-0 -z-10 rounded-full  bg-white opacity-40 blur-xl dark:bg-black" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
