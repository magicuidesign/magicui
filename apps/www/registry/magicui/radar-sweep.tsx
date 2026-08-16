import type { CSSProperties, HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export interface RadarTarget {
  x: number
  y: number
  size?: number
  delay?: number
}

export interface RadarSweepProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
  rings?: number
  duration?: number
  color?: string
  targets?: RadarTarget[]
}

const defaultTargets: RadarTarget[] = [
  { x: 30, y: 35, delay: 0.2 },
  { x: 65, y: 28, size: 7, delay: 1.1 },
  { x: 72, y: 68, size: 9, delay: 1.8 },
]

export function RadarSweep({
  className,
  size = 400,
  rings = 4,
  duration = 4,
  color = "#22c55e",
  targets = defaultTargets,
  style,
  ...props
}: RadarSweepProps) {
  const radarStyle = {
    "--radar-color": color,
    "--radar-duration": `${duration}s`,
    width: `min(100%, ${size}px)`,
    backgroundImage:
      "radial-gradient(circle, color-mix(in srgb, var(--radar-color) 10%, transparent), transparent 68%)",
    ...style,
  } as CSSProperties

  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        "border-foreground/10 bg-background relative aspect-square overflow-hidden rounded-full border shadow-[inset_0_0_40px_color-mix(in_srgb,var(--radar-color)_8%,transparent)]",
        className
      )}
      style={radarStyle}
    >
      {Array.from({ length: rings }, (_, index) => index + 1).map((ring) => (
        <div
          className="border-foreground/10 absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border"
          key={ring}
          style={{ width: `${(ring / rings) * 100}%` }}
        />
      ))}

      <div className="bg-foreground/10 absolute top-1/2 left-0 h-px w-full -translate-y-1/2" />
      <div className="bg-foreground/10 absolute top-0 left-1/2 h-full w-px -translate-x-1/2" />

      <div
        className="animate-radar-sweep absolute inset-0 rounded-full motion-reduce:animate-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 300deg, color-mix(in srgb, var(--radar-color) 8%, transparent) 325deg, color-mix(in srgb, var(--radar-color) 55%, transparent) 360deg)",
        }}
      />

      {targets.map((target) => {
        const targetSize = target.size ?? 8
        const targetDelay = target.delay ?? 0
        const targetKey = `${target.x}-${target.y}-${targetSize}-${targetDelay}`

        return (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            key={targetKey}
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
          >
            <div
              className="animate-radar-blip rounded-full bg-(--radar-color) shadow-[0_0_12px_var(--radar-color)] motion-reduce:animate-none"
              style={
                {
                  "--radar-delay": `${targetDelay}s`,
                  height: targetSize,
                  width: targetSize,
                } as CSSProperties
              }
            />
          </div>
        )
      })}

      <div className="bg-background absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--radar-color) shadow-[0_0_10px_var(--radar-color)]" />
    </div>
  )
}
