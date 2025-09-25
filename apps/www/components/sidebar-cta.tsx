"use client"

import Link from "next/link"
import { CheckIcon, ChevronRight } from "lucide-react"
import posthog from "posthog-js"

import { trackEvent } from "@/lib/events"
import { Button } from "@/components/ui/button"
import { PingDot } from "@/components/ping-dot"
import { AnimatedShinyText } from "@/registry/magicui/animated-shiny-text"
import { AuroraText } from "@/registry/magicui/aurora-text"
import { LineShadowText } from "@/registry/magicui/line-shadow-text"
import { TextAnimate } from "@/registry/magicui/text-animate"

export function ProCTA() {
  return (
    <div className="border-border my-6 flex w-full flex-col gap-4 rounded-xl border p-6">
      <div className="flex items-center gap-2">
        <PingDot />
        <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
          Limited Time Offer
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-foreground text-2xl leading-tight font-bold">
          Ship{" "}
          <LineShadowText className="font-bold tracking-tighter italic">
            Faster
          </LineShadowText>{" "}
          with <AuroraText>Magic UI Pro</AuroraText>
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Stop building from scratch. <br /> Get{" "}
          <span className="text-foreground font-semibold">
            8 production-ready templates
          </span>{" "}
          and{" "}
          <span className="text-foreground font-semibold">
            50+ premium components
          </span>{" "}
          that your users will love.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
            <CheckIcon className="h-3 w-3 text-emerald-600" />
          </div>
          <span>Next.js 15 + TypeScript ready</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
            <CheckIcon className="h-3 w-3 text-emerald-600" />
          </div>
          <span>Copy, paste, customize in minutes</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
            <CheckIcon className="h-3 w-3 text-emerald-600" />
          </div>
          <span>Save 100+ hours of development</span>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-foreground text-3xl font-bold">$199</span>
          <span className="text-muted-foreground text-sm font-medium">
            once
          </span>
        </div>

        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-lg py-3 font-semibold shadow-sm transition-all duration-200 hover:shadow-md"
          onClick={() => trackEvent({ name: "sidebar_cta_clicked" })}
        >
          <Link
            href="https://pro.magicui.design"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Get Lifetime Access
            <ChevronRight className="size-4" />
          </Link>
        </Button>

        <div className="text-center">
          <p className="text-muted-foreground text-xs">
            Trusted by <span className="font-semibold">5,000+</span> developers
          </p>
        </div>
      </div>
    </div>
  )
}

export function ProductHuntCTA() {
  return (
    <Link
      href="https://www.producthunt.com/posts/magic-ui-2?utm_source=sidebar-cta&utm_medium=sidebar-cta&utm_campaign=product-hunt-sidebar-cta"
      target="_blank"
      onClick={() => posthog.capture("product_hunt_sidebar_cta_clicked")}
      className="group my-20 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#ff6154] p-4 text-center text-lg leading-tight font-medium text-white"
    >
      <TextAnimate animate="blurInUp" by="word" className="text-2xl">
        Vote for Magic UI on Product Hunt Today!
      </TextAnimate>
      <AnimatedShinyText className="group inline items-center justify-center via-white/80 text-xs whitespace-pre-wrap text-white">
        ✨ Show your support and vote for us
      </AnimatedShinyText>

      <video
        autoPlay
        loop
        playsInline
        muted
        src="/agent-demo.mp4"
        className="w-full overflow-hidden rounded-xl shadow-2xl"
      />
    </Link>
  )
}

export function SidebarCTA() {
  return <ProCTA />
}
