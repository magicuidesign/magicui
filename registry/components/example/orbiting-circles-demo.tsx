import OrbitingCircles from "@/registry/components/magicui/orbiting-circles";
import { BarChartIcon, LinkIcon } from "lucide-react";

export default function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[400px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Circles
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="h-[30px] w-[30px]"
        duration={20}
        delay={20}
        radius={80}
      >
        <BarChartIcon className="text-black dark:text-white" />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[30px] w-[30px]"
        duration={20}
        delay={10}
        radius={80}
      >
        <LinkIcon className="text-black dark:text-white" />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="h-[50px] w-[50px]"
        reverse
        radius={160}
        duration={20}
      >
        hello
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px]"
        reverse
        radius={160}
        duration={20}
        delay={20}
      >
        world
      </OrbitingCircles>
    </div>
  );
}
