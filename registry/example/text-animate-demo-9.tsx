"use client";

import { TextAnimate } from "@/registry/magicui/text-animate";

export default function TextAnimateDemo8() {
  return (
    <TextAnimate
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },
        show: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.6,
            y: {
              type: "spring",
              damping: 5,
              stiffness: 100,
            },
          },
        }),
        exit: (i) => ({
          opacity: 0,
          y: 20,
          transition: {
            delay: i * 0.1,
          },
        }),
      }}
      by="character"
    >
      Wavy Motion!
    </TextAnimate>
  );
}
