"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

import {
  capturePostHogEvent,
  initPostHog,
  isPostHogEnabled,
} from "@/lib/posthog"

initPostHog()

export function PostHogPageview(): React.ReactNode {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!isPostHogEnabled || !pathname) {
      return
    }

    let url = window.origin + pathname
    if (searchParams && searchParams.toString()) {
      url = url + `?${searchParams.toString()}`
    }

    capturePostHogEvent("$pageview", {
      $current_url: url,
    })
  }, [pathname, searchParams])

  return <></>
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  if (!isPostHogEnabled) {
    return children
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
