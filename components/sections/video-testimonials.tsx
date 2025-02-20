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
      <div className="grid auto-rows-[420px] grid-cols-1 gap-4 md:auto-rows-[400px] md:grid-cols-3 md:grid-rows-3">
        {videoUrls.map((url, index) => (
          <motion.div
            key={index}
            className={`relative h-full overflow-hidden rounded-xl border bg-secondary shadow-sm ${
              index === 0 ? "h-[600px] md:col-span-2 md:row-span-2" : ""
            } ${index === 3 ? "md:col-span-2" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <iframe
              src={url}
              title={`YouTube video player ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full object-cover"
            ></iframe>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
