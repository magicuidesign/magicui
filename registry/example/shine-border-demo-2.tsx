"use client";

import { useTheme } from "next-themes";

import { ShineBorder } from "@/registry/magicui/shine-border";

export default function ShineBorderDemo() {
  const theme = useTheme();
  return (
    <ShineBorder
      className="relative size-48 rounded-lg"
      color={theme.theme === "dark" ? "white" : "black"}
    />
  );
}
