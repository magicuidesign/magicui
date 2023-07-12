import { Registry } from "@/registry/schema";
import * as React from "react";

const ui: Registry = {
  "magic-card": {
    name: "magic-card",
    type: "components:ui",
    files: ["registry/components/magicui/magic-card.tsx"],
    component: React.lazy(
      () => import("@/registry/components/magicui/magic-card")
    ),
  },
  "linear-gradient": {
    name: "linear-gradient",
    type: "components:ui",
    files: ["registry/components/magicui/linear-gradient.tsx"],
    component: React.lazy(
      () => import("@/registry/components/magicui/linear-gradient")
    ),
  },
  "radial-gradient": {
    name: "radial-gradient",
    type: "components:ui",
    files: ["registry/components/magicui/radial-gradient.tsx"],
    component: React.lazy(
      () => import("@/registry/components/magicui/radial-gradient")
    ),
  },
};

const example: Registry = {
  "magic-card-demo": {
    name: "magic-card-demo",
    type: "components:example",
    files: ["registry/components/example/magic-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card-demo")
    ),
  },
  "linear-gradient-demo": {
    name: "linear-gradient-demo",
    type: "components:example",
    files: ["registry/components/example/linear-gradient-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/linear-gradient-demo")
    ),
  },
  "radial-gradient-demo": {
    name: "radial-gradient-demo",
    type: "components:example",
    files: ["registry/components/example/radial-gradient-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/radial-gradient-demo")
    ),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
};
