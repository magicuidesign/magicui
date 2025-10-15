import type { ReactNode } from "react"

import {
  LiveIsland,
  type LiveIslandUpdate,
} from "@/registry/magicui/live-island"

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const updates: LiveIslandUpdate[] = [
  {
    title: "New order",
    description: "Maya Chen · canvas tote · $58",
    time: "now",
    icon: (
      <Icon>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </Icon>
    ),
  },
  {
    title: "Refund issued",
    description: "Eli Woods · ceramic cup · $32",
    time: "4m ago",
    icon: (
      <Icon>
        <path d="M9 14 4 9l5-5" />
        <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
      </Icon>
    ),
  },
  {
    title: "Review posted",
    description: "Five stars for the linen apron",
    time: "9m ago",
    icon: (
      <Icon>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </Icon>
    ),
  },
]

export default function LiveIslandDemo2() {
  return (
    <div className="flex w-full items-center justify-center py-4">
      <LiveIsland label="Orders" color="#1E86FF" updates={updates} />
    </div>
  )
}
