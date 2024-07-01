import WavyDotPattern from "@/components/magicui/wavy-dot-pattern";

export default function WavyDotPatternDemo() {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl ">
      <p className="z-10 whitespace-pre-wrap text-center text-4xl font-semibold tracking-tighter text-black dark:text-white">
        Wavy Dot Pattern
      </p>

      <WavyDotPattern
        gridWidth={30}
        gridHeight={15}
        dotWidth={8}
        dotHeight={8}
      />
    </div>
  );
}
