import Meteors from "@/registry/components/magicui/meteors";

export default function MeteorDemo() {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <Meteors number={30} />
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Meteors
      </p>
    </div>
  );
}
