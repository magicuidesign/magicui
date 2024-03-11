import { cubicBezier, motion } from "framer-motion";
// import Marquee from "./marquee";
import { FC, ReactNode } from "react";
import { cn } from "../../../lib/utils";
// import {
//   BentoGridContainer,
//   BendroGridLayout,
//   BentoGridContent,
//   BentoGridImage,
// } from "./gridcomponent5";
// import { useTheme } from "../theme-provider";

interface BentoGridContainerProps {
  children: ReactNode;
  className?: string;
}

export const BentoGridContainer: FC<BentoGridContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "h-fit rounded-xl border border-slate-200/50 bg-transparent p-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:border-gray-800 dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BendroGridLayoutProps {
  children: ReactNode;
  className?: string;
}

export const BendroGridLayout: FC<BendroGridLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-between gap-y-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridImageProps {
  children: ReactNode;
  className?: string;
}

export const BentoGridImage: FC<BentoGridImageProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridContentProps {
  children: ReactNode;
  className?: string;
}

export const BentoGridContent: FC<BentoGridContentProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn("flex flex-col items-start gap-y-1 px-5 pb-4", className)}
    >
      {children}
    </div>
  );
};

const texts = [
  {
    id: 1,
    header: "Activity channels.",
    subheader: "Stay in the know. On the go.",
  },
  {
    id: 2,
    header: "Team Updates.",
    subheader: "Collaborate effectively, wherever you are.",
  },
  {
    id: 3,
    header: "Project Progress.",
    subheader: "Track milestones and progress seamlessly.",
  },
  {
    id: 4,
    header: "Daily Digests.",
    subheader: "Get your daily dose of updates.",
  },
];

const containerVariants = {
  initial: {},
  whileHover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* Bento grid 3 animation start */
const thirdfirstsecondVariants = {
  initial: (index: number) => ({
    y: 4,
    scale: 0.5,
    opacity: 0,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  }),
  whileHover: (index: number) => ({
    y: -2,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  }),
};
const thirdsecondsecondVariants = {
  initial: (index: number) => ({
    y: -2,
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "easeInOut",
    },
  }),
  whileHover: (index: number) => ({
    y: 8,
    opacity: 1,
    scale: 1.05,
    boxShadow:
      "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "easeInOut",
    },
  }),
};
/* Bento grid 3 animation end */

/* ================================= */
/* ================================= */

/* Bento Grid 4 animation start */
const fourthBentoItemOneVariants = {
  initial: {
    x: 35,
    y: 5,
    scale: 0.9,
    rotate: -3,
    zIndex: 1,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    boxShadow:
      "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
const fourthBentoItemTwoVariants = {
  initial: {
    scale: 1.1,
    zIndex: 2,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    scale: 1,
    boxShadow:
      "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
const fourthBentoItemThreeVariants = {
  initial: {
    x: -35,
    y: 5,
    scale: 0.9,
    rotate: 3,
    zIndex: 1,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    boxShadow:
      "rgba(245,40,145,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
/* Bento Grid 4 animation end */

/* ================================= */
/* ================================= */

/* Bento Grid 5 animation start */
const fifthBentoItemOneVariants = {
  initial: {
    viewBox: "0 -950 366 1408",
    filter: "saturate(0.3)",
    opacity: 0.5,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    viewBox: "0 -60 366 310",
    filter: "saturate(1)",
    opacity: 1,
    boxShadow:
      "rgba(245,40,145,0.35) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  },
};
const fifthBentoItemTwoVariants = {
  initial: {
    y: 0,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    y: 0,
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  },
};
/* Bento Grid 5 animation end */

/* ================================= */
/* ================================= */

/* Bento Grid 6 animation start */
const sixthBentoItemOneVariants = {
  initial: {
    y: 0,
    scale: 0.95,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    y: 25,
    x: 10,
    scale: 1,
    rotate: 2,
    boxShadow:
      "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
};
const sixthBentoItemTwoVariants = {
  initial: {
    y: 0,
    scale: 0.95,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    y: -25,
    x: -10,
    scale: 1,
    rotate: -3,
    boxShadow:
      "rgba(39,245,76,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
};
/* Bentro Grid 6 animation end */

/* ================================= */
/* ================================= */

/* Bento Grid 7 animation start */
const seventhBentoItemOneVariants = {
  initial: {
    y: 0,
    scale: 0.95,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    y: -10,
    scale: 1,
    boxShadow:
      "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
};
const seventhBentoItemTwoVariants = {
  initial: {
    y: 20,
    x: 5,
    display: "none",
    opacity: 0,
    scale: 0.95,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    y: 10,
    x: -3,
    display: "flex",
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      duration: 0.25,
      ease: "easeIn",
    },
  },
};
/* Bento Grid 7 animation end */

/* ================================= */
/* ================================= */

/* Bento Grid 8 animation start */
const eightBentoItemOneVariants = {
  initial: {
    y: 0,
    scale: 0.97,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    y: -45,
    scale: 1,
    boxShadow:
      "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
};
const eightBentoItemTwoVariants = {
  initial: {
    y: 30,
    opacity: 0,
    scale: 0.97,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    y: 10,
    opacity: 1,
    scale: 1,
    boxShadow:
      "rgba(245,40,145,0.05) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
};
const eightBentoItemThreeVariants = {
  initial: {
    x: 30,
    y: 20,
    opacity: 0,
    transition: {
      delay: 0,
      duration: 0.2,
      ease: "linear",
    },
  },
  whileHover: {
    x: 5,
    y: 5,
    opacity: 1,
    boxShadow:
      "rgba(39,245,76,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
    transition: {
      delay: 0.05,
      duration: 0.2,
      ease: "linear",
    },
  },
};
/* Bento Grid 8 animation end */

/* ================================= */
/* ================================= */

function BentoCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileHover="whileHover"
      className={cn(
        "group relative flex h-full w-full cursor-pointer flex-col items-center justify-between gap-y-5 overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function Feature1() {
  return (
    <BentoCard>
      <div className="flex h-full w-full items-center justify-center  rounded-t-xl border-0 bg-transparent">
        <div className="relative flex cursor-pointer flex-col items-center justify-center gap-y-2 p-10">
          <motion.div
            variants={{
              initial: {
                scale: 0.87,
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: "linear",
                },
              },
              whileHover: {
                scale: 0.8,
                boxShadow:
                  "rgba(245,40,145,0.35) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: "linear",
                },
              },
            }}
            className="z-[1] flex h-full w-full items-center justify-between gap-x-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:bg-neutral-800"
          >
            <div className="h-8 w-8 rounded-full bg-pink-300">
              <img
                className="h-full w-full rounded-full object-cover"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
              <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
            </div>
          </motion.div>
          <motion.div
            variants={{
              initial: {
                y: -27,
                scale: 0.95,
                transition: {
                  delay: 0,
                  duration: 0.2,
                  ease: "linear",
                },
              },
              whileHover: {
                y: -55,
                scale: 0.87,
                boxShadow:
                  "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
                transition: {
                  delay: 0,
                  duration: 0.2,
                  ease: "linear",
                },
              },
            }}
            className="z-[2] flex h-full w-full items-center justify-between gap-x-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:bg-neutral-800"
          >
            <div className="h-8 w-8 rounded-full bg-pink-300">
              <img
                className="h-full w-full rounded-full object-cover"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
              <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
              <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
            </div>
          </motion.div>
          <motion.div
            variants={{
              initial: {
                y: -25,
                opacity: 0,
                scale: 1,
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: "linear",
                },
              },
              whileHover: {
                y: -45,
                opacity: 1,
                scale: 1,
                boxShadow:
                  "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: "easeInOut",
                },
              },
            }}
            className="absolute bottom-0 z-[3] m-auto flex h-fit w-fit items-center justify-between gap-x-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:bg-neutral-800"
          >
            <div className="h-8 w-8 rounded-full bg-pink-300">
              <img
                className="h-full w-full rounded-full object-cover"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
              <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
              <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
              <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-y-1 px-5 pb-4">
        <div className="flex flex-col items-start gap-y-1">
          <h2 className="text-xl font-semibold">
            Write & schedule, effortlessly
          </h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Craft and publish engaging content in an app built for creators.
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

function Feature2() {
  return (
    <BentoCard>
      <div className="flex h-[310px] w-full cursor-pointer flex-col gap-y-3.5 overflow-hidden rounded-t-md border-b border-slate-200/50 p-5 dark:border-neutral-800">
        {texts.map((text, index) => (
          <motion.div
            key={text.id}
            className="w-[400px] origin-right rounded-md border border-slate-300/50 bg-transparent p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] backdrop-blur-md dark:border-neutral-400/30"
            custom={index}
            variants={{
              initial: (index: number) => ({
                y: 0,
                scale: index === 3 ? 0.85 : 1,
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: cubicBezier(0.22, 1, 0.36, 1),
                },
              }),
              whileHover: (index: number) => ({
                y: -100,
                opacity: 1,
                scale: index === 0 ? 0.85 : index === 3 ? 1 : 1,
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: cubicBezier(0.22, 1, 0.36, 1),
                },
              }),
            }}
          >
            <p className="text-black dark:text-white">{text.header}</p>
            <p className="text-gray-400 dark:text-gray-400">{text.subheader}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-y-1 px-5 pb-4">
        <div className="flex flex-col items-start gap-y-1">
          <h2 className="text-xl font-semibold">
            Write & schedule, effortlessly
          </h2>
          <p className="text-base font-normal text-slate-500">
            Craft and publish engaging content in an app built for creators.
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

function Feature3() {
  return (
    <BentoCard>
      <div className="flex h-full w-full cursor-pointer  flex-col items-center justify-center gap-y-2 overflow-hidden rounded-t-xl border-b border-slate-200/50 p-8 dark:border-neutral-800">
        <motion.p
          variants={{
            initial: (index: number) => ({
              y: 4,
              scale: 0.5,
              opacity: 0,
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "linear",
              },
            }),
            whileHover: (index: number) => ({
              y: -2,
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "linear",
              },
            }),
          }}
          className="w-fit rounded-full border border-slate-200 px-2 text-[15px] text-purple-400"
        >
          Make it Punchier
        </motion.p>
        <motion.div
          variants={{
            initial: (index: number) => ({
              y: -2,
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "easeInOut",
              },
            }),
            whileHover: (index: number) => ({
              y: 8,
              opacity: 1,
              scale: 1.05,
              boxShadow:
                "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "easeInOut",
              },
            }),
          }}
          className=" flex items-start gap-x-2 rounded-lg border border-slate-300/50 bg-white p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-400/30 dark:bg-neutral-800"
        >
          <div className="w-8 ">
            <div className="h-6 w-6 rounded-full bg-blue-500">
              <img
                className="h-full w-full rounded-full object-cover"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-base font-semibold">Design</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Craft and publish engaging content in an app built for creators.
            </p>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col items-start gap-y-1 px-5 pb-4">
        <div className="flex flex-col items-start gap-y-1">
          <h2 className="text-xl font-semibold">
            Write & schedule, effortlessly
          </h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Craft and publish engaging content in an app built for creators.
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

function Feature4() {
  return (
    <BentoCard className="lg:col-span-2">
      <div className="flex h-full w-full cursor-pointer flex-row items-center justify-center gap-y-2 overflow-hidden rounded-t-xl border-b border-slate-200/50 p-8 dark:border-neutral-800">
        <motion.div
          variants={{
            initial: {
              x: 35,
              y: 5,
              scale: 0.9,
              rotate: -3,
              zIndex: 1,
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "linear",
              },
            },
            whileHover: {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              boxShadow:
                "rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "easeInOut",
              },
            },
          }}
          className="z-[3] flex h-fit w-full  flex-col items-center justify-between  gap-x-2 gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:bg-neutral-800"
        >
          <div className="h-8 w-8 rounded-full bg-pink-300">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-2 w-14 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-400/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-300/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-600/80"></div>
          </div>
        </motion.div>
        <motion.div
          variants={{
            initial: {
              scale: 1.1,
              zIndex: 2,
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "linear",
              },
            },
            whileHover: {
              scale: 1,
              boxShadow:
                "rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "easeInOut",
              },
            },
          }}
          className="z-[3] flex h-fit w-full  flex-col items-center justify-between  gap-x-2 gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:bg-neutral-800"
        >
          <div className="h-8 w-8 rounded-full bg-pink-300">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-2 w-14 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-400/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-300/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-600/80"></div>
          </div>
        </motion.div>
        <motion.div
          variants={{
            initial: {
              x: -35,
              y: 5,
              scale: 0.9,
              rotate: 3,
              zIndex: 1,
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "linear",
              },
            },
            whileHover: {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              boxShadow:
                "rgba(245,40,145,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: "easeInOut",
              },
            },
          }}
          className="z-[3] hidden h-fit w-full flex-col items-center justify-between gap-x-2  gap-y-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:bg-neutral-800 min-[1170px]:flex"
        >
          <div className="h-8 w-8 rounded-full bg-pink-300">
            <img
              className="h-full w-full rounded-full object-cover"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-2 w-14 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-400/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-300/80"></div>
            <div className="h-2 w-14 rounded-full bg-neutral-600/80"></div>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col items-start gap-y-1 px-5 pb-4">
        <h2 className="text-xl font-semibold">
          No more rehydration or cold storage
        </h2>
        <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
          Customize retention per source to retain and query everything you
          want. No need to archive your logs to S3 anymore. Search all your logs
          anytime
        </p>
      </div>
    </BentoCard>
  );
}

export default function GridComponent6() {
  return (
    <section id="features">
      <div className="py-14">
        <div className="grid h-full gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Feature1 />
          <Feature2 />
          <Feature3 />
          <Feature4 />

          <BentoGridContainer className="h-full  p-0">
            <BendroGridLayout>
              <BentoGridImage className="border-0">
                <div className="relative h-full w-full border-b border-slate-200/50 dark:border-neutral-800">
                  <div className="relative h-full w-full cursor-pointer overflow-hidden rounded-t-xl p-10">
                    <motion.div
                      variants={containerVariants}
                      initial="initial"
                      whileHover="whileHover"
                      className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200/50 bg-white dark:border-neutral-700/50 dark:bg-neutral-800"
                    >
                      <motion.p
                        variants={fifthBentoItemTwoVariants}
                        className="absolute left-5 top-5 z-[9] w-fit text-[15px]"
                      >
                        +14
                      </motion.p>
                      <motion.svg
                        variants={fifthBentoItemOneVariants}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        preserveAspectRatio="none"
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          height: "100%",
                          width: "100%",
                        }}
                        viewBox="0 -950 366 1408"
                      >
                        <path
                          fill="url(#a)"
                          d="M0 193c109.5 0 260.5-52.5 366-192.5v907H0V193Z"
                        />
                        <defs>
                          <linearGradient
                            id="a"
                            x1={183}
                            x2={183}
                            y1={0.5}
                            y2={262}
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#797EFF" />
                            <stop offset={1} stopColor="#79AFFF" />
                          </linearGradient>
                        </defs>
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>
              </BentoGridImage>
              <BentoGridContent>
                <div className="flex flex-col items-start gap-y-1">
                  <h2 className="text-xl font-semibold">
                    Write & schedule, effortlessly
                  </h2>
                  <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
                    Craft and publish engaging content in an app built for
                    creators.
                  </p>
                </div>
              </BentoGridContent>
            </BendroGridLayout>
          </BentoGridContainer>
          {/* 6 */}
          <BentoGridContainer className="h-full p-0 ">
            <BendroGridLayout>
              <BentoGridImage className="border-0">
                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  whileHover="whileHover"
                  className="flex h-full w-full items-center justify-center rounded-t-xl border-b border-slate-200/50 dark:border-neutral-800"
                >
                  <div className="relative flex cursor-pointer flex-col items-center justify-center gap-y-2 p-14">
                    <motion.div
                      variants={sixthBentoItemOneVariants}
                      className="z-[3] flex h-full w-full items-center justify-between gap-x-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:bg-neutral-800"
                    >
                      <div className="h-8 w-8 rounded-full bg-pink-300">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                        <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                        <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                        <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={sixthBentoItemTwoVariants}
                      className="absolute bottom-14 z-[2] m-auto flex h-fit w-fit items-center justify-between gap-x-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:bg-neutral-800"
                    >
                      <div className="h-8 w-8 rounded-full bg-pink-300">
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                        <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                        <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                        <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </BentoGridImage>
              <BentoGridContent>
                <div className="flex flex-col items-start gap-y-1">
                  <h2 className="text-xl font-semibold">
                    Write & schedule, effortlessly
                  </h2>
                  <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
                    Craft and publish engaging content in an app built for
                    creators.
                  </p>
                </div>
              </BentoGridContent>
            </BendroGridLayout>
          </BentoGridContainer>
          {/* 7 */}
          <BentoGridContainer className="h-full  p-0">
            <BendroGridLayout>
              <BentoGridImage className="border-0">
                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  whileHover="whileHover"
                  className="group flex h-full w-full cursor-pointer  flex-col items-center justify-center gap-y-1 overflow-hidden rounded-t-xl border-b border-slate-200/50 dark:border-neutral-800"
                >
                  <div className="relative flex flex-col items-center justify-center gap-y-2 px-10 py-20 lg:py-0">
                    <motion.div
                      variants={seventhBentoItemOneVariants}
                      className="h-full w-full rounded-xl border border-slate-300/50 p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] group-hover:bg-white dark:border-neutral-400/30 group-hover:dark:bg-neutral-800"
                    >
                      <motion.div className=" flex items-start justify-center gap-x-2">
                        <div className="w-8 ">
                          <div className="h-6 w-6 rounded-full bg-blue-500">
                            <img
                              className="h-full w-full rounded-full object-cover"
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="w-full flex-1">
                          <h3 className="text-base font-semibold">Design</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            I think the design can be improved
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        variants={seventhBentoItemTwoVariants}
                        className="flex items-start justify-center gap-x-2"
                      >
                        <div className="w-8 ">
                          <div className="h-6 w-6 rounded-full bg-blue-500">
                            <img
                              className="h-full w-full rounded-full object-cover"
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="w-[calc(100%-3rem)]">
                          <h3 className="text-base font-semibold">Design</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            On it 🔥
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </BentoGridImage>
              <BentoGridContent>
                <div className="flex flex-col items-start gap-y-1">
                  <h2 className="text-xl font-semibold">
                    Write & schedule, effortlessly
                  </h2>
                  <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
                    Craft and publish engaging content in an app built for
                    creators.
                  </p>
                </div>
              </BentoGridContent>
            </BendroGridLayout>
          </BentoGridContainer>
          {/* 8 */}
          <BentoGridContainer className="h-full  p-0">
            <BendroGridLayout>
              <BentoGridImage className="border-0">
                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  whileHover="whileHover"
                  className="flex h-full w-full cursor-pointer  flex-col items-center justify-center gap-y-1 overflow-hidden rounded-t-xl border-b border-slate-200/50 dark:border-neutral-800"
                >
                  <div className="relative flex flex-col items-center justify-center gap-y-2 px-10 py-20">
                    <motion.div
                      variants={eightBentoItemOneVariants}
                      className=" relative flex items-start gap-x-2 rounded-lg border border-slate-300/50 bg-white p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-400/30 dark:bg-neutral-800"
                    >
                      <div className="w-8 ">
                        <div className="h-6 w-6 rounded-full bg-blue-500">
                          <img
                            className="h-full w-full rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="w-[calc(100%-3rem)]">
                        <h3 className="text-base font-semibold">Design</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          Craft and publish engaging content in an app built for
                          creators.
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      variants={eightBentoItemTwoVariants}
                      className=" absolute inset-10 -bottom-14 z-[3] m-auto flex h-fit items-start gap-x-2 rounded-lg border border-slate-300/50 bg-white p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-400/30 dark:bg-neutral-800"
                    >
                      <div className="w-8 ">
                        <div className="h-6 w-6 rounded-full bg-blue-500">
                          <img
                            className="h-full w-full rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="w-[calc(100%-3rem)]">
                        <h3 className="text-base font-semibold">Design</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          Hello 🤞
                        </p>
                      </div>
                      <motion.p
                        variants={eightBentoItemThreeVariants}
                        className="absolute -bottom-2 right-2 w-fit rounded-full border bg-green-500 px-2 py-0.5 text-xs text-white"
                      >
                        DM Sent
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              </BentoGridImage>
              <BentoGridContent>
                <div className="flex flex-col items-start gap-y-1">
                  <h2 className="text-xl font-semibold">
                    Write & schedule, effortlessly
                  </h2>
                  <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
                    Craft and publish engaging content in an app built for
                    creators.
                  </p>
                </div>
              </BentoGridContent>
            </BendroGridLayout>
          </BentoGridContainer>
        </div>
      </div>
    </section>
  );
}
