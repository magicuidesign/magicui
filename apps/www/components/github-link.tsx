import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"

const formatCompactCount = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }

  return value.toLocaleString()
}

const getStarsCount = async () => {
  try {
    const data = await fetch(
      "https://api.github.com/repos/magicuidesign/magicui",
      {
        next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
      }
    )
    if (!data.ok) {
      return 0
    }

    const json: unknown = await data.json()
    if (
      typeof json !== "object" ||
      json === null ||
      !("stargazers_count" in json)
    ) {
      return 0
    }

    const starsCount = json.stargazers_count
    if (typeof starsCount !== "number" || !Number.isFinite(starsCount)) {
      return 0
    }

    return starsCount
  } catch {
    return 0
  }
}

export function GitHubLink({ className }: { className?: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild size="lg" variant="ghost" className="h-8 shadow-none">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              <Icons.gitHub />
              <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
                <StarsCount />
              </React.Suspense>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View on GitHub</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export async function StarsCount() {
  const starsCount = await getStarsCount()

  return (
    <span className="text-muted-foreground w-8 text-xs tabular-nums">
      <span className="hidden sm:inline">{starsCount.toLocaleString()}</span>
      <span className="sm:hidden">{formatCompactCount(starsCount)}</span>
    </span>
  )
}
