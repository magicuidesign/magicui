"use client";

import Link from "next/link";
import { Doc } from "@/.contentlayer/generated";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TechStack from "@/components/tech-stack";
import AnimatedGradientText from "@/registry/components/magicui/animated-gradient-text";

function HeroPill({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href}>
      <AnimatedGradientText>
        <div
          className={cn(
            `absolute inset-0 block size-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
            `p-px ![mask-composite:subtract]`,
          )}
        />
        🎉 <Separator className="mx-2 h-4" orientation="vertical" />
        <span
          className={cn(
            `animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            `inline`,
          )}
        >
          {title}
        </span>
        <ChevronRight className="ml-1 size-4 text-gray-500" />
      </AnimatedGradientText>
    </Link>
  );
}

export default function HeroClient({ post }: { post: Doc }) {
  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-5 md:py-14">
        <div className="z-10 flex flex-col">
          <div className="mt-10 grid grid-cols-1 md:mt-20">
            <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
              <HeroPill href={post.slug} title={`Introducing ${post.title}`} />
              <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                <h1
                  className={cn(
                    "text-black dark:text-white",
                    "relative mx-0 max-w-[43.5rem]  pt-5  md:mx-auto md:px-4 md:py-2",
                    "text-left tracking-tighter text-balance md:text-center font-semibold",
                    "md:text-7xl lg:text-7xl sm:text-7xl text-5xl",
                  )}
                >
                  UI library for Design Engineers
                </h1>
              </div>

              <p className="max-w-xl text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg ">
                50+ free and open-source animated components built with{" "}
                <b>React</b>, <b>Typescript</b>, <b>Tailwind CSS</b>, and{" "}
                <b>Framer Motion</b>
                .
                <br />
                Perfect companion for <b>shadcn/ui</b>.
              </p>

              <div className="mx-0 flex w-full max-w-full flex-col gap-4 py-1 sm:max-w-lg sm:flex-row md:mx-auto">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
                  <Link
                    href="/components"
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "lg",
                      }),
                      "gap-2 whitespace-pre md:flex",
                      "group relative w-full gap-1 rounded-xl text-sm font-semibold tracking-tighter ring-offset-inherit transition-all duration-150 ease-in-out hover:ring-2 hover:ring-black hover:ring-offset-2 hover:ring-offset-current dark:hover:ring-neutral-50",
                    )}
                  >
                    Browse Components
                    <ChevronRight className="ml-1  size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/docs"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: "outline",
                      }),
                      "gap-2 whitespace-pre md:flex",
                      "group relative w-full gap-1 overflow-hidden rounded-xl text-sm font-semibold tracking-tighter transition-all duration-150 ease-in-out hover:ring-2 hover:ring-neutral-300 hover:ring-offset-2 hover:ring-offset-inherit dark:hover:ring-black dark:hover:ring-offset-black ",
                    )}
                  >
                    Get Started
                    <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-56 items-center justify-center">
            <TechStack
              className="mx-auto flex w-full items-center justify-between"
              technologies={[
                // "nextjs",
                "react",
                "typescript",
                "tailwindcss",
                "framermotion",
                "shadcn",
              ]}
            />
          </div>

          {/* 
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
                <span className="mt-3 inline-block whitespace-nowrap rounded-full bg-neutral-800 px-4 py-1.5 text-[12px] font-semibold uppercase leading-5 tracking-wide text-white">
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
              <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                <TypingAnimation
                  className="text-4xl font-bold text-black dark:text-white"
                  text="Typing Animation"
                />
              </div>
              <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background p-4 md:shadow-xl">
                <WordRotate
                  className="text-4xl font-bold text-black dark:text-white"
                  words={[
                    "Web Development.",
                    "UI/UX Design.",
                    "Cloud Computing.",
                    "Web Security.",
                    "Frontend Frameworks.",
                    "Backend Architectures.",
                    "API Design.",
                    "Content Management Systems.",
                    "SEO Strategies.",
                    "Web Performance Optimization.",
                    "Responsive Design.",
                    "JavaScript Libraries.",
                  ]}
                />
              </div>
              <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background py-4 md:shadow-xl">
                <VelocityScroll
                  text="Velocity Scroll"
                  default_velocity={5}
                  className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
                />
              </div>
              <OrbitingCirclesDemo />
              <DockDemo />
            </div>
          </div>   */}
        </div>
      </div>
    </section>
  );
}
