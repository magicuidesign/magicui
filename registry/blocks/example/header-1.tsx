"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const SCROLL_BOUNDARY = 120;

export default function StickyHeader() {
  const [scrollY, setScrollY] = useState(0);
  const headerParentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const getBreakpoint = (width: number) => {
    if (width < 640) return "xs";
    if (width < 768) return "sm";
    if (width < 1024) return "md";
    if (width < 1280) return "lg";
    if (width < 1536) return "xl";
    return "2xl";
  };

  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth),
  );

  useEffect(() => {
    const updateBreakpoint = () =>
      setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  const active =
    scrollY >= SCROLL_BOUNDARY ||
    breakpoint === "xs" ||
    breakpoint === "sm" ||
    breakpoint === "md";

  useEffect(() => {
    const handleScroll = () => {
      if (headerParentRef.current) {
        setScrollY(headerParentRef.current.scrollTop);
      }
    };

    const parentElement = headerParentRef.current;
    parentElement?.addEventListener("scroll", handleScroll);

    return () => {
      parentElement?.removeEventListener("scroll", handleScroll);
    };
  }, [headerParentRef.current]);

  return (
    <div ref={headerParentRef} className="max-h-[450px] overflow-y-scroll">
      <div className="h-[100vh]">
        <header className="mx-auto flex max-w-5xl items-center justify-between bg-transparent px-10 py-7 dark:bg-transparent">
          <div className="hidden flex-row items-center justify-center gap-2 lg:flex">
            <a href="#" className="flex h-8 w-8">
              <img src="/icon.png" className="h-full w-full" />
            </a>
            <a href="#">Magic UI</a>
          </div>
          {/* <h1 className="hidden lg:flex">Logo</h1> */}
          <div className="absolute inset-x-0 top-6 z-[60] flex items-center justify-center">
            <motion.div
              initial={{ x: 0 }}
              animate={{
                boxShadow: active
                  ? theme === "dark"
                    ? "0 0 0 1px rgba(255,255,255,.08), 0 1px 2px -1px rgba(255,255,255,.08), 0 2px 4px rgba(255,255,255,.04)"
                    : "0 0 0 1px rgba(17,24,28,.08), 0 1px 2px -1px rgba(17,24,28,.08), 0 2px 4px rgba(17,24,28,.04)"
                  : "none",
              }}
              transition={{
                ease: "linear",
                duration: 0.05,
                delay: 0.05,
              }}
              className={cn(
                "supports-backdrop-blur:bg-white/90 mx-4 flex w-full items-center justify-center overflow-hidden rounded-full bg-white bg-white/40 px-3 py-2.5 backdrop-blur-md transition-all dark:bg-black/40 lg:w-auto lg:p-1.5 lg:py-2",
              )}
            >
              <ul className="flex h-full w-full flex-row justify-between gap-6 lg:flex-row lg:justify-start lg:gap-1">
                <li className="flex items-center justify-center px-2 py-0.5">
                  <a href="#" className="flex h-8 w-8 lg:hidden">
                    <img src="/icon.png" className="h-full w-full" />
                  </a>
                  <a href="#" className="hidden lg:flex">
                    Home
                  </a>
                </li>
                <li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
                  <a href="#">Features</a>
                </li>
                <li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
                  <a href="#">Pricing</a>
                </li>
                <li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
                  <a href="#">Contact</a>
                </li>
                <AnimatePresence>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: active ? "auto" : 0,
                    }}
                    transition={{
                      ease: "easeOut",
                      duration: 0.25,
                      delay: 0.05,
                    }}
                  >
                    <AnimatePresence>
                      {active && (
                        <motion.a
                          initial={{ x: "125%" }}
                          animate={{ x: "0" }}
                          exit={{
                            x: "125%",
                            transition: { ease: "easeOut", duration: 2.2 },
                          }}
                          transition={{ ease: "easeOut", duration: 0.5 }}
                          className="relative inline-flex w-fit shrink-0 items-center justify-center gap-x-1.5 overflow-hidden whitespace-nowrap rounded-full bg-neutral-900 px-3 py-1.5 text-white outline-none dark:bg-white dark:text-black"
                        >
                          Get Started
                        </motion.a>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>
              </ul>
            </motion.div>
          </div>

          {/* <div className="flex items-center gap-x-5"> */}
          <a className="relative hidden w-fit items-center justify-center gap-x-1.5 overflow-hidden rounded-full bg-neutral-900 px-3 py-1.5 text-white outline-none dark:bg-white dark:text-black lg:inline-flex">
            Get Started
          </a>
          {/* </div> */}
        </header>

        <h2 className="mt-12 flex flex-col items-center justify-center text-center">
          Scroll down
          <ChevronDown className="animate-bounce" />
        </h2>
      </div>
    </div>
  );
}
