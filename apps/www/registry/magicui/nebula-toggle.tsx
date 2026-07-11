"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export interface NebulaToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function NebulaToggle({
  checked: controlledChecked,
  onChange,
  className,
}: NebulaToggleProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem("theme-preference")
    if (saved === "dark") {
      setChecked(true)
    } else if (saved === "light") {
      setChecked(false)
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
      setChecked(prefersDark)
    }
  }, [])

  const isDark = controlledChecked !== undefined ? controlledChecked : checked

  useEffect(() => {
    if (isMounted) {
      const root = window.document.documentElement
      if (isDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }, [isDark, isMounted])

  const handleToggle = () => {
    const nextValue = !isDark
    if (controlledChecked === undefined) {
      setChecked(nextValue)
      localStorage.setItem("theme-preference", nextValue ? "dark" : "light")
    }
    onChange?.(nextValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <>
      <style>{`
        @keyframes nebulaSwirl {
          0% { transform: translate(-10%, -10%) scale(1) rotate(-5deg); }
          25% { transform: translate(15%, -8%) scale(1.1) rotate(3deg); }
          50% { transform: translate(-5%, 15%) scale(0.9) rotate(-3deg); }
          75% { transform: translate(10%, 5%) scale(1.05) rotate(2deg); }
          100% { transform: translate(-8%, -8%) scale(0.95) rotate(-2deg); }
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes orbRise {
          0% { transform: scale(0.5) translateY(28px) rotate(-20deg); opacity: 0.3; }
          100% { transform: scale(1) translateY(0) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeSlide {
          0% { opacity: 0; transform: scale(0.9) translateY(-12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes floatDust {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
          25% { opacity: 0.4; }
          50% { transform: translate(30px, -25px) scale(2); opacity: 0.6; }
          75% { opacity: 0.2; }
        }
      `}</style>
      <div
        role="switch"
        aria-checked={isDark}
        tabIndex={0}
        aria-label="Toggle light / dark theme"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "group relative h-[80px] w-[180px] shrink-0 cursor-pointer rounded-[80px] transition-all duration-300 select-none",
          "hover:drop-shadow-[0_20px_64px_rgba(0,0,0,0.1)] dark:hover:drop-shadow-[0_20px_72px_rgba(0,0,0,0.7)]",
          "max-md:h-[60px] max-md:w-[124px]",
          "animate-[fadeSlide_0.7s_ease-out_both]",
          className
        )}
      >
        {/* Outer nebula glow ring */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-[5px] -z-10 rounded-[80px] bg-gradient-to-r from-pink-500/10 via-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-800",
            "animate-[nebulaPulse_4s_ease-in-out_infinite]",
            isDark && "opacity-100"
          )}
        />

        {/* Ambient glow around toggle */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-[26px] z-0 rounded-[80px] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.04),transparent_70%)] opacity-0 transition-opacity duration-800",
            isDark && "opacity-100"
          )}
        />

        <input
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}
          className="sr-only"
          aria-hidden="true"
        />

        {/* Track - cosmic nebula with ethereal glow */}
        <div
          className={cn(
            "absolute inset-0 z-0 overflow-hidden rounded-[80px] border-2 border-white/60 transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "bg-gradient-to-br from-[#dce4ed] to-[#c4cedb]",
            "shadow-[inset_0_4px_14px_rgba(0,0,0,0.08),inset_0_-4px_10px_rgba(255,255,255,0.6),0_12px_28px_rgba(0,0,0,0.06)]",
            isDark && [
              "bg-gradient-to-br from-[#0f1a2e] to-[#050a14]",
              "border-blue-400/5",
              "shadow-[inset_0_4px_24px_rgba(0,0,0,0.85),inset_0_-4px_10px_rgba(255,255,255,0.02),0_16px_48px_rgba(0,0,0,0.6),0_0_80px_rgba(100,150,255,0.02)]",
            ]
          )}
        >
          {/* Swirling Nebula clouds */}
          <div
            className={cn(
              "pointer-events-none absolute -inset-2 rounded-[80px] opacity-0 mix-blend-screen blur-[6px] transition-opacity duration-900",
              "animate-[nebulaSwirl_12s_ease-in-out_infinite_alternate]",
              "bg-[radial-gradient(ellipse_at_20%_40%,rgba(255,100,200,0.25),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(100,150,255,0.25),transparent_50%),radial-gradient(ellipse_at_50%_80%,rgba(200,100,255,0.20),transparent_50%),radial-gradient(ellipse_at_30%_20%,rgba(255,200,100,0.15),transparent_40%),radial-gradient(ellipse_at_70%_30%,rgba(100,255,200,0.10),transparent_40%)]",
              isDark && "opacity-100"
            )}
          />

          {/* Track inner glow line */}
          <div
            className={cn(
              "pointer-events-none absolute inset-[2px] rounded-[80px] bg-gradient-to-br from-white/30 to-transparent opacity-40 transition-opacity duration-800",
              isDark && "opacity-[0.02]"
            )}
          />
        </div>

        {/* Thumb */}
        <div
          className={cn(
            "absolute top-2 left-2 z-10 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/70 transition-all duration-900 ease-[cubic-bezier(0.34,1.2,0.64,1)]",
            "bg-[radial-gradient(circle_at_35%_30%,#ffffff,#eef3fe)]",
            "shadow-[0_16px_40px_rgba(0,0,0,0.15),inset_0_-4px_14px_rgba(0,0,0,0.02),inset_0_6px_28px_rgba(255,255,255,0.9)]",
            "animate-[orbRise_0.9s_cubic-bezier(0.34,1.2,0.64,1)_both]",
            "group-active:translate-y-1 group-active:scale-[0.82]",
            "max-md:top-[7px] max-md:left-[7px] max-md:h-11 max-md:w-11",
            isDark && [
              "left-[calc(100%-72px)] -translate-y-1 scale-[0.92]",
              "bg-[radial-gradient(circle_at_40%_30%,#e8effa,#c8d4e5)]",
              "border-white/5",
              "shadow-[0_18px_48px_rgba(0,0,0,0.4),inset_0_-4px_16px_rgba(0,0,0,0.04),inset_0_6px_30px_rgba(255,255,255,0.12)]",
              "group-active:translate-y-[6px] group-active:scale-[0.78]",
              "max-md:left-[calc(100%-53px)]",
            ]
          )}
        >
          {/* Glass reflection on thumb */}
          <div
            className={cn(
              "pointer-events-none absolute top-2 left-3.5 z-10 h-[20%] w-[28%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_80%)] opacity-70 transition-opacity duration-400",
              isDark && "opacity-10"
            )}
          />

          {/* Cosmic glow ring around thumb */}
          <div
            className={cn(
              "pointer-events-none absolute -inset-[6px] z-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)] opacity-0 transition-opacity duration-600",
              isDark &&
                "animate-[glowPulse_3s_ease-in-out_infinite] opacity-100"
            )}
          />

          {/* Icons */}
          <span
            className={cn(
              "absolute z-10 text-[2rem] leading-none transition-all duration-900 ease-[cubic-bezier(0.34,1.2,0.64,1)] select-none max-md:text-[1.4rem]",
              isDark
                ? "-translate-y-[10px] scale-[0.3] rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            )}
          >
            ☀️
          </span>
          <span
            className={cn(
              "absolute z-10 text-[2rem] leading-none transition-all duration-900 ease-[cubic-bezier(0.34,1.2,0.64,1)] select-none max-md:text-[1.4rem]",
              isDark
                ? "translate-y-0 scale-100 rotate-0 opacity-100"
                : "translate-y-[10px] scale-[0.3] rotate-[-90deg] opacity-0"
            )}
          >
            🌙
          </span>
        </div>

        {/* Floating cosmic dust */}
        <span
          className="pointer-events-none absolute top-[25%] left-[8%] z-0 h-[5px] w-[5px] animate-[floatDust_8s_ease-in-out_infinite] rounded-full bg-yellow-400/15"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute right-[12%] bottom-[20%] z-0 h-[7px] w-[7px] animate-[floatDust_8s_ease-in-out_infinite] rounded-full bg-blue-400/15 [animation-delay:2.5s]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-[10%] left-[50%] z-0 h-[4px] w-[4px] animate-[floatDust_8s_ease-in-out_infinite] rounded-full bg-purple-400/15 [animation-delay:5s]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute bottom-[15%] left-[30%] z-0 h-[6px] w-[6px] animate-[floatDust_8s_ease-in-out_infinite] rounded-full bg-pink-400/15 [animation-delay:3.5s]"
          aria-hidden="true"
        />
      </div>
    </>
  )
}
