import Meteors from "@/registry/components/magicui/meteors";

export default function MeteorDemo() {
  return (
    <div className="border rounded-lg h-full w-full relative flex justify-center items-center bg-background overflow-hidden p-20">
      <Meteors />
      <p className="text-5xl font-medium tracking-tighter text-black dark:text-white z-10 whitespace-pre-wrap text-center">
        Meteors
      </p>
      <div className="pointer-events-none h-full absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
    </div>
  );
}
