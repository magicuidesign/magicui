import type * as React from "react"

import { cn } from "@/lib/utils"

export interface GlareHoverProps extends React.ComponentProps<"div"> {
  /**
   * The rotation angle in degrees for the glare effect.
   * @default 45
   */
  rotate?: number
  /**
   * Additional CSS classes to apply to the glare element.
   */
  glareClassName?: string
}

function GlareHover({
  children,
  rotate = 45,
  className,
  glareClassName,
  ...props
}: GlareHoverProps) {
  return (
    <div
      className={cn("group/glare relative w-fit overflow-hidden", className)}
    >
      {children}
      <span
        className={cn(
          "absolute inset-0 size-full opacity-30 blur-sm transition-transform",
          "translate-x-[-100%] bg-gradient-to-t from-transparent via-black/15 to-transparent duration-500 dark:via-white/50",
          "group-hover/glare:translate-x-[100%]",
          glareClassName
        )}
        style={{ rotate: `${rotate}deg` }}
        aria-hidden="true"
        role="presentation"
        {...props}
      />
    </div>
  )
}

export { GlareHover }
