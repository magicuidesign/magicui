import { RadarSweep } from "@/registry/magicui/radar-sweep"

const targets = [
  { x: 28, y: 36, delay: 0.2 },
  { x: 62, y: 24, size: 7, delay: 1.4 },
  { x: 74, y: 58, size: 9, delay: 2.1 },
  { x: 43, y: 72, size: 6, delay: 0.8 },
]

export default function RadarSweepDemo() {
  return (
    <div className="bg-background relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border p-8">
      <RadarSweep className="max-w-[400px]" targets={targets} />
    </div>
  )
}
