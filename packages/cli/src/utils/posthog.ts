import { PostHog } from "posthog-node";

export const posthog = new PostHog(process.env.POSTHOG_API_KEY!, {
  host: "https://us.i.posthog.com",
});

posthog.debug();
