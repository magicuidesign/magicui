"use client"

import { useTheme } from "next-themes"

import { LineShadowText } from "@/registry/magicui/line-shadow-text"

export default function LineShadowTextDemo() {
  const theme = useTheme()
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black"
  return (
    <h1 className="text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
      Ship
      <LineShadowText className="italic" shadowColor={shadowColor}>
        Fast
      </LineShadowText>
    </h1>
  )
}
