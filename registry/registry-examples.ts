import { type Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "magic-card-demo",
    type: "registry:example",
    title: "Magic Card Demo",
    description:
      "Example showing a spotlight effect that follows your mouse cursor and highlights borders on hover.",
    registryDependencies: ["magic-card"],
    files: [{ path: "example/magic-card-demo.tsx", type: "registry:example" }],
  },
  {
    name: "android-demo",
    type: "registry:example",
    title: "Android Demo",
    description: "Example showing a mockup of an Android device.",
    registryDependencies: ["android"],
    files: [{ path: "example/android-demo.tsx", type: "registry:example" }],
  },
  {
    name: "android-demo-2",
    type: "registry:example",
    title: "Android Demo 2",
    description: "Second example showing a mockup of an Android device.",
    registryDependencies: ["android"],
    files: [{ path: "example/android-demo-2.tsx", type: "registry:example" }],
  },
  {
    name: "android-demo-3",
    type: "registry:example",
    title: "Android Demo 3",
    description: "Third example showing a mockup of an Android device.",
    registryDependencies: ["android"],
    files: [{ path: "example/android-demo-3.tsx", type: "registry:example" }],
  },
  {
    name: "warp-background-demo",
    type: "registry:example",
    title: "Warp Background Demo",
    description:
      "Example showing a card with a time warping background effect.",
    registryDependencies: ["warp-background"],
    files: [
      { path: "example/warp-background-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "line-shadow-text-demo",
    type: "registry:example",
    title: "Line Shadow Text Demo",
    description: "Example showing a text component with a moving line shadow.",
    registryDependencies: ["line-shadow-text"],
    files: [
      { path: "example/line-shadow-text-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "aurora-text-demo",
    type: "registry:example",
    title: "Aurora Text Demo",
    description: "Example showing a beautiful aurora text effect.",
    registryDependencies: ["aurora-text"],
    files: [{ path: "example/aurora-text-demo.tsx", type: "registry:example" }],
  },
  {
    name: "morphing-text-demo",
    type: "registry:example",
    title: "Morphing Text Demo",
    description: "Example showing a dynamic text morphing component.",
    registryDependencies: ["morphing-text"],
    files: [
      { path: "example/morphing-text-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "scroll-progress-demo",
    type: "registry:example",
    title: "Scroll Progress Demo",
    description: "Example showing animated scroll progress for your pages.",
    registryDependencies: ["scroll-progress"],
    files: [
      { path: "example/scroll-progress-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "neon-gradient-card-demo",
    type: "registry:example",
    title: "Neon Gradient Card Demo",
    description: "Example showing a beautiful neon card effect.",
    files: [
      { path: "example/neon-gradient-card-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "meteors-demo",
    type: "registry:example",
    title: "Meteors Demo",
    description: "Example showing a meteor shower effect.",
    registryDependencies: ["meteors"],
    files: [{ path: "example/meteors-demo.tsx", type: "registry:example" }],
  },
  {
    name: "grid-pattern-demo",
    type: "registry:example",
    title: "Grid Pattern Demo",
    description: "Example showing a background grid pattern made with SVGs.",
    registryDependencies: ["grid-pattern"],
    files: [
      { path: "example/grid-pattern-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "grid-pattern-linear-gradient",
    type: "registry:example",
    title: "Grid Pattern Linear Gradient",
    description: "Example showing a grid pattern with linear gradient effects.",
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
    title: "Grid Pattern Dashed",
    description: "Example showing a dashed grid pattern.",
    registryDependencies: ["grid-pattern"],
    files: [
      { path: "example/grid-pattern-dashed.tsx", type: "registry:example" },
    ],
  },
  {
    name: "dot-pattern-demo",
    type: "registry:example",
    title: "Dot Pattern Demo",
    description: "Example showing a background dot pattern made with SVGs.",
    registryDependencies: ["dot-pattern"],
    files: [{ path: "example/dot-pattern-demo.tsx", type: "registry:example" }],
  },
  {
    name: "dot-pattern-linear-gradient",
    type: "registry:example",
    title: "Dot Pattern Linear Gradient",
    description: "Example showing a dot pattern with linear gradient effects.",
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
    title: "Flickering Grid Demo",
    description: "Example showing a flickering grid background.",
    files: [
      { path: "example/flickering-grid-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "flickering-grid-rounded-demo",
    type: "registry:example",
    title: "Flickering Grid Rounded Demo",
    description:
      "Example showing a flickering grid background with rounded corners.",
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
    files: [
      { path: "example/hero-video-dialog-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "hero-video-dialog-demo-top-in-bottom-out",
    type: "registry:example",
    title: "Hero Video Dialog Top In Bottom Out Demo",
    description:
      "Example showing a hero video dialog with top-in bottom-out animation.",
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
    files: [
      { path: "example/code-comparison-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "script-copy-btn-demo",
    type: "registry:example",
    title: "Script Copy Button Demo",
    description: "Example showing how to copy code to clipboard.",
    files: [
      { path: "example/script-copy-btn-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "marquee-demo",
    type: "registry:example",
    title: "Marquee Demo",
    description: "Example showing an infinite scrolling component.",
    registryDependencies: ["marquee"],
    files: [{ path: "example/marquee-demo.tsx", type: "registry:example" }],
  },
  {
    name: "marquee-demo-vertical",
    type: "registry:example",
    title: "Marquee Vertical Demo",
    description: "Example showing a vertical infinite scrolling component.",
    registryDependencies: ["marquee"],
    files: [
      { path: "example/marquee-demo-vertical.tsx", type: "registry:example" },
    ],
  },
  {
    name: "marquee-logos",
    type: "registry:example",
    title: "Marquee Logos",
    description: "Example showing an infinite scrolling logo carousel.",
    registryDependencies: ["marquee"],
    files: [{ path: "example/marquee-logos.tsx", type: "registry:example" }],
  },
  {
    name: "marquee-3d",
    type: "registry:example",
    title: "Marquee 3D",
    description: "Example showing a 3D infinite scrolling component.",
    registryDependencies: ["marquee"],
    files: [{ path: "example/marquee-3d.tsx", type: "registry:example" }],
  },
  {
    name: "globe-demo",
    type: "registry:example",
    title: "Globe Demo",
    description: "Example showing an autorotating, interactive WebGL globe.",
    registryDependencies: ["globe"],
    files: [{ path: "example/globe-demo.tsx", type: "registry:example" }],
  },
  {
    name: "tweet-card-demo",
    type: "registry:example",
    title: "Tweet Card Demo",
    description: "Example showing a tweet card with author info.",
    registryDependencies: ["tweet-card"],
    files: [{ path: "example/tweet-card-demo.tsx", type: "registry:example" }],
  },
  {
    name: "tweet-card-images",
    type: "registry:example",
    title: "Tweet Card Images",
    description: "Example showing a tweet card with images.",
    registryDependencies: ["tweet-card"],
    files: [
      { path: "example/tweet-card-images.tsx", type: "registry:example" },
    ],
  },
  {
    name: "tweet-card-meta-preview",
    type: "registry:example",
    title: "Tweet Card Meta Preview",
    description: "Example showing a tweet card with meta preview.",
    registryDependencies: ["tweet-card"],
    files: [
      { path: "example/tweet-card-meta-preview.tsx", type: "registry:example" },
    ],
  },
  {
    name: "shimmer-button-demo",
    type: "registry:example",
    title: "Shimmer Button Demo",
    description: "Example showing a button with a shimmering light effect.",
    registryDependencies: ["shimmer-button"],
    files: [
      { path: "example/shimmer-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "bento-demo",
    type: "registry:example",
    title: "Bento Demo",
    description: "Example showing a bento grid layout for showcasing features.",
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
    title: "Bento Vertical Demo",
    description: "Example showing a vertical bento grid layout.",
    registryDependencies: ["bento-grid"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      { path: "example/bento-demo-vertical.tsx", type: "registry:example" },
    ],
  },
  {
    name: "number-ticker-demo",
    type: "registry:example",
    title: "Number Ticker Demo",
    description: "Example showing animated counting numbers.",
    registryDependencies: ["number-ticker"],
    files: [
      { path: "example/number-ticker-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "number-ticker-decimal-demo",
    type: "registry:example",
    title: "Number Ticker Decimal Demo",
    description: "Example showing animated counting decimal numbers.",
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
    title: "Ripple Demo",
    description: "Example showing an animated ripple effect.",
    registryDependencies: ["ripple"],
    files: [{ path: "example/ripple-demo.tsx", type: "registry:example" }],
  },
  {
    name: "retro-grid-demo",
    type: "registry:example",
    title: "Retro Grid Demo",
    description: "Example showing an animated scrolling retro grid effect.",
    files: [{ path: "example/retro-grid-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-list-demo",
    type: "registry:example",
    title: "Animated List Demo",
    description: "Example showing a list with sequenced item animations.",
    registryDependencies: ["animated-list"],
    files: [
      { path: "example/animated-list-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "animated-shiny-text-demo",
    type: "registry:example",
    title: "Animated Shiny Text Demo",
    description: "Example showing text with a shimmering light effect.",
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
    title: "Particles Demo",
    description: "Example showing interactive particle effects.",
    registryDependencies: ["particles"],
    dependencies: ["next-themes"],
    files: [{ path: "example/particles-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-grid-pattern-demo",
    type: "registry:example",
    title: "Animated Grid Pattern Demo",
    description: "Example showing an animated grid pattern background.",
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
    title: "Interactive Grid Pattern Demo",
    description: "Example showing an interactive grid pattern background.",
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
    title: "Interactive Grid Pattern Demo 2",
    description:
      "Second example showing an interactive grid pattern background.",
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
    title: "Border Beam Demo",
    description: "Example showing an animated border beam effect.",
    registryDependencies: ["border-beam"],
    files: [{ path: "example/border-beam-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-beam-demo",
    type: "registry:example",
    title: "Animated Beam Demo",
    description: "Example showing an animated beam of light effect.",
    registryDependencies: ["animated-beam"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      { path: "example/animated-beam-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "animated-beam-unidirectional",
    type: "registry:example",
    title: "Animated Beam Unidirectional",
    description: "Example showing a unidirectional animated beam effect.",
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
    title: "Animated Beam Bidirectional",
    description: "Example showing a bidirectional animated beam effect.",
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
    title: "Animated Beam Multiple Inputs",
    description: "Example showing animated beams with multiple input points.",
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
    title: "Animated Beam Multiple Outputs",
    description: "Example showing animated beams with multiple output points.",
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
    title: "Text Reveal Demo",
    description: "Example showing text that fades in on scroll.",
    registryDependencies: ["text-reveal"],
    files: [{ path: "example/text-reveal-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-gradient-text-demo",
    type: "registry:example",
    title: "Animated Gradient Text Demo",
    description: "Example showing text with animated gradient backgrounds.",
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
    title: "Orbiting Circles Demo",
    description: "Example showing circles moving in orbital paths.",
    registryDependencies: ["orbiting-circles"],
    dependencies: ["@radix-ui/react-icons"],
    files: [
      { path: "example/orbiting-circles-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "dock-demo",
    type: "registry:example",
    title: "Dock Demo",
    description: "Example showing a MacOS-style dock implementation.",
    registryDependencies: ["dock"],
    files: [{ path: "example/dock-demo.tsx", type: "registry:example" }],
  },
  {
    name: "dock-demo-2",
    type: "registry:example",
    title: "Dock Demo 2",
    description: "Second example showing a MacOS-style dock implementation.",
    registryDependencies: ["dock"],
    files: [{ path: "example/dock-demo-2.tsx", type: "registry:example" }],
  },
  {
    name: "dock-demo-3",
    type: "registry:example",
    title: "Dock Demo 3",
    description: "Third example showing a MacOS-style dock implementation.",
    registryDependencies: ["dock"],
    files: [{ path: "example/dock-demo-3.tsx", type: "registry:example" }],
  },
  {
    name: "word-rotate-demo",
    type: "registry:example",
    title: "Word Rotate Demo",
    description: "Example showing vertical word rotation animation.",
    registryDependencies: ["word-rotate"],
    files: [{ path: "example/word-rotate-demo.tsx", type: "registry:example" }],
  },
  {
    name: "hyper-text-demo",
    type: "registry:example",
    title: "Hyper Text Demo",
    description: "Example showing text with scrambling letter animations.",
    registryDependencies: ["hyper-text"],
    files: [{ path: "example/hyper-text-demo.tsx", type: "registry:example" }],
  },
  {
    name: "avatar-circles-demo",
    type: "registry:example",
    title: "Avatar Circles Demo",
    description: "Example showing overlapping avatar circles.",
    registryDependencies: ["avatar-circles"],
    files: [
      { path: "example/avatar-circles-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "typing-animation-demo",
    type: "registry:example",
    title: "Typing Animation Demo",
    description: "Example showing typed character animations.",
    registryDependencies: ["typing-animation"],
    files: [
      { path: "example/typing-animation-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "scroll-based-velocity-demo",
    type: "registry:example",
    title: "Scroll Based Velocity Demo",
    description: "Example showing text speed changes based on scroll velocity.",
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
    title: "Scratch To Reveal Demo",
    description: "Example showing an interactive scratch-off reveal effect.",
    registryDependencies: ["scratch-to-reveal"],
    files: [
      { path: "example/scratch-to-reveal-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "flip-text-demo",
    type: "registry:example",
    title: "Flip Text Demo",
    description: "Example showing text with character flip animations.",
    registryDependencies: ["flip-text"],
    files: [{ path: "example/flip-text-demo.tsx", type: "registry:example" }],
  },
  {
    name: "sparkles-text-demo",
    type: "registry:example",
    title: "Sparkles Text Demo",
    description: "Example showing text with animated sparkle effects.",
    files: [
      { path: "example/sparkles-text-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "icon-cloud-demo",
    type: "registry:example",
    title: "Icon Cloud Demo",
    description: "Example showing an interactive 3D icon cloud.",
    registryDependencies: ["icon-cloud"],
    files: [{ path: "example/icon-cloud-demo.tsx", type: "registry:example" }],
  },
  {
    name: "icon-cloud-demo-2",
    type: "registry:example",
    title: "Icon Cloud Demo 2",
    description: "Second example showing an interactive 3D icon cloud.",
    registryDependencies: ["icon-cloud"],
    files: [
      { path: "example/icon-cloud-demo-2.tsx", type: "registry:example" },
    ],
  },
  {
    name: "icon-cloud-demo-3",
    type: "registry:example",
    title: "Icon Cloud Demo 3",
    description: "Third example showing an interactive 3D icon cloud.",
    registryDependencies: ["icon-cloud"],
    files: [
      { path: "example/icon-cloud-demo-3.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo",
    type: "registry:example",
    title: "Text Animate Demo",
    description: "Example showing various text animations.",
    files: [
      { path: "example/text-animate-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-2",
    type: "registry:example",
    title: "Text Animate Demo 2",
    description: "Second example showing various text animations.",
    files: [
      { path: "example/text-animate-demo-2.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-3",
    type: "registry:example",
    title: "Text Animate Demo 3",
    description: "Third example showing various text animations.",
    files: [
      { path: "example/text-animate-demo-3.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-4",
    type: "registry:example",
    title: "Text Animate Demo 4",
    description: "Fourth example showing various text animations.",
    files: [
      { path: "example/text-animate-demo-4.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-5",
    type: "registry:example",
    title: "Text Animate Demo 5",
    description: "Fifth example showing various text animations.",
    files: [
      { path: "example/text-animate-demo-5.tsx", type: "registry:example" },
    ],
  },
  {
    name: "text-animate-demo-6",
    type: "registry:example",
    title: "Text Animate Demo 6",
    description: "Sixth example showing various text animations.",
    files: [
      { path: "example/text-animate-demo-6.tsx", type: "registry:example" },
    ],
  },
  {
    name: "shiny-button-demo",
    type: "registry:example",
    title: "Shiny Button Demo",
    description: "Example showing a shiny button with dynamic styles.",
    files: [
      { path: "example/shiny-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "box-reveal-demo",
    type: "registry:example",
    title: "Box Reveal Demo",
    description: "Example showing a sliding box text reveal animation.",
    files: [{ path: "example/box-reveal-demo.tsx", type: "registry:example" }],
  },
  {
    name: "animated-circular-progress-bar-demo",
    type: "registry:example",
    title: "Animated Circular Progress Bar Demo",
    description: "Example showing an animated circular progress gauge.",
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
    files: [
      { path: "example/shine-border-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "shine-border-demo-2",
    type: "registry:example",
    title: "Shine Border Demo 2",
    description: "Second example showing an animated shining border effect.",
    files: [
      { path: "example/shine-border-demo-2.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-demo",
    type: "registry:example",
    title: "Confetti Demo",
    description: "Example showing confetti animations for celebrations.",
    files: [{ path: "example/confetti-demo.tsx", type: "registry:example" }],
  },
  {
    name: "confetti-basic-cannon",
    type: "registry:example",
    title: "Confetti Basic Cannon",
    description: "Example showing basic confetti cannon animation.",
    files: [
      { path: "example/confetti-basic-cannon.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-random-direction",
    type: "registry:example",
    title: "Confetti Random Direction",
    description: "Example showing confetti with random directions.",
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
    files: [
      { path: "example/confetti-fireworks.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-stars",
    type: "registry:example",
    title: "Confetti Stars",
    description: "Example showing star-shaped confetti animation.",
    files: [{ path: "example/confetti-stars.tsx", type: "registry:example" }],
  },
  {
    name: "confetti-side-cannons",
    type: "registry:example",
    title: "Confetti Side Cannons",
    description: "Example showing side-mounted confetti cannons.",
    files: [
      { path: "example/confetti-side-cannons.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-custom-shapes",
    type: "registry:example",
    title: "Confetti Custom Shapes",
    description: "Example showing confetti with custom shape particles.",
    files: [
      { path: "example/confetti-custom-shapes.tsx", type: "registry:example" },
    ],
  },
  {
    name: "confetti-emoji",
    type: "registry:example",
    title: "Confetti Emoji",
    description: "Example showing confetti with emoji particles.",
    files: [{ path: "example/confetti-emoji.tsx", type: "registry:example" }],
  },
  {
    name: "animated-subscribe-button-demo",
    type: "registry:example",
    title: "Animated Subscribe Button Demo",
    description:
      "Example showing an animated subscribe button with micro animations.",
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
    title: "Cool Mode Demo",
    description: "Example showing cool mode effect for buttons and links.",
    files: [{ path: "example/cool-mode-demo.tsx", type: "registry:example" }],
  },
  {
    name: "cool-mode-custom",
    type: "registry:example",
    title: "Cool Mode Custom",
    description: "Example showing customized cool mode effects.",
    files: [{ path: "example/cool-mode-custom.tsx", type: "registry:example" }],
  },
  {
    name: "pulsating-button-demo",
    type: "registry:example",
    title: "Pulsating Button Demo",
    description: "Example showing an animated pulsating button.",
    files: [
      { path: "example/pulsating-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "ripple-button-demo",
    type: "registry:example",
    title: "Ripple Button Demo",
    description: "Example showing an animated button with ripple effect.",
    files: [
      { path: "example/ripple-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "file-tree-demo",
    type: "registry:example",
    title: "File Tree Demo",
    description:
      "Example showing a component that displays folder and file structure.",
    files: [{ path: "example/file-tree-demo.tsx", type: "registry:example" }],
  },
  {
    name: "blur-fade-demo",
    type: "registry:example",
    title: "Blur Fade Demo",
    description: "Example showing blur fade in and out animations.",
    files: [{ path: "example/blur-fade-demo.tsx", type: "registry:example" }],
  },
  {
    name: "blur-fade-text-demo",
    type: "registry:example",
    title: "Blur Fade Text Demo",
    description: "Example showing blur fade animations with text.",
    files: [
      { path: "example/blur-fade-text-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "safari-demo",
    type: "registry:example",
    title: "Safari Demo",
    description: "Example showing a Safari browser mockup.",
    files: [{ path: "example/safari-demo.tsx", type: "registry:example" }],
  },
  {
    name: "safari-demo-2",
    type: "registry:example",
    title: "Safari Demo 2",
    description: "Second example showing a Safari browser mockup.",
    files: [{ path: "example/safari-demo-2.tsx", type: "registry:example" }],
  },
  {
    name: "safari-demo-3",
    type: "registry:example",
    title: "Safari Demo 3",
    description: "Third example showing a Safari browser mockup.",
    files: [{ path: "example/safari-demo-3.tsx", type: "registry:example" }],
  },
  {
    name: "safari-demo-4",
    type: "registry:example",
    title: "Safari Demo 4",
    description: "Fourth example showing a Safari browser mockup.",
    files: [{ path: "example/safari-demo-4.tsx", type: "registry:example" }],
  },
  {
    name: "iphone-15-pro-demo",
    type: "registry:example",
    title: "iPhone 15 Pro Demo",
    description: "Example showing an iPhone 15 Pro mockup.",
    files: [
      { path: "example/iphone-15-pro-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "iphone-15-pro-demo-2",
    type: "registry:example",
    title: "iPhone 15 Pro Demo 2",
    description: "Second example showing an iPhone 15 Pro mockup.",
    files: [
      { path: "example/iphone-15-pro-demo-2.tsx", type: "registry:example" },
    ],
  },
  {
    name: "iphone-15-pro-demo-3",
    type: "registry:example",
    title: "iPhone 15 Pro Demo 3",
    description: "Third example showing an iPhone 15 Pro mockup.",
    files: [
      { path: "example/iphone-15-pro-demo-3.tsx", type: "registry:example" },
    ],
  },
  {
    name: "rainbow-button-demo",
    type: "registry:example",
    title: "Rainbow Button Demo",
    description: "Example showing an animated button with rainbow effect.",
    files: [
      { path: "example/rainbow-button-demo.tsx", type: "registry:example" },
    ],
  },
  {
    name: "interactive-hover-button-demo",
    type: "registry:example",
    title: "Interactive Hover Button Demo",
    description: "Example showing an interactive button with hover effects.",
    files: [
      {
        path: "example/interactive-hover-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
