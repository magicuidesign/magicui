import { Dither } from "@/registry/magicui/dither"

export default function DitherImageDemo() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-lg border bg-black md:h-[500px]">
      <Dither
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
        colors={["#7c2d12", "#fb923c", "#fff7ed"]}
        dotSize={2}
        intensity={0.8}
      />
    </div>
  )
}
