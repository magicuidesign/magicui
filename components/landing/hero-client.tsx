"use client";

import { Doc } from "@/.contentlayer/generated";
import BuyButton from "@/components/landing/buy-button";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AnimatedBeamMultipleInputDemo from "@/registry/components/example/animated-beam-multiple-inputs";
import FeatureCard1 from "@/registry/components/example/animated-feature-card-1";
import FeatureCard2 from "@/registry/components/example/animated-feature-card-2";
import FeatureCard3 from "@/registry/components/example/animated-feature-card-3";
import FeatureCard4 from "@/registry/components/example/animated-feature-card-4";
import FeatureCard6 from "@/registry/components/example/animated-feature-card-6";
import FeatureCard7 from "@/registry/components/example/animated-feature-card-7";
import AnimatedListDemo from "@/registry/components/example/animated-list-demo";
import BentoDemo from "@/registry/components/example/bento-demo";
import GlobeDemo from "@/registry/components/example/globe-demo";
import RetroGridDemo from "@/registry/components/example/retro-grid-demo";
import AnimatedGradientText from "@/registry/components/magicui/animated-gradient-text";
import FadeIn from "@/registry/components/magicui/fade-in";
import NumberTicker from "@/registry/components/magicui/number-ticker";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function HeroClient({
  payments,
  post,
}: {
  payments: number;
  post: Doc;
}) {
  const fadeInRef = useRef(null);
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  });

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-14">
        {/* <RetroGrid className="z-0" /> */}
        <div className="container z-10 flex flex-col">
          <div className="mt-20 grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 pb-8 text-center">
              <FadeIn>
                <Link href={post.slug}>
                  <AnimatedGradientText>
                    <div
                      className={cn(
                        `absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
                        `p-[1px] ![mask-composite:subtract]`,
                      )}
                    />
                    🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
                    <span
                      className={cn(
                        `animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                        `inline`,
                      )}
                    >
                      Introducing {post.title}
                    </span>
                    <ChevronRight className="ml-1 h-4 w-4 text-gray-500" />
                  </AnimatedGradientText>
                </Link>
              </FadeIn>
              {/* <motion.h1
                ref={fadeInRef}
                className="text-balance bg-gradient-to-br from-black from-30% to-black/60 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                Create Magical <br /> Landing Pages <br />
              </motion.h1> */}
              <motion.h1
                ref={fadeInRef}
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
                className="text-balance bg-gradient-to-br from-black from-30% to-black/60 bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-7xl"
              >
                React components to build
                <br className="hidden md:block" /> beautiful landing pages.
              </motion.h1>

              <motion.p
                className="max-w-[64rem] text-balance text-lg tracking-tight text-gray-500 md:text-xl"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                50+ open-source animated components built with React, Tailwind
                CSS, and Framer Motion.
                <br />
                Save thousands of hours, create a beautiful landing page, and
                convert your visitors into customers.
              </motion.p>

              {/* <motion.div
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                <TechStack
                  className="text-foreground"
                  technologies={[
                    // "nextjs",
                    "react",
                    "typescript",
                    "tailwindcss",
                    "framermotion",
                    // "shadcn",
                  ]}
                />
              </motion.div> */}

              <motion.div
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                className="flex flex-col gap-4 lg:flex-row"
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  <Link
                    href="/components"
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "lg",
                      }),
                      "gap-2 whitespace-pre md:flex",
                      "group relative w-full gap-1 overflow-hidden rounded-full text-sm font-semibold tracking-tighter",
                    )}
                  >
                    Browse Components
                    <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                  <BuyButton />
                </div>
              </motion.div>

              {/* <div className="inline-flex items-center justify-center gap-2">
                <Gift className="h-4 w-4 animate-bounce" />
                <span>
                  <strong>
                    $40 off for the first {Math.ceil(payments / 100) * 100}
                  </strong>{" "}
                  customers (
                  {payments > 0
                    ? Math.ceil(payments / 100) * 100 - payments
                    : 0}{" "}
                  left)
                </span>
              </div> */}
              <FadeIn delay={0.3}>
                <div className="container flex flex-col items-center justify-center gap-2 sm:flex-row">
                  <div className="flex flex-row items-center justify-center -space-x-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/72.jpg"
                      className="h-10 w-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/94.jpg"
                      className="h-10 w-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/women/34.jpg"
                      className="h-10 w-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/86.jpg"
                      className="h-10 w-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/women/41.jpg"
                      className="h-10 w-10 rounded-full border-2 border-white"
                    />
                  </div>

                  <div className="flex flex-col gap-x-2">
                    <div className="mx-auto flex flex-row items-center justify-start">
                      <StarFilledIcon className="h-4 w-4 text-orange-300" />
                      <StarFilledIcon className="h-4 w-4 text-orange-300" />
                      <StarFilledIcon className="h-4 w-4 text-orange-300" />
                      <StarFilledIcon className="h-4 w-4 text-orange-300" />
                      <StarFilledIcon className="h-4 w-4 text-orange-300" />
                      <span className="ml-2 text-base font-bold">5.0</span>
                    </div>

                    <span className="inline-block text-center text-xs font-medium leading-snug tracking-tighter">
                      <NumberTicker
                        value={payments}
                        className="font-extrabold"
                        delay={0.2}
                      />{" "}
                      developers making beautiful landing pages
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="container relative mx-auto mt-32 w-full max-w-[1000px]">
            <motion.span
              animate={["initial"]}
              whileHover={["hover"]}
              variants={{
                hover: {
                  scale: 1.1,
                  rotate: -6,
                  transition: {
                    duration: 0.2,
                  },
                },
                initial: {
                  y: [-8, 8],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                },
              }}
              className="absolute -top-16 left-0 right-auto cursor-pointer lg:-top-20"
            >
              <span className="flex items-center">
                <span className="mt-3 inline-block whitespace-nowrap rounded-full bg-neutral-800 px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white">
                  Real component demos!
                </span>
                <svg
                  className="mr-6 h-8 w-14 [transform:rotateY(180deg)rotateX(0deg)]"
                  width="45"
                  height="25"
                  viewBox="0 0 45 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                    fill="currentColor"
                    className="fill-gray-300 dark:fill-gray-700"
                  />
                </svg>
              </span>
            </motion.span>

            <BentoDemo />

            <div className="mt-4 grid w-full grid-cols-1 place-items-center justify-center gap-4 lg:grid-cols-2">
              <AnimatedBeamMultipleInputDemo />
              <AnimatedListDemo />
              <RetroGridDemo />
              <GlobeDemo />
              <FeatureCard1 />
              <FeatureCard2 />
              <FeatureCard7 />
              <FeatureCard3 />
              <FeatureCard4 />
              {/* <FeatureCard5 /> */}
              <FeatureCard6 />
            </div>
          </div>

          {/* <motion.div
            animate={fadeInInView ? "animate" : "initial"}
            variants={fadeUpVariants}
            initial={false}
            transition={{
              duration: 1.4,
              delay: 0.4,
              ease: [0.21, 0.47, 0.32, 0.98],
              type: "spring",
            }}
            className="relative mx-auto mt-24 h-full w-full max-w-[1200px] rounded-xl after:absolute after:inset-0 after:z-10 after:[background:linear-gradient(to_top,#fff_30%,transparent)] dark:after:[background:linear-gradient(to_top,#000000_10%,transparent)]"
          >
            <div
              className={cn(
                "absolute inset-0 bottom-1/2 h-full w-full transform-gpu [filter:blur(120px)]",

                // light styles
                "[background-image:linear-gradient(to_bottom,rgba(255,189,122,0.2),transparent_30%)]",

                // dark styles
                "dark:[background-image:linear-gradient(to_bottom,rgba(120,119,198,0.5),transparent_30%)]",
              )}
            />

            <img
              src="/dashboard-light.png"
              className="relative block h-full w-full rounded-xl border dark:hidden"
            />
            <img
              src="/dashboard-dark.png"
              className="relative hidden h-full w-full rounded-xl border dark:block"
            />
            <video
              autoPlay
              loop
              muted
              src="demo.mp4"
              className="h-auto w-full"
            /> 
            <BorderBeam size={150} />
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
