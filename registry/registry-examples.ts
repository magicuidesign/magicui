import { type Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "magic-card-demo",
    type: "registry:example",
    title: "Magic Card Demo",
    description:
      "Example showing a spotlight effect that follows your mouse cursor and highlights borders on hover.",
    registryDependencies: ["https://magicui.design/r/magic-card"],
    files: [
      {
        path: "registry/example/magic-card-demo.tsx",
        type: "registry:example",
        target: "components/magic-card-demo.tsx",
      },
    ],
  },
  {
    name: "android-demo",
    type: "registry:example",
    title: "Android Demo",
    description: "Example showing a mockup of an Android device.",
    registryDependencies: ["https://magicui.design/r/android"],
    files: [
      {
        path: "registry/example/android-demo.tsx",
        type: "registry:example",
        target: "components/android-demo.tsx",
      },
    ],
  },
  {
    name: "android-demo-2",
    type: "registry:example",
    title: "Android Demo 2",
    description: "Second example showing a mockup of an Android device.",
    registryDependencies: ["https://magicui.design/r/android"],
    files: [
      {
        path: "registry/example/android-demo-2.tsx",
        type: "registry:example",
        target: "components/android-demo-2.tsx",
      },
    ],
  },
  {
    name: "android-demo-3",
    type: "registry:example",
    title: "Android Demo 3",
    description: "Third example showing a mockup of an Android device.",
    registryDependencies: ["https://magicui.design/r/android"],
    files: [
      {
        path: "registry/example/android-demo-3.tsx",
        type: "registry:example",
        target: "components/android-demo-3.tsx",
      },
    ],
  },
  {
    name: "warp-background-demo",
    type: "registry:example",
    title: "Warp Background Demo",
    description:
      "Example showing a card with a time warping background effect.",
    registryDependencies: ["https://magicui.design/r/warp-background"],
    files: [
      {
        path: "registry/example/warp-background-demo.tsx",
        type: "registry:example",
        target: "components/warp-background-demo.tsx",
      },
    ],
  },
  {
    name: "line-shadow-text-demo",
    type: "registry:example",
    title: "Line Shadow Text Demo",
    description: "Example showing a text component with a moving line shadow.",
    registryDependencies: ["https://magicui.design/r/line-shadow-text"],
    files: [
      {
        path: "registry/example/line-shadow-text-demo.tsx",
        type: "registry:example",
        target: "components/line-shadow-text-demo.tsx",
      },
    ],
  },
  {
    name: "aurora-text-demo",
    type: "registry:example",
    title: "Aurora Text Demo",
    description: "Example showing a beautiful aurora text effect.",
    registryDependencies: ["https://magicui.design/r/aurora-text"],
    files: [
      {
        path: "registry/example/aurora-text-demo.tsx",
        type: "registry:example",
        target: "components/aurora-text-demo.tsx",
      },
    ],
  },
  {
    name: "morphing-text-demo",
    type: "registry:example",
    title: "Morphing Text Demo",
    description: "Example showing a dynamic text morphing component.",
    registryDependencies: ["https://magicui.design/r/morphing-text"],
    files: [
      {
        path: "registry/example/morphing-text-demo.tsx",
        type: "registry:example",
        target: "components/morphing-text-demo.tsx",
      },
    ],
  },
  {
    name: "scroll-progress-demo",
    type: "registry:example",
    title: "Scroll Progress Demo",
    description: "Example showing animated scroll progress for your pages.",
    registryDependencies: ["https://magicui.design/r/scroll-progress"],
    files: [
      {
        path: "registry/example/scroll-progress-demo.tsx",
        type: "registry:example",
        target: "components/scroll-progress-demo.tsx",
      },
    ],
  },
  {
    name: "lens-demo",
    type: "registry:example",
    title: "Lens Demo",
    description: "Example showing a lens effect component",
    registryDependencies: ["button", "card", "https://magicui.design/r/lens"],
    files: [
      {
        path: "registry/example/lens-demo.tsx",
        type: "registry:example",
        target: "components/lens-demo.tsx",
      },
    ],
  },
  {
    name: "lens-demo-2",
    type: "registry:example",
    title: "Lens Demo 2",
    description: "Second example showing a lens effect component",
    registryDependencies: ["button", "card", "https://magicui.design/r/lens"],
    files: [
      {
        path: "registry/example/lens-demo-2.tsx",
        type: "registry:example",
        target: "components/lens-demo-2.tsx",
      },
    ],
  },
  {
    name: "lens-demo-3",
    type: "registry:example",
    title: "Lens Demo 3",
    description: "Third example showing a lens effect component",
    registryDependencies: ["button", "card", "https://magicui.design/r/lens"],
    files: [
      {
        path: "registry/example/lens-demo-3.tsx",
        type: "registry:example",
        target: "components/lens-demo-3.tsx",
      },
    ],
  },
  {
    name: "pointer-demo-1",
    type: "registry:example",
    title: "Pointer Demo 1",
    description: "Example showing a pointer effect component",
    registryDependencies: ["https://magicui.design/r/pointer"],
    files: [
      {
        path: "registry/example/pointer-demo-1.tsx",
        type: "registry:example",
        target: "components/pointer-demo-1.tsx",
      },
    ],
  },
  {
    name: "smooth-cursor-demo",
    description: "Basic smooth cursor example",
    type: "registry:example",
    registryDependencies: ["https://magicui.design/r/smooth-cursor"],
    files: [
      {
        path: "registry/example/smooth-cursor-demo.tsx",
        type: "registry:example",
        target: "components/smooth-cursor-demo.tsx",
      },
    ],
  },
  {
    name: "neon-gradient-card-demo",
    type: "registry:example",
    title: "Neon Gradient Card Demo",
    description: "Example showing a beautiful neon card effect.",
    registryDependencies: ["https://magicui.design/r/neon-gradient-card"],
    files: [
      {
        path: "registry/example/neon-gradient-card-demo.tsx",
        type: "registry:example",
        target: "components/neon-gradient-card-demo.tsx",
      },
    ],
  },
  {
    name: "meteors-demo",
    type: "registry:example",
    title: "Meteors Demo",
    description: "Example showing a meteor shower effect.",
    registryDependencies: ["https://magicui.design/r/meteors"],
    files: [
      {
        path: "registry/example/meteors-demo.tsx",
        type: "registry:example",
        target: "components/meteors-demo.tsx",
      },
    ],
  },
  {
    name: "grid-pattern-demo",
    type: "registry:example",
    title: "Grid Pattern Demo",
    description: "Example showing a background grid pattern made with SVGs.",
    registryDependencies: ["https://magicui.design/r/grid-pattern"],
    files: [
      {
        path: "registry/example/grid-pattern-demo.tsx",
        type: "registry:example",
        target: "components/grid-pattern-demo.tsx",
      },
    ],
  },
  {
    name: "grid-pattern-linear-gradient",
    type: "registry:example",
    title: "Grid Pattern Linear Gradient",
    description: "Example showing a grid pattern with linear gradient effects.",
    registryDependencies: ["https://magicui.design/r/grid-pattern"],
    files: [
      {
        path: "registry/example/grid-pattern-linear-gradient.tsx",
        type: "registry:example",
        target: "components/grid-pattern-linear-gradient.tsx",
      },
    ],
  },
  {
    name: "grid-pattern-dashed",
    type: "registry:example",
    title: "Grid Pattern Dashed",
    description: "Example showing a dashed grid pattern.",
    registryDependencies: ["https://magicui.design/r/grid-pattern"],
    files: [
      {
        path: "registry/example/grid-pattern-dashed.tsx",
        type: "registry:example",
        target: "components/grid-pattern-dashed.tsx",
      },
    ],
  },
  {
    name: "dot-pattern-demo",
    type: "registry:example",
    title: "Dot Pattern Demo",
    description: "Example showing a background dot pattern made with SVGs.",
    registryDependencies: ["https://magicui.design/r/dot-pattern"],
    files: [
      {
        path: "registry/example/dot-pattern-demo.tsx",
        type: "registry:example",
        target: "components/dot-pattern-demo.tsx",
      },
    ],
  },
  {
    name: "dot-pattern-linear-gradient",
    type: "registry:example",
    title: "Dot Pattern Linear Gradient",
    description: "Example showing a dot pattern with linear gradient effects.",
    registryDependencies: ["https://magicui.design/r/dot-pattern"],
    files: [
      {
        path: "registry/example/dot-pattern-linear-gradient.tsx",
        type: "registry:example",
        target: "components/dot-pattern-linear-gradient.tsx",
      },
    ],
  },
  {
    name: "dot-pattern-with-glow-effect",
    type: "registry:example",
    title: "Dot Pattern with glow effect",
    description: "Example showing a dot pattern with glow effect",
    registryDependencies: ["https://magicui.design/r/dot-pattern"],
    files: [
      {
        path: "registry/example/dot-pattern-with-glow-effect.tsx",
        type: "registry:example",
        target: "components/dot-pattern-with-glow-effect.tsx",
      },
    ],
  },
  {
    name: "flickering-grid-demo",
    type: "registry:example",
    title: "Flickering Grid Demo",
    description: "Example showing a flickering grid background.",
    registryDependencies: ["https://magicui.design/r/flickering-grid"],
    files: [
      {
        path: "registry/example/flickering-grid-demo.tsx",
        type: "registry:example",
        target: "components/flickering-grid-demo.tsx",
      },
    ],
  },
  {
    name: "flickering-grid-rounded-demo",
    type: "registry:example",
    title: "Flickering Grid Rounded Demo",
    description:
      "Example showing a flickering grid background with rounded corners.",
    registryDependencies: ["https://magicui.design/r/flickering-grid"],
    files: [
      {
        path: "registry/example/flickering-grid-rounded-demo.tsx",
        type: "registry:example",
        target: "components/flickering-grid-rounded-demo.tsx",
      },
    ],
  },
  {
    name: "hero-video-dialog-demo",
    type: "registry:example",
    title: "Hero Video Dialog Demo",
    description: "Example showing a hero video dialog component.",
    registryDependencies: ["https://magicui.design/r/hero-video-dialog"],
    files: [
      {
        path: "registry/example/hero-video-dialog-demo.tsx",
        type: "registry:example",
        target: "components/hero-video-dialog-demo.tsx",
      },
    ],
  },
  {
    name: "hero-video-dialog-demo-top-in-bottom-out",
    type: "registry:example",
    title: "Hero Video Dialog Top In Bottom Out Demo",
    description:
      "Example showing a hero video dialog with top-in bottom-out animation.",
    registryDependencies: ["https://magicui.design/r/hero-video-dialog"],
    files: [
      {
        path: "registry/example/hero-video-dialog-demo-top-in-bottom-out.tsx",
        type: "registry:example",
        target: "components/hero-video-dialog-demo-top-in-bottom-out.tsx",
      },
    ],
  },
  {
    name: "code-comparison-demo",
    type: "registry:example",
    title: "Code Comparison Demo",
    description:
      "Example showing a component which compares two code snippets.",
    registryDependencies: ["https://magicui.design/r/code-comparison"],
    files: [
      {
        path: "registry/example/code-comparison-demo.tsx",
        type: "registry:example",
        target: "components/code-comparison-demo.tsx",
      },
    ],
  },
  {
    name: "script-copy-btn-demo",
    type: "registry:example",
    title: "Script Copy Button Demo",
    description: "Example showing how to copy code to clipboard.",
    registryDependencies: ["https://magicui.design/r/script-copy-btn"],
    files: [
      {
        path: "registry/example/script-copy-btn-demo.tsx",
        type: "registry:example",
        target: "components/script-copy-btn-demo.tsx",
      },
    ],
  },
  {
    name: "marquee-demo",
    type: "registry:example",
    title: "Marquee Demo",
    description: "Example showing an infinite scrolling component.",
    registryDependencies: ["https://magicui.design/r/marquee"],
    files: [
      {
        path: "registry/example/marquee-demo.tsx",
        type: "registry:example",
        target: "components/marquee-demo.tsx",
      },
    ],
  },
  {
    name: "marquee-demo-vertical",
    type: "registry:example",
    title: "Marquee Vertical Demo",
    description: "Example showing a vertical infinite scrolling component.",
    registryDependencies: ["https://magicui.design/r/marquee"],
    files: [
      {
        path: "registry/example/marquee-demo-vertical.tsx",
        type: "registry:example",
        target: "components/marquee-demo-vertical.tsx",
      },
    ],
  },
  {
    name: "marquee-logos",
    type: "registry:example",
    title: "Marquee Logos",
    description: "Example showing an infinite scrolling logo carousel.",
    registryDependencies: ["https://magicui.design/r/marquee"],
    files: [
      {
        path: "registry/example/marquee-logos.tsx",
        type: "registry:example",
        target: "components/marquee-logos.tsx",
      },
    ],
  },
  {
    name: "marquee-3d",
    type: "registry:example",
    title: "Marquee 3D",
    description: "Example showing a 3D infinite scrolling component.",
    registryDependencies: ["https://magicui.design/r/marquee"],
    files: [
      {
        path: "registry/example/marquee-3d.tsx",
        type: "registry:example",
        target: "components/marquee-3d.tsx",
      },
    ],
  },
  {
    name: "globe-demo",
    type: "registry:example",
    title: "Globe Demo",
    description: "Example showing an autorotating, interactive WebGL globe.",
    registryDependencies: ["https://magicui.design/r/globe"],
    files: [
      {
        path: "registry/example/globe-demo.tsx",
        type: "registry:example",
        target: "components/globe-demo.tsx",
      },
    ],
  },
  {
    name: "tweet-card-demo",
    type: "registry:example",
    title: "Tweet Card Demo",
    description: "Example showing a tweet card with author info.",
    registryDependencies: ["https://magicui.design/r/tweet-card"],
    files: [
      {
        path: "registry/example/tweet-card-demo.tsx",
        type: "registry:example",
        target: "components/tweet-card-demo.tsx",
      },
    ],
  },
  {
    name: "tweet-card-images",
    type: "registry:example",
    title: "Tweet Card Images",
    description: "Example showing a tweet card with images.",
    registryDependencies: ["https://magicui.design/r/tweet-card"],
    files: [
      {
        path: "registry/example/tweet-card-images.tsx",
        type: "registry:example",
        target: "components/tweet-card-images.tsx",
      },
    ],
  },
  {
    name: "tweet-card-meta-preview",
    type: "registry:example",
    title: "Tweet Card Meta Preview",
    description: "Example showing a tweet card with meta preview.",
    registryDependencies: ["https://magicui.design/r/tweet-card"],
    files: [
      {
        path: "registry/example/tweet-card-meta-preview.tsx",
        type: "registry:example",
        target: "components/tweet-card-meta-preview.tsx",
      },
    ],
  },
  {
    name: "shimmer-button-demo",
    type: "registry:example",
    title: "Shimmer Button Demo",
    description: "Example showing a button with a shimmering light effect.",
    registryDependencies: ["https://magicui.design/r/shimmer-button"],
    files: [
      {
        path: "registry/example/shimmer-button-demo.tsx",
        type: "registry:example",
        target: "components/shimmer-button-demo.tsx",
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
      "https://magicui.design/r/marquee",
      "https://magicui.design/r/bento-grid",
      "https://magicui.design/r/animated-list-demo",
      "https://magicui.design/r/animated-beam-multiple-outputs",
    ],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "registry/example/bento-demo.tsx",
        type: "registry:example",
        target: "components/bento-demo.tsx",
      },
    ],
  },
  {
    name: "bento-demo-vertical",
    type: "registry:example",
    title: "Bento Vertical Demo",
    description: "Example showing a vertical bento grid layout.",
    registryDependencies: ["https://magicui.design/r/bento-grid"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "registry/example/bento-demo-vertical.tsx",
        type: "registry:example",
        target: "components/bento-demo-vertical.tsx",
      },
    ],
  },
  {
    name: "number-ticker-demo",
    type: "registry:example",
    title: "Number Ticker Demo",
    description: "Example showing animated counting numbers.",
    registryDependencies: ["https://magicui.design/r/number-ticker"],
    files: [
      {
        path: "registry/example/number-ticker-demo.tsx",
        type: "registry:example",
        target: "components/number-ticker-demo.tsx",
      },
    ],
  },
  {
    name: "number-ticker-demo-2",
    type: "registry:example",
    title: "Number Ticker Demo 2",
    description: "Example showing animated counting numbers.",
    registryDependencies: ["https://magicui.design/r/number-ticker"],
    files: [
      {
        path: "registry/example/number-ticker-demo-2.tsx",
        type: "registry:example",
        target: "components/number-ticker-demo-2.tsx",
      },
    ],
  },
  {
    name: "number-ticker-decimal-demo",
    type: "registry:example",
    title: "Number Ticker Decimal Demo",
    description: "Example showing animated counting decimal numbers.",
    registryDependencies: ["https://magicui.design/r/number-ticker"],
    files: [
      {
        path: "registry/example/number-ticker-decimal-demo.tsx",
        type: "registry:example",
        target: "components/number-ticker-decimal-demo.tsx",
      },
    ],
  },
  {
    name: "ripple-demo",
    type: "registry:example",
    title: "Ripple Demo",
    description: "Example showing an animated ripple effect.",
    registryDependencies: ["https://magicui.design/r/ripple"],
    files: [
      {
        path: "registry/example/ripple-demo.tsx",
        type: "registry:example",
        target: "components/ripple-demo.tsx",
      },
    ],
  },
  {
    name: "retro-grid-demo",
    type: "registry:example",
    title: "Retro Grid Demo",
    description: "Example showing an animated scrolling retro grid effect.",
    registryDependencies: ["https://magicui.design/r/retro-grid"],
    files: [
      {
        path: "registry/example/retro-grid-demo.tsx",
        type: "registry:example",
        target: "components/retro-grid-demo.tsx",
      },
    ],
  },
  {
    name: "animated-list-demo",
    type: "registry:example",
    title: "Animated List Demo",
    description: "Example showing a list with sequenced item animations.",
    registryDependencies: ["https://magicui.design/r/animated-list"],
    files: [
      {
        path: "registry/example/animated-list-demo.tsx",
        type: "registry:example",
        target: "components/animated-list-demo.tsx",
      },
    ],
  },
  {
    name: "animated-shiny-text-demo",
    type: "registry:example",
    title: "Animated Shiny Text Demo",
    description: "Example showing text with a shimmering light effect.",
    registryDependencies: ["https://magicui.design/r/animated-shiny-text"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "registry/example/animated-shiny-text-demo.tsx",
        type: "registry:example",
        target: "components/animated-shiny-text-demo.tsx",
      },
    ],
  },
  {
    name: "particles-demo",
    type: "registry:example",
    title: "Particles Demo",
    description: "Example showing interactive particle effects.",
    registryDependencies: ["https://magicui.design/r/particles"],
    dependencies: ["next-themes"],
    files: [
      {
        path: "registry/example/particles-demo.tsx",
        type: "registry:example",
        target: "components/particles-demo.tsx",
      },
    ],
  },
  {
    name: "animated-grid-pattern-demo",
    type: "registry:example",
    title: "Animated Grid Pattern Demo",
    description: "Example showing an animated grid pattern background.",
    registryDependencies: ["https://magicui.design/r/animated-grid-pattern"],
    files: [
      {
        path: "registry/example/animated-grid-pattern-demo.tsx",
        type: "registry:example",
        target: "components/animated-grid-pattern-demo.tsx",
      },
    ],
  },
  {
    name: "interactive-grid-pattern-demo",
    type: "registry:example",
    title: "Interactive Grid Pattern Demo",
    description: "Example showing an interactive grid pattern background.",
    registryDependencies: ["https://magicui.design/r/interactive-grid-pattern"],
    files: [
      {
        path: "registry/example/interactive-grid-pattern-demo.tsx",
        type: "registry:example",
        target: "components/interactive-grid-pattern-demo.tsx",
      },
    ],
  },
  {
    name: "interactive-grid-pattern-demo-2",
    type: "registry:example",
    title: "Interactive Grid Pattern Demo 2",
    description:
      "Second example showing an interactive grid pattern background.",
    registryDependencies: ["https://magicui.design/r/interactive-grid-pattern"],
    files: [
      {
        path: "registry/example/interactive-grid-pattern-demo-2.tsx",
        type: "registry:example",
        target: "components/interactive-grid-pattern-demo-2.tsx",
      },
    ],
  },
  {
    name: "border-beam-demo",
    type: "registry:example",
    title: "Border Beam Demo",
    description: "Example showing an animated border beam effect.",
    registryDependencies: ["https://magicui.design/r/border-beam"],
    files: [
      {
        path: "registry/example/border-beam-demo.tsx",
        type: "registry:example",
        target: "components/border-beam-demo.tsx",
      },
    ],
  },
  {
    name: "border-beam-demo-2",
    type: "registry:example",
    title: "Border Beam Demo",
    description: "Example showing an animated border beam effect.",
    registryDependencies: [
      "button",
      "card",
      "https://magicui.design/r/border-beam",
    ],
    files: [
      {
        path: "registry/example/border-beam-demo-2.tsx",
        type: "registry:example",
        target: "components/border-beam-demo-2.tsx",
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
      "https://magicui.design/r/border-beam",
    ],
    files: [
      {
        path: "registry/example/border-beam-demo-3.tsx",
        type: "registry:example",
        target: "components/border-beam-demo-3.tsx",
      },
    ],
  },
  {
    name: "border-beam-demo-4",
    type: "registry:example",
    title: "Border Beam Demo 4",
    description: "Example showing an animated border beam effect.",
    registryDependencies: ["button", "https://magicui.design/r/border-beam"],
    files: [
      {
        path: "registry/example/border-beam-demo-4.tsx",
        type: "registry:example",
        target: "components/border-beam-demo-4.tsx",
      },
    ],
  },
  {
    name: "animated-beam-demo",
    type: "registry:example",
    title: "Animated Beam Demo",
    description: "Example showing an animated beam of light effect.",
    registryDependencies: ["https://magicui.design/r/animated-beam"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "registry/example/animated-beam-demo.tsx",
        type: "registry:example",
        target: "components/animated-beam-demo.tsx",
      },
    ],
  },
  {
    name: "animated-beam-unidirectional",
    type: "registry:example",
    title: "Animated Beam Unidirectional",
    description: "Example showing a unidirectional animated beam effect.",
    registryDependencies: ["https://magicui.design/r/animated-beam"],
    files: [
      {
        path: "registry/example/animated-beam-unidirectional.tsx",
        type: "registry:example",
        target: "components/animated-beam-unidirectional.tsx",
      },
    ],
  },
  {
    name: "animated-beam-bidirectional",
    type: "registry:example",
    title: "Animated Beam Bidirectional",
    description: "Example showing a bidirectional animated beam effect.",
    registryDependencies: ["https://magicui.design/r/animated-beam"],
    files: [
      {
        path: "registry/example/animated-beam-bidirectional.tsx",
        type: "registry:example",
        target: "components/animated-beam-bidirectional.tsx",
      },
    ],
  },
  {
    name: "animated-beam-multiple-inputs",
    type: "registry:example",
    title: "Animated Beam Multiple Inputs",
    description: "Example showing animated beams with multiple input points.",
    registryDependencies: ["https://magicui.design/r/animated-beam"],
    files: [
      {
        path: "registry/example/animated-beam-multiple-inputs.tsx",
        type: "registry:example",
        target: "components/animated-beam-multiple-inputs.tsx",
      },
    ],
  },
  {
    name: "animated-beam-multiple-outputs",
    type: "registry:example",
    title: "Animated Beam Multiple Outputs",
    description: "Example showing animated beams with multiple output points.",
    registryDependencies: ["https://magicui.design/r/animated-beam"],
    files: [
      {
        path: "registry/example/animated-beam-multiple-outputs.tsx",
        type: "registry:example",
        target: "components/animated-beam-multiple-outputs.tsx",
      },
    ],
  },
  {
    name: "text-reveal-demo",
    type: "registry:example",
    title: "Text Reveal Demo",
    description: "Example showing text that fades in on scroll.",
    registryDependencies: ["https://magicui.design/r/text-reveal"],
    files: [
      {
        path: "registry/example/text-reveal-demo.tsx",
        type: "registry:example",
        target: "components/text-reveal-demo.tsx",
      },
    ],
  },
  {
    name: "animated-gradient-text-demo",
    type: "registry:example",
    title: "Animated Gradient Text Demo",
    description: "Example showing text with animated gradient backgrounds.",
    registryDependencies: ["https://magicui.design/r/animated-gradient-text"],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "registry/example/animated-gradient-text-demo.tsx",
        type: "registry:example",
        target: "components/animated-gradient-text-demo.tsx",
      },
    ],
  },
  {
    name: "animated-gradient-text-demo-2",
    type: "registry:example",
    title: "Animated Gradient Text Demo 2",
    description:
      "Second example showing text with animated gradient backgrounds.",
    registryDependencies: ["https://magicui.design/r/animated-gradient-text"],
    files: [
      {
        path: "registry/example/animated-gradient-text-demo-2.tsx",
        type: "registry:example",
        target: "components/animated-gradient-text-demo-2.tsx",
      },
    ],
  },
  {
    name: "orbiting-circles-demo",
    type: "registry:example",
    title: "Orbiting Circles Demo",
    description: "Example showing circles moving in orbital paths.",
    registryDependencies: ["https://magicui.design/r/orbiting-circles"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      {
        path: "registry/example/orbiting-circles-demo.tsx",
        type: "registry:example",
        target: "components/orbiting-circles-demo.tsx",
      },
    ],
  },
  {
    name: "dock-demo",
    type: "registry:example",
    title: "Dock Demo",
    description: "Example showing a MacOS-style dock implementation.",
    dependencies: ["next-themes"],
    registryDependencies: ["button", "https://magicui.design/r/dock"],
    files: [
      {
        path: "registry/example/dock-demo.tsx",
        type: "registry:example",
        target: "components/dock-demo.tsx",
      },
      {
        path: "registry/magicui/mode-toggle.tsx",
        type: "registry:ui",
        target: "components/magicui/mode-toggle.tsx",
      },
    ],
  },
  {
    name: "dock-demo-2",
    type: "registry:example",
    title: "Dock Demo 2",
    description: "Second example showing a MacOS-style dock implementation.",
    registryDependencies: ["https://magicui.design/r/dock"],
    files: [
      {
        path: "registry/example/dock-demo-2.tsx",
        type: "registry:example",
        target: "components/dock-demo-2.tsx",
      },
    ],
  },
  {
    name: "dock-demo-3",
    type: "registry:example",
    title: "Dock Demo 3",
    description: "Third example showing a MacOS-style dock implementation.",
    registryDependencies: ["https://magicui.design/r/dock"],
    files: [
      {
        path: "registry/example/dock-demo-3.tsx",
        type: "registry:example",
        target: "components/dock-demo-3.tsx",
      },
    ],
  },
  {
    name: "word-rotate-demo",
    type: "registry:example",
    title: "Word Rotate Demo",
    description: "Example showing vertical word rotation animation.",
    registryDependencies: ["https://magicui.design/r/word-rotate"],
    files: [
      {
        path: "registry/example/word-rotate-demo.tsx",
        type: "registry:example",
        target: "components/word-rotate-demo.tsx",
      },
    ],
  },
  {
    name: "hyper-text-demo",
    type: "registry:example",
    title: "Hyper Text Demo",
    description: "Example showing text with scrambling letter animations.",
    registryDependencies: ["https://magicui.design/r/hyper-text"],
    files: [
      {
        path: "registry/example/hyper-text-demo.tsx",
        type: "registry:example",
        target: "components/hyper-text-demo.tsx",
      },
    ],
  },
  {
    name: "avatar-circles-demo",
    type: "registry:example",
    title: "Avatar Circles Demo",
    description: "Example showing overlapping avatar circles.",
    registryDependencies: ["https://magicui.design/r/avatar-circles"],
    files: [
      {
        path: "registry/example/avatar-circles-demo.tsx",
        type: "registry:example",
        target: "components/avatar-circles-demo.tsx",
      },
    ],
  },
  {
    name: "typing-animation-demo",
    type: "registry:example",
    title: "Typing Animation Demo",
    description: "Example showing typed character animations.",
    registryDependencies: ["https://magicui.design/r/typing-animation"],
    files: [
      {
        path: "registry/example/typing-animation-demo.tsx",
        type: "registry:example",
        target: "components/typing-animation-demo.tsx",
      },
    ],
  },
  {
    name: "scroll-based-velocity-demo",
    type: "registry:example",
    title: "Scroll Based Velocity Demo",
    description: "Example showing text speed changes based on scroll velocity.",
    registryDependencies: ["https://magicui.design/r/scroll-based-velocity"],
    files: [
      {
        path: "registry/example/scroll-based-velocity-demo.tsx",
        type: "registry:example",
        target: "components/scroll-based-velocity-demo.tsx",
      },
    ],
  },
  {
    name: "scratch-to-reveal-demo",
    type: "registry:example",
    title: "Scratch To Reveal Demo",
    description: "Example showing an interactive scratch-off reveal effect.",
    registryDependencies: ["https://magicui.design/r/scratch-to-reveal"],
    files: [
      {
        path: "registry/example/scratch-to-reveal-demo.tsx",
        type: "registry:example",
        target: "components/scratch-to-reveal-demo.tsx",
      },
    ],
  },
  {
    name: "flip-text-demo",
    type: "registry:example",
    title: "Flip Text Demo",
    description: "Example showing text with character flip animations.",
    registryDependencies: ["https://magicui.design/r/flip-text"],
    files: [
      {
        path: "registry/example/flip-text-demo.tsx",
        type: "registry:example",
        target: "components/flip-text-demo.tsx",
      },
    ],
  },
  {
    name: "sparkles-text-demo",
    type: "registry:example",
    title: "Sparkles Text Demo",
    description: "Example showing text with animated sparkle effects.",
    registryDependencies: ["https://magicui.design/r/sparkles-text"],
    files: [
      {
        path: "registry/example/sparkles-text-demo.tsx",
        type: "registry:example",
        target: "components/sparkles-text-demo.tsx",
      },
    ],
  },
  {
    name: "spinning-text-demo",
    type: "registry:example",
    title: "Spinning Text Demo",
    description: "Example showing spinning text animation.",
    registryDependencies: ["https://magicui.design/r/spinning-text"],
    files: [
      {
        path: "registry/example/spinning-text-demo.tsx",
        type: "registry:example",
        target: "components/spinning-text-demo.tsx",
      },
    ],
  },
  {
    name: "spinning-text-demo-2",
    type: "registry:example",
    title: "Spinning Text Demo 2",
    description: "Example showing spinning text animation.",
    registryDependencies: ["https://magicui.design/r/spinning-text"],
    files: [
      {
        path: "registry/example/spinning-text-demo-2.tsx",
        type: "registry:example",
        target: "components/spinning-text-demo-2.tsx",
      },
    ],
  },
  {
    name: "icon-cloud-demo",
    type: "registry:example",
    title: "Icon Cloud Demo",
    description: "Example showing an interactive 3D icon cloud.",
    registryDependencies: ["https://magicui.design/r/icon-cloud"],
    files: [
      {
        path: "registry/example/icon-cloud-demo.tsx",
        type: "registry:example",
        target: "components/icon-cloud-demo.tsx",
      },
    ],
  },
  {
    name: "icon-cloud-demo-2",
    type: "registry:example",
    title: "Icon Cloud Demo 2",
    description: "Second example showing an interactive 3D icon cloud.",
    registryDependencies: ["https://magicui.design/r/icon-cloud"],
    files: [
      {
        path: "registry/example/icon-cloud-demo-2.tsx",
        type: "registry:example",
        target: "components/icon-cloud-demo-2.tsx",
      },
    ],
  },
  {
    name: "icon-cloud-demo-3",
    type: "registry:example",
    title: "Icon Cloud Demo 3",
    description: "Third example showing an interactive 3D icon cloud.",
    registryDependencies: ["https://magicui.design/r/icon-cloud"],
    files: [
      {
        path: "registry/example/icon-cloud-demo-3.tsx",
        type: "registry:example",
        target: "components/icon-cloud-demo-3.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo",
    type: "registry:example",
    title: "Text Animate Demo",
    description: "Example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo.tsx",
        type: "registry:example",
        target: "components/text-animate-demo.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo-2",
    type: "registry:example",
    title: "Text Animate Demo 2",
    description: "Second example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo-2.tsx",
        type: "registry:example",
        target: "components/text-animate-demo-2.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo-3",
    type: "registry:example",
    title: "Text Animate Demo 3",
    description: "Third example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo-3.tsx",
        type: "registry:example",
        target: "components/text-animate-demo-3.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo-4",
    type: "registry:example",
    title: "Text Animate Demo 4",
    description: "Fourth example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo-4.tsx",
        type: "registry:example",
        target: "components/text-animate-demo-4.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo-5",
    type: "registry:example",
    title: "Text Animate Demo 5",
    description: "Fifth example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo-5.tsx",
        type: "registry:example",
        target: "components/text-animate-demo-5.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo-6",
    type: "registry:example",
    title: "Text Animate Demo 6",
    description: "Sixth example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo-6.tsx",
        type: "registry:example",
        target: "components/text-animate-demo-6.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo-7",
    type: "registry:example",
    title: "Text Animate Demo 7",
    description: "Seventh example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo-7.tsx",
        type: "registry:example",
        target: "components/text-animate-demo-7.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo-8",
    type: "registry:example",
    title: "Text Animate Demo 8",
    description: "Eighth example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo-8.tsx",
        type: "registry:example",
        target: "components/text-animate-demo-8.tsx",
      },
    ],
  },
  {
    name: "text-animate-demo-9",
    type: "registry:example",
    title: "Text Animate Demo 9",
    description: "Ninth example showing various text animations.",
    registryDependencies: ["https://magicui.design/r/text-animate"],
    files: [
      {
        path: "registry/example/text-animate-demo-9.tsx",
        type: "registry:example",
        target: "components/text-animate-demo-9.tsx",
      },
    ],
  },
  {
    name: "shiny-button-demo",
    type: "registry:example",
    title: "Shiny Button Demo",
    description: "Example showing a shiny button with dynamic styles.",
    registryDependencies: ["https://magicui.design/r/shiny-button"],
    files: [
      {
        path: "registry/example/shiny-button-demo.tsx",
        type: "registry:example",
        target: "components/shiny-button-demo.tsx",
      },
    ],
  },
  {
    name: "box-reveal-demo",
    type: "registry:example",
    title: "Box Reveal Demo",
    description: "Example showing a sliding box text reveal animation.",
    registryDependencies: ["https://magicui.design/r/box-reveal"],
    files: [
      {
        path: "registry/example/box-reveal-demo.tsx",
        type: "registry:example",
        target: "components/box-reveal-demo.tsx",
      },
    ],
  },
  {
    name: "animated-circular-progress-bar-demo",
    type: "registry:example",
    title: "Animated Circular Progress Bar Demo",
    description: "Example showing an animated circular progress gauge.",
    registryDependencies: [
      "https://magicui.design/r/animated-circular-progress-bar",
    ],
    files: [
      {
        path: "registry/example/animated-circular-progress-bar-demo.tsx",
        type: "registry:example",
        target: "components/animated-circular-progress-bar-demo.tsx",
      },
    ],
  },
  {
    name: "shine-border-demo",
    type: "registry:example",
    title: "Shine Border Demo",
    description: "Example showing an animated shining border effect.",
    registryDependencies: ["https://magicui.design/r/shine-border"],
    files: [
      {
        path: "registry/example/shine-border-demo.tsx",
        type: "registry:example",
        target: "components/shine-border-demo.tsx",
      },
    ],
  },
  {
    name: "shine-border-demo-2",
    type: "registry:example",
    title: "Shine Border Demo 2",
    description: "Second example showing an animated shining border effect.",
    registryDependencies: ["https://magicui.design/r/shine-border"],
    files: [
      {
        path: "registry/example/shine-border-demo-2.tsx",
        type: "registry:example",
        target: "components/shine-border-demo-2.tsx",
      },
    ],
  },
  {
    name: "confetti-demo",
    type: "registry:example",
    title: "Confetti Demo",
    description: "Example showing confetti animations for celebrations.",
    registryDependencies: ["https://magicui.design/r/confetti"],
    files: [
      {
        path: "registry/example/confetti-demo.tsx",
        type: "registry:example",
        target: "components/confetti-demo.tsx",
      },
    ],
  },
  {
    name: "confetti-basic-cannon",
    type: "registry:example",
    title: "Confetti Basic Cannon",
    description: "Example showing basic confetti cannon animation.",
    registryDependencies: ["https://magicui.design/r/confetti"],
    files: [
      {
        path: "registry/example/confetti-basic-cannon.tsx",
        type: "registry:example",
        target: "components/confetti-basic-cannon.tsx",
      },
    ],
  },
  {
    name: "confetti-random-direction",
    type: "registry:example",
    title: "Confetti Random Direction",
    description: "Example showing confetti with random directions.",
    registryDependencies: ["https://magicui.design/r/confetti"],
    files: [
      {
        path: "registry/example/confetti-random-direction.tsx",
        type: "registry:example",
        target: "components/confetti-random-direction.tsx",
      },
    ],
  },
  {
    name: "confetti-fireworks",
    type: "registry:example",
    title: "Confetti Fireworks",
    description: "Example showing fireworks-style confetti animation.",
    registryDependencies: ["https://magicui.design/r/confetti"],
    files: [
      {
        path: "registry/example/confetti-fireworks.tsx",
        type: "registry:example",
        target: "components/confetti-fireworks.tsx",
      },
    ],
  },
  {
    name: "confetti-stars",
    type: "registry:example",
    title: "Confetti Stars",
    description: "Example showing star-shaped confetti animation.",
    registryDependencies: ["https://magicui.design/r/confetti"],
    files: [
      {
        path: "registry/example/confetti-stars.tsx",
        type: "registry:example",
        target: "components/confetti-stars.tsx",
      },
    ],
  },
  {
    name: "confetti-side-cannons",
    type: "registry:example",
    title: "Confetti Side Cannons",
    description: "Example showing side-mounted confetti cannons.",
    registryDependencies: ["https://magicui.design/r/confetti"],
    files: [
      {
        path: "registry/example/confetti-side-cannons.tsx",
        type: "registry:example",
        target: "components/confetti-side-cannons.tsx",
      },
    ],
  },
  {
    name: "confetti-custom-shapes",
    type: "registry:example",
    title: "Confetti Custom Shapes",
    description: "Example showing confetti with custom shape particles.",
    registryDependencies: ["https://magicui.design/r/confetti"],
    files: [
      {
        path: "registry/example/confetti-custom-shapes.tsx",
        type: "registry:example",
        target: "components/confetti-custom-shapes.tsx",
      },
    ],
  },
  {
    name: "confetti-emoji",
    type: "registry:example",
    title: "Confetti Emoji",
    description: "Example showing confetti with emoji particles.",
    registryDependencies: ["https://magicui.design/r/confetti"],
    files: [
      {
        path: "registry/example/confetti-emoji.tsx",
        type: "registry:example",
        target: "components/confetti-emoji.tsx",
      },
    ],
  },
  {
    name: "animated-subscribe-button-demo",
    type: "registry:example",
    title: "Animated Subscribe Button Demo",
    description:
      "Example showing an animated subscribe button with micro animations.",
    registryDependencies: [
      "https://magicui.design/r/animated-subscribe-button",
    ],
    files: [
      {
        path: "registry/example/animated-subscribe-button-demo.tsx",
        type: "registry:example",
        target: "components/animated-subscribe-button-demo.tsx",
      },
    ],
  },
  {
    name: "cool-mode-demo",
    type: "registry:example",
    title: "Cool Mode Demo",
    description: "Example showing cool mode effect for buttons and links.",
    registryDependencies: ["https://magicui.design/r/cool-mode"],
    files: [
      {
        path: "registry/example/cool-mode-demo.tsx",
        type: "registry:example",
        target: "components/cool-mode-demo.tsx",
      },
    ],
  },
  {
    name: "cool-mode-custom",
    type: "registry:example",
    title: "Cool Mode Custom",
    description: "Example showing customized cool mode effects.",
    registryDependencies: ["https://magicui.design/r/cool-mode"],
    files: [
      {
        path: "registry/example/cool-mode-custom.tsx",
        type: "registry:example",
        target: "components/cool-mode-custom.tsx",
      },
    ],
  },
  {
    name: "pulsating-button-demo",
    type: "registry:example",
    title: "Pulsating Button Demo",
    description: "Example showing an animated pulsating button.",
    registryDependencies: ["https://magicui.design/r/pulsating-button"],
    files: [
      {
        path: "registry/example/pulsating-button-demo.tsx",
        type: "registry:example",
        target: "components/pulsating-button-demo.tsx",
      },
    ],
  },
  {
    name: "ripple-button-demo",
    type: "registry:example",
    title: "Ripple Button Demo",
    description: "Example showing an animated button with ripple effect.",
    registryDependencies: ["https://magicui.design/r/ripple-button"],
    files: [
      {
        path: "registry/example/ripple-button-demo.tsx",
        type: "registry:example",
        target: "components/ripple-button-demo.tsx",
      },
    ],
  },
  {
    name: "file-tree-demo",
    type: "registry:example",
    title: "File Tree Demo",
    description:
      "Example showing a component that displays folder and file structure.",
    registryDependencies: ["https://magicui.design/r/file-tree"],
    files: [
      {
        path: "registry/example/file-tree-demo.tsx",
        type: "registry:example",
        target: "components/file-tree-demo.tsx",
      },
    ],
  },
  {
    name: "blur-fade-demo",
    type: "registry:example",
    title: "Blur Fade Demo",
    description: "Example showing blur fade in and out animations.",
    registryDependencies: ["https://magicui.design/r/blur-fade"],
    files: [
      {
        path: "registry/example/blur-fade-demo.tsx",
        type: "registry:example",
        target: "components/blur-fade-demo.tsx",
      },
    ],
  },
  {
    name: "blur-fade-text-demo",
    type: "registry:example",
    title: "Blur Fade Text Demo",
    description: "Example showing blur fade animations with text.",
    registryDependencies: ["https://magicui.design/r/blur-fade"],
    files: [
      {
        path: "registry/example/blur-fade-text-demo.tsx",
        type: "registry:example",
        target: "components/blur-fade-text-demo.tsx",
      },
    ],
  },
  {
    name: "safari-demo",
    type: "registry:example",
    title: "Safari Demo",
    description: "Example showing a Safari browser mockup.",
    registryDependencies: ["https://magicui.design/r/safari"],
    files: [
      {
        path: "registry/example/safari-demo.tsx",
        type: "registry:example",
        target: "components/safari-demo.tsx",
      },
    ],
  },
  {
    name: "safari-demo-2",
    type: "registry:example",
    title: "Safari Demo 2",
    description: "Second example showing a Safari browser mockup.",
    registryDependencies: ["https://magicui.design/r/safari"],
    files: [
      {
        path: "registry/example/safari-demo-2.tsx",
        type: "registry:example",
        target: "components/safari-demo-2.tsx",
      },
    ],
  },
  {
    name: "safari-demo-3",
    type: "registry:example",
    title: "Safari Demo 3",
    description: "Third example showing a Safari browser mockup.",
    registryDependencies: ["https://magicui.design/r/safari"],
    files: [
      {
        path: "registry/example/safari-demo-3.tsx",
        type: "registry:example",
        target: "components/safari-demo-3.tsx",
      },
    ],
  },
  {
    name: "safari-demo-4",
    type: "registry:example",
    title: "Safari Demo 4",
    description: "Fourth example showing a Safari browser mockup.",
    registryDependencies: ["https://magicui.design/r/safari"],
    files: [
      {
        path: "registry/example/safari-demo-4.tsx",
        type: "registry:example",
        target: "components/safari-demo-4.tsx",
      },
    ],
  },
  {
    name: "iphone-15-pro-demo",
    type: "registry:example",
    title: "iPhone 15 Pro Demo",
    description: "Example showing an iPhone 15 Pro mockup.",
    registryDependencies: ["https://magicui.design/r/iphone-15-pro"],
    files: [
      {
        path: "registry/example/iphone-15-pro-demo.tsx",
        type: "registry:example",
        target: "components/iphone-15-pro-demo.tsx",
      },
    ],
  },
  {
    name: "iphone-15-pro-demo-2",
    type: "registry:example",
    title: "iPhone 15 Pro Demo 2",
    description: "Second example showing an iPhone 15 Pro mockup.",
    registryDependencies: ["https://magicui.design/r/iphone-15-pro"],
    files: [
      {
        path: "registry/example/iphone-15-pro-demo-2.tsx",
        type: "registry:example",
        target: "components/iphone-15-pro-demo-2.tsx",
      },
    ],
  },
  {
    name: "iphone-15-pro-demo-3",
    type: "registry:example",
    title: "iPhone 15 Pro Demo 3",
    description: "Third example showing an iPhone 15 Pro mockup.",
    registryDependencies: ["https://magicui.design/r/iphone-15-pro"],
    files: [
      {
        path: "registry/example/iphone-15-pro-demo-3.tsx",
        type: "registry:example",
        target: "components/iphone-15-pro-demo-3.tsx",
      },
    ],
  },
  {
    name: "rainbow-button-demo",
    type: "registry:example",
    title: "Rainbow Button Demo",
    description: "Example showing an animated button with rainbow effect.",
    registryDependencies: ["https://magicui.design/r/rainbow-button"],
    files: [
      {
        path: "registry/example/rainbow-button-demo.tsx",
        type: "registry:example",
        target: "components/rainbow-button-demo.tsx",
      },
    ],
  },
  {
    name: "interactive-hover-button-demo",
    type: "registry:example",
    title: "Interactive Hover Button Demo",
    description: "Example showing an interactive button with hover effects.",
    registryDependencies: ["https://magicui.design/r/interactive-hover-button"],
    files: [
      {
        path: "registry/example/interactive-hover-button-demo.tsx",
        type: "registry:example",
        target: "components/interactive-hover-button-demo.tsx",
      },
    ],
  },
  {
    name: "terminal-demo",
    type: "registry:example",
    title: "Terminal Demo",
    description: "Example showing a terminal with animated text.",
    registryDependencies: ["https://magicui.design/r/terminal"],
    files: [
      {
        path: "registry/example/terminal-demo.tsx",
        type: "registry:example",
        target: "components/terminal-demo.tsx",
      },
    ],
  },
  {
    name: "video-text-demo",
    type: "registry:example",
    title: "Video Text Demo",
    description: "Example showing text with a video background.",
    registryDependencies: ["https://magicui.design/r/video-text"],
    files: [
      {
        path: "registry/example/video-text-demo.tsx",
        type: "registry:example",
        target: "components/video-text-demo.tsx",
      },
    ],
  },
];
