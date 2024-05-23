import SlightFlip from "@/registry/components/magicui/slight-flip";

export default async function SlightFlipDemo() {
  return (
    <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg border bg-white dark:bg-black">
      <SlightFlip
        className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
        word="Building Magic UI"
      />{" "}
    </div>
  );
}
