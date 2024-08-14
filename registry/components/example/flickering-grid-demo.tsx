import FlickeringGrid from "../magicui/flickering-grid";

export default function FlickeringGridDemo() {
  return (
    <div className="bg-[hsla(0,0%,5%,1)] relative overflow-hidden h-[500px] rounded-lg w-full">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#fff"
        maxOpacity={0.05}
        flickerChance={0.1}
        height={1600}
      />
    </div>
  );
}
