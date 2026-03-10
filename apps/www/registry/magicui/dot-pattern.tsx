"use client"

import React, { useId } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * DotPattern Component Props
 *
 * @param {number} [width=16] - The horizontal spacing between dots
 * @param {number} [height=16] - The vertical spacing between dots
 * @param {number} [x=0] - The x-offset of the entire pattern
 * @param {number} [y=0] - The y-offset of the entire pattern
 * @param {number} [cx=1] - The x-offset of individual dots
 * @param {number} [cy=1] - The y-offset of individual dots
 * @param {number} [cr=1] - The radius of each dot
 * @param {string} [className] - Additional CSS classes to apply to the SVG container
 * @param {boolean} [glow=false] - Whether the pattern should have a breathing opacity animation
 */
interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  glow?: boolean
}

/**
 * DotPattern Component
 *
 * An optimized React component that creates a background dot pattern using SVG <pattern>.
 * This version is performance-tuned to avoid rendering thousands of individual DOM nodes,
 * instead letting the browser's native SVG engine handle the repetition.
 *
 * @component
 *
 * @see DotPatternProps for the props interface.
 *
 * @example
 * // Basic usage
 * <DotPattern />
 *
 * // With custom color via Tailwind text utility (fully backward-compatible)
 * <DotPattern className="text-red-500" />
 *
 * // With glowing effect and custom spacing
 * <DotPattern
 *   width={20}
 *   height={20}
 *   glow={true}
 *   className="opacity-50"
 * />
 *
 * @notes
 * - The component is client-side only ("use client")
 * - Highly performant: uses a single <rect> to render an infinite grid.
 * - Responsive: automatically fills its parent container via CSS (inset-0).
 * - When glow is enabled, the entire pattern performs a hardware-accelerated opacity transition.
 * - Color is controlled via `text-*` Tailwind classes (e.g. `text-red-500`), as
 *   `<circle fill="currentColor" />` inherits the SVG's CSS `color` property.
 */
export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>

      <motion.rect
        width="100%"
        height="100%"
        fill={`url(#${id})`}
        animate={
          glow
            ? {
                opacity: [0.3, 0.8, 0.3],
              }
            : {}
        }
        transition={
          glow
            ? {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
      />
    </svg>
  )
}