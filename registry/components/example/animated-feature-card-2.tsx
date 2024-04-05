"use client";

import { cubicBezier, motion } from "framer-motion";
import { Clock, Download, MessageCircle, Star } from "lucide-react";

const texts = [
  {
    id: 1,
    header: "New Feature Release.",
    subheader: "Experience our app's latest features now.",
    icon: <Star />,
  },
  {
    id: 2,
    header: "App Update Available.",
    subheader:
      "A new update is available for download. Get the latest version!",
    icon: <Download />,
  },
  {
    id: 3,
    header: "Scheduled Maintenance.",
    subheader:
      "Our app will be temporarily unavailable due to scheduled maintenance.",
    icon: <Clock />,
  },
  {
    id: 4,
    header: "Feedback Appreciated.",
    subheader:
      "We'd love to hear your thoughts on our app. Share your feedback!",
    icon: <MessageCircle />,
  },
];

export default function FeatureCard2() {
  const itemVariants = {
    initial: (index: number) => ({
      y: 0,
      scale: index === 3 ? 0.85 : 1,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    }),
    whileHover: (index: number) => ({
      y: -100,
      opacity: 1,
      scale: index === 0 ? 0.85 : index === 3 ? 1 : 1,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    }),
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative h-full w-full transform-gpu rounded-lg border bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] md:max-h-[500px] md:max-w-[500px]">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col justify-between gap-y-5"
      >
        <div className="flex h-full w-full items-center justify-center rounded-t-xl border-b border-neutral-200 dark:border-neutral-800">
          <motion.div className="flex h-[310px] w-full cursor-pointer flex-col gap-y-3.5 overflow-hidden rounded-t-md p-5">
            {texts.map((text, index) => (
              <motion.div
                key={text.id}
                className="w-full origin-right rounded-md  border border-slate-300/50 p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] dark:border-neutral-800 dark:bg-neutral-900"
                custom={index}
                variants={itemVariants}
              >
                <div className="flex flex-row gap-2">
                  {text.icon}
                  <p className="text-black dark:text-white">{text.header}</p>
                </div>
                <p className="text-gray-400 dark:text-gray-400">
                  {text.subheader}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="flex flex-col items-start gap-y-1 px-5 pb-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
            Instantly get notified about events
          </p>
        </div>
      </motion.div>
    </div>
  );
}
