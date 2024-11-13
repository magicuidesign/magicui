import FlickeringGrid from "@/registry/default/magicui/flickering-grid";

export default function FlickeringGridRoundedDemo() {
  return (
    <div className="relative size-[600px] rounded-lg w-full bg-background overflow-hidden border">
      <FlickeringGrid
        className="z-0 relative inset-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
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
