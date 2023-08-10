import LinearGradient from "@/registry/components/magicui/linear-gradient";
import ShimmerButton from "@/registry/components/magicui/shimmer-button";

export default function ShimmerButtonDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-lg border bg-background p-20 shadow-2xl">
      <ShimmerButton shadowEnabled={false}>
        <span className="whitespace-pre-wrap bg-gradient-to-b from-black from-30% to-gray-300/80 bg-clip-text text-center text-2xl font-semibold leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 dark:text-transparent">
          Shimmer Button
        </span>
      </ShimmerButton>
      <LinearGradient to="rgba(120,119,198,0.15)" />
    </div>
  );
}
