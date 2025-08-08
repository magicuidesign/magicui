import { AnimatedGridBackground } from "@/registry/magicui/animated-grid-background";

export default function AnimatedGridBackgroundDemo() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border">
      <AnimatedGridBackground
        gridSize={20}
        gridColor="cyan"
        animatedCellsCount={12}
        animationSpeed={6}
        glowIntensity={0.6}
        animationDelay={3}
        backgroundColor="hsl(0 0% 3%)"
        className="h-full w-full"
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Animated Grid Background
            </h2>
            <p className="text-gray-300">
              Beautiful animated grid with glowing cells
            </p>
          </div>
        </div>
      </AnimatedGridBackground>
    </div>
  );
}
