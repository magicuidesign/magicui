import LinearGradient from "@/registry/components/magicui/linear-gradient";

export default function LinearGradientDemo() {
  return (
    <div className="border rounded-lg h-full w-full relative flex justify-center items-center bg-background p-20">
      <p className="text-5xl font-medium tracking-tighter whitespace-nowrap text-black dark:text-white z-10">
        Linear Gradient
      </p>
      <LinearGradient />
    </div>
  );
}
