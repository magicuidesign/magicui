"use client"

import { motion } from "motion/react"

export function VideoTestimonials() {
  const videoUrls = [
    "https://www.youtube.com/embed/UGm8djxwC5s?t=2s",
    "https://www.youtube.com/embed/qh3NGpYRG3I?t=97s",
    "https://www.youtube.com/embed/AkN6xJcnVYs",
    "https://www.youtube.com/embed/hlSu_ldrbQw?t=1131s",
    "https://www.youtube.com/embed/ZYvvTehpA5I",
  ]

  return (
    <section
      id="video-testimonials"
      className="container max-w-screen-xl py-14"
    >
      <h2 className="text-foreground mb-8 text-center text-5xl leading-[1.2] font-bold tracking-tighter">
        Featured on YouTube
      </h2>
      <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:auto-rows-[350px] md:grid-cols-4 lg:grid-cols-6">
        {videoUrls.map((url, index) => (
          <motion.div
            key={index}
            className={`group bg-card relative overflow-hidden rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl ${
              index === 0
                ? "md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2"
                : index % 2 === 1
                  ? "md:col-span-2 lg:col-span-3"
                  : "md:col-span-2 lg:col-span-3"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <iframe
              src={url}
              title={`YouTube testimonial ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full rounded-xl"
              loading="lazy"
            ></iframe>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
