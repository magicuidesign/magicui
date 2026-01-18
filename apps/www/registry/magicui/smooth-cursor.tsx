"use client"

import { JSX } from "react"
import { SmoothCursor as SmoothCursorComponent } from "smooth-cursor"

export interface SmoothCursorProps {
  cursor?: JSX.Element
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

export function SmoothCursor({ cursor, springConfig }: SmoothCursorProps) {
  return <SmoothCursorComponent cursor={cursor} springConfig={springConfig} />
}
