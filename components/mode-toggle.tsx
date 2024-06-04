"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 text-neutral-800 transition-all dark:rotate-0 dark:scale-0 dark:text-neutral-200" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-neutral-800 transition-all dark:rotate-0 dark:scale-100 dark:text-neutral-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
