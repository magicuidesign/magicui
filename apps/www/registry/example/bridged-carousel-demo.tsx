"use client"

import {
  BridgedCarousel,
  type BridgedCarouselItem,
} from "@/registry/magicui/bridged-carousel"

const EXPEDITION_ITEMS: BridgedCarouselItem[] = [
  {
    id: "kyoto-dusk",
    title: "Kyoto Lantern Passage",
    description:
      "A twilight exploration through historic stone alleys framed by traditional wooden machiya architecture and glowing paper lanterns.",
    category: "CULTURE",
    status: "Featured",
    badges: ["Kyoto", "Night Walk", "Tradition"],
    image: {
      src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
      alt: "Historic traditional Japanese street illuminated by warm evening lanterns",
      fit: "cover",
    },
    links: [{ label: "Explore Route", href: "#" }],
  },
  {
    id: "fjord-horizon",
    title: "Lofoten Arctic Fjord",
    description:
      "Dramatic sea cliffs and mirrored icy waters where midnight sun casts perpetual golden gradients across granite summits.",
    category: "NATURE",
    status: "Expedition",
    badges: ["Arctic", "Fjords", "Norway"],
    image: {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
      alt: "Misty mountain landscape reflected in clear alpine lake waters",
      fit: "cover",
    },
    links: [{ label: "Field Notes", href: "#" }],
  },
  {
    id: "atacama-starlight",
    title: "Atacama Starlight Array",
    description:
      "Ultra-clear high-altitude desert plateaus offering unpolluted views into the core of the Milky Way galaxy.",
    category: "ASTRONOMY",
    status: "Observatory",
    badges: ["Desert", "Astrophotography", "Chile"],
    image: {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop",
      alt: "Silhouetted snowy mountains beneath star-studded night sky",
      fit: "cover",
    },
    links: [{ label: "View Stargaze Map", href: "#" }],
  },
]

export default function BridgedCarouselDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-4">
      <BridgedCarousel
        items={EXPEDITION_ITEMS}
        cardWidth={680}
        cardHeight={450}
        autoplay={4000}
      />
    </div>
  )
}
