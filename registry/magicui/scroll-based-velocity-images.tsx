"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface VelocityScrollImagesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultVelocity?: number;
  className?: string;
  numRows?: number;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

interface ParallaxImagesProps extends React.HTMLAttributes<HTMLDivElement> {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  baseVelocity: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxImages({
  images,
  baseVelocity = 100,
  containerRef,
  ...props
}: ParallaxImagesProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll({
    container: containerRef,
  });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const rowRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (rowRef.current && imagesRef.current) {
        const containerWidth = rowRef.current.offsetWidth;
        const imagesWidth = imagesRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / imagesWidth) + 2;
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();

    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [images]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = React.useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={rowRef} className="w-full overflow-hidden" {...props}>
      <motion.div className="inline-flex" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? imagesRef : null}
            className="flex gap-4 px-2"
          >
            {images.map((image, imgIndex) => (
              <div
                key={`${i}-${imgIndex}`}
                className="relative h-[214px] w-[380px] shrink-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityScrollImages({
  defaultVelocity = 5,
  numRows = 2,
  images,
  className,
  ...props
}: VelocityScrollImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use a fallback animation when there's no scroll
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      {...props}
    >
      {Array.from({ length: numRows }).map((_, i) => (
        <ParallaxImages
          key={i}
          images={images}
          baseVelocity={defaultVelocity * (i % 2 === 0 ? 1 : -1)}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
