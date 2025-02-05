import { type Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "magic-card-demo",
    type: "registry:example",
    registryDependencies: ["magic-card"],
    files: [{ path: "example/magic-card-demo.tsx", type: "registry:example" }],
  },
  {
    name: "android-demo",
    type: "registry:example",
    registryDependencies: ["android"],
    files: [{ path: "example/android-demo.tsx", type: "registry:example" }],
  },
  {
    name: "android-demo-2",
    type: "registry:example",
    registryDependencies: ["android"],
    files: [{ path: "example/android-demo-2.tsx", type: "registry:example" }],
  },
  {
    name: "android-demo-3",
    type: "registry:example",
    registryDependencies: ["android"],
    files: [{ path: "example/android-demo-3.tsx", type: "registry:example" }],
  },
  {
    name: "warp-background-demo",
    type: "registry:example",
    registryDependencies: ["warp-background"],
    files: [
      { path: "example/warp-background-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "line-shadow-text-demo",
    type: "registry:example",
    registryDependencies: ["line-shadow-text"],
    files: [
      { path: "example/line-shadow-text-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "aurora-text-demo",
    type: "registry:example",
    registryDependencies: ["aurora-text"],
    files: [{ path: "example/aurora-text-demo.tsx", type: "registry:example" }],
  },
  {
    name: "morphing-text-demo",
    type: "registry:example",
    registryDependencies: ["morphing-text"],
    files: [
      { path: "example/morphing-text-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "scroll-progress-demo",
    type: "registry:example",
    registryDependencies: ["scroll-progress"],
    files: [
      { path: "example/scroll-progress-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "neon-gradient-card-demo",
    type: "registry:example",
    files: [
      { path: "example/neon-gradient-card-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "meteors-demo",
    type: "registry:example",
    registryDependencies: ["meteors"],
    files: [{ path: "example/meteors-demo.tsx", type: "registry:example" }],
  },
  {
    name: "grid-pattern-demo",
    type: "registry:example",
    registryDependencies: ["grid-pattern"],
    files: [
      { path: "example/grid-pattern-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "grid-pattern-linear-gradient",
    type: "registry:example",
    registryDependencies: ["grid-pattern"],
    files: [
      {
        path: "example/grid-pattern-linear-gradient.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "grid-pattern-dashed",
    type: "registry:example",
    registryDependencies: ["grid-pattern"],
    files: [
      { path: "example/grid-pattern-dashed.tsx", type: "registry:example" },
    ],
  },
  {
    name: "dot-pattern-demo",
    type: "registry:example",
    registryDependencies: ["dot-pattern"],
    files: [{ path: "example/dot-pattern-demo.tsx", type: "registry:example" }],
  },
  {
    name: "dot-pattern-linear-gradient",
    type: "registry:example",
    registryDependencies: ["dot-pattern"],
    files: [
      {
        path: "example/dot-pattern-linear-gradient.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "flickering-grid-demo",
    type: "registry:example",
    files: [
      { path: "example/flickering-grid-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "flickering-grid-rounded-demo",
    type: "registry:example",
    files: [
      {
        path: "example/flickering-grid-rounded-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "hero-video-dialog-demo",
    type: "registry:example",
    files: [
      { path: "example/hero-video-dialog-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "hero-video-dialog-demo-top-in-bottom-out",
    type: "registry:example",
    files: [
      {
        path: "example/hero-video-dialog-demo-top-in-bottom-out.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "code-comparison-demo",
    type: "registry:example",
    files: [
      { path: "example/code-comparison-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "script-copy-btn-demo",
    type: "registry:example",
    files: [
      { path: "example/script-copy-btn-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "marquee-demo",
    type: "registry:example",
    registryDependencies: ["marquee"],
    files: [{ path: "example/marquee-demo.tsx", type: "registry:example" }],
  },
  {
    name: "marquee-demo-vertical",
    type: "registry:example",
    registryDependencies: ["marquee"],
    files: [
      { path: "example/marquee-demo-vertical.tsx", type: "registry:example" },
    ],
  },
  {
    name: "marquee-logos",
    type: "registry:example",
    registryDependencies: ["marquee"],
    files: [{ path: "example/marquee-logos.tsx", type: "registry:example" }],
  },
  {
    name: "marquee-3d",
    type: "registry:example",
    registryDependencies: ["marquee"],
    files: [{ path: "example/marquee-3d.tsx", type: "registry:example" }],
  },
  {
    name: "globe-demo",
    type: "registry:example",
    registryDependencies: ["globe"],
    files: [{ path: "example/globe-demo.tsx", type: "registry:example" }],
  },
  {
    name: "tweet-card-demo",
    type: "registry:example",
    registryDependencies: ["tweet-card"],
    files: [{ path: "example/tweet-card-demo.tsx", type: "registry:example" }],
  },
  {
    name: "tweet-card-images",
    type: "registry:example",
    registryDependencies: ["tweet-card"],
    files: [
      { path: "example/tweet-card-images.tsx", type: "registry:example" },
    ],
  },
  {
    name: "tweet-card-meta-preview",
    type: "registry:example",
    registryDependencies: ["tweet-card"],
    files: [
      { path: "example/tweet-card-meta-preview.tsx", type: "registry:example" },
    ],
  },
  {
    name: "shimmer-button-demo",
    type: "registry:example",
    registryDependencies: ["shimmer-button"],
    files: [
      { path: "example/shimmer-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "bento-demo",
    type: "registry:example",
    registryDependencies: [
      "bento-grid",
      "marquee",
      "animated-list-demo",
      "animated-beam-multiple-outputs",
      "shadcn:command",
      "shadcn:calendar",
    ],
    dependencies: ["@radix-ui/react-icons"],
    files: [{ path: "example/bento-demo.tsx", type: "registry:example" }],
  },
  {
    name: "bento-demo-vertical",
    type: "registry:example",
    registryDependencies: ["bento-grid"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      { path: "example/bento-demo-vertical.tsx", type: "registry:example" },
    ],
  },
  {
    name: "number-ticker-demo",
    type: "registry:example",
    registryDependencies: ["number-ticker"],
    files: [
      { path: "example/number-ticker-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "number-ticker-decimal-demo",
    type: "registry:example",
    registryDependencies: ["number-ticker"],
    files: [
      {
        path: "example/number-ticker-decimal-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "ripple-demo",
    type: "registry:example",
    registryDependencies: ["ripple"],
    files: [{ path: "example/ripple-demo.tsx", type: "registry:example" }],
  },
  {
    name: "retro-grid-demo",
    type: "registry:example",
    files: [{ path: "example/retro-grid-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-list-demo",
    type: "registry:example",
    registryDependencies: ["animated-list"],
    files: [
      { path: "example/animated-list-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "animated-shiny-text-demo",
    type: "registry:example",
    registryDependencies: ["animated-shiny-text"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "example/animated-shiny-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "particles-demo",
    type: "registry:example",
    registryDependencies: ["particles"],
    dependencies: ["next-themes"],
    files: [{ path: "example/particles-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-grid-pattern-demo",
    type: "registry:example",
    registryDependencies: ["animated-grid-pattern"],
    files: [
      {
        path: "example/animated-grid-pattern-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "interactive-grid-pattern-demo",
    type: "registry:example",
    registryDependencies: ["interactive-grid-pattern"],
    files: [
      {
        path: "example/interactive-grid-pattern-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "interactive-grid-pattern-demo-2",
    type: "registry:example",
    registryDependencies: ["interactive-grid-pattern"],
    files: [
      {
        path: "example/interactive-grid-pattern-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "border-beam-demo",
    type: "registry:example",
    registryDependencies: ["border-beam"],
    files: [{ path: "example/border-beam-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-beam-demo",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      { path: "example/animated-beam-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "animated-beam-unidirectional",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    files: [
      {
        path: "example/animated-beam-unidirectional.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-beam-bidirectional",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    files: [
      {
        path: "example/animated-beam-bidirectional.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-beam-multiple-inputs",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    files: [
      {
        path: "example/animated-beam-multiple-inputs.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-beam-multiple-outputs",
    type: "registry:example",
    registryDependencies: ["animated-beam"],
    files: [
      {
        path: "example/animated-beam-multiple-outputs.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-reveal-demo",
    type: "registry:example",
    registryDependencies: ["text-reveal"],
    files: [{ path: "example/text-reveal-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-gradient-text-demo",
    type: "registry:example",
    registryDependencies: ["animated-gradient-text"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "example/animated-gradient-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "orbiting-circles-demo",
    type: "registry:example",
    registryDependencies: ["orbiting-circles"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      { path: "example/orbiting-circles-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "dock-demo",
    type: "registry:example",
    registryDependencies: ["dock"],
    files: [{ path: "example/dock-demo.tsx", type: "registry:example" }],
  },
  {
    name: "dock-demo-2",
    type: "registry:example",
    registryDependencies: ["dock"],
    files: [{ path: "example/dock-demo-2.tsx", type: "registry:example" }],
  },
  {
    name: "dock-demo-3",
    type: "registry:example",
    registryDependencies: ["dock"],
    files: [{ path: "example/dock-demo-3.tsx", type: "registry:example" }],
  },
  {
    name: "word-rotate-demo",
    type: "registry:example",
    registryDependencies: ["word-rotate"],
    files: [{ path: "example/word-rotate-demo.tsx", type: "registry:example" }],
  },
  {
    name: "hyper-text-demo",
    type: "registry:example",
    registryDependencies: ["hyper-text"],
    files: [{ path: "example/hyper-text-demo.tsx", type: "registry:example" }],
  },
  {
    name: "avatar-circles-demo",
    type: "registry:example",
    registryDependencies: ["avatar-circles"],
    files: [
      { path: "example/avatar-circles-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "typing-animation-demo",
    type: "registry:example",
    registryDependencies: ["typing-animation"],
    files: [
      { path: "example/typing-animation-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "scroll-based-velocity-demo",
    type: "registry:example",
    registryDependencies: ["scroll-based-velocity"],
    files: [
      {
        path: "example/scroll-based-velocity-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "scratch-to-reveal-demo",
    type: "registry:example",
    registryDependencies: ["scratch-to-reveal"],
    files: [
      { path: "example/scratch-to-reveal-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "flip-text-demo",
    type: "registry:example",
    registryDependencies: ["flip-text"],
    files: [{ path: "example/flip-text-demo.tsx", type: "registry:example" }],
  },
  {
    name: "sparkles-text-demo",
    type: "registry:example",
    files: [
      { path: "example/sparkles-text-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "icon-cloud-demo",
    type: "registry:example",
    registryDependencies: ["icon-cloud"],
    files: [{ path: "example/icon-cloud-demo.tsx", type: "registry:example" }],
  },
  {
    name: "icon-cloud-demo-2",
    type: "registry:example",
    registryDependencies: ["icon-cloud"],
    files: [
      { path: "example/icon-cloud-demo-2.tsx", type: "registry:example" },
    ],
  },
  {
    name: "icon-cloud-demo-3",
    type: "registry:example",
    registryDependencies: ["icon-cloud"],
    files: [
      { path: "example/icon-cloud-demo-3.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo",
    type: "registry:example",
    files: [
      { path: "example/text-animate-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-2",
    type: "registry:example",
    files: [
      { path: "example/text-animate-demo-2.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-3",
    type: "registry:example",
    files: [
      { path: "example/text-animate-demo-3.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-4",
    type: "registry:example",
    files: [
      { path: "example/text-animate-demo-4.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-5",
    type: "registry:example",
    files: [
      { path: "example/text-animate-demo-5.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-6",
    type: "registry:example",
    files: [
      { path: "example/text-animate-demo-6.tsx", type: "registry:example" },
    ],
  },
  {
    name: "shiny-button-demo",
    type: "registry:example",
    files: [
      { path: "example/shiny-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "box-reveal-demo",
    type: "registry:example",
    files: [{ path: "example/box-reveal-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-circular-progress-bar-demo",
    type: "registry:example",
    files: [
      {
        path: "example/animated-circular-progress-bar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "shine-border-demo",
    type: "registry:example",
    files: [
      { path: "example/shine-border-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "shine-border-demo-2",
    type: "registry:example",
    files: [
      { path: "example/shine-border-demo-2.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-demo",
    type: "registry:example",
    files: [{ path: "example/confetti-demo.tsx", type: "registry:example" }],
  },
  {
    name: "confetti-basic-cannon",
    type: "registry:example",
    files: [
      { path: "example/confetti-basic-cannon.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-random-direction",
    type: "registry:example",
    files: [
      {
        path: "example/confetti-random-direction.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "confetti-fireworks",
    type: "registry:example",
    files: [
      { path: "example/confetti-fireworks.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-stars",
    type: "registry:example",
    files: [{ path: "example/confetti-stars.tsx", type: "registry:example" }],
  },
  {
    name: "confetti-side-cannons",
    type: "registry:example",
    files: [
      { path: "example/confetti-side-cannons.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-custom-shapes",
    type: "registry:example",
    files: [
      { path: "example/confetti-custom-shapes.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-emoji",
    type: "registry:example",
    files: [{ path: "example/confetti-emoji.tsx", type: "registry:example" }],
  },
  {
    name: "animated-subscribe-button-demo",
    type: "registry:example",
    files: [
      {
        path: "example/animated-subscribe-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "cool-mode-demo",
    type: "registry:example",
    files: [{ path: "example/cool-mode-demo.tsx", type: "registry:example" }],
  },
  {
    name: "cool-mode-custom",
    type: "registry:example",
    files: [{ path: "example/cool-mode-custom.tsx", type: "registry:example" }],
  },
  {
    name: "pulsating-button-demo",
    type: "registry:example",
    files: [
      { path: "example/pulsating-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "ripple-button-demo",
    type: "registry:example",
    files: [
      { path: "example/ripple-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "file-tree-demo",
    type: "registry:example",
    files: [{ path: "example/file-tree-demo.tsx", type: "registry:example" }],
  },
  {
    name: "blur-fade-demo",
    type: "registry:example",
    files: [{ path: "example/blur-fade-demo.tsx", type: "registry:example" }],
  },
  {
    name: "blur-fade-text-demo",
    type: "registry:example",
    files: [
      { path: "example/blur-fade-text-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "safari-demo",
    type: "registry:example",
    files: [{ path: "example/safari-demo.tsx", type: "registry:example" }],
  },
  {
    name: "safari-demo-2",
    type: "registry:example",
    files: [{ path: "example/safari-demo-2.tsx", type: "registry:example" }],
  },
  {
    name: "safari-demo-3",
    type: "registry:example",
    files: [{ path: "example/safari-demo-3.tsx", type: "registry:example" }],
  },
  {
    name: "safari-demo-4",
    type: "registry:example",
    files: [{ path: "example/safari-demo-4.tsx", type: "registry:example" }],
  },
  {
    name: "iphone-15-pro-demo",
    type: "registry:example",
    files: [
      { path: "example/iphone-15-pro-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "iphone-15-pro-demo-2",
    type: "registry:example",
    files: [
      { path: "example/iphone-15-pro-demo-2.tsx", type: "registry:example" },
    ],
  },
  {
    name: "iphone-15-pro-demo-3",
    type: "registry:example",
    files: [
      { path: "example/iphone-15-pro-demo-3.tsx", type: "registry:example" },
    ],
  },
  {
    name: "rainbow-button-demo",
    type: "registry:example",
    files: [
      { path: "example/rainbow-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "interactive-hover-button-demo",
    type: "registry:example",
    files: [
      {
        path: "example/interactive-hover-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
