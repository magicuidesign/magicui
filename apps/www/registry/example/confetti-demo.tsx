"use client"

import { useRef } from "react"

import { Confetti, type ConfettiRef } from "@/registry/magicui/confetti"

export default function ConfettiDemo() {
  const confettiRef = useRef<ConfettiRef>(null)

  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
        Confetti
      </span>

      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({})
        }}
      />
    </div>
  )
}
