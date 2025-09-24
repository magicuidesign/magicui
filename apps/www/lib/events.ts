import posthog from "posthog-js"
import { z } from "zod"

const eventSchema = z.object({
  name: z.enum([
    "copy_npm_command",
    "copy_usage_code",
    "copy_source_code",
    "set_layout",
    "template_agent_clicked",
    "template_devtool_clicked",
    "template_mobile_clicked",
    "template_saas_clicked",
    "template_startup_clicked",
    "template_portfolio_clicked",
    "template_marketing_clicked",
    "template_changelog_clicked",
    "template_blog_clicked",

    "sidebar_cta_clicked",
    "header_cta_clicked",
  ]),
  properties: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.null()])
    )
    .optional(),
})

export type Event = z.infer<typeof eventSchema>

export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input)
  if (event) {
    posthog.capture(event.name, event.properties)
  }
}
