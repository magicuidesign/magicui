"use client"

import { useEffect, useState } from "react"

import { LiquidSegment } from "@/registry/magicui/liquid-segment"

const managers = [
  { value: "pnpm", label: "pnpm", command: "pnpm add motion" },
  { value: "npm", label: "npm", command: "npm install motion" },
  { value: "yarn", label: "yarn", command: "yarn add motion" },
  { value: "bun", label: "bun", command: "bun add motion" },
]

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function LiquidSegmentDemo2() {
  const [manager, setManager] = useState("bun")
  const [copied, setCopied] = useState(false)
  const command = managers.find((item) => item.value === manager)?.command

  useEffect(() => {
    if (!copied) {
      return
    }
    const timeout = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timeout)
  }, [copied])

  function copyCommand() {
    // The clipboard API is missing on insecure origins, such as a LAN dev URL.
    if (!command || !navigator.clipboard) {
      return
    }
    navigator.clipboard.writeText(command).then(
      () => setCopied(true),
      () => setCopied(false)
    )
  }

  return (
    <div className="bg-card text-card-foreground flex w-xl max-w-full flex-col gap-5 rounded-xl border p-4 shadow sm:p-6">
      <LiquidSegment
        aria-label="Package manager"
        className="w-full"
        value={manager}
        onValueChange={(next) => {
          setManager(next)
          setCopied(false)
        }}
        options={managers}
      />
      <div className="space-y-1">
        <h2 className="font-semibold">Install Motion</h2>
        <p className="text-muted-foreground text-sm">
          Springs, gestures and layout animations for React.
        </p>
      </div>
      <div className="bg-muted/50 flex items-center gap-2 rounded-lg border py-1.5 pr-1.5 pl-4">
        <code className="min-w-0 flex-1 truncate font-mono text-sm">
          {command}
        </code>
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy command"}
          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors outline-none focus-visible:ring-[3px]"
          onClick={copyCommand}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  )
}
