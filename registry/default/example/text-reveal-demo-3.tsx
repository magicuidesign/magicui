import TextReveal from "@/registry/default/magicui/text-reveal";
import { BorderBeam } from "@/registry/default/magicui/border-beam";
import Ripple from "@/registry/default/magicui/ripple";

export default function TextRevealDemo() {
  return (
    <div className="z-10 flex min-h-64 w-full flex-col items-center justify-center gap-10 rounded-lg border bg-white py-10 dark:bg-black">
      <div className="relative flex h-[200px] w-[400px] items-center justify-center rounded-xl border shadow-lg">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          non-sticky
        </span>
        <BorderBeam />
      </div>
      <TextReveal
        text="Magic UI will change the way you design."
        alignX="left"
        stickyHeight="400px"
        textWidth="320px"
      >
        <div className="size-full border-y">
          <Ripple />
        </div>
      </TextReveal>
      <div className="relative  flex h-[200px] w-[400px] items-center justify-center rounded-xl border shadow-lg">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          non-sticky
        </span>
        <BorderBeam />
      </div>
    </div>
  );
}
