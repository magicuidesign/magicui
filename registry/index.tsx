import * as React from "react";

import { Registry } from "@/registry/schema";

const ui: Registry = {
  "magic-card": {
    name: "magic-card",
    type: "components:magicui",
    files: ["registry/components/magicui/magic-card.tsx"],
  },
  "neon-gradient-card": {
    name: "neon-gradient-card",
    type: "components:magicui",
    files: ["registry/components/magicui/neon-gradient-card.tsx"],
  },
  meteors: {
    name: "meteors",
    type: "components:magicui",
    files: ["registry/components/magicui/meteors.tsx"],
  },
  "grid-pattern": {
    name: "grid-pattern",
    type: "components:magicui",
    files: ["registry/components/magicui/grid-pattern.tsx"],
  },
  "dot-pattern": {
    name: "dot-pattern",
    type: "components:magicui",
    files: ["registry/components/magicui/dot-pattern.tsx"],
  },
  "flickering-grid": {
    name: "flickering-grid",
    type: "components:magicui",
    files: ["registry/components/magicui/flickering-grid.tsx"],
  },
  "hero-video-dialog": {
    name: "hero-video-dialog",
    type: "components:magicui",
    files: ["registry/components/magicui/hero-video-dialog.tsx"],
  },
  marquee: {
    name: "marquee",
    type: "components:magicui",
    files: ["registry/components/magicui/marquee.tsx"],
  },
  globe: {
    name: "globe",
    type: "components:magicui",
    dependencies: ["cobe", "react-spring"],
    files: ["registry/components/magicui/globe.tsx"],
  },
  "shimmer-button": {
    name: "shimmer-button",
    type: "components:magicui",
    files: ["registry/components/magicui/shimmer-button.tsx"],
  },
  "tweet-card": {
    name: "tweet-card",
    type: "components:magicui",
    dependencies: ["react-tweet"],
    files: ["registry/components/magicui/tweet-card.tsx"],
  },
  "client-tweet-card": {
    name: "client-tweet-card",
    type: "components:magicui",
    dependencies: ["react-tweet"],
    files: ["registry/components/magicui/client-tweet-card.tsx"],
  },
  "bento-grid": {
    name: "bento-grid",
    type: "components:magicui",
    dependencies: ["@radix-ui/react-icons"],
    registryDependencies: ["shadcn:button"],
    files: ["registry/components/magicui/bento-grid.tsx"],
  },
  particles: {
    name: "particles",
    type: "components:magicui",
    files: ["registry/components/magicui/particles.tsx"],
  },
  "number-ticker": {
    name: "number-ticker",
    type: "components:magicui",
    files: ["registry/components/magicui/number-ticker.tsx"],
  },
  ripple: {
    name: "ripple",
    type: "components:magicui",
    files: ["registry/components/magicui/ripple.tsx"],
  },
  "retro-grid": {
    name: "retro-grid",
    type: "components:magicui",
    files: ["registry/components/magicui/retro-grid.tsx"],
  },
  "animated-list": {
    name: "animated-list",
    type: "components:magicui",
    files: ["registry/components/magicui/animated-list.tsx"],
  },
  "animated-shiny-text": {
    name: "animated-shiny-text",
    type: "components:magicui",
    files: ["registry/components/magicui/animated-shiny-text.tsx"],
  },
  "animated-grid-pattern": {
    name: "animated-grid-pattern",
    type: "components:magicui",
    files: ["registry/components/magicui/animated-grid-pattern.tsx"],
  },
  "border-beam": {
    name: "border-beam",
    type: "components:magicui",
    files: ["registry/components/magicui/border-beam.tsx"],
  },
  "animated-beam": {
    name: "animated-beam",
    type: "components:magicui",
    files: ["registry/components/magicui/animated-beam.tsx"],
  },
  "text-reveal": {
    name: "text-reveal",
    type: "components:magicui",
    files: ["registry/components/magicui/text-reveal.tsx"],
  },
  "hyper-text": {
    name: "hyper-text",
    type: "components:magicui",
    files: ["registry/components/magicui/hyper-text.tsx"],
  },
  "animated-gradient-text": {
    name: "animated-gradient-text",
    type: "components:magicui",
    files: ["registry/components/magicui/animated-gradient-text.tsx"],
  },
  "orbiting-circles": {
    name: "orbiting-circles",
    type: "components:magicui",
    files: ["registry/components/magicui/orbiting-circles.tsx"],
  },
  dock: {
    name: "dock",
    type: "components:magicui",
    files: ["registry/components/magicui/dock.tsx"],
  },
  "word-rotate": {
    name: "word-rotate",
    type: "components:magicui",
    files: ["registry/components/magicui/word-rotate.tsx"],
  },
  "avatar-circles": {
    name: "avatar-circles",
    type: "components:magicui",
    files: ["registry/components/magicui/avatar-circles.tsx"],
  },
  "word-pull-up": {
    name: "word-pull-up",
    type: "components:magicui",
    files: ["registry/components/magicui/word-pull-up.tsx"],
  },
  "typing-animation": {
    name: "typing-animation",
    type: "components:magicui",
    files: ["registry/components/magicui/typing-animation.tsx"],
  },
  "blur-in": {
    name: "blur-in",
    type: "components:magicui",
    files: ["registry/components/magicui/blur-in.tsx"],
  },
  "letter-pullup": {
    name: "letter-pullup",
    type: "components:magicui",
    files: ["registry/components/magicui/letter-pullup.tsx"],
  },
  "sparkles-text": {
    name: "sparkles-text",
    type: "components:magicui",
    files: ["registry/components/magicui/sparkles-text.tsx"],
  },
  "flip-text": {
    name: "flip-text",
    type: "components:magicui",
    files: ["registry/components/magicui/flip-text.tsx"],
  },
  "icon-cloud": {
    name: "icon-cloud",
    type: "components:magicui",
    dependencies: ["next-themes", "react-icon-cloud"],
    files: ["registry/components/magicui/icon-cloud.tsx"],
  },
  "gradual-spacing": {
    name: "gradual-spacing",
    type: "components:magicui",
    files: ["registry/components/magicui/gradual-spacing.tsx"],
  },
  "word-fade-in": {
    name: "word-fade-in",
    type: "components:magicui",
    files: ["registry/components/magicui/word-fade-in.tsx"],
  },
  "scroll-based-velocity": {
    name: "scroll-based-velocity",
    type: "components:magicui",
    files: ["registry/components/magicui/scroll-based-velocity.tsx"],
  },
  "fade-text": {
    name: "fade-text",
    type: "components:magicui",
    files: ["registry/components/magicui/fade-text.tsx"],
  },
  "shiny-button": {
    name: "shiny-button",
    type: "components:magicui",
    files: ["registry/components/magicui/shiny-button.tsx"],
  },
  "box-reveal": {
    name: "box-reveal",
    type: "components:magicui",
    files: ["registry/components/magicui/box-reveal.tsx"],
  },
  "shine-border": {
    name: "shine-border",
    type: "components:magicui",
    files: ["registry/components/magicui/shine-border.tsx"],
  },
  "animated-circular-progress-bar": {
    name: "animated-circular-progress-bar",
    type: "components:magicui",
    files: ["registry/components/magicui/animated-circular-progress-bar.tsx"],
  },
  confetti: {
    name: "confetti",
    type: "components:magicui",
    dependencies: ["canvas-confetti", "@types/canvas-confetti"],
    files: ["registry/components/magicui/confetti.tsx"],
  },
  "animated-subscribe-button": {
    name: "animated-subscribe-button",
    type: "components:magicui",
    files: ["registry/components/magicui/animated-subscribe-button.tsx"],
  },
  "cool-mode": {
    name: "cool-mode",
    type: "components:magicui",
    files: ["registry/components/magicui/cool-mode.tsx"],
  },
  "pulsating-button": {
    name: "pulsating-button",
    type: "components:magicui",
    files: ["registry/components/magicui/pulsating-button.tsx"],
  },
  "file-tree": {
    name: "file-tree",
    type: "components:magicui",
    files: ["registry/components/magicui/file-tree.tsx"],
  },
  "blur-fade": {
    name: "blur-fade",
    type: "components:magicui",
    files: ["registry/components/magicui/blur-fade.tsx"],
  },
  safari: {
    name: "safari",
    type: "components:magicui",
    files: ["registry/components/magicui/safari.tsx"],
  },
  "iphone-15-pro": {
    name: "iphone-15-pro",
    type: "components:magicui",
    files: ["registry/components/magicui/iphone-15-pro.tsx"],
  },
};

const example: Registry = {
  "magic-card-demo": {
    name: "magic-card-demo",
    type: "components:example",
    registryDependencies: ["magic-card"],
    files: ["registry/components/example/magic-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card-demo"),
    ),
  },
  "neon-gradient-card-demo": {
    name: "neon-gradient-card-demo",
    type: "components:example",
    files: ["registry/components/example/neon-gradient-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/neon-gradient-card-demo"),
    ),
  },
  "meteors-demo": {
    name: "meteors-demo",
    type: "components:example",
    registryDependencies: ["meteors"],
    files: ["registry/components/example/meteors-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/meteors-demo"),
    ),
  },
  "grid-pattern-demo": {
    name: "grid-pattern-demo",
    type: "components:example",
    registryDependencies: ["grid-pattern"],
    files: ["registry/components/example/grid-pattern-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/grid-pattern-demo"),
    ),
  },
  "grid-pattern-linear-gradient": {
    name: "grid-pattern-linear-gradient",
    type: "components:example",
    registryDependencies: ["grid-pattern"],
    files: ["registry/components/example/grid-pattern-linear-gradient.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/grid-pattern-linear-gradient"),
    ),
  },
  "grid-pattern-dashed": {
    name: "grid-pattern-dashed",
    type: "components:example",
    registryDependencies: ["grid-pattern"],
    files: ["registry/components/example/grid-pattern-dashed.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/grid-pattern-dashed"),
    ),
  },
  "dot-pattern-demo": {
    name: "dot-pattern-demo",
    type: "components:example",
    registryDependencies: ["dot-pattern"],
    files: ["registry/components/example/dot-pattern-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/dot-pattern-demo"),
    ),
  },
  "dot-pattern-linear-gradient": {
    name: "dot-pattern-linear-gradient",
    type: "components:example",
    registryDependencies: ["dot-pattern"],
    files: ["registry/components/example/dot-pattern-linear-gradient.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/dot-pattern-linear-gradient"),
    ),
  },
  "flickering-grid-demo": {
    name: "flickering-grid-demo",
    type: "components:example",
    files: ["registry/components/example/flickering-grid-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/flickering-grid-demo"),
    ),
  },
  "flickering-grid-rounded-demo": {
    name: "flickering-grid-rounded-demo",
    type: "components:example",
    files: ["registry/components/example/flickering-grid-rounded-demo.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/flickering-grid-rounded-demo"),
    ),
  },
  "hero-video-dialog-demo": {
    name: "hero-video-dialog-demo",
    type: "components:example",
    files: ["registry/components/example/hero-video-dialog-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/hero-video-dialog-demo"),
    ),
  },
  "hero-video-dialog-demo-top-in-bottom-out": {
    name: "hero-video-dialog-demo-top-in-bottom-out",
    type: "components:example",
    files: [
      "registry/components/example/hero-video-dialog-demo-top-in-bottom-out.tsx",
    ],
    component: React.lazy(
      () =>
        import(
          "@/registry/components/example/hero-video-dialog-demo-top-in-bottom-out"
        ),
    ),
  },
  "marquee-demo": {
    name: "marquee-demo",
    type: "components:example",
    registryDependencies: ["marquee"],
    files: ["registry/components/example/marquee-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-demo"),
    ),
  },
  "marquee-demo-vertical": {
    name: "marquee-demo-vertical",
    type: "components:example",
    registryDependencies: ["marquee"],
    files: ["registry/components/example/marquee-demo-vertical.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-demo-vertical"),
    ),
  },
  "marquee-logos": {
    name: "marquee-logos",
    type: "components:example",
    registryDependencies: ["marquee"],
    files: ["registry/components/example/marquee-logos.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-logos"),
    ),
  },
  "marquee-3d": {
    name: "marquee-3d",
    type: "components:example",
    registryDependencies: ["marquee"],
    files: ["registry/components/example/marquee-3d.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/marquee-3d"),
    ),
  },
  "globe-demo": {
    name: "globe-demo",
    type: "components:example",
    registryDependencies: ["globe"],
    files: ["registry/components/example/globe-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/globe-demo"),
    ),
  },
  "tweet-card-demo": {
    name: "tweet-card-demo",
    type: "components:example",
    registryDependencies: ["tweet-card"],
    files: ["registry/components/example/tweet-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/tweet-card-demo"),
    ),
  },
  "tweet-card-images": {
    name: "tweet-card-images",
    type: "components:example",
    registryDependencies: ["tweet-card"],
    files: ["registry/components/example/tweet-card-images.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/tweet-card-images"),
    ),
  },
  "tweet-card-meta-preview": {
    name: "tweet-card-meta-preview",
    type: "components:example",
    registryDependencies: ["tweet-card"],
    files: ["registry/components/example/tweet-card-meta-preview.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/tweet-card-meta-preview"),
    ),
  },
  "shimmer-button-demo": {
    name: "shimmer-button-demo",
    type: "components:example",
    registryDependencies: ["shimmer-button"],
    files: ["registry/components/example/shimmer-button-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/shimmer-button-demo"),
    ),
  },
  "bento-demo": {
    name: "bento-demo",
    type: "components:example",
    registryDependencies: [
      "bento-grid",
      "marquee",
      "globe",
      "shadcn:command",
      "shadcn:calendar",
    ],
    dependencies: ["@radix-ui/react-icons"],
    files: ["registry/components/example/bento-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/bento-demo"),
    ),
  },
  "bento-demo-vertical": {
    name: "bento-demo-vertical",
    type: "components:example",
    registryDependencies: ["bento-grid"],
    dependencies: ["@radix-ui/react-icons"],
    files: ["registry/components/example/bento-demo-vertical.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/bento-demo-vertical"),
    ),
  },
  "number-ticker-demo": {
    name: "number-ticker-demo",
    type: "components:example",
    registryDependencies: ["number-ticker"],
    files: ["registry/components/example/number-ticker-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/number-ticker-demo"),
    ),
  },
  "ripple-demo": {
    name: "ripple-demo",
    type: "components:example",
    registryDependencies: ["ripple"],
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
    registryDependencies: ["animated-list"],
    files: ["registry/components/example/animated-list-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-list-demo"),
    ),
  },
  "animated-shiny-text-demo": {
    name: "animated-shiny-text-demo",
    type: "components:example",
    registryDependencies: ["animated-shiny-text"],
    dependencies: ["@radix-ui/react-icons"],
    files: ["registry/components/example/animated-shiny-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-shiny-text-demo"),
    ),
  },
  "particles-demo": {
    name: "particles-demo",
    type: "components:example",
    registryDependencies: ["particles"],
    dependencies: ["next-themes"],
    files: ["registry/components/example/particles-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/particles-demo"),
    ),
  },
  "animated-grid-pattern-demo": {
    name: "animated-grid-pattern-demo",
    type: "components:example",
    registryDependencies: ["animated-grid-pattern"],
    files: ["registry/components/example/animated-grid-pattern-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-grid-pattern-demo"),
    ),
  },
  "border-beam-demo": {
    name: "border-beam-demo",
    type: "components:example",
    registryDependencies: ["border-beam"],
    files: ["registry/components/example/border-beam-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/border-beam-demo"),
    ),
  },
  "animated-beam-demo": {
    name: "animated-beam-demo",
    type: "components:example",
    registryDependencies: ["animated-beam"],
    dependencies: ["@radix-ui/react-icons"],
    files: ["registry/components/example/animated-beam-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-beam-demo"),
    ),
  },
  "animated-beam-unidirectional": {
    name: "animated-beam-unidirectional",
    type: "components:example",
    registryDependencies: ["animated-beam"],
    files: ["registry/components/example/animated-beam-unidirectional.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/animated-beam-unidirectional"),
    ),
  },
  "animated-beam-bidirectional": {
    name: "animated-beam-bidirectional",
    type: "components:example",
    registryDependencies: ["animated-beam"],
    files: ["registry/components/example/animated-beam-bidirectional.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-beam-bidirectional"),
    ),
  },
  "animated-beam-multiple-inputs": {
    name: "animated-beam-multiple-inputs",
    type: "components:example",
    registryDependencies: ["animated-beam"],
    files: ["registry/components/example/animated-beam-multiple-inputs.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/animated-beam-multiple-inputs"),
    ),
  },
  "animated-beam-multiple-outputs": {
    name: "animated-beam-multiple-outputs",
    type: "components:example",
    registryDependencies: ["animated-beam"],
    files: ["registry/components/example/animated-beam-multiple-outputs.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/animated-beam-multiple-outputs"),
    ),
  },
  "text-reveal-demo": {
    name: "text-reveal-demo",
    type: "components:example",
    registryDependencies: ["text-reveal"],
    files: ["registry/components/example/text-reveal-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/text-reveal-demo"),
    ),
  },
  "animated-gradient-text-demo": {
    name: "animated-gradient-text-demo",
    type: "components:example",
    registryDependencies: ["animated-gradient-text"],
    dependencies: ["lucide-react"],
    files: ["registry/components/example/animated-gradient-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/animated-gradient-text-demo"),
    ),
  },
  "orbiting-circles-demo": {
    name: "orbiting-circles-demo",
    type: "components:example",
    registryDependencies: ["orbiting-circles"],
    dependencies: ["@radix-ui/react-icons"],
    files: ["registry/components/example/orbiting-circles-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/orbiting-circles-demo"),
    ),
  },
  "dock-demo": {
    name: "dock-demo",
    type: "components:example",
    registryDependencies: ["dock"],
    files: ["registry/components/example/dock-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/dock-demo"),
    ),
  },
  "dock-demo-2": {
    name: "dock-demo-2",
    type: "components:example",
    registryDependencies: ["dock"],
    files: ["registry/components/example/dock-demo-2.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/dock-demo-2"),
    ),
  },
  "dock-demo-3": {
    name: "dock-demo-3",
    type: "components:example",
    registryDependencies: ["dock"],
    files: ["registry/components/example/dock-demo-3.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/dock-demo-3"),
    ),
  },
  "word-rotate-demo": {
    name: "word-rotate-demo",
    type: "components:example",
    registryDependencies: ["word-rotate"],
    files: ["registry/components/example/word-rotate-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/word-rotate-demo"),
    ),
  },
  "hyper-text-demo": {
    name: "hyper-text-demo",
    type: "components:example",
    registryDependencies: ["hyper-text"],
    files: ["registry/components/example/hyper-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/hyper-text-demo"),
    ),
  },
  "avatar-circles-demo": {
    name: "avatar-circles-demo",
    type: "components:example",
    registryDependencies: ["avatar-circles"],
    files: ["registry/components/example/avatar-circles-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/avatar-circles-demo"),
    ),
  },
  "word-pull-up-demo": {
    name: "word-pull-up-demo",
    type: "components:example",
    registryDependencies: ["word-pull-up"],
    files: ["registry/components/example/word-pull-up-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/word-pull-up-demo"),
    ),
  },
  "typing-animation-demo": {
    name: "typing-animation-demo",
    type: "components:example",
    registryDependencies: ["typing-animation"],
    files: ["registry/components/example/typing-animation-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/typing-animation-demo"),
    ),
  },
  "blur-in-demo": {
    name: "blur-in-demo",
    type: "components:example",
    registryDependencies: ["blur-in"],
    files: ["registry/components/example/blur-in-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/blur-in-demo"),
    ),
  },
  "scroll-based-velocity-demo": {
    name: "scroll-based-velocity-demo",
    type: "components:example",
    registryDependencies: ["scroll-based-velocity"],
    files: ["registry/components/example/scroll-based-velocity-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/scroll-based-velocity-demo"),
    ),
  },
  "letter-pullup-demo": {
    name: "letter-pullup-demo",
    type: "components:example",
    registryDependencies: ["letter-pullup"],
    files: ["registry/components/example/letter-pullup-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/letter-pullup-demo"),
    ),
  },
  "flip-text-demo": {
    name: "flip-text-demo",
    type: "components:example",
    registryDependencies: ["flip-text"],
    files: ["registry/components/example/flip-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/flip-text-demo"),
    ),
  },
  "sparkles-text-demo": {
    name: "sparkles-text-demo",
    type: "components:example",
    files: ["registry/components/example/sparkles-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/sparkles-text-demo"),
    ),
  },
  "icon-cloud-demo": {
    name: "icon-cloud-demo",
    type: "components:example",
    registryDependencies: ["icon-cloud"],
    files: ["registry/components/example/icon-cloud-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/icon-cloud-demo"),
    ),
  },
  "wavy-dot-pattern-demo": {
    name: "wavy-dot-pattern-demo",
    type: "components:example",
    files: ["registry/components/example/wavy-dot-pattern-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/wavy-dot-pattern-demo"),
    ),
  },
  "gradual-spacing-demo": {
    name: "gradual-spacing-demo",
    type: "components:example",
    files: ["registry/components/example/gradual-spacing-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/gradual-spacing-demo"),
    ),
  },
  "word-fade-in-demo": {
    name: "word-fade-in-demo",
    type: "components:example",
    files: ["registry/components/example/word-fade-in-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/word-fade-in-demo"),
    ),
  },
  "fade-text-demo": {
    name: "fade-text-demo",
    type: "components:example",
    files: ["registry/components/example/fade-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/fade-text-demo"),
    ),
  },
  "shiny-button-demo": {
    name: "shiny-button-demo",
    type: "components:example",
    files: ["registry/components/example/shiny-button-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/shiny-button-demo"),
    ),
  },
  "box-reveal-demo": {
    name: "box-reveal-demo",
    type: "components:example",
    files: ["registry/components/example/box-reveal-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/box-reveal-demo"),
    ),
  },
  "animated-circular-progress-bar-demo": {
    name: "animated-circular-progress-bar-demo",
    type: "components:example",
    files: [
      "registry/components/example/animated-circular-progress-bar-demo.tsx",
    ],
    component: React.lazy(
      () =>
        import(
          "@/registry/components/example/animated-circular-progress-bar-demo"
        ),
    ),
  },
  "shine-border-demo": {
    name: "shine-border-demo",
    type: "components:example",
    files: ["registry/components/example/shine-border-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/shine-border-demo"),
    ),
  },
  "shine-border-demo-2": {
    name: "shine-border-demo-2",
    type: "components:example",
    files: ["registry/components/example/shine-border-demo-2.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/shine-border-demo-2"),
    ),
  },
  "confetti-demo": {
    name: "confetti-demo",
    type: "components:example",
    files: ["registry/components/example/confetti-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/confetti-demo"),
    ),
  },
  "confetti-basic-cannon": {
    name: "confetti-basic-cannon",
    type: "components:example",
    files: ["registry/components/example/confetti-basic-cannon.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/confetti-basic-cannon"),
    ),
  },
  "confetti-random-direction": {
    name: "confetti-random-direction",
    type: "components:example",
    files: ["registry/components/example/confetti-random-direction.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/confetti-random-direction"),
    ),
  },
  "confetti-fireworks": {
    name: "confetti-fireworks",
    type: "components:example",
    files: ["registry/components/example/confetti-fireworks.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/confetti-fireworks"),
    ),
  },
  "confetti-stars": {
    name: "confetti-stars",
    type: "components:example",
    files: ["registry/components/example/confetti-stars.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/confetti-stars"),
    ),
  },
  "confetti-side-cannons": {
    name: "confetti-side-cannons",
    type: "components:example",
    files: ["registry/components/example/confetti-side-cannons.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/confetti-side-cannons"),
    ),
  },
  "confetti-custom-shapes": {
    name: "confetti-custom-shapes",
    type: "components:example",
    files: ["registry/components/example/confetti-custom-shapes.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/confetti-custom-shapes"),
    ),
  },
  "confetti-emoji": {
    name: "confetti-emoji",
    type: "components:example",
    files: ["registry/components/example/confetti-emoji.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/confetti-emoji"),
    ),
  },
  "animated-subscribe-button-demo": {
    name: "animated-subscribe-button-demo",
    type: "components:example",
    files: ["registry/components/example/animated-subscribe-button-demo.tsx"],
    component: React.lazy(
      () =>
        import("@/registry/components/example/animated-subscribe-button-demo"),
    ),
  },
  "cool-mode-demo": {
    name: "cool-mode-demo",
    type: "components:example",
    files: ["registry/components/example/cool-mode-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/cool-mode-demo"),
    ),
  },
  "cool-mode-custom": {
    name: "cool-mode-custom",
    type: "components:example",
    files: ["registry/components/example/cool-mode-custom.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/cool-mode-custom"),
    ),
  },
  "pulsating-button-demo": {
    name: "pulsating-button-demo",
    type: "components:example",
    files: ["registry/components/example/pulsating-button-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/pulsating-button-demo"),
    ),
  },
  "file-tree-demo": {
    name: "file-tree-demo",
    type: "components:example",
    files: ["registry/components/example/file-tree-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/file-tree-demo"),
    ),
  },
  "blur-fade-demo": {
    name: "blur-fade-demo",
    type: "components:example",
    files: ["registry/components/example/blur-fade-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/blur-fade-demo"),
    ),
  },
  "blur-fade-text-demo": {
    name: "blur-fade-text-demo",
    type: "components:example",
    files: ["registry/components/example/blur-fade-text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/blur-fade-text-demo"),
    ),
  },
  "safari-demo": {
    name: "safari-demo",
    type: "components:example",
    files: ["registry/components/example/safari-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/safari-demo"),
    ),
  },
  "safari-demo-2": {
    name: "safari-demo-2",
    type: "components:example",
    files: ["registry/components/example/safari-demo-2.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/safari-demo-2"),
    ),
  },
  "iphone-15-pro-demo": {
    name: "iphone-15-pro-demo",
    type: "components:example",
    files: ["registry/components/example/iphone-15-pro-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/iphone-15-pro-demo"),
    ),
  },
  "iphone-15-pro-demo-2": {
    name: "iphone-15-pro-demo-2",
    type: "components:example",
    files: ["registry/components/example/iphone-15-pro-demo-2.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/iphone-15-pro-demo-2"),
    ),
  },
};
export const registry: Registry = {
  ...ui,
  ...example,
};

const resolvedExamples = Object.entries(example).map(([key, value]) => ({
  ...value,
  component: () => void 0,
}));
const updatedExample: Registry = resolvedExamples.reduce(
  (acc, curr) => ({ ...acc, [curr.name]: curr }),
  {},
);
export const downloadRegistry: Registry = { ...ui, ...updatedExample };

export type ComponentName = keyof (typeof ui & typeof example);
