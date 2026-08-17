"use client"

import { ArrowRight } from "lucide-react"

import { Floating3DParticles } from "@/registry/magicui/floating-3d-particles"

export default function Component() {
  return (
    <div className="bg-background relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border">
      <Floating3DParticles />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Build something magical
        </h2>
        <p className="text-muted-foreground max-w-xl text-base md:text-lg">
          A pseudo-3D particle background that stays behind your content and
          follows the mouse.
        </p>
        <a
          href="#"
          className="bg-foreground text-background inline-flex h-11 items-center gap-2 rounded-lg px-6 font-medium no-underline transition-opacity hover:opacity-90"
        >
          Get Started
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  )
}
