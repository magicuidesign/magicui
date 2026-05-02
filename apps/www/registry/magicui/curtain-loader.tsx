"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export interface LoaderProps {
  onComplete?: () => void
  greetings?: string[]
  speed?: number
}

export default function CurtainLoader({
  onComplete,
  greetings = [
    "• Hi",
    "• Hola",
    "• Bonjour",
    "• Hallo",
    "• Ciao",
    "• Sawasdee",
    "• Aloha",
    "• Salaam",
    "• হ্যালো",
    "• Namaste",
  ],
  speed = 150,
}: LoaderProps) {
  const [moveUp, setMoveUp] = useState(false)
  const [greetingIndex, setGreetingIndex] = useState(0)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited")
    const delayBeforeGreetings = 500
    let greetingInterval: NodeJS.Timeout

    const startGreetings = setTimeout(() => {
      let index = 0
      const maxGreetings = hasVisited ? 1 : greetings.length

      greetingInterval = setInterval(() => {
        index++
        if (index < maxGreetings) {
          setGreetingIndex(index)
        } else {
          clearInterval(greetingInterval)
          if (!hasVisited) sessionStorage.setItem("hasVisited", "true")
          setTimeout(() => setMoveUp(true), 100)
          setTimeout(() => {
            onComplete?.()
          }, 200)
        }
      }, speed)
    }, delayBeforeGreetings)

    return () => {
      clearTimeout(startGreetings)
      if (greetingInterval) clearInterval(greetingInterval)
    }
  }, [onComplete, greetings.length, speed])

  return (
    <>
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        className="absolute inset-0 z-40 bg-black"
      />
      <motion.div
        initial={{ y: 0, scale: 1 }}
        exit={{
          y: "-100%",
          scale: 1.05,
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        }}
        className="absolute top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center bg-black shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        role="status"
        aria-live="polite"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 text-5xl font-medium text-white"
        >
          {greetings[greetingIndex]}
        </motion.div>

        <div className="absolute bottom-0 h-6 w-full shadow-lg" />
      </motion.div>
    </>
  )
}
