"use client"

import * as React from "react"

import {
  BridgedCarousel,
  type BridgedCarouselItem,
} from "@/registry/magicui/bridged-carousel"

const EXHIBITION_ITEMS: BridgedCarouselItem[] = [
  {
    id: "nordic-pavilion",
    title: "Nordic Pavilion",
    description:
      "A study in brutalist concrete volumes and sustainable timber integration overlooking the Stockholm archipelago.",
    category: "ARCHITECTURE",
    status: "Completed",
    badges: ["Monolith", "Sustainable", "Timber"],
    image: {
      src: "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=1974&auto=format&fit=crop",
      alt: "Curved concrete pavilion overlooking coastal landscape",
      fit: "cover",
    },
    links: [{ label: "View Case Study", href: "#" }],
  },
  {
    id: "spatial-sound-lab",
    title: "Aura Spatial Sound Lab",
    description:
      "Acoustically tuned spherical listening chamber designed for immersive multichannel audio research and synthesis.",
    category: "ACOUSTICS",
    status: "Exhibition",
    badges: ["Spatial Audio", "Acoustics", "Hardware"],
    image: {
      src: "https://images.unsplash.com/photo-1719937050517-68d4e2a1702e?q=80&w=1974&auto=format&fit=crop",
      alt: "Spherical acoustic sound studio interior with ambient illumination",
      fit: "cover",
    },
    links: [{ label: "Listen to Sessions", href: "#" }],
  },
  {
    id: "luminary-fixture",
    title: "Luminary Kinetic Fixture",
    description:
      "Parametric motorized lighting chandelier that responds dynamically to human foot traffic and daylight fluctuations.",
    category: "INDUSTRIAL",
    status: "Prototype",
    badges: ["Kinetic", "CNC Aluminum", "Sensors"],
    image: {
      src: "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop",
      alt: "Kinetic suspended lighting fixture reflecting against dark surface",
      fit: "cover",
    },
    links: [{ label: "Engineering Specs", href: "#" }],
  },
]

export default function BridgedCarouselDemo2() {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <div className="relative flex w-full flex-col items-center justify-center py-4">
      {/* External custom category tabs */}
      <div className="bg-background/80 mb-4 flex items-center gap-1.5 rounded-full border p-1 shadow-sm backdrop-blur-sm">
        {EXHIBITION_ITEMS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
              activeIndex === index
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.category}
          </button>
        ))}
      </div>

      <BridgedCarousel
        items={EXHIBITION_ITEMS}
        activeIndex={activeIndex}
        onSlideChange={setActiveIndex}
        showControls={false}
        loop={false}
        autoplay={false}
        cardWidth={660}
        cardHeight={440}
      />
    </div>
  )
}
