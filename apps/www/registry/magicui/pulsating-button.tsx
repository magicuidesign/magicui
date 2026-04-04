"use client"

import React, { useEffect, useImperativeHandle, useRef } from "react"

import { cn } from "@/lib/utils"

interface PulsatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string
  duration?: string
  distance?: string
  variant?: "pulse" | "ripple"
}

export const PulsatingButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingButtonProps
>(
  (
    {
      className,
      children,
      pulseColor,
      duration = "1.5s",
      distance = "8px",
      variant = "pulse",
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null)
    useImperativeHandle(ref, () => innerRef.current!)

    useEffect(() => {
      if (!innerRef.current) return

      const updateBg = () => {
        if (!innerRef.current) return
        const bg = getComputedStyle(innerRef.current).backgroundColor
        innerRef.current.style.setProperty("--bg", bg)
      }

      updateBg()

      const observer = new MutationObserver(updateBg)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })

      return () => observer.disconnect()
    }, [])

    return (
      <button
        ref={innerRef}
        className={cn(
          "bg-primary text-primary-foreground cursor-pointer rounded-lg px-4 py-2",
          variant === "pulse" ? "animate-pulse" : "animate-pulse-ripple",
          className
        )}
        style={
          {
            ...(pulseColor && { "--pulse-color": pulseColor }),
            "--duration": duration,
            "--distance": distance,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </button>
    )
  }
)

PulsatingButton.displayName = "PulsatingButton"
