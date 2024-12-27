import { useTheme } from "next-themes";

import { MagicCard } from "@/registry/default/magicui/magic-card";

export default function MagicCardDemo() {
  const { theme } = useTheme();
  return (
    <div
      className={
        "flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row"
      }
    >
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        gradientColors={["#00ffff", "#0088ff", "#0033cc"]}
      >
        Magic
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        gradientColors={["#00ffff", "#0088ff", "#0033cc"]}
      >
        Card
      </MagicCard>
    </div>
  );
}
