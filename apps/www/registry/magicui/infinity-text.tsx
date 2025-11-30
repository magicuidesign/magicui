"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface InfinityTextProps {
  text?: string
  speed?: number
  fontSize?: string
  fontStyle?: string
  separator?: string
  className?: string
  colorMode?: "auto" | "light" | "dark" // NEW
}

export function InfinityText({
  text = "RECENT WORK",
  speed = 50,
  fontSize = "text-6xl",
  fontStyle = "",
  separator = "•",
  className,
  colorMode = "auto",
}: InfinityTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLSpanElement | null>(null)

  const [textWidth, setTextWidth] = useState(0)
  const [textColor, setTextColor] = useState("white")

  // Measure width
  useEffect(() => {
    const measure = () => {
      if (textRef.current) {
        setTextWidth(textRef.current.offsetWidth)
      }
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Detect background + pick correct color
  useEffect(() => {
    if (colorMode === "light") {
      setTextColor("black")
      return
    }
    if (colorMode === "dark") {
      setTextColor("white")
      return
    }

    if (containerRef.current) {
      const bg = getComputedStyle(containerRef.current).backgroundColor

      const match = bg.match(/\d+/g)
      if (!match) return

      const [r, g, b] = match.map(Number)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000

      if (brightness > 150) {
        setTextColor("black")
      } else {
        setTextColor("white")
      }
    }
  }, [colorMode])

  const scrollingText = ` ${text}   ${separator}   `
  const duration = textWidth ? textWidth / speed : 10

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden p-4 select-none",
        className
      )}
    >
      <motion.div
        className={cn("flex font-bold whitespace-nowrap", fontSize, fontStyle)}
        style={{ color: textColor }}
        initial={{ x: 0 }}
        animate={{ x: -textWidth }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration,
          ease: "linear",
        }}
      >
        <span ref={textRef}>{scrollingText.repeat(60)}</span>
      </motion.div>
    </div>
  )
}
