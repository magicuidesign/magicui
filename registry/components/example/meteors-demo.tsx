import Meteors from "@/registry/components/magicui/meteors";

export default function MeteorDemo() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 shadow-2xl">
      <Meteors />
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Meteors
      </p>
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
    </div>
  );
}
