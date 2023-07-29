import RadialGradient from "@/registry/components/magicui/radial-gradient";

export default function RadialGradientDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-lg border bg-background p-20">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Radial Gradient
      </p>
      <RadialGradient />
    </div>
  );
}
