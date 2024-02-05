"use client";

import { cn } from "@/lib/utils";
import { BorderBeam } from "@/registry/components/magicui/border-beam";
import ShimmerButton from "@/registry/components/magicui/shimmer-button";
import TextShimmer from "@/registry/components/magicui/text-shimmer";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface HeroElementProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroPill = ({ children, className }: HeroElementProps) => {
  return (
    <div
      className={cn(
        "backdrop-filter-[12px] inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-white/20",
        "group gap-1",
        "animate-fade-in translate-y-[-1rem] opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const HeroTitle = ({ children, className }: HeroElementProps) => {
  return (
    <h1
      className={cn(
        "bg-gradient-to-br from-white from-30% to-white/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl",
        "animate-fade-in translate-y-[-1rem] opacity-0 [--animation-delay:200ms]",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const HeroSubtitle = ({ children, className }: HeroElementProps) => {
  return (
    <p
      className={cn(
        "mb-12 text-lg tracking-tight text-gray-400 md:text-xl",
        "animate-fade-in translate-y-[-1rem] opacity-0 [--animation-delay:400ms]",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const HeroImage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="animate-fade-up relative my-[8rem] opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,#09090b_30%,transparent)]"
    >
      <div
        className={cn(
          "bg-hero-gradient relative rounded-xl border border-white/10 bg-white bg-opacity-[0.01] ",
          // inView ? "animate-image-rotate" : "[transform:rotateX(25deg)]",
          "before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)]",
          "before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)]",
          inView && "before:animate-image-glow",
        )}
      >
        <BorderBeam
          duration={12}
          delay={11}
          colorFrom="var(--color-one)"
          colorTo="var(--color-two)"
        />
        <BorderBeam
          duration={12}
          delay={8}
          colorFrom="var(--color-one)"
          colorTo="var(--color-two)"
        />

        <img
          src="/hero.webp"
          alt="Hero Image"
          className={cn("relative w-full rounded-[inherit] object-contain")}
        />
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <section id="hero" className="mx-auto max-w-[80rem] px-6 md:px-8">
      <HeroPill>
        <TextShimmer className="inline-flex items-center justify-center">
          <span>✨ Introducing Magic UI Template</span>{" "}
          <ArrowRightIcon className="size-3 ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </HeroPill>
      <HeroTitle>
        Magic UI is the new way
        <br className="hidden md:block" /> to build landing pages.
      </HeroTitle>
      <HeroSubtitle>
        Beautifully designed, animated components and templates built with
        <br className="hidden md:block" /> Tailwind CSS, React, and Framer
        Motion.
      </HeroSubtitle>
      <ShimmerButton
        className="animate-fade-in translate-y-[-1rem] gap-1 rounded-lg text-black opacity-0 ease-in-out [--animation-delay:600ms]"
        background="hsl(var(--primary))"
        shimmerColor="#000"
      >
        <span>Get Started for free </span>
        <ArrowRightIcon className="size-4 ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </ShimmerButton>
      <HeroImage />
    </section>
  );
};
