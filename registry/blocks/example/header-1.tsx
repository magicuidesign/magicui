"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

export default function StickyHeader() {
  // const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const { scrollY } = useScroll({
    container: ref,
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Assuming the parent element exists and is scrollable
  //     if (ref.current?.parentElement) {
  //       setScrollY(ref.current.parentElement.scrollTop);
  //     }
  //   };

  //   const parentElement = ref.current?.parentElement;
  //   if (parentElement) {
  //     parentElement.addEventListener("scroll", handleScroll);
  //   }

  //   return () => {
  //     if (parentElement) {
  //       parentElement.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  console.log("scrollY", scrollY.get());

  return (
    <div ref={ref} className="h-screen">
      <header className="bg-white px-10 py-7 dark:bg-neutral-900 xl:px-0">
        <div className="relative mx-auto flex max-w-5xl items-center justify-between">
          <h1>Logo</h1>
          <div className="hidden md:block">
            <ul className="sticky left-4 right-4 top-4 z-[60] flex items-center justify-center gap-x-5">
              <motion.div
                initial={{ x: 0 }}
                animate={{
                  boxShadow:
                    scrollY.get() >= 10
                      ? "0 0 0 1px rgba(255,255,255,.08), 0 1px 2px -1px rgba(255,255,255,.08), 0 2px 4px rgba(255,255,255,.04)"
                      : "none",
                  // ? theme === "dark"
                  // ?

                  //   : "0 0 0 1px rgba(17,24,28,.08), 0 1px 2px -1px rgba(17,24,28,.08), 0 2px 4px rgba(17,24,28,.04)"
                  // : "none",
                }}
                transition={{
                  ease: "linear",
                  duration: 0.05,
                  delay: 0.05,
                }}
                className="flex h-12 w-auto items-center justify-center gap-x-5 overflow-hidden rounded-full bg-white px-6 py-2.5 transition-all dark:bg-neutral-900 md:p-1.5 md:py-2"
              >
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <nav className="hidden h-full md:block">
                      <ul className="flex h-full flex-col justify-center gap-6 md:flex-row md:justify-start md:gap-0 lg:gap-1">
                        <li className="px-[0.75rem] py-[0.375rem]">Home</li>
                        <li className="px-[0.75rem] py-[0.375rem]">About</li>
                        <li className="px-[0.75rem] py-[0.375rem]">Services</li>
                        <li className="px-[0.75rem] py-[0.375rem]">Contact</li>
                      </ul>
                    </nav>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: scrollY >= 10 ? "auto" : 0,
                      }}
                      transition={{
                        ease: "linear",
                        duration: 0.25,
                        delay: 0.05,
                      }}
                      className="!hidden overflow-hidden rounded-full md:!block"
                    >
                      <AnimatePresence>
                        {scrollY >= 120 && (
                          <motion.ul
                            initial={{ x: "125%" }}
                            animate={{ x: "0" }}
                            exit={{
                              x: "125%",
                              transition: { ease: "linear", duration: 1 },
                            }}
                            transition={{ ease: "linear", duration: 0.3 }}
                            className="shrink-0 whitespace-nowrap"
                          >
                            <li>
                              <a
                                href="#"
                                className="transition-fg relative inline-flex w-fit items-center justify-center gap-x-1.5 overflow-hidden rounded-full bg-neutral-900 px-3 py-1.5 text-white outline-none dark:bg-white dark:text-black"
                              >
                                <span data-sb-field-path=".label">
                                  Get Started
                                </span>
                              </a>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </ul>
          </div>
          <div className="z-[999] hidden items-center gap-x-5 md:flex">
            <button>Get Started</button>
            {/* <ModeToggle /> */}
          </div>
          <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
            <motion.button
              onClick={() => setActive((prev) => !prev)}
              animate={active ? "open" : "close"}
              className="relative flex h-8 w-8 items-center justify-center rounded-md md:hidden"
            >
              <motion.span
                style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
                className="absolute h-0.5 w-5 bg-black dark:bg-white"
                variants={{
                  open: {
                    rotate: ["0deg", "0deg", "45deg"],
                    top: ["35%", "50%", "50%"],
                  },
                  close: {
                    rotate: ["45deg", "0deg", "0deg"],
                    top: ["50%", "50%", "35%"],
                  },
                }}
                transition={{ duration: 0.3 }}
              ></motion.span>
              <motion.span
                style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
                className="absolute h-0.5 w-5 bg-black dark:bg-white"
                variants={{
                  open: {
                    opacity: 0,
                  },
                  close: {
                    opacity: 1,
                  },
                }}
              ></motion.span>
              <motion.span
                style={{ left: "50%", bottom: "30%", x: "-50%", y: "-50%" }}
                className="absolute h-0.5 w-5 bg-black dark:bg-white"
                variants={{
                  open: {
                    rotate: ["0deg", "0deg", "-45deg"],
                    top: ["65%", "50%", "50%"],
                  },
                  close: {
                    rotate: ["-45deg", "0deg", "0deg"],
                    top: ["50%", "50%", "65%"],
                  },
                }}
              ></motion.span>
            </motion.button>
          </MotionConfig>
        </div>
      </header>
    </div>
  );
}
