"use client"

import type { SVGProps } from "react"
import { useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"

const YOUTUBE_THUMBNAIL_BASE_URL = "https://img.youtube.com/vi"
const VIDEO_EMBEDS = [
  "https://www.youtube.com/embed/UGm8djxwC5s",
  "https://www.youtube.com/embed/qh3NGpYRG3I",
  "https://www.youtube.com/embed/AkN6xJcnVYs",
  "https://www.youtube.com/embed/hlSu_ldrbQw",
  "https://www.youtube.com/embed/ZYvvTehpA5I",
] as const

function extractVideoId(url: string) {
  try {
    const parsed = new URL(url)
    const pathnameParts = parsed.pathname.split("/")
    const lastSegment = pathnameParts.at(-1)
    if (!lastSegment) {
      return ""
    }
    return lastSegment.split("?").at(0) ?? ""
  } catch {
    return ""
  }
}

function buildEmbedSrc(url: string, shouldAutoplay: boolean) {
  if (!shouldAutoplay) {
    return url
  }

  return url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`
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
    <section
      id="video-testimonials"
      className="container max-w-screen-xl py-14"
    >
      <h2 className="text-foreground mb-8 text-center text-5xl leading-[1.2] font-bold tracking-tighter">
        Featured on YouTube
      </h2>
      <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:auto-rows-[350px] md:grid-cols-4 lg:grid-cols-6">
        {VIDEO_EMBEDS.map((embedUrl, index) => {
          const videoId = extractVideoId(embedUrl)
          const isActive = activeIndex === index
          const thumbnailSrc = videoId
            ? `${YOUTUBE_THUMBNAIL_BASE_URL}/${videoId}/hqdefault.jpg`
            : undefined

          const columnClasses =
            index === 0
              ? "md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2"
              : "md:col-span-2 lg:col-span-3"

          return (
            <motion.button
              key={embedUrl}
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
              className={`group bg-card focus-visible:outline-primary relative overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${columnClasses}`}
              whileHover={{ scale: 1.02 }}
            >
              {!isActive && (
                <>
                  {thumbnailSrc ? (
                    <Image
                      fill
                      priority={index === 0}
                      src={thumbnailSrc}
                      alt={`Preview still for testimonial ${index + 1}`}
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <span className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
                      Video preview unavailable
                    </span>
                  )}
                  <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                    <PlayIcon className="h-16 w-16" />
                  </span>
                </>
              )}
              {isActive && (
                <iframe
                  src={buildEmbedSrc(embedUrl, true)}
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
