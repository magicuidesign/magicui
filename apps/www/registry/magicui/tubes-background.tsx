"use client"

import React, { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const randomColors = (count: number) => {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  )
}

interface TubesBackgroundProps {
  children?: React.ReactNode
  className?: string
  enableClickInteraction?: boolean
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tubesRef = useRef<{
    tubes?: {
      setColors?: (colors: string[]) => void
      setLightsColors?: (colors: string[]) => void
    }
    resize?: () => void
    destroy?: () => void
  } | null>(null)

  useEffect(() => {
    let mounted = true
    let cleanup: (() => void) | undefined

    const initTubes = async () => {
      if (!canvasRef.current) return

      try {
        const threeModule =
          await import("threejs-components/build/cursors/tubes1.min.js")
        const TubesCursor = threeModule.default as (
          canvas: HTMLCanvasElement,
          options: unknown
        ) => {
          tubes?: {
            setColors?: (colors: string[]) => void
            setLightsColors?: (colors: string[]) => void
          }
          resize?: () => void
          destroy?: () => void
        }

        if (!mounted) return

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#10b981", "#3b82f6", "#8b5cf6"],
            lights: {
              intensity: 500,
              colors: ["#34d399", "#60a5fa", "#a78bfa", "#38bdf8"],
            },
          },
        })

        tubesRef.current = app

        const handleResize = () => {
          if (app && app.resize) {
            app.resize()
          }
        }

        window.addEventListener("resize", handleResize)

        cleanup = () => {
          window.removeEventListener("resize", handleResize)
          if (app && app.destroy) {
            app.destroy()
          }
        }
      } catch (error) {
        console.error("Failed to load TubesCursor:", error)
      }
    }

    initTubes()

    return () => {
      mounted = false
      if (cleanup) cleanup()
    }
  }, [])

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current || !tubesRef.current.tubes)
      return

    if (tubesRef.current.tubes.setColors) {
      const colors = randomColors(3)
      tubesRef.current.tubes.setColors(colors)
    }

    if (tubesRef.current.tubes.setLightsColors) {
      const lightsColors = randomColors(4)
      tubesRef.current.tubes.setLightsColors(lightsColors)
    }
  }

  return (
    <div
      className={cn(
        "relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[#030712]",
        className
      )}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full"
        style={{ touchAction: "none" }}
      />

      {/* Content Overlay */}
      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-center">
        {children}
      </div>

      {/* Overlay gradient to fade out bottom */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#030712]" />
    </div>
  )
}
