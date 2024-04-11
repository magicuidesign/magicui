"use client";

import { Doc } from "@/.contentlayer/generated";
import BuyButton from "@/components/landing/buy-button";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/registry/components/magicui/animated-gradient-text";
import { BorderBeam } from "@/registry/components/magicui/border-beam";
import FadeIn from "@/registry/components/magicui/fade-in";
import NumberTicker from "@/registry/components/magicui/number-ticker";
import RetroGrid from "@/registry/components/magicui/retro-grid";
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
        <RetroGrid className="z-0" />
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
              <motion.h1
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
              </motion.h1>

              <motion.p
                className="max-w-[64rem] text-balance text-lg tracking-tight text-gray-400 md:text-xl"
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
                Magic UI is the <strong>largest collection </strong> of
                handcrafted animated components in the world{" "}
                <strong>built for developers</strong>.<br />
                Save thousands of hours, create a beautiful landing, and impress
                your customers.
              </motion.p>

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
                  <BuyButton />
                  <Link
                    href="/components"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "lg",
                      }),
                      "gap-2 whitespace-pre md:flex",
                      "group relative w-full gap-1 overflow-hidden rounded-sm text-sm font-semibold tracking-tighter",
                    )}
                  >
                    Read Docs
                  </Link>
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
                    <div className="flex flex-row items-center justify-start">
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

          <motion.div
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
            {/* <video
              autoPlay
              loop
              muted
              src="demo.mp4"
              className="h-auto w-full"
            /> */}

            <BorderBeam size={150} />
            {/* <BorderBeam size={150} delay={7} /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
