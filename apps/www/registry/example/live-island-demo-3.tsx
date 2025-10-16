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
    title: "Ana Torres",
    description: "Can we move the review to 3pm?",
    time: "now",
    icon: (
      <Icon>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </Icon>
    ),
  },
  {
    title: "Pricing page",
    description: "3 new comments from design",
    time: "6m ago",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
      </Icon>
    ),
  },
  {
    title: "Weekly report",
    description: "Revenue is up 12% on last week",
    time: "1h ago",
    icon: (
      <Icon>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </Icon>
    ),
  },
]

export default function LiveIslandDemo3() {
  return (
    <div className="flex w-full items-center justify-center py-4">
      {/* A font-size class scales the whole island. */}
      <LiveIsland
        className="text-sm"
        label="Inbox"
        color="#9E7AFF"
        updates={updates}
      />
    </div>
  )
}
