"use client";
import { motion } from "framer-motion";

const timelineData = [
  {
    time: "12:05PM",
    title: 'Created "Preline in React" task',
    // content: "Find more detailed instructions here.",
  },
  {
    time: "12:05PM",
    title: "Release v5.2.0 quick bug fix 🐞",
    content: null,
  },
  {
    time: "12:05PM",
    title: "Take a break ⛳️",
    // content: "Just chill for now... 😉",
  },
  {
    time: "12:05PM",
    title: "Take a break ⛳️",
    // content: "Just chill for now... 😉",
  },
  {
    time: "12:05PM",
    title: "Take a break ⛳️",
    // content: "Just chill for now... 😉",
  },
  {
    time: "12:05PM",
    title: "Take a break ⛳️",
    // content: "Just chill for now... 😉",
  },
  {
    time: "12:05PM",
    title: 'Marked "Install Charts" completed',
    // content: "Finally! You can check it out here.",
  },
  {
    time: "12:05PM",
    title: "Take a break ⛳️",
    // content: "Just chill for now... 😉",
  },
];

const TimelineItem = ({
  time,
  icon,
  children,
}: {
  time: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <motion.div
    className="flex gap-x-3"
    variants={{
      hidden: { opacity: 0, y: -10 },
      show: { opacity: 1, y: 0, transition: { type: "spring" } },
    }}
  >
    <div className="w-16 text-end">
      <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
    </div>
    <div className="relative after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 last:after:hidden dark:after:bg-gray-700">
      <div className="relative z-10 flex size-7 items-center justify-center">
        <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600">
          {icon}
        </div>
      </div>
    </div>
    <div className="grow pb-4 pt-0.5">{children}</div>
  </motion.div>
);

export default function ChangelogSection() {
  return (
    <section id="changelog">
      <div className="container mx-auto max-w-2xl py-14">
        <h2 className="mb-4 text-center text-5xl font-bold tracking-tight text-foreground">
          Fast updates
        </h2>
        <h3 className="mb-8 text-center text-lg font-medium tracking-tight text-foreground/80">
          Check out our changelog
        </h3>
        <motion.div
          className="relative h-full w-full"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.04,
              },
            },
          }}
        >
          {timelineData.map((item, idx) => (
            <TimelineItem key={idx} time={item.time}>
              <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h3>
            </TimelineItem>
          ))}
          <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-background" />
        </motion.div>
      </div>
    </section>
  );
}
