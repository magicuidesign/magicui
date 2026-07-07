"use client"

import * as React from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "motion/react"

import { cn } from "@/lib/utils"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  magnetic?: boolean
  magneticStrength?: number
  spring?: SpringOptions
}

export function MagneticButton({
  children,
  className,
  magnetic = true,
  magneticStrength = 0.2,
  spring,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 18,
    mass: 0.2,
    ...spring,
  })

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 18,
    mass: 0.2,
    ...spring,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e)

    if (!magnetic || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()

    const dx = (e.clientX - (rect.left + rect.width / 2)) * magneticStrength

    const dy = (e.clientY - (rect.top + rect.height / 2)) * magneticStrength

    x.set(dx)
    y.set(dy)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e)

    x.set(0)
    y.set(0)
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "focus-visible:ring-ring relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <motion.span
        style={{
          x: springX,
          y: springY,
        }}
        className="flex items-center gap-2"
      >
        {children}
      </motion.span>
    </button>
  )
}
