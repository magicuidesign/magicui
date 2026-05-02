"use client"

import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import CurtainLoader from "@/registry/magicui/curtain-loader"
import { RainbowButton } from "@/registry/magicui/rainbow-button"

export default function CurtainLoaderDemo() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    sessionStorage.removeItem("hasVisited")
  }, [])

  const handleReplay = () => {
    sessionStorage.removeItem("hasVisited")
    setIsLoading(true)
  }

  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl">
      <AnimatePresence>
        {isLoading && <CurtainLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="z-10 flex flex-col items-center gap-8 text-center"
        >
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              You are Welcome!
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Click the button below to replay the animation.
            </p>
          </div>

          <div className="mt-4">
            <RainbowButton onClick={handleReplay} className="gap-2">
              <svg
                className="h-4 w-4 transition-transform group-hover:-rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Replay
            </RainbowButton>
          </div>
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,transparent_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      </div>
    </div>
  )
}
