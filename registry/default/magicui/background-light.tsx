"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

// BackgroundLight Component
interface BackgroundLightProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const Background = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: BackgroundLightProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
              bg-[repeating-linear-gradient(135deg,white_0%,white_7%,transparent_10%,transparent_12%,white_16%),repeating-linear-gradient(135deg,theme('colors.blue.500')_10%,theme('colors.indigo.300')_15%,theme('colors.blue.300')_20%,theme('colors.violet.200')_25%,theme('colors.blue.400')_30%,black_35%,theme('colors.red.500')_40%,theme('colors.yellow.300')_45%)]

              dark:bg-[repeating-linear-gradient(135deg,black_0%,black_7%,transparent_10%,transparent_12%,black_16%),repeating-linear-gradient(135deg,theme('colors.blue.500')_10%,theme('colors.indigo.300')_15%,theme('colors.blue.300')_20%,theme('colors.violet.200')_25%,theme('colors.blue.400')_30%)]

              bg-[background-size:300%_200%]
              bg-[background-position:50%_50%,50%_50%]
              filter blur-[10px] invert dark:invert-0
              after:content-[""] after:absolute after:inset-0

              after:bg-[repeating-linear-gradient(135deg,white_0%,white_7%,transparent_10%,transparent_12%,white_16%),repeating-linear-gradient(135deg,theme('colors.blue.500')_10%,theme('colors.indigo.300')_15%,theme('colors.blue.300')_20%,theme('colors.violet.200')_25%,theme('colors.blue.400')_30%,black_35%,theme('colors.red.500')_40%,theme('colors.yellow.300')_45%)]

              after:dark:bg-[repeating-linear-gradient(135deg,black_0%,black_7%,transparent_10%,transparent_12%,black_16%),repeating-linear-gradient(135deg,theme('colors.blue.500')_10%,theme('colors.indigo.300')_15%,theme('colors.blue.300')_20%,theme('colors.violet.200')_25%,theme('colors.blue.400')_30%)]

              after:[background-size:200%_100%]
              after:animate-background-light after:[background-attachment:fixed] after:mix-blend-difference
              pointer-events-none absolute -inset-[10px] opacity-50 dark:opacity-40 will-change-transform`,
              showRadialGradient &&
                `mask-image-[radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};

// ExampleComponentDemo Component
export default function BackgroundLight({ className, children }: BackgroundLightProps) {
  return (
    <Background className="">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </Background>
  );
}
