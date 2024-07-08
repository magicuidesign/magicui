import { useTheme } from "next-themes";

import ShineBorder from "@/components/magicui/shine-border";

export default function ShineBorderDemo() {
  const theme = useTheme();
  return (
    <ShineBorder
      className="text-center text-2xl font-bold capitalize"
      color={theme.theme === "dark" ? "white" : "black"}
    >
      Shine Border
    </ShineBorder>
  );
}
