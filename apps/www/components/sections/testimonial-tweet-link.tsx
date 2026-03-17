"use client"

import type { KeyboardEvent, MouseEvent, ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface TestimonialTweetLinkProps {
  children: ReactNode
  tweetUrl: string
}

const interactiveSelector =
  'a, button, input, select, textarea, summary, [role="button"], [role="link"]'

const isInteractiveTarget = (
  target: EventTarget | null,
  container: Element
) => {
  if (!(target instanceof Element)) {
    return false
  }

  const interactiveElement = target.closest(interactiveSelector)

  return interactiveElement !== null && interactiveElement !== container
}

export function TestimonialTweetLink({
  children,
  tweetUrl,
}: TestimonialTweetLinkProps) {
  const navigateToTweet = () => {
    window.location.assign(tweetUrl)
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isInteractiveTarget(event.target, event.currentTarget)) {
      return
    }

    navigateToTweet()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()
    navigateToTweet()
  }

  return (
    <div
      className="group relative block contain-layout"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 opacity-0 backdrop-blur-sm transition-opacity duration-200 ease-in-out will-change-[opacity] group-hover:pointer-events-auto group-hover:opacity-100">
        <Button
          asChild
          variant="default"
          size="default"
          className="pointer-events-auto h-8 w-fit translate-y-3 px-2 transition-transform duration-200 ease-in-out will-change-transform group-hover:translate-y-0"
        >
          <Link href={tweetUrl}>
            View Tweet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
