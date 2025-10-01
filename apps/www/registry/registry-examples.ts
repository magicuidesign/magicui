import { type Registry } from "shadcn/schema"

export const examples: Registry["items"] = [
  {
    name: "magic-card-demo",
    type: "registry:example",
    title: "Magic Card Demo",
    description:
      "Example showing a spotlight effect that follows your mouse cursor and highlights borders on hover.",
    registryDependencies: ["@magicui/magic-card"],
    files: [
      {
        path: "example/magic-card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "android-demo",
    type: "registry:example",
    title: "Android Demo",
    description: "Example showing a mockup of an Android device.",
    registryDependencies: ["@magicui/android"],
    files: [
      {
        path: "example/android-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "android-demo-2",
    type: "registry:example",
    title: "Android Demo 2",
    description: "Second example showing a mockup of an Android device.",
    registryDependencies: ["@magicui/android"],
    files: [
      {
        path: "example/android-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "android-demo-3",
    type: "registry:example",
    title: "Android Demo 3",
    description: "Third example showing a mockup of an Android device.",
    registryDependencies: ["@magicui/android"],
    files: [
      {
        path: "example/android-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "warp-background-demo",
    type: "registry:example",
    title: "Warp Background Demo",
    description:
      "Example showing a card with a time warping background effect.",
    registryDependencies: ["@magicui/warp-background"],
    files: [
      {
        path: "example/warp-background-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "line-shadow-text-demo",
    type: "registry:example",
    title: "Line Shadow Text Demo",
    description: "Example showing a text component with a moving line shadow.",
    registryDependencies: ["@magicui/line-shadow-text"],
    files: [
      {
        path: "example/line-shadow-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "aurora-text-demo",
    type: "registry:example",
    title: "Aurora Text Demo",
    description: "Example showing a beautiful aurora text effect.",
    registryDependencies: ["@magicui/aurora-text"],
    files: [
      {
        path: "example/aurora-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "morphing-text-demo",
    type: "registry:example",
    title: "Morphing Text Demo",
    description: "Example showing a dynamic text morphing component.",
    registryDependencies: ["@magicui/morphing-text"],
    files: [
      {
        path: "example/morphing-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "scroll-progress-demo",
    type: "registry:example",
    title: "Scroll Progress Demo",
    description: "Example showing animated scroll progress for your pages.",
    registryDependencies: ["@magicui/scroll-progress"],
    files: [
      {
        path: "example/scroll-progress-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "lens-demo",
    type: "registry:example",
    title: "Lens Demo",
    description: "Example showing a lens effect component",
    registryDependencies: ["button", "card", "@magicui/lens"],
    files: [
      {
        path: "example/lens-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "lens-demo-2",
    type: "registry:example",
    title: "Lens Demo 2",
    description: "Second example showing a lens effect component",
    registryDependencies: ["button", "card", "@magicui/lens"],
    files: [
      {
        path: "example/lens-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "lens-demo-3",
    type: "registry:example",
    title: "Lens Demo 3",
    description: "Third example showing a lens effect component",
    registryDependencies: ["button", "card", "@magicui/lens"],
    files: [
      {
        path: "example/lens-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "pointer-demo-1",
    type: "registry:example",
    title: "Pointer Demo 1",
    description: "Example showing a pointer effect component",
    registryDependencies: ["@magicui/pointer"],
    files: [
      {
        path: "example/pointer-demo-1.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "smooth-cursor-demo",
    description: "Basic smooth cursor example",
    type: "registry:example",
    registryDependencies: ["@magicui/smooth-cursor"],
    files: [
      {
        path: "example/smooth-cursor-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "progressive-blur-demo",
    type: "registry:example",
    title: "Progressive Blur Demo",
    description:
      "Example showing progressive blur effect for scrollable content.",
    registryDependencies: ["@magicui/progressive-blur"],
    files: [
      {
        path: "example/progressive-blur-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "neon-gradient-card-demo",
    type: "registry:example",
    title: "Neon Gradient Card Demo",
    description: "Example showing a beautiful neon card effect.",
    registryDependencies: ["@magicui/neon-gradient-card"],
    files: [
      {
        path: "example/neon-gradient-card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "meteors-demo",
    type: "registry:example",
    title: "Meteors Demo",
    description: "Example showing a meteor shower effect.",
    registryDependencies: ["@magicui/meteors"],
    files: [
      {
        path: "example/meteors-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "grid-pattern-demo",
    type: "registry:example",
    title: "Grid Pattern Demo",
    description: "Example showing a background grid pattern made with SVGs.",
    registryDependencies: ["@magicui/grid-pattern"],
    files: [
      {
        path: "example/grid-pattern-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "striped-pattern-demo",
    type: "registry:example",
    title: "Striped Pattern Demo",
    description: "Example showing a background striped pattern made with SVGs.",
    registryDependencies: ["@magicui/striped-pattern"],
    files: [
      {
        path: "example/striped-pattern-demo.tsx",
        type: "registry:example",
        target: "components/striped-pattern-demo.tsx",
      },
    ],
  },
  {
    name: "striped-pattern-dashed",
    type: "registry:example",
    title: "Striped Pattern (Dashed)",
    description:
      "Example showing a background striped pattern with a dashed stroke.",
    registryDependencies: ["@magicui/striped-pattern"],
    files: [
      {
        path: "example/striped-pattern-dashed.tsx",
        type: "registry:example",
        target: "components/striped-pattern-dashed.tsx",
      },
    ],
  },
  {
    name: "striped-pattern-right",
    type: "registry:example",
    title: "Striped Pattern (Right)",
    description:
      "Example showing a background striped pattern slanting to the right using SVG.",
    registryDependencies: ["@magicui/striped-pattern"],
    files: [
      {
        path: "example/striped-pattern-right.tsx",
        type: "registry:example",
        target: "components/striped-pattern-right.tsx",
      },
    ],
  },
  {
    name: "grid-pattern-linear-gradient",
    type: "registry:example",
    title: "Grid Pattern Linear Gradient",
    description: "Example showing a grid pattern with linear gradient effects.",
    registryDependencies: ["@magicui/grid-pattern"],
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
    title: "Grid Pattern Dashed",
    description: "Example showing a dashed grid pattern.",
    registryDependencies: ["@magicui/grid-pattern"],
    files: [
      {
        path: "example/grid-pattern-dashed.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dot-pattern-demo",
    type: "registry:example",
    title: "Dot Pattern Demo",
    description: "Example showing a background dot pattern made with SVGs.",
    registryDependencies: ["@magicui/dot-pattern"],
    files: [
      {
        path: "example/dot-pattern-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dot-pattern-linear-gradient",
    type: "registry:example",
    title: "Dot Pattern Linear Gradient",
    description: "Example showing a dot pattern with linear gradient effects.",
    registryDependencies: ["@magicui/dot-pattern"],
    files: [
      {
        path: "example/dot-pattern-linear-gradient.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dot-pattern-with-glow-effect",
    type: "registry:example",
    title: "Dot Pattern with glow effect",
    description: "Example showing a dot pattern with glow effect",
    registryDependencies: ["@magicui/dot-pattern"],
    files: [
      {
        path: "example/dot-pattern-with-glow-effect.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "flickering-grid-demo",
    type: "registry:example",
    title: "Flickering Grid Demo",
    description: "Example showing a flickering grid background.",
    registryDependencies: ["@magicui/flickering-grid"],
    files: [
      {
        path: "example/flickering-grid-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "flickering-grid-rounded-demo",
    type: "registry:example",
    title: "Flickering Grid Rounded Demo",
    description:
      "Example showing a flickering grid background with rounded corners.",
    registryDependencies: ["@magicui/flickering-grid"],
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
    title: "Hero Video Dialog Demo",
    description: "Example showing a hero video dialog component.",
    registryDependencies: ["@magicui/hero-video-dialog"],
    files: [
      {
        path: "example/hero-video-dialog-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "hero-video-dialog-demo-top-in-bottom-out",
    type: "registry:example",
    title: "Hero Video Dialog Top In Bottom Out Demo",
    description:
      "Example showing a hero video dialog with top-in bottom-out animation.",
    registryDependencies: ["@magicui/hero-video-dialog"],
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
    title: "Code Comparison Demo",
    description:
      "Example showing a component which compares two code snippets.",
    registryDependencies: ["@magicui/code-comparison"],
    files: [
      {
        path: "example/code-comparison-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "marquee-demo",
    type: "registry:example",
    title: "Marquee Demo",
    description: "Example showing an infinite scrolling component.",
    registryDependencies: ["@magicui/marquee"],
    files: [
      {
        path: "example/marquee-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "marquee-demo-vertical",
    type: "registry:example",
    title: "Marquee Vertical Demo",
    description: "Example showing a vertical infinite scrolling component.",
    registryDependencies: ["@magicui/marquee"],
    files: [
      {
        path: "example/marquee-demo-vertical.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "marquee-logos",
    type: "registry:example",
    title: "Marquee Logos",
    description: "Example showing an infinite scrolling logo carousel.",
    registryDependencies: ["@magicui/marquee"],
    files: [
      {
        path: "example/marquee-logos.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "marquee-3d",
    type: "registry:example",
    title: "Marquee 3D",
    description: "Example showing a 3D infinite scrolling component.",
    registryDependencies: ["@magicui/marquee"],
    files: [
      {
        path: "example/marquee-3d.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "globe-demo",
    type: "registry:example",
    title: "Globe Demo",
    description: "Example showing an autorotating, interactive WebGL globe.",
    registryDependencies: ["@magicui/globe"],
    files: [
      {
        path: "example/globe-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tweet-card-demo",
    type: "registry:example",
    title: "Tweet Card Demo",
    description: "Example showing a tweet card with author info.",
    registryDependencies: ["@magicui/tweet-card"],
    files: [
      {
        path: "example/tweet-card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tweet-card-images",
    type: "registry:example",
    title: "Tweet Card Images",
    description: "Example showing a tweet card with images.",
    registryDependencies: ["@magicui/tweet-card"],
    files: [
      {
        path: "example/tweet-card-images.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tweet-card-meta-preview",
    type: "registry:example",
    title: "Tweet Card Meta Preview",
    description: "Example showing a tweet card with meta preview.",
    registryDependencies: ["@magicui/tweet-card"],
    files: [
      {
        path: "example/tweet-card-meta-preview.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "shimmer-button-demo",
    type: "registry:example",
    title: "Shimmer Button Demo",
    description: "Example showing a button with a shimmering light effect.",
    registryDependencies: ["@magicui/shimmer-button"],
    files: [
      {
        path: "example/shimmer-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "bento-demo",
    type: "registry:example",
    title: "Bento Demo",
    description: "Example showing a bento grid layout for showcasing features.",
    registryDependencies: [
      "button",
      "calendar",
      "@magicui/marquee",
      "@magicui/bento-grid",
      "@magicui/animated-list-demo",
      "@magicui/animated-beam-multiple-outputs",
    ],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "example/bento-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "bento-demo-vertical",
    type: "registry:example",
    title: "Bento Vertical Demo",
    description: "Example showing a vertical bento grid layout.",
    registryDependencies: ["@magicui/bento-grid"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "example/bento-demo-vertical.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "number-ticker-demo",
    type: "registry:example",
    title: "Number Ticker Demo",
    description: "Example showing animated counting numbers.",
    registryDependencies: ["@magicui/number-ticker"],
    files: [
      {
        path: "example/number-ticker-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "number-ticker-demo-2",
    type: "registry:example",
    title: "Number Ticker Demo 2",
    description: "Example showing animated counting numbers.",
    registryDependencies: ["@magicui/number-ticker"],
    files: [
      {
        path: "example/number-ticker-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "number-ticker-decimal-demo",
    type: "registry:example",
    title: "Number Ticker Decimal Demo",
    description: "Example showing animated counting decimal numbers.",
    registryDependencies: ["@magicui/number-ticker"],
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
    title: "Ripple Demo",
    description: "Example showing an animated ripple effect.",
    registryDependencies: ["@magicui/ripple"],
    files: [
      {
        path: "example/ripple-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "retro-grid-demo",
    type: "registry:example",
    title: "Retro Grid Demo",
    description: "Example showing an animated scrolling retro grid effect.",
    registryDependencies: ["@magicui/retro-grid"],
    files: [
      {
        path: "example/retro-grid-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-list-demo",
    type: "registry:example",
    title: "Animated List Demo",
    description: "Example showing a list with sequenced item animations.",
    registryDependencies: ["@magicui/animated-list"],
    files: [
      {
        path: "example/animated-list-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-shiny-text-demo",
    type: "registry:example",
    title: "Animated Shiny Text Demo",
    description: "Example showing text with a shimmering light effect.",
    registryDependencies: ["@magicui/animated-shiny-text"],
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
    title: "Particles Demo",
    description: "Example showing interactive particle effects.",
    registryDependencies: ["@magicui/particles"],
    dependencies: ["next-themes"],
    files: [
      {
        path: "example/particles-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-grid-pattern-demo",
    type: "registry:example",
    title: "Animated Grid Pattern Demo",
    description: "Example showing an animated grid pattern background.",
    registryDependencies: ["@magicui/animated-grid-pattern"],
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
    title: "Interactive Grid Pattern Demo",
    description: "Example showing an interactive grid pattern background.",
    registryDependencies: ["@magicui/interactive-grid-pattern"],
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
    title: "Interactive Grid Pattern Demo 2",
    description:
      "Second example showing an interactive grid pattern background.",
    registryDependencies: ["@magicui/interactive-grid-pattern"],
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
    title: "Border Beam Demo",
    description: "Example showing an animated border beam effect.",
    registryDependencies: ["@magicui/border-beam"],
    files: [
      {
        path: "example/border-beam-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "border-beam-demo-2",
    type: "registry:example",
    title: "Border Beam Demo",
    description: "Example showing an animated border beam effect.",
    registryDependencies: ["button", "card", "@magicui/border-beam"],
    files: [
      {
        path: "example/border-beam-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "border-beam-demo-3",
    type: "registry:example",
    title: "Border Beam Demo 3",
    description: "Example showing an animated border beam effect.",
    registryDependencies: [
      "button",
      "card",
      "input",
      "label",
      "@magicui/border-beam",
    ],
    files: [
      {
        path: "example/border-beam-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "border-beam-demo-4",
    type: "registry:example",
    title: "Border Beam Demo 4",
    description: "Example showing an animated border beam effect.",
    registryDependencies: ["button", "@magicui/border-beam"],
    files: [
      {
        path: "example/border-beam-demo-4.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-beam-demo",
    type: "registry:example",
    title: "Animated Beam Demo",
    description: "Example showing an animated beam of light effect.",
    registryDependencies: ["@magicui/animated-beam"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "example/animated-beam-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-beam-unidirectional",
    type: "registry:example",
    title: "Animated Beam Unidirectional",
    description: "Example showing a unidirectional animated beam effect.",
    registryDependencies: ["@magicui/animated-beam"],
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
    title: "Animated Beam Bidirectional",
    description: "Example showing a bidirectional animated beam effect.",
    registryDependencies: ["@magicui/animated-beam"],
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
    title: "Animated Beam Multiple Inputs",
    description: "Example showing animated beams with multiple input points.",
    registryDependencies: ["@magicui/animated-beam"],
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
    title: "Animated Beam Multiple Outputs",
    description: "Example showing animated beams with multiple output points.",
    registryDependencies: ["@magicui/animated-beam"],
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
    title: "Text Reveal Demo",
    description: "Example showing text that fades in on scroll.",
    registryDependencies: ["@magicui/text-reveal"],
    files: [
      {
        path: "example/text-reveal-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-gradient-text-demo",
    type: "registry:example",
    title: "Animated Gradient Text Demo",
    description: "Example showing text with animated gradient backgrounds.",
    registryDependencies: ["@magicui/animated-gradient-text"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "example/animated-gradient-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-gradient-text-demo-2",
    type: "registry:example",
    title: "Animated Gradient Text Demo 2",
    description:
      "Second example showing text with animated gradient backgrounds.",
    registryDependencies: ["@magicui/animated-gradient-text"],
    files: [
      {
        path: "example/animated-gradient-text-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "orbiting-circles-demo",
    type: "registry:example",
    title: "Orbiting Circles Demo",
    description: "Example showing circles moving in orbital paths.",
    registryDependencies: ["@magicui/orbiting-circles"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "example/orbiting-circles-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dock-demo",
    type: "registry:example",
    title: "Dock Demo",
    description: "Example showing a MacOS-style dock implementation.",
    dependencies: ["next-themes"],
    registryDependencies: ["button", "@magicui/dock"],
    files: [
      {
        path: "example/dock-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dock-demo-2",
    type: "registry:example",
    title: "Dock Demo 2",
    description: "Second example showing a MacOS-style dock implementation.",
    registryDependencies: ["@magicui/dock"],
    files: [
      {
        path: "example/dock-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dock-demo-3",
    type: "registry:example",
    title: "Dock Demo 3",
    description: "Third example showing a MacOS-style dock implementation.",
    registryDependencies: ["@magicui/dock"],
    files: [
      {
        path: "example/dock-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "word-rotate-demo",
    type: "registry:example",
    title: "Word Rotate Demo",
    description: "Example showing vertical word rotation animation.",
    registryDependencies: ["@magicui/word-rotate"],
    files: [
      {
        path: "example/word-rotate-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "hyper-text-demo",
    type: "registry:example",
    title: "Hyper Text Demo",
    description: "Example showing text with scrambling letter animations.",
    registryDependencies: ["@magicui/hyper-text"],
    files: [
      {
        path: "example/hyper-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "avatar-circles-demo",
    type: "registry:example",
    title: "Avatar Circles Demo",
    description: "Example showing overlapping avatar circles.",
    registryDependencies: ["@magicui/avatar-circles"],
    files: [
      {
        path: "example/avatar-circles-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "typing-animation-demo",
    type: "registry:example",
    title: "Typing Animation Demo",
    description: "Example showing typed character animations.",
    registryDependencies: ["@magicui/typing-animation"],
    files: [
      {
        path: "example/typing-animation-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "typing-animation-demo-2",
    type: "registry:example",
    title: "Typing Animation Multiple Words",
    description: "Example showing multiple words with looping.",
    registryDependencies: ["@magicui/typing-animation"],
    files: [
      {
        path: "example/typing-animation-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "typing-animation-demo-3",
    type: "registry:example",
    title: "Typing Animation Custom Speed",
    description: "Example showing custom typing and deleting speeds.",
    registryDependencies: ["@magicui/typing-animation"],
    files: [
      {
        path: "example/typing-animation-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "typing-animation-demo-4",
    type: "registry:example",
    title: "Typing Animation Start on View",
    description: "Example showing animation that starts when in viewport.",
    registryDependencies: ["@magicui/typing-animation"],
    files: [
      {
        path: "example/typing-animation-demo-4.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "typing-animation-demo-5",
    type: "registry:example",
    title: "Typing Animation Without Cursor",
    description: "Example showing typing animation without cursor.",
    registryDependencies: ["@magicui/typing-animation"],
    files: [
      {
        path: "example/typing-animation-demo-5.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "typing-animation-demo-6",
    type: "registry:example",
    title: "Typing Animation Single Play",
    description: "Example showing single play without looping.",
    registryDependencies: ["@magicui/typing-animation"],
    files: [
      {
        path: "example/typing-animation-demo-6.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "typing-animation-demo-7",
    type: "registry:example",
    title: "Typing Animation Cursor Blinking",
    description: "Example showing cursor blinking control.",
    registryDependencies: ["@magicui/typing-animation"],
    files: [
      {
        path: "example/typing-animation-demo-7.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "typing-animation-demo-8",
    type: "registry:example",
    title: "Typing Animation Cursor Styles",
    description:
      "Example showing different cursor styles (line, block, underscore).",
    registryDependencies: ["@magicui/typing-animation"],
    files: [
      {
        path: "example/typing-animation-demo-8.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "scroll-based-velocity-demo",
    type: "registry:example",
    title: "Scroll Based Velocity Demo",
    description: "Example showing text speed changes based on scroll velocity.",
    registryDependencies: ["@magicui/scroll-based-velocity"],
    files: [
      {
        path: "example/scroll-based-velocity-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "scroll-based-velocity-images-demo",
    type: "registry:example",
    title: "Scroll Based Velocity Images",
    description:
      "Example showing Unsplash images scrolling with speed reacting to scroll velocity.",
    registryDependencies: ["@magicui/scroll-based-velocity"],
    files: [
      {
        path: "example/scroll-based-velocity-images-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "sparkles-text-demo",
    type: "registry:example",
    title: "Sparkles Text Demo",
    description: "Example showing text with animated sparkle effects.",
    registryDependencies: ["@magicui/sparkles-text"],
    files: [
      {
        path: "example/sparkles-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "spinning-text-demo",
    type: "registry:example",
    title: "Spinning Text Demo",
    description: "Example showing spinning text animation.",
    registryDependencies: ["@magicui/spinning-text"],
    files: [
      {
        path: "example/spinning-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "spinning-text-demo-2",
    type: "registry:example",
    title: "Spinning Text Demo 2",
    description: "Example showing spinning text animation.",
    registryDependencies: ["@magicui/spinning-text"],
    files: [
      {
        path: "example/spinning-text-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "comic-text-demo",
    type: "registry:example",
    title: "Comic Text Demo",
    description: "Example showing comic text animation.",
    registryDependencies: ["@magicui/comic-text"],
    files: [
      {
        path: "example/comic-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "icon-cloud-demo",
    type: "registry:example",
    title: "Icon Cloud Demo",
    description: "Example showing an interactive 3D icon cloud.",
    registryDependencies: ["@magicui/icon-cloud"],
    files: [
      {
        path: "example/icon-cloud-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "icon-cloud-demo-2",
    type: "registry:example",
    title: "Icon Cloud Demo 2",
    description: "Second example showing an interactive 3D icon cloud.",
    registryDependencies: ["@magicui/icon-cloud"],
    files: [
      {
        path: "example/icon-cloud-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "icon-cloud-demo-3",
    type: "registry:example",
    title: "Icon Cloud Demo 3",
    description: "Third example showing an interactive 3D icon cloud.",
    registryDependencies: ["@magicui/icon-cloud"],
    files: [
      {
        path: "example/icon-cloud-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo",
    type: "registry:example",
    title: "Text Animate Demo",
    description: "Example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo-2",
    type: "registry:example",
    title: "Text Animate Demo 2",
    description: "Second example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo-3",
    type: "registry:example",
    title: "Text Animate Demo 3",
    description: "Third example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo-4",
    type: "registry:example",
    title: "Text Animate Demo 4",
    description: "Fourth example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo-4.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo-5",
    type: "registry:example",
    title: "Text Animate Demo 5",
    description: "Fifth example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo-5.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo-6",
    type: "registry:example",
    title: "Text Animate Demo 6",
    description: "Sixth example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo-6.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo-7",
    type: "registry:example",
    title: "Text Animate Demo 7",
    description: "Seventh example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo-7.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo-8",
    type: "registry:example",
    title: "Text Animate Demo 8",
    description: "Eighth example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo-8.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "text-animate-demo-9",
    type: "registry:example",
    title: "Text Animate Demo 9",
    description: "Ninth example showing various text animations.",
    registryDependencies: ["@magicui/text-animate"],
    files: [
      {
        path: "example/text-animate-demo-9.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "shiny-button-demo",
    type: "registry:example",
    title: "Shiny Button Demo",
    description: "Example showing a shiny button with dynamic styles.",
    registryDependencies: ["@magicui/shiny-button"],
    files: [
      {
        path: "example/shiny-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-circular-progress-bar-demo",
    type: "registry:example",
    title: "Animated Circular Progress Bar Demo",
    description: "Example showing an animated circular progress gauge.",
    registryDependencies: ["@magicui/animated-circular-progress-bar"],
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
    title: "Shine Border Demo",
    description: "Example showing an animated shining border effect.",
    registryDependencies: ["@magicui/shine-border"],
    files: [
      {
        path: "example/shine-border-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "shine-border-demo-2",
    type: "registry:example",
    title: "Shine Border Demo 2",
    description: "Second example showing an animated shining border effect.",
    registryDependencies: ["@magicui/shine-border"],
    files: [
      {
        path: "example/shine-border-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "confetti-demo",
    type: "registry:example",
    title: "Confetti Demo",
    description: "Example showing confetti animations for celebrations.",
    registryDependencies: ["@magicui/confetti"],
    files: [
      {
        path: "example/confetti-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "confetti-basic-cannon",
    type: "registry:example",
    title: "Confetti Basic Cannon",
    description: "Example showing basic confetti cannon animation.",
    registryDependencies: ["@magicui/confetti"],
    files: [
      {
        path: "example/confetti-basic-cannon.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "confetti-random-direction",
    type: "registry:example",
    title: "Confetti Random Direction",
    description: "Example showing confetti with random directions.",
    registryDependencies: ["@magicui/confetti"],
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
    title: "Confetti Fireworks",
    description: "Example showing fireworks-style confetti animation.",
    registryDependencies: ["@magicui/confetti"],
    files: [
      {
        path: "example/confetti-fireworks.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "confetti-stars",
    type: "registry:example",
    title: "Confetti Stars",
    description: "Example showing star-shaped confetti animation.",
    registryDependencies: ["@magicui/confetti"],
    files: [
      {
        path: "example/confetti-stars.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "confetti-side-cannons",
    type: "registry:example",
    title: "Confetti Side Cannons",
    description: "Example showing side-mounted confetti cannons.",
    registryDependencies: ["@magicui/confetti"],
    files: [
      {
        path: "example/confetti-side-cannons.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "confetti-custom-shapes",
    type: "registry:example",
    title: "Confetti Custom Shapes",
    description: "Example showing confetti with custom shape particles.",
    registryDependencies: ["@magicui/confetti"],
    files: [
      {
        path: "example/confetti-custom-shapes.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "confetti-emoji",
    type: "registry:example",
    title: "Confetti Emoji",
    description: "Example showing confetti with emoji particles.",
    registryDependencies: ["@magicui/confetti"],
    files: [
      {
        path: "example/confetti-emoji.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "cool-mode-demo",
    type: "registry:example",
    title: "Cool Mode Demo",
    description: "Example showing cool mode effect for buttons and links.",
    registryDependencies: ["@magicui/cool-mode"],
    files: [
      {
        path: "example/cool-mode-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "cool-mode-custom",
    type: "registry:example",
    title: "Cool Mode Custom",
    description: "Example showing customized cool mode effects.",
    registryDependencies: ["@magicui/cool-mode"],
    files: [
      {
        path: "example/cool-mode-custom.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "pulsating-button-demo",
    type: "registry:example",
    title: "Pulsating Button Demo",
    description: "Example showing an animated pulsating button.",
    registryDependencies: ["@magicui/pulsating-button"],
    files: [
      {
        path: "example/pulsating-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "ripple-button-demo",
    type: "registry:example",
    title: "Ripple Button Demo",
    description: "Example showing an animated button with ripple effect.",
    registryDependencies: ["@magicui/ripple-button"],
    files: [
      {
        path: "example/ripple-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "file-tree-demo",
    type: "registry:example",
    title: "File Tree Demo",
    description:
      "Example showing a component that displays folder and file structure.",
    registryDependencies: ["@magicui/file-tree"],
    files: [
      {
        path: "example/file-tree-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "blur-fade-demo",
    type: "registry:example",
    title: "Blur Fade Demo",
    description: "Example showing blur fade in and out animations.",
    registryDependencies: ["@magicui/blur-fade"],
    files: [
      {
        path: "example/blur-fade-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "blur-fade-text-demo",
    type: "registry:example",
    title: "Blur Fade Text Demo",
    description: "Example showing blur fade animations with text.",
    registryDependencies: ["@magicui/blur-fade"],
    files: [
      {
        path: "example/blur-fade-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "safari-demo",
    type: "registry:example",
    title: "Safari Demo",
    description: "Example showing a Safari browser mockup.",
    registryDependencies: ["@magicui/safari"],
    files: [
      {
        path: "example/safari-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "safari-demo-2",
    type: "registry:example",
    title: "Safari Demo 2",
    description: "Second example showing a Safari browser mockup.",
    registryDependencies: ["@magicui/safari"],
    files: [
      {
        path: "example/safari-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "safari-demo-3",
    type: "registry:example",
    title: "Safari Demo 3",
    description: "Third example showing a Safari browser mockup.",
    registryDependencies: ["@magicui/safari"],
    files: [
      {
        path: "example/safari-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "safari-demo-4",
    type: "registry:example",
    title: "Safari Demo 4",
    description: "Fourth example showing a Safari browser mockup.",
    registryDependencies: ["@magicui/safari"],
    files: [
      {
        path: "example/safari-demo-4.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "iphone-demo",
    type: "registry:example",
    title: "iPhone Demo",
    description: "Example showing an iPhone mockup.",
    registryDependencies: ["@magicui/iphone"],
    files: [
      {
        path: "example/iphone-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "iphone-demo-2",
    type: "registry:example",
    title: "iPhone Demo 2",
    description: "Second example showing an iPhone mockup.",
    registryDependencies: ["@magicui/iphone"],
    files: [
      {
        path: "example/iphone-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "iphone-demo-3",
    type: "registry:example",
    title: "iPhone Demo 3",
    description: "Third example showing an iPhone mockup.",
    registryDependencies: ["@magicui/iphone"],
    files: [
      {
        path: "example/iphone-demo-3.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "rainbow-button-demo",
    type: "registry:example",
    title: "Rainbow Button Demo",
    description: "Example showing an animated button with rainbow effect.",
    registryDependencies: ["@magicui/rainbow-button"],
    files: [
      {
        path: "example/rainbow-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "rainbow-button-demo-2",
    type: "registry:example",
    title: "Rainbow Button Demo 2",
    description: "Example showing an animated button with rainbow effect.",
    registryDependencies: ["@magicui/rainbow-button"],
    files: [
      {
        path: "example/rainbow-button-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "interactive-hover-button-demo",
    type: "registry:example",
    title: "Interactive Hover Button Demo",
    description: "Example showing an interactive button with hover effects.",
    registryDependencies: ["@magicui/interactive-hover-button"],
    files: [
      {
        path: "example/interactive-hover-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "terminal-demo",
    type: "registry:example",
    title: "Terminal Demo",
    description: "Example showing a terminal with animated text.",
    registryDependencies: ["@magicui/terminal"],
    files: [
      {
        path: "example/terminal-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "terminal-demo-2",
    type: "registry:example",
    title: "Terminal Demo",
    description:
      "Example showing a terminal with animated text and custom delays",
    registryDependencies: ["@magicui/terminal"],
    files: [
      {
        path: "example/terminal-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "video-text-demo",
    type: "registry:example",
    title: "Video Text Demo",
    description: "Example showing text with a video background.",
    registryDependencies: ["@magicui/video-text"],
    files: [
      {
        path: "example/video-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "pixel-image-demo",
    type: "registry:example",
    title: "Pixel Image Demo",
    description: "Example showing a pixelated image effect.",
    registryDependencies: ["@magicui/pixel-image"],
    files: [
      {
        path: "example/pixel-image-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "highlighter-demo",
    type: "registry:example",
    title: "Highlighter Demo",
    description: "Example showing the demo of a Highlighter",
    registryDependencies: ["@magicui/highlighter"],
    files: [
      {
        path: "example/highlighter-demo.tsx",
        type: "registry:example",
      },
      {
        path: "magicui/highlighter.tsx",
        type: "registry:ui",
      },
    ],
    dependencies: ["rough-notation"],
  },
  {
    name: "animated-theme-toggler-demo",
    type: "registry:example",
    title: "Animated Theme Toggler Demo",
    description: "Example showing animation while changing the theme.",
    registryDependencies: ["@magicui/animated-theme-toggler"],
    files: [
      {
        path: "example/animated-theme-toggler-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "light-rays-demo",
    description:
      "Demo of the light-rays component showcasing animated light rays",
    type: "registry:example",
    registryDependencies: ["@magicui/light-rays"],
    files: [
      {
        path: "example/light-rays-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dotted-map-demo",
    type: "registry:example",
    title: "Dotted Map Demo",
    description: "Example showing a dotted map.",
    registryDependencies: ["@magicui/dotted-map"],
    files: [
      {
        path: "example/dotted-map-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "dotted-map-demo-2",
    type: "registry:example",
    title: "Dotted Map Demo 2",
    description: "Example showing a dotted map.",
    registryDependencies: ["@magicui/dotted-map"],
    files: [
      {
        path: "example/dotted-map-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
]
