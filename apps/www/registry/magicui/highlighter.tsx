"use client"

import { useEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useEffect(() => {
    const element = elementRef.current

    if (!element || annotationRef.current) return

    annotationRef.current = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    })

    resizeObserverRef.current = new ResizeObserver(() => {
      annotationRef.current?.hide()
      annotationRef.current?.show()
    })
    resizeObserverRef.current.observe(element)
    resizeObserverRef.current.observe(document.body)

    return () => {
      resizeObserverRef.current?.disconnect()
      annotationRef.current?.remove()
      annotationRef.current = null
    }
  }, [action, multiline, padding, iterations, animationDuration, strokeWidth])

  useEffect(() => {
    if (annotationRef.current) {
      annotationRef.current.color = color
      annotationRef.current.hide()
      annotationRef.current.show()
    }
  }, [color])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
