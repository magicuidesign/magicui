"use client"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export interface NoiseTextureProps extends ComponentProps<"svg"> {
  /** Extra classes merged onto the root `svg` element. */
  className?: string
  /**
   * `baseFrequency` for `feTurbulence`; higher values yield finer-grained noise.
   * @default 0.5
   */
  frequency?: number
  /**
   * `numOctaves` for `feTurbulence`; more octaves add detail at smaller scales.
   * @default 4
   */
  octaves?: number
  /**
   * Linear slope on each channel after desaturation; adjusts contrast of the noise.
   * @default 0.15
   */
  slope?: number
  /**
   * Opacity of the filled noise layer (`rect`).
   * @default 0.4
   */
  opacity?: number
}

export const NoiseTexture = ({
  className,
  frequency = 0.5,
  octaves = 4,
  slope = 0.15,
  opacity = 0.4,
  ...props
}: NoiseTextureProps) => {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 z-0 size-full opacity-50 select-none",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" opacity={opacity} />
    </svg>
  )
}
