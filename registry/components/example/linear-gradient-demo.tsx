import LinearGradient from "@/registry/components/magicui/linear-gradient";

export default function LinearGradientDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-lg border bg-background p-20 md:shadow-2xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Linear Gradient
      </p>
      <LinearGradient />
    </div>
  );
}
