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
  const data = await fetch(
    "https://api.github.com/repos/magicuidesign/magicui",
    {
      next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    }
  )
  const json = await data.json()

  return (
    <span className="text-muted-foreground w-8 text-xs tabular-nums">
      <span className="hidden sm:inline">
        {json.stargazers_count.toLocaleString()}
      </span>
      <span className="sm:hidden">
        {json.stargazers_count >= 1000
          ? `${(json.stargazers_count / 1000).toFixed(1)}k`
          : json.stargazers_count.toLocaleString()}
      </span>
    </span>
  )
}
