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
  "tweet-card": {
    name: "tweet-card",
    type: "components:ui",
    files: ["registry/components/magicui/tweet-card.tsx"],
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
  "marquee-logos": {
    name: "marquee-logos",
    type: "components:example",
    files: ["registry/components/example/marquee-logos.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-logos"),
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
};

export const registry: Registry = {
  ...ui,
  ...example,
};
