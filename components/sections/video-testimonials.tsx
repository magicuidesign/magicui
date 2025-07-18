"use client";

import { motion } from "motion/react";

export default function VideoTestimonials() {
  const videoUrls = [
    "https://www.youtube.com/embed/UGm8djxwC5s?t=2s",
    "https://www.youtube.com/embed/qh3NGpYRG3I?t=97s",
    "https://www.youtube.com/embed/AkN6xJcnVYs",
    "https://www.youtube.com/embed/hlSu_ldrbQw?t=1131s",
    "https://www.youtube.com/embed/ZYvvTehpA5I",
  ];

  return (
    <section
      id="video-testimonials"
      className="container max-w-screen-xl py-14"
    >
      <h2 className="mb-8 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        Featured on YouTube
      </h2>
      <div className="grid auto-rows-[300px] grid-cols-1 gap-6 md:auto-rows-[350px] md:grid-cols-4 lg:grid-cols-6">
        {videoUrls.map((url, index) => (
          <motion.div
            key={index}
            className={`group relative overflow-hidden rounded-xl border bg-card shadow-lg hover:shadow-xl transition-all duration-300 ${
              index === 0
                ? "md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2"
                : index % 2 === 1
                  ? "md:col-span-2 lg:col-span-3"
                  : "md:col-span-2 lg:col-span-3"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <iframe
              src={url}
              title={`YouTube testimonial ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full rounded-xl"
              loading="lazy"
            ></iframe>
            <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Watch on YouTube
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
