"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/registry/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
}

const notifications = [
  {
    name: "New task added",
    description: "Magic UI · 15m ago",
    icon: "📝",
    color: "#1E86FF",
  },
  {
    name: "New message",
    description: "Magic UI · 10m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "User signed up",
    description: "Magic UI · 5m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Payment received",
    description: "Magic UI · 2m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "New task added",
    description: "Magic UI · 15m ago",
    icon: "📝",
    color: "#1E86FF",
  },
  {
    name: "New message",
    description: "Magic UI · 10m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "User signed up",
    description: "Magic UI · 5m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Payment received",
    description: "Magic UI · 2m ago",
    icon: "💸",
    color: "#00C9A7",
  },
];

const AnimatedListItem = ({ name, description, icon, color }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div
          className="font-lg flex min-h-[3rem] min-w-[3rem] items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <figcaption className="text-lg font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function AnimatedListDemo() {
  return (
    <div className="relative flex max-h-[500px] min-h-[500px] w-full flex-col overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
      {/* <span className="pointer-events-none hidden whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 sm:block sm:text-7xl">
        Animated List
      </span> */}

      <AnimatedList>
        {notifications.map((item, idx) => (
          <AnimatedListItem {...item} key={idx}></AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  );
}
