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
};

export const registry: Registry = {
  ...ui,
  ...example,
};
