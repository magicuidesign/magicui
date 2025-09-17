"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { AnimatedShinyText } from "@/registry/magicui/animated-shiny-text";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/registry/magicui/aurora-text";
import { LineShadowText } from "@/registry/magicui/line-shadow-text";
import { trackEvent } from "@/lib/events";
import posthog from "posthog-js";
import { PingDot } from "@/components/ping-dot";

export function ProCTA() {
  return (
    <div className="my-6 flex w-full flex-col gap-4 rounded-xl border border-border p-6">
      <div className="flex items-center gap-2">
        <PingDot />
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
          Limited Time Offer
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-3xl font-bold leading-tight text-foreground">
          Ship{" "}
          <LineShadowText className="italic tracking-tighter font-bold">
            Faster
          </LineShadowText>{" "}
          with <AuroraText>Magic UI Pro</AuroraText>
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Stop building from scratch. <br /> Get{" "}
          <span className="font-semibold text-foreground">
            8 production-ready templates
          </span>{" "}
          and{" "}
          <span className="font-semibold text-foreground">
            50+ premium components
          </span>{" "}
          that your users will love.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
            <span className="text-xs font-bold text-emerald-600">✓</span>
          </div>
          <span>Next.js 15 + TypeScript ready</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
            <span className="text-xs font-bold text-emerald-600">✓</span>
          </div>
          <span>Copy, paste, customize in minutes</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
            <span className="text-xs font-bold text-emerald-600">✓</span>
          </div>
          <span>Save 100+ hours of development</span>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-3xl font-bold text-foreground">$199</span>
          <span className="text-sm font-medium text-muted-foreground">
            once
          </span>
        </div>

        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          onClick={() => trackEvent({ name: "sidebar_cta_clicked" })}
        >
          <Link
            href="https://pro.magicui.design"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Get Instant Access
            <ChevronRight className="size-4" />
          </Link>
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Trusted by <span className="font-semibold">5,000+</span> developers
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductHuntCTA() {
  return (
    <Link
      href="https://www.producthunt.com/posts/magic-ui-2?utm_source=sidebar-cta&utm_medium=sidebar-cta&utm_campaign=product-hunt-sidebar-cta"
      target="_blank"
      onClick={() => posthog.capture("product_hunt_sidebar_cta_clicked")}
      className="group my-20 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#ff6154] p-4 text-center text-lg font-medium leading-tight text-white"
    >
      <TextAnimate animate="blurInUp" by="word" className="text-2xl">
        Vote for Magic UI on Product Hunt Today!
      </TextAnimate>
      <AnimatedShinyText className="group inline items-center justify-center whitespace-pre-wrap via-white/80 text-white text-xs">
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
  );
}

export function SidebarCTA() {
  return <ProCTA />;
}
