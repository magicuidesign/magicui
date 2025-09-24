import { GridBeams } from "@/registry/magicui/grid-beams"

export default function GridBeamsDemo() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <GridBeams
        gridSize={0}
        gridColor="rgba(255, 255, 255, 0.2)"
        rayCount={20}
        rayOpacity={0.55}
        raySpeed={1.5}
        rayLength="40vh"
        gridFadeStart={5}
        gridFadeEnd={90}
        className="h-full w-full"
      >
        <div className="flex h-full items-center justify-center">
          <div className="mt-50 space-y-6 px-4 text-center">
            <h1 className="text-5xl leading-tight font-bold text-white md:text-7xl">
              Grid <span className="text-blue-400">BEAMS</span>
            </h1>
          </div>
        </div>
      </GridBeams>
    </div>
  )
}
