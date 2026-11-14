"use client"

import type { SVGProps } from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"

const videoIds = [
  "UGm8djxwC5s",
  "qh3NGpYRG3I",
  "AkN6xJcnVYs",
  "hlSu_ldrbQw",
  "ZYvvTehpA5I",
]

function tile(index: number) {
  if (index === 0) {
    return { span: "md:col-span-4 md:row-span-2 md:aspect-auto", width: "66vw" }
  }
  if (index <= 2) {
    return { span: "md:col-span-2", width: "33vw" }
  }
  return { span: "md:col-span-3", width: "50vw" }
}

function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <title>Play</title>
      <circle cx="30" cy="30" r="30" opacity="0.85" />
      <polygon points="24,18 44,30 24,42" fill="#fff" />
    </svg>
  )
}

export function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="video-testimonials" className="py-10 md:py-14">
      <div className="container mb-8">
        <h2 className="text-foreground text-3xl leading-[1.2] font-semibold tracking-tighter md:text-4xl">
          Featured on YouTube
        </h2>
        <p className="text-muted-foreground mt-1 text-base tracking-tight">
          Creators building with Magic UI.
        </p>
      </div>
      <div className="container grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6">
        {videoIds.map((id, index) => {
          const isActive = activeIndex === index
          const { span, width } = tile(index)

          return (
            <motion.button
              key={id}
              type="button"
              aria-pressed={isActive}
              aria-label={`Play testimonial ${index + 1}`}
              onClick={() => {
                setActiveIndex(index)
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setActiveIndex(index)
                }
              }}
              className={`group bg-card focus-visible:outline-primary border-border hover:border-border/80 relative aspect-video cursor-pointer overflow-hidden rounded-xl border transition-[border-color,transform] duration-200 ease-in-out focus-visible:outline focus-visible:outline-offset-2 ${span}`}
              whileHover={{ scale: 1.01 }}
            >
              {!isActive && (
                <>
                  <Image
                    fill
                    src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                    alt=""
                    className="object-cover"
                    sizes={`(min-width: 768px) ${width}, 100vw`}
                  />
                  <div className="bg-card/5 pointer-events-none absolute inset-0 z-10 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                    <PlayIcon className="size-14 drop-shadow-xl transition-transform duration-200 group-hover:scale-[1.08] lg:size-20" />
                  </span>
                </>
              )}
              {isActive && (
                <iframe
                  src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                  title={`YouTube testimonial ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                  loading="lazy"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
