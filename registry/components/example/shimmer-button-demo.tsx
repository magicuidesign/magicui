import LinearGradient from "@/registry/components/magicui/linear-gradient";
import ShimmerButton from "@/registry/components/magicui/shimmer-button";

export default function ShimmerButtonDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-lg border bg-background py-20 shadow-2xl">
      <ShimmerButton>
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Shimmer Button
        </span>
      </ShimmerButton>
      <LinearGradient to="rgba(120,119,198,0.15)" />
    </div>
  );
}
