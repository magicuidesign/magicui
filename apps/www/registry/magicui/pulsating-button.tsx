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
      const button = innerRef.current
      if (!button) return

      if (pulseColor) {
        button.style.removeProperty("--bg")
        return
      }

      let animationFrameId = 0
      let currentBg = ""

      const updateBg = () => {
        animationFrameId = 0

        const nextBg = getComputedStyle(button).backgroundColor
        if (nextBg === currentBg) return

        currentBg = nextBg
        button.style.setProperty("--bg", nextBg)
      }

      const scheduleBgUpdate = () => {
        if (animationFrameId) return
        animationFrameId = window.requestAnimationFrame(updateBg)
      }

      updateBg()

      const themeObserver = new MutationObserver(scheduleBgUpdate)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })

      const buttonObserver = new MutationObserver(scheduleBgUpdate)
      buttonObserver.observe(button, {
        attributes: true,
      })

      const syncEvents = [
        "blur",
        "focus",
        "pointerenter",
        "pointerleave",
      ] as const

      for (const eventName of syncEvents) {
        button.addEventListener(eventName, scheduleBgUpdate)
      }

      return () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId)
        }

        themeObserver.disconnect()
        buttonObserver.disconnect()

        for (const eventName of syncEvents) {
          button.removeEventListener(eventName, scheduleBgUpdate)
        }
      }
    }, [pulseColor])

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
