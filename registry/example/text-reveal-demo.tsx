import { TextReveal } from "@/registry/magicui/text-reveal";

export default function TextRevealDemo() {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center rounded-lg border bg-white dark:bg-black">
      <TextReveal text="Magic UI will change the way you design." />
    </div>
  );
}
