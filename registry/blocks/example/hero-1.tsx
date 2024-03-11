"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FadeIn from "@/registry/components/magicui/fade-in";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-14">
        <div className="container flex flex-col ">
          <div className="mt-20 grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 pb-8  text-center">
              <FadeIn delay={0.1}>
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-7xl">
                  Professional AI Headshots
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-sm leading-normal text-muted-foreground sm:text-xl">
                  Generate AI headshots in minutes.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex flex-col gap-4 lg:flex-row">
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "gap-2 whitespace-pre md:flex",
                    "group relative w-full gap-1 overflow-hidden text-base font-semibold tracking-tighter",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                  )}
                >
                  Get Started
                  <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </FadeIn>
              {/* <FadeIn delay={0.3}>
              <JoinUsers />
            </FadeIn> */}
            </div>
          </div>

          <FadeIn delay={0.4} className="flex">
            <video
              autoPlay
              loop
              muted
              src="demo.mp4"
              className="mt-32 w-full rounded-lg border shadow-2xl"
            />
          </FadeIn>
        </div>
        {/* <CarouselVertical className="absolute right-20 top-0 hidden 2xl:block" />
        <CarouselVertical className="absolute left-20 top-0 hidden 2xl:block" /> */}
        {/* <CarouselHorizontal className="z-10 my-14" />
        <Confetti className="absolute inset-x-0 bottom-0 -z-10 mx-auto size-[800px]" /> */}
      </div>
    </section>
  );
}
