"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DOMAINS = {
  v3: "https://v3.magicui.design",
  v4: "https://magicui.design",
} as const

export function VersionSelect({ className }: { className?: string }) {
  const [version, setVersion] = React.useState<keyof typeof DOMAINS>("v4")

  const handleVersionChange = (value: keyof typeof DOMAINS) => {
    setVersion(value)
    window.location.href = DOMAINS[value]
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground flex h-7 w-14 cursor-pointer items-center justify-between rounded-full border py-1 pr-0.5 pl-2 text-sm font-medium",
          className
        )}
      >
        {version}
        <div className="flex size-5 items-center justify-center rounded-full border">
          <ChevronDownIcon className="text-muted-foreground size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => handleVersionChange("v3")}
          className={cn(
            "flex justify-between",
            version === "v3" && "bg-accent text-accent-foreground"
          )}
        >
          Tailwind v3
          {version === "v3" && <CheckIcon className="ml-2 size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleVersionChange("v4")}
          className={cn(
            "flex justify-between",
            version === "v4" && "bg-accent text-accent-foreground"
          )}
        >
          Tailwind v4
          {version === "v4" && <CheckIcon className="ml-2 size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
