import type { ComponentProps, CSSProperties } from "react"
import { useMemo } from "react"

import { cn } from "@/lib/utils"

export interface GlareHoverProps extends ComponentProps<"div"> {
  /**
   * Optional CSS width on the root element (e.g. `"100%"`, `"320px"`).
   * @example
   * ```tsx
   * <GlareHover width="100%">...</GlareHover>
   * ```
   */
  width?: string
  /**
   * Optional CSS height on the root element (e.g. `"auto"`, `"200px"`).
   * @example
   * ```tsx
   * <GlareHover height="200px">...</GlareHover>
   * ```
   */
  height?: string
  /**
   * Background color of the wrapper (CSS color string).
   * @example
   * ```tsx
   * <GlareHover background="#0a0a0a">...</GlareHover>
   * ```
   */
  background?: string
  /**
   * Glare highlight as `#rrggbb` or `#rgb`; parsed to `rgba` for the gradient.
   * @example
   * ```tsx
   * <GlareHover color="#a78bfa">...</GlareHover>
   * ```
   */
  color?: Color
  /**
   * Opacity applied to the glare color when converting hex to `rgba` (0–1).
   * @example
   * ```tsx
   * <GlareHover color="#ffffff" opacity={0.35}>...</GlareHover>
   * ```
   */
  opacity?: number
  /**
   * Gradient angle in degrees (`--gh-angle`).
   * @example
   * ```tsx
   * <GlareHover angle={-30}>...</GlareHover>
   * ```
   */
  angle?: number
  /**
   * Glare tile size as a percentage of the element (`--gh-size`, `background-size`).
   * @example
   * ```tsx
   * <GlareHover size={280}>...</GlareHover>
   * ```
   */
  size?: number
  /**
   * Transition duration for the glare sweep in milliseconds (`--gh-duration`).
   * @example
   * ```tsx
   * <GlareHover duration={500}>...</GlareHover>
   * ```
   */
  duration?: number
  /**
   * When `true`, the glare transition only runs on hover (no animation until pointer enters).
   * @example
   * ```tsx
   * <GlareHover playOnce>...</GlareHover>
   * ```
   */
  playOnce?: boolean
}

type Color = `#${string}`
type RGBA = `rgba(${number},${number},${number},${number})`

function parseHEX(color: Color, opacity: number): RGBA | Color {
  const hex = color.replace("#", "")
  const parse = (h: string) => Number.parseInt(h, 16)
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(${parse(hex.slice(0, 2))},${parse(hex.slice(2, 4))},${parse(hex.slice(4, 6))},${opacity})`
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return `rgba(${parse(hex[0] + hex[0])},${parse(hex[1] + hex[1])},${parse(hex[2] + hex[2])},${opacity})`
  }

  return color
}

function GlareHover({
  background = "#000",
  children,
  color = "#ffffff",
  opacity = 0.5,
  angle = -45,
  size = 250,
  duration = 650,
  playOnce = false,
  className,
  style,
  width,
  height,
  ...props
}: GlareHoverProps) {
  const rgba = useMemo(() => parseHEX(color, opacity), [color, opacity])

  const cssVars = {
    "--gh-angle": `${angle}deg`,
    "--gh-duration": `${duration}ms`,
    "--gh-size": `${size}%`,
    "--gh-rgba": rgba,
    background,
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  } as CSSProperties

  return (
    <div
      {...props}
      className={cn(
        "relative grid size-fit cursor-pointer place-items-center overflow-hidden bg-transparent",
        // BEFORE ELEMENT
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-no-repeat before:content-['']",
        // GRADIENT
        "before:[background-image:linear-gradient(var(--gh-angle),transparent_60%,var(--gh-rgba)_70%,transparent,transparent_100%)]",
        // SIZE + POSITION
        "before:[background-size:var(--gh-size)_var(--gh-size),100%_100%]",
        "before:[background-position:-100%_-100%,0_0]",
        // TRANSITION
        !playOnce &&
          "before:transition-[background-position] before:duration-[var(--gh-duration)] before:ease-in-out",
        playOnce &&
          "before:transition-none hover:before:transition-[background-position] hover:before:duration-[var(--gh-duration)]",
        // HOVER EFFECT
        "hover:before:[background-position:100%_100%,0_0]",
        className
      )}
      style={cssVars}
    >
      {children}
    </div>
  )
}

export { GlareHover }
