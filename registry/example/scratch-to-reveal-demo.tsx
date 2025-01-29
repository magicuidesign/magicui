import { ScratchToReveal } from "@/registry/magicui/scratch-to-reveal";

const ScratchToRevealDemo = () => {
  const handleComplete = () => {
    // Do Something
  };

  return (
    <ScratchToReveal
      width={250}
      height={250}
      minScratchPercentage={70}
      className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
      onComplete={handleComplete}
      gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
    >
      <p className="text-9xl">😎</p>
    </ScratchToReveal>
  );
};

export default ScratchToRevealDemo;
