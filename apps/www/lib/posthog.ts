import posthog from "posthog-js"

type PostHogPropertyValue = string | number | boolean | null

export type PostHogEventProperties = Record<string, PostHogPropertyValue>

const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY?.trim() ?? ""

export const isPostHogEnabled = posthogApiKey.length > 0

let hasInitializedPostHog = false

export function initPostHog(): void {
  if (
    typeof window === "undefined" ||
    !isPostHogEnabled ||
    hasInitializedPostHog
  ) {
    return
  }

  hasInitializedPostHog = true

  posthog.init(posthogApiKey, {
    api_host: "https://app.posthog.com",
    capture_pageview: true,
    session_recording: {
      maskAllInputs: false,
    },
    loaded: (client) => {
      if (process.env.NODE_ENV === "development") {
        client.debug()
      }
    },
  })
}

export function capturePostHogEvent(
  name: string,
  properties?: PostHogEventProperties
): void {
  if (!isPostHogEnabled) {
    return
  }

  initPostHog()
  posthog.capture(name, properties)
}
