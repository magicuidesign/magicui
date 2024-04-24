import { Registry } from "@/registry/schema";
import * as React from "react";

const ui: Registry = {
  "magic-card": {
    name: "magic-card",
    type: "components:ui",
    files: ["registry/components/magicui/magic-card.tsx"],
  },
  "linear-gradient": {
    name: "linear-gradient",
    type: "components:ui",
    files: ["registry/components/magicui/linear-gradient.tsx"],
  },
  "radial-gradient": {
    name: "radial-gradient",
    type: "components:ui",
    files: ["registry/components/magicui/radial-gradient.tsx"],
  },
  meteors: {
    name: "meteors",
    type: "components:ui",
    files: ["registry/components/magicui/meteors.tsx"],
  },
  "grid-pattern": {
    name: "grid-pattern",
    type: "components:ui",
    files: ["registry/components/magicui/grid-pattern.tsx"],
  },
  "dot-pattern": {
    name: "dot-pattern",
    type: "components:ui",
    files: ["registry/components/magicui/dot-pattern.tsx"],
  },
  marquee: {
    name: "marquee",
    type: "components:ui",
    files: ["registry/components/magicui/marquee.tsx"],
  },
  globe: {
    name: "globe",
    type: "components:ui",
    files: ["registry/components/magicui/globe.tsx"],
  },
  "shimmer-button": {
    name: "shimmer-button",
    type: "components:ui",
    files: ["registry/components/magicui/shimmer-button.tsx"],
  },
  "hero-video": {
    name: "hero-video",
    type: "components:ui",
    files: ["registry/components/magicui/hero-video.tsx"],
  },
  "tweet-card": {
    name: "tweet-card",
    type: "components:ui",
    files: ["registry/components/magicui/tweet-card.tsx"],
  },
  "client-tweet-card": {
    name: "client-tweet-card",
    type: "components:ui",
    files: ["registry/components/magicui/client-tweet-card.tsx"],
  },
  "bento-grid": {
    name: "bento-grid",
    type: "components:ui",
    files: ["registry/components/magicui/bento-grid.tsx"],
  },
  particles: {
    name: "particles",
    type: "components:ui",
    files: ["registry/components/magicui/particles.tsx"],
  },
  "number-ticker": {
    name: "number-ticker",
    type: "components:ui",
    files: ["registry/components/magicui/number-ticker.tsx"],
  },
  ripple: {
    name: "ripple",
    type: "components:ui",
    files: ["registry/components/magicui/ripple.tsx"],
  },
  "retro-grid": {
    name: "retro-grid",
    type: "components:ui",
    files: ["registry/components/magicui/retro-grid.tsx"],
  },
  "animated-list": {
    name: "animated-list",
    type: "components:ui",
    files: ["registry/components/magicui/animated-list.tsx"],
  },
  "animated-lines": {
    name: "animated-lines",
    type: "components:ui",
    files: ["registry/components/magicui/animated-lines.tsx"],
  },
  "animated-shiny-text": {
    name: "animated-shiny-text",
    type: "components:ui",
    files: ["registry/components/magicui/animated-shiny-text.tsx"],
  },
  "animated-grid-pattern": {
    name: "animated-grid-pattern",
    type: "components:ui",
    files: ["registry/components/magicui/animated-grid-pattern.tsx"],
  },
  "border-beam": {
    name: "border-beam",
    type: "components:ui",
    files: ["registry/components/magicui/border-beam.tsx"],
  },
  "animated-beam": {
    name: "animated-beam",
    type: "components:ui",
    files: ["registry/components/magicui/animated-beam.tsx"],
  },
  "text-reveal": {
    name: "text-reveal",
    type: "components:ui",
    files: ["registry/components/magicui/text-reveal.tsx"],
  },
  "animated-gradient-text": {
    name: "animated-gradient-text",
    type: "components:ui",
    files: ["registry/components/magicui/animated-gradient-text.tsx"],
  },
  "orbiting-circles": {
    name: "orbiting-circles",
    type: "components:ui",
    files: ["registry/components/magicui/orbiting-circles.tsx"],
  },
};

const example: Registry = {
  "magic-card-demo": {
    name: "magic-card-demo",
    type: "components:example",
    files: ["registry/components/example/magic-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card-demo"),
    ),
  },
  "magic-card-gradient": {
    name: "magic-card-gradient",
    type: "components:example",
    files: ["registry/components/example/magic-card-gradient.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card-gradient"),
    ),
  },
  "linear-gradient-demo": {
    name: "linear-gradient-demo",
    type: "components:example",
    files: ["registry/components/example/linear-gradient-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/linear-gradient-demo"),
    ),
  },
  "radial-gradient-demo": {
    name: "radial-gradient-demo",
    type: "components:example",
    files: ["registry/components/example/radial-gradient-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/radial-gradient-demo"),
    ),
  },
  "meteors-demo": {
    name: "meteors-demo",
    type: "components:example",
    files: ["registry/components/example/meteors-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/meteors-demo"),
    ),
  },
  "grid-pattern-demo": {
    name: "grid-pattern-demo",
    type: "components:example",
    files: ["registry/components/example/grid-pattern-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/grid-pattern-demo"),
    ),
  },
  "grid-pattern-linear-gradient": {
    name: "grid-pattern-linear-gradient",
    type: "components:example",
    files: ["registry/components/example/grid-pattern-linear-gradient.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/grid-pattern-linear-gradient"),
    ),
  },
  "grid-pattern-dashed": {
    name: "grid-pattern-dashed",
    type: "components:example",
    files: ["registry/components/example/grid-pattern-dashed.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/grid-pattern-dashed"),
    ),
  },
  "dot-pattern-demo": {
    name: "dot-pattern-demo",
    type: "components:example",
    files: ["registry/components/example/dot-pattern-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/dot-pattern-demo"),
    ),
  },
  "dot-pattern-linear-gradient": {
    name: "dot-pattern-linear-gradient",
    type: "components:example",
    files: ["registry/components/example/dot-pattern-linear-gradient.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/dot-pattern-linear-gradient"),
    ),
  },
  "marquee-demo": {
    name: "marquee-demo",
    type: "components:example",
    files: ["registry/components/example/marquee-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-demo"),
    ),
  },
  "marquee-demo-vertical": {
    name: "marquee-demo-vertical",
    type: "components:example",
    files: ["registry/components/example/marquee-demo-vertical.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-demo-vertical"),
    ),
  },
  "marquee-logos": {
    name: "marquee-logos",
    type: "components:example",
    files: ["registry/components/example/marquee-logos.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-logos"),
    ),
  },
  "marquee-3d": {
    name: "marquee-3d",
    type: "components:example",
    files: ["registry/components/example/marquee-3d.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-3d"),
    ),
  },
  "globe-demo": {
    name: "globe-demo",
    type: "components:example",
    files: ["registry/components/example/globe-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/globe-demo"),
    ),
  },
  "tweet-card-demo": {
    name: "tweet-card-demo",
    type: "components:example",
    files: ["registry/components/example/tweet-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/tweet-card-demo"),
    ),
  },
  "tweet-card-images": {
    name: "tweet-card-images",
    type: "components:example",
    files: ["registry/components/example/tweet-card-images.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/tweet-card-images"),
    ),
  },
  "tweet-card-meta-preview": {
    name: "tweet-card-meta-preview",
    type: "components:example",
    files: ["registry/components/example/tweet-card-meta-preview.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/tweet-card-meta-preview"),
    ),
  },
  "shimmer-button-demo": {
    name: "shimmer-button-demo",
    type: "components:example",
    files: ["registry/components/example/shimmer-button-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/shimmer-button-demo"),
    ),
  },
  "hero-video-demo": {
    name: "hero-video-demo",
    type: "components:example",
    files: ["registry/components/example/hero-video-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/hero-video-demo"),
    ),
  },
  "hero-video-youtube": {
    name: "hero-video-youtube",
    type: "components:example",
    files: ["registry/components/example/hero-video-youtube.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/hero-video-youtube"),
    ),
  },
  "bento-demo": {
    name: "bento-demo",
    type: "components:example",
    files: ["registry/components/example/bento-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/bento-demo"),
    ),
  },
  "bento-demo-vertical": {
    name: "bento-demo-vertical",
    type: "components:example",
    files: ["registry/components/example/bento-demo-vertical.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/bento-demo-vertical"),
    ),
  },
  "number-ticker-demo": {
    name: "number-ticker-demo",
    type: "components:example",
    files: ["registry/components/example/number-ticker-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/number-ticker-demo"),
    ),
  },
  "ripple-demo": {
    name: "ripple-demo",
    type: "components:example",
    files: ["registry/components/example/ripple-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/ripple-demo"),
    ),
  },
  "retro-grid-demo": {
    name: "retro-grid-demo",
    type: "components:example",
    files: ["registry/components/example/retro-grid-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/retro-grid-demo"),
    ),
  },
  "animated-list-demo": {
    name: "animated-list-demo",
    type: "components:example",
    files: ["registry/components/example/animated-list-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-list-demo"),
    ),
  },
  "animated-lines-demo": {
    name: "animated-lines-demo",
    type: "components:example",
    files: ["registry/components/example/animated-lines-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-lines-demo"),
    ),
  },
  "animated-shiny-text-demo": {
    name: "animated-shiny-text-demo",
    type: "components:example",
    files: ["registry/components/example/animated-shiny-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-shiny-text-demo"),
    ),
  },
  "particles-demo": {
    name: "particles-demo",
    type: "components:example",
    files: ["registry/components/example/particles-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/particles-demo"),
    ),
  },
  "animated-grid-pattern-demo": {
    name: "animated-grid-pattern-demo",
    type: "components:example",
    files: ["registry/components/example/animated-grid-pattern-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-grid-pattern-demo"),
    ),
  },
  "border-beam-demo": {
    name: "border-beam-demo",
    type: "components:example",
    files: ["registry/components/example/border-beam-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/border-beam-demo"),
    ),
  },
  "animated-beam-demo": {
    name: "animated-beam-demo",
    type: "components:example",
    files: ["registry/components/example/animated-beam-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-beam-demo"),
    ),
  },
  "animated-beam-unidirectional": {
    name: "animated-beam-unidirectional",
    type: "components:example",
    files: ["registry/components/example/animated-beam-unidirectional.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/animated-beam-unidirectional"),
    ),
  },
  "animated-beam-bidirectional": {
    name: "animated-beam-bidirectional",
    type: "components:example",
    files: ["registry/components/example/animated-beam-bidirectional.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-beam-bidirectional"),
    ),
  },
  "animated-beam-multiple-inputs": {
    name: "animated-beam-multiple-inputs",
    type: "components:example",
    files: ["registry/components/example/animated-beam-multiple-inputs.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/animated-beam-multiple-inputs"),
    ),
  },
  "animated-beam-multiple-outputs": {
    name: "animated-beam-multiple-outputs",
    type: "components:example",
    files: ["registry/components/example/animated-beam-multiple-outputs.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/animated-beam-multiple-outputs"),
    ),
  },
  "animated-feature-card-1": {
    name: "animated-feature-card-1",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-1.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-1"),
    ),
  },
  "animated-feature-card-2": {
    name: "animated-feature-card-2",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-2.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-2"),
    ),
  },
  "animated-feature-card-3": {
    name: "animated-feature-card-3",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-3.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-3"),
    ),
  },
  "animated-feature-card-4": {
    name: "animated-feature-card-4",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-4.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-4"),
    ),
  },
  "animated-feature-card-5": {
    name: "animated-feature-card-5",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-5.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-5"),
    ),
  },
  "animated-feature-card-6": {
    name: "animated-feature-card-6",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-6.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-6"),
    ),
  },
  "animated-feature-card-7": {
    name: "animated-feature-card-7",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-7.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-7"),
    ),
  },
  "animated-feature-card-8": {
    name: "animated-feature-card-8",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-8.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-8"),
    ),
  },
  "animated-feature-card-9": {
    name: "animated-feature-card-9",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-9.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-9"),
    ),
  },
  "animated-feature-card-10": {
    name: "animated-feature-card-10",
    type: "components:example",
    files: ["registry/components/example/animated-feature-card-10.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-feature-card-10"),
    ),
  },
  "text-reveal-demo": {
    name: "text-reveal-demo",
    type: "components:example",
    files: ["registry/components/example/text-reveal-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/text-reveal-demo"),
    ),
  },
  "animated-gradient-text-demo": {
    name: "animated-gradient-text-demo",
    type: "components:example",
    files: ["registry/components/example/animated-gradient-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-gradient-text-demo"),
    ),
  },
  "orbiting-circles-demo": {
    name: "orbiting-circles-demo",
    type: "components:example",
    files: ["registry/components/example/orbiting-circles-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/orbiting-circles-demo"),
    ),
  },
};

const blocks: Registry = {
  "header-1": {
    name: "header-1",
    type: "blocks:example",
    files: ["registry/blocks/example/header-1.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/header-1")),
  },
  "header-2": {
    name: "header-2",
    type: "blocks:example",
    files: ["registry/blocks/example/header-2.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/header-2")),
  },

  "footer-1": {
    name: "footer-1",
    type: "blocks:example",
    files: ["registry/blocks/example/footer-1.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/footer-1")),
  },
  "footer-2": {
    name: "footer-2",
    type: "blocks:example",
    files: ["registry/blocks/example/footer-2.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/footer-2")),
  },
  "hero-1": {
    name: "hero-1",
    type: "blocks:example",
    files: ["registry/blocks/example/hero-1.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/hero-1")),
  },
  "hero-2": {
    name: "hero-2",
    type: "blocks:example",
    files: ["registry/blocks/example/hero-2.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/hero-2")),
  },
  "social-proof-press-1": {
    name: "social-proof-press-1",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-press-1.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-press-1"),
    ),
  },
  "social-proof-press-2": {
    name: "social-proof-press-2",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-press-2.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-press-2"),
    ),
  },
  "social-proof-press-3": {
    name: "social-proof-press-3",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-press-3.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-press-3"),
    ),
  },
  "social-proof-companies-1": {
    name: "social-proof-companies-1",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-companies-1.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-companies-1"),
    ),
  },
  "social-proof-companies-2": {
    name: "social-proof-companies-2",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-companies-2.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-companies-2"),
    ),
  },
  "social-proof-companies-3": {
    name: "social-proof-companies-3",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-companies-3.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-companies-3"),
    ),
  },
  "social-proof-companies-4": {
    name: "social-proof-companies-4",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-companies-4.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-companies-4"),
    ),
  },
  "social-proof-testimonials-1": {
    name: "social-proof-testimonials-1",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-testimonials-1.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-testimonials-1"),
    ),
  },
  "social-proof-testimonials-2": {
    name: "social-proof-testimonials-2",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-testimonials-2.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-testimonials-2"),
    ),
  },
  "social-proof-testimonials-3": {
    name: "social-proof-testimonials-3",
    type: "blocks:example",
    files: ["registry/blocks/example/social-proof-testimonials-3.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/social-proof-testimonials-3"),
    ),
  },
  "call-to-action-1": {
    name: "call-to-action-1",
    type: "blocks:example",
    files: ["registry/blocks/example/call-to-action-1.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/call-to-action-1"),
    ),
  },
  "call-to-action-2": {
    name: "call-to-action-2",
    type: "blocks:example",
    files: ["registry/blocks/example/call-to-action-2.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/call-to-action-2"),
    ),
  },
  "call-to-action-3": {
    name: "call-to-action-3",
    type: "blocks:example",
    files: ["registry/blocks/example/call-to-action-3.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/call-to-action-3"),
    ),
  },
  "call-to-action-4": {
    name: "call-to-action-4",
    type: "blocks:example",
    files: ["registry/blocks/example/call-to-action-4.tsx"],
    component: React.lazy(
      () => import("@/registry/blocks/example/call-to-action-4"),
    ),
  },
  "pricing-1": {
    name: "pricing-1",
    type: "blocks:example",
    files: ["registry/blocks/example/pricing-1.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/pricing-1")),
  },
  "pricing-2": {
    name: "pricing-2",
    type: "blocks:example",
    files: ["registry/blocks/example/pricing-2.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/pricing-2")),
  },
  "faq-1": {
    name: "faq-1",
    type: "blocks:example",
    files: ["registry/blocks/example/faq-1.tsx"],
    component: React.lazy(() => import("@/registry/blocks/example/faq-1")),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
  ...blocks,
};
