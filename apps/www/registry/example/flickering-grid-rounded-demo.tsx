import { FlickeringGrid } from "@/registry/magicui/flickering-grid";

export default function FlickeringGridRoundedDemo() {
  return (
    <div className="relative size-[600px] w-full overflow-hidden rounded-lg border bg-background">
      <FlickeringGrid
        className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={800}
      />
    </div>
  );
}
