"use client"

import type { KeyboardEvent, PointerEvent, ReactNode } from "react"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const DEFAULT_GRADIENT_COLORS = ["#A97CF8", "#F38CB8", "#FDCC92"] as const
const MAX_CANVAS_DIMENSION = 4_096
const BRUSH_RADIUS = 30

export interface ScratchToRevealProps {
  children: ReactNode
  width: number
  height: number
  minScratchPercentage?: number
  className?: string
  onComplete?: () => void
  gradientColors?: readonly [string, string, string]
}

const normalizeDimension = (value: number) => {
  if (!Number.isFinite(value)) return 1
  return Math.min(Math.max(value, 1), MAX_CANVAS_DIMENSION)
}

const normalizePercentage = (value: number) => {
  if (!Number.isFinite(value)) return 50
  return Math.min(Math.max(value, 0), 100)
}

export const ScratchToReveal = ({
  width,
  height,
  minScratchPercentage = 50,
  onComplete,
  children,
  className,
  gradientColors = DEFAULT_GRADIENT_COLORS,
}: ScratchToRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const activePointerRef = useRef<number | null>(null)
  const previousPointRef = useRef<{ x: number; y: number } | null>(null)
  const completeRef = useRef(false)
  const mountedRef = useRef(true)
  const onCompleteRef = useRef(onComplete)
  const [isComplete, setIsComplete] = useState(false)

  const normalizedWidth = normalizeDimension(width)
  const normalizedHeight = normalizeDimension(height)
  const normalizedPercentage = normalizePercentage(minScratchPercentage)
  const [gradientStart, gradientMiddle, gradientEnd] = gradientColors

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (isComplete) contentRef.current?.focus({ preventScroll: true })
  }, [isComplete])

  const complete = useCallback(() => {
    if (completeRef.current) return

    completeRef.current = true
    activePointerRef.current = null
    previousPointRef.current = null
    const canvas = canvasRef.current
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height)

    if (mountedRef.current) setIsComplete(true)
    onCompleteRef.current?.()
  }, [])

  const checkCompletion = useCallback(() => {
    if (completeRef.current) return

    const canvas = canvasRef.current
    const context = canvas?.getContext("2d", { willReadFrequently: true })
    if (!(canvas && context)) return

    if (normalizedPercentage === 0) {
      complete()
      return
    }

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    let clearPixels = 0
    for (let index = 3; index < pixels.length; index += 4) {
      if (pixels[index] === 0) clearPixels += 1
    }

    const scratchedPercentage = (clearPixels / (pixels.length / 4)) * 100
    if (scratchedPercentage >= normalizedPercentage) complete()
  }, [complete, normalizedPercentage])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d", { willReadFrequently: true })
    if (!(canvas && context)) return

    completeRef.current = false
    activePointerRef.current = null
    previousPointRef.current = null
    setIsComplete(false)

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 3)
    canvas.width = Math.round(normalizedWidth * devicePixelRatio)
    canvas.height = Math.round(normalizedHeight * devicePixelRatio)
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

    const gradient = context.createLinearGradient(
      0,
      0,
      normalizedWidth,
      normalizedHeight
    )
    gradient.addColorStop(0, gradientStart)
    gradient.addColorStop(0.5, gradientMiddle)
    gradient.addColorStop(1, gradientEnd)
    context.fillStyle = gradient
    context.fillRect(0, 0, normalizedWidth, normalizedHeight)
  }, [
    gradientEnd,
    gradientMiddle,
    gradientStart,
    normalizedHeight,
    normalizedWidth,
  ])

  const getPoint = (event: PointerEvent<HTMLButtonElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const bounds = canvas.getBoundingClientRect()
    if (bounds.width <= 0 || bounds.height <= 0) return null

    return {
      x: ((event.clientX - bounds.left) / bounds.width) * normalizedWidth,
      y: ((event.clientY - bounds.top) / bounds.height) * normalizedHeight,
    }
  }

  const scratch = (event: PointerEvent<HTMLButtonElement>) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d", { willReadFrequently: true })
    const point = getPoint(event)
    if (!(canvas && context && point)) return

    const previousPoint = previousPointRef.current ?? point
    context.globalCompositeOperation = "destination-out"
    context.lineCap = "round"
    context.lineJoin = "round"
    context.lineWidth = BRUSH_RADIUS * 2
    context.beginPath()
    context.moveTo(previousPoint.x, previousPoint.y)
    context.lineTo(point.x, point.y)
    context.stroke()
    previousPointRef.current = point
  }

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (
      event.button !== 0 ||
      completeRef.current ||
      activePointerRef.current !== null
    )
      return
    activePointerRef.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
    scratch(event)
  }

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (activePointerRef.current !== event.pointerId) return
    scratch(event)
  }

  const finishPointer = (event: PointerEvent<HTMLButtonElement>) => {
    if (activePointerRef.current !== event.pointerId) return
    activePointerRef.current = null
    previousPointRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    checkCompletion()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    complete()
  }

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden select-none",
        isComplete && "animate-in zoom-in-95 spin-in-1 duration-500",
        className
      )}
      style={{ width: normalizedWidth, height: normalizedHeight }}
    >
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center"
        inert={!isComplete}
        tabIndex={-1}
      >
        {children}
      </div>
      {!isComplete && (
        <button
          type="button"
          className="focus-visible:ring-ring absolute inset-0 z-10 cursor-crosshair touch-none rounded-[inherit] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Scratch to reveal. Press Enter or Space to reveal immediately."
          onKeyDown={handleKeyDown}
          onLostPointerCapture={finishPointer}
          onPointerCancel={finishPointer}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointer}
        >
          <canvas ref={canvasRef} className="block" role="presentation" />
        </button>
      )}
    </div>
  )
}
