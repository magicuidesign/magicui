"use client"

import { useEffect, useRef } from "react"

interface GlyphMatrixProps {
  /** Characters to randomly pick from */
  glyphs?: string
  /** Cell size in px (also font size) */
  cellSize?: number
  /** Probability (0-1) a cell mutates each tick */
  mutationRate?: number
  /** Tick interval in ms */
  interval?: number
  /** Optional className for the wrapping canvas */
  className?: string
  /** Fade out toward bottom (0 = no fade) */
  fadeBottom?: number
}

/**
 * GlyphMatrix — an animated grid of subtly shifting glyphs.
 * Uses semantic tokens (--foreground / --background) so it adapts to
 * both light and dark modes automatically.
 */
export function GlyphMatrix({
  glyphs = "01·•+*/\\<>=",
  cellSize = 14,
  mutationRate = 0.04,
  interval = 90,
  className,
  fadeBottom = 0.6,
}: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let cols = 0
    let rows = 0
    let cells: string[] = []
    let alphas: number[] = []
    let raf = 0
    let last = 0
    let stopped = false

    const colorCanvas = document.createElement("canvas")
    colorCanvas.width = 1
    colorCanvas.height = 1
    const colorContext = colorCanvas.getContext("2d")

    const readColor = () => {
      const probe = document.createElement("span")
      probe.style.color = "var(--foreground)"
      probe.style.display = "none"
      document.body.appendChild(probe)
      const computed = getComputedStyle(probe).color
      probe.remove()
      return computed
    }

    const parseColor = (value: string) => {
      if (!colorContext) return { r: 0, g: 0, b: 0 }

      colorContext.fillStyle = "#000"
      colorContext.fillStyle = value
      const normalized = colorContext.fillStyle
      colorContext.fillStyle = normalized
      colorContext.fillRect(0, 0, 1, 1)
      const pixels = colorContext.getImageData(0, 0, 1, 1).data
      const r = pixels[0]
      const g = pixels[1]
      const b = pixels[2]

      return { r, g, b }
    }

    let fgColor = readColor()

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const { clientWidth: w, clientHeight: h } = canvas

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(w / cellSize)
      rows = Math.ceil(h / cellSize)

      cells = new Array(cols * rows)
        .fill(0)
        .map(() => glyphs[Math.floor(Math.random() * glyphs.length)])
      alphas = new Array(cols * rows)
        .fill(0)
        .map(() => 0.05 + Math.random() * 0.35)

      fgColor = readColor()
    }

    const draw = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      ctx.clearRect(0, 0, w, h)

      const { r, g, b } = parseColor(fgColor)
      ctx.font = `${cellSize - 2}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.textBaseline = "top"

      for (let y = 0; y < rows; y++) {
        const fade = fadeBottom > 0 ? 1 - (y / rows) * fadeBottom : 1
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const a = alphas[i] * fade
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
          ctx.fillText(cells[i], x * cellSize, y * cellSize)
        }
      }
    }

    const tick = (t: number) => {
      if (stopped) return

      if (t - last >= interval) {
        last = t

        const total = cols * rows
        const mutations = Math.max(1, Math.floor(total * mutationRate))

        for (let n = 0; n < mutations; n++) {
          const i = Math.floor(Math.random() * total)
          cells[i] = glyphs[Math.floor(Math.random() * glyphs.length)]
          alphas[i] = 0.05 + Math.random() * 0.45
        }

        draw()
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    draw()
    raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)

    // Re-read color when theme changes (class on <html>)
    const mo = new MutationObserver(() => {
      fgColor = readColor()
      draw()
    })
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })

    return () => {
      stopped = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
    }
  }, [glyphs, cellSize, mutationRate, interval, fadeBottom])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    />
  )
}
