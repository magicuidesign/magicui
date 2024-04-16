"use client";

import Particles from "@/registry/components/magicui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ParticlesDemo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  console.log("color", color);

  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-4 md:shadow-xl">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black md:text-9xl">
        Particles
      </span>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default ParticlesDemo;
