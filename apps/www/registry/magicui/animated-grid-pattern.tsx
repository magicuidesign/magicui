"use client"

import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
// Use native SVG <animate> for per-rect opacity animation (lighter than framer-motion)
import { cn } from "@/lib/utils"

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<"svg"> {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: number
  numSquares?: number
  maxOpacity?: number
  duration?: number
  repeatDelay?: number
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const getPos = useCallback(() => {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ]
  }, [dimensions, width, height])

  const generateSquares = useCallback(
    (count: number) =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        pos: getPos(),
      })),
    [getPos]
  )

  const [squares, setSquares] = useState(() => generateSquares(numSquares))

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares))
    }
  }, [dimensions, numSquares, generateSquares])

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })

    const node = containerRef.current
    if (node) resizeObserver.observe(node)
    return () => {
      // Fully disconnect to release all observers and avoid stale refs
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
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
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>

      {/* background grid */}
      <rect width="100%" height="100%" fill={`url(#${id})`} />

      {/* animated squares */}
      <g transform={`translate(${x}, ${y})`}>
        {squares.map(({ pos: [px, py] }, index) => (
          <rect
            key={`${px}-${py}-${index}`}
            width={width - 1}
            height={height - 1}
            x={px * width + 1}
            y={py * height + 1}
            fill="currentColor"
            strokeWidth="0"
            opacity={0}
          >
            <animate
              attributeName="opacity"
              values={`0;${maxOpacity};0`}
              dur={`${duration}s`}
              begin={`${(index * 0.1).toFixed(2)}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
    </svg>
  )
}
