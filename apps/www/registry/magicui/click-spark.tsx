"use client"

import React, { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface Spark {
  x: number
  y: number
  angle: number
  startTime: number
}

interface ClickSparkProps {
  /**
   * The color of the sparks.
   * @default "#fff"
   */
  sparkColor?: string
  /**
   * The size of the sparks.
   * @default 10
   */
  sparkSize?: number
  /**
   * The radius of the spark explosion.
   * @default 15
   */
  sparkRadius?: number
  /**
   * The number of sparks per click.
   * @default 8
   */
  sparkCount?: number
  /**
   * The duration of the spark animation in milliseconds.
   * @default 400
   */
  duration?: number
  /**
   * The easing function for the spark animation.
   * @default "ease-out"
   */
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out"
  /**
   * Extra scale factor for the spark distance.
   * @default 1.0
   */
  extraScale?: number
  /**
   * The content to wrap.
   */
  children?: React.ReactNode
  /**
   * Additional class names for the wrapper.
   */
  className?: string
}

export function ClickSpark({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
  className,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  const animationIdRef = useRef<number | null>(null)

  // Store animation settings in a ref to keep the draw loop stable
  // and avoid exhaustive-deps warnings.
  const settingsRef = useRef({
    sparkColor,
    sparkSize,
    sparkRadius,
    duration,
    extraScale,
  })

  // Sync refs when props change
  useEffect(() => {
    settingsRef.current = {
      sparkColor,
      sparkSize,
      sparkRadius,
      duration,
      extraScale,
    }
  }, [sparkColor, sparkSize, sparkRadius, duration, extraScale])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    let resizeTimeout: ReturnType<typeof setTimeout>

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect()
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(parent)

    resizeCanvas()

    return () => {
      ro.disconnect()
      clearTimeout(resizeTimeout)
    }
  }, [])

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t
        case "ease-in":
          return t * t
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        default:
          return t * (2 - t)
      }
    },
    [easing]
  )

  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Use settings from Ref to avoid dependency loop
      const {
        sparkColor: color,
        sparkSize: size,
        sparkRadius: radius,
        duration: drn,
        extraScale: scale,
      } = settingsRef.current

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= drn) {
          return false
        }

        const progress = elapsed / drn
        const eased = easeFunc(progress)

        const distance = eased * radius * scale
        const lineLength = size * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      if (sparksRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame(draw)
      } else {
        animationIdRef.current = null
      }
    },
    [easeFunc]
  )

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const now = performance.now()
    // sparkCount is only used here to initialize the objects
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }))

    sparksRef.current.push(...newSparks)

    if (animationIdRef.current === null) {
      animationIdRef.current = requestAnimationFrame(draw)
    }
  }

  return (
    <div
      className={cn("relative h-full w-full", className)}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />
      {children}
    </div>
  )
}
