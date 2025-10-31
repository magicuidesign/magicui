"use client"

import { ComponentPropsWithoutRef, useEffect, useState } from "react"
import { AnimatedGridPattern } from "@/registry/magicui/animated-grid-pattern"

export default function TestAnimatedGridPattern() {
  const [mounted, setMounted] = useState(false)
  const [renders, setRenders] = useState(0)
  const [startTime] = useState(() => performance.now())

  // Track render count
  useEffect(() => {
    setRenders((prev) => prev + 1)
  })

  // Auto-unmount after 10 seconds to check cleanup
  useEffect(() => {
    setMounted(true)
    const timeout = setTimeout(() => setMounted(false), 10000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-bold">AnimatedGridPattern Test</h1>
        <div className="text-sm text-gray-500">
          <p>Renders: {renders}</p>
          <p>Time since mount: {Math.floor(performance.now() - startTime)}ms</p>
          <p>Component mounted: {mounted ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Test container */}
      <div className="relative h-[500px] w-full rounded-lg border">
        {mounted && (
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          />
        )}
      </div>
    </div>
  )
}