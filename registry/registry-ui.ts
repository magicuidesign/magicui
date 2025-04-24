import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "magic-card",
    type: "registry:ui",
    title: "Magic Card",
    description:
      "A spotlight effect that follows your mouse cursor and highlights borders on hover.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/magic-card.tsx",
        type: "registry:ui",
        target: "components/magicui/magic-card.tsx",
      },
    ],
  },
  {
    name: "android",
    type: "registry:ui",
    title: "Android",
    description: "A mockup of an Android device.",
    files: [
      {
        path: "registry/magicui/android.tsx",
        type: "registry:ui",
        target: "components/magicui/android.tsx",
      },
    ],
  },
  {
    name: "warp-background",
    type: "registry:ui",
    title: "Warp Background",
    description: "A card with a time warping background effect.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/warp-background.tsx",
        type: "registry:ui",
        target: "components/magicui/warp-background.tsx",
      },
    ],
  },
  {
    name: "line-shadow-text",
    type: "registry:ui",
    title: "Line Shadow Text",
    description: "A text component with a moving line shadow.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/line-shadow-text.tsx",
        type: "registry:ui",
        target: "components/magicui/line-shadow-text.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-line-shadow": "line-shadow 15s linear infinite",
      },
    },
    css: {
      "@keyframes line-shadow": {
        "0%": {
          "background-position": "0 0",
        },
        "100%": {
          "background-position": "100% -100%",
        },
      },
    },
  },
  {
    name: "aurora-text",
    type: "registry:ui",
    title: "Aurora Text",
    description: "A beautiful aurora text effect",
    files: [
      {
        path: "registry/magicui/aurora-text.tsx",
        type: "registry:ui",
        target: "components/magicui/aurora-text.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-aurora": "aurora 8s ease-in-out infinite alternate",
      },
    },
    css: {
      "@keyframes aurora": {
        "0%": {
          "background-position": "0% 50%",
          transform: "rotate(-5deg) scale(0.9)",
        },
        "25%": {
          "background-position": "50% 100%",
          transform: "rotate(5deg) scale(1.1)",
        },
        "50%": {
          "background-position": "100% 50%",
          transform: "rotate(-3deg) scale(0.95)",
        },
        "75%": {
          "background-position": "50% 0%",
          transform: "rotate(3deg) scale(1.05)",
        },
        "100%": {
          "background-position": "0% 50%",
          transform: "rotate(-5deg) scale(0.9)",
        },
      },
    },
  },
  {
    name: "morphing-text",
    type: "registry:ui",
    title: "Morphing Text",
    description: "A dynamic text morphing component for Magic UI.",
    files: [
      {
        path: "registry/magicui/morphing-text.tsx",
        type: "registry:ui",
        target: "components/magicui/morphing-text.tsx",
      },
    ],
  },
  {
    name: "scroll-progress",
    type: "registry:ui",
    title: "Scroll Progress",
    description: "Animated Scroll Progress for your pages",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/scroll-progress.tsx",
        type: "registry:ui",
        target: "components/magicui/scroll-progress.tsx",
      },
    ],
  },
  {
    name: "lens",
    type: "registry:ui",
    title: "Lens",
    description:
      "A interactive component that enables zooming into images, videos and other elements.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/lens.tsx",
        type: "registry:ui",
        target: "components/magicui/lens.tsx",
      },
    ],
  },
  {
    name: "pointer",
    type: "registry:ui",
    title: "Pointer",
    description:
      "A component that displays a pointer when hovering over an element",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/pointer.tsx",
        type: "registry:ui",
        target: "components/magicui/pointer.tsx",
      },
    ],
  },
  {
    name: "smooth-cursor",
    description:
      "A customizable, physics-based smooth cursor animation component with spring animations and rotation effects",
    type: "registry:ui",
    files: [
      {
        path: "registry/magicui/smooth-cursor.tsx",
        type: "registry:ui",
      },
    ],
    dependencies: ["framer-motion"],
  },
  {
    name: "neon-gradient-card",
    type: "registry:ui",
    title: "Neon Gradient Card",
    description: "A beautiful neon card effect",
    files: [
      {
        path: "registry/magicui/neon-gradient-card.tsx",
        type: "registry:ui",
        target: "components/magicui/neon-gradient-card.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-background-position-spin":
          "background-position-spin 3000ms infinite alternate",
      },
    },
    css: {
      "@keyframes background-position-spin": {
        "0%": { "background-position": "top center" },
        "100%": { "background-position": "bottom center" },
      },
    },
  },
  {
    name: "meteors",
    type: "registry:ui",
    title: "Meteors",
    description: "A meteor shower effect.",
    files: [
      {
        path: "registry/magicui/meteors.tsx",
        type: "registry:ui",
        target: "components/magicui/meteors.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-meteor": "meteor 5s linear infinite",
      },
    },
    css: {
      "@keyframes meteor": {
        "0%": {
          transform: "rotate(var(--angle)) translateX(0)",
          opacity: "1",
        },
        "70%": { opacity: "1" },
        "100%": {
          transform: "rotate(var(--angle)) translateX(-500px)",
          opacity: "0",
        },
      },
    },
  },
  {
    name: "grid-pattern",
    type: "registry:ui",
    title: "Grid Pattern",
    description:
      "A background grid pattern made with SVGs, fully customizable using Tailwind CSS.",
    files: [
      {
        path: "registry/magicui/grid-pattern.tsx",
        type: "registry:ui",
        target: "components/magicui/grid-pattern.tsx",
      },
    ],
  },
  {
    name: "interactive-grid-pattern",
    type: "registry:ui",
    title: "Interactive Grid Pattern",
    description:
      "A interactive background grid pattern made with SVGs, fully customizable using Tailwind CSS.",
    files: [
      {
        path: "registry/magicui/interactive-grid-pattern.tsx",
        type: "registry:ui",
        target: "components/magicui/interactive-grid-pattern.tsx",
      },
    ],
  },
  {
    name: "dot-pattern",
    type: "registry:ui",
    title: "Dot Pattern",
    description:
      "A background dot pattern made with SVGs, fully customizable using Tailwind CSS.",
    files: [
      {
        path: "registry/magicui/dot-pattern.tsx",
        type: "registry:ui",
        target: "components/magicui/dot-pattern.tsx",
      },
    ],
  },
  {
    name: "flickering-grid",
    type: "registry:ui",
    title: "Flickering Grid",
    description:
      "A flickering grid background made with SVGs, fully customizable using Tailwind CSS.",
    files: [
      {
        path: "registry/magicui/flickering-grid.tsx",
        type: "registry:ui",
        target: "components/magicui/flickering-grid.tsx",
      },
    ],
  },
  {
    name: "hero-video-dialog",
    type: "registry:ui",
    title: "Hero Video Dialog",
    description: "A hero video dialog component.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/hero-video-dialog.tsx",
        type: "registry:ui",
        target: "components/magicui/hero-video-dialog.tsx",
      },
    ],
  },
  {
    name: "code-comparison",
    type: "registry:ui",
    title: "Code Comparison",
    description: "A component which compares two code snippets.",
    dependencies: ["shiki", "next-themes"],
    files: [
      {
        path: "registry/magicui/code-comparison.tsx",
        type: "registry:ui",
        target: "components/magicui/code-comparison.tsx",
      },
    ],
  },
  {
    name: "script-copy-btn",
    type: "registry:ui",
    title: "Script Copy Button",
    description: "Copy code to clipboard",
    dependencies: ["motion", "shiki", "next-themes"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/magicui/script-copy-btn.tsx",
        type: "registry:ui",
        target: "components/magicui/script-copy-btn.tsx",
      },
    ],
  },
  {
    name: "marquee",
    type: "registry:ui",
    title: "Marquee",
    description:
      "An infinite scrolling component that can be used to display text, images, or videos.",
    files: [
      {
        path: "registry/magicui/marquee.tsx",
        type: "registry:ui",
        target: "components/magicui/marquee.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-marquee": "marquee var(--duration) infinite linear",
        "animate-marquee-vertical":
          "marquee-vertical var(--duration) linear infinite",
      },
    },
    css: {
      "@keyframes marquee": {
        from: {
          transform: "translateX(0)",
        },
        to: {
          transform: "translateX(calc(-100% - var(--gap)))",
        },
      },
      "@keyframes marquee-vertical": {
        from: {
          transform: "translateY(0)",
        },
        to: {
          transform: "translateY(calc(-100% - var(--gap)))",
        },
      },
    },
  },
  {
    name: "globe",
    type: "registry:ui",
    title: "Globe",
    description:
      "An autorotating, interactive, and highly performant globe made using WebGL.",
    dependencies: ["cobe", "motion"],
    files: [
      {
        path: "registry/magicui/globe.tsx",
        type: "registry:ui",
        target: "components/magicui/globe.tsx",
      },
    ],
  },
  {
    name: "shimmer-button",
    type: "registry:ui",
    title: "Shimmer Button",
    description:
      "A button with a shimmering light which travels around the perimeter.",
    files: [
      {
        path: "registry/magicui/shimmer-button.tsx",
        type: "registry:ui",
        target: "components/magicui/shimmer-button.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-shimmer-slide":
          "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "animate-spin-around":
          "spin-around calc(var(--speed) * 2) infinite linear",
      },
    },
    css: {
      "@keyframes shimmer-slide": {
        to: {
          transform: "translate(calc(100cqw - 100%), 0)",
        },
      },
      "@keyframes spin-around": {
        "0%": {
          transform: "translateZ(0) rotate(0)",
        },
        "15%, 35%": {
          transform: "translateZ(0) rotate(90deg)",
        },
        "65%, 85%": {
          transform: "translateZ(0) rotate(270deg)",
        },
        "100%": {
          transform: "translateZ(0) rotate(360deg)",
        },
      },
    },
  },
  {
    name: "tweet-card",
    type: "registry:ui",
    title: "Tweet Card",
    description:
      "A card that displays a tweet with the author's name, handle, and profile picture.",
    dependencies: ["react-tweet"],
    files: [
      {
        path: "registry/magicui/tweet-card.tsx",
        type: "registry:ui",
        target: "components/magicui/tweet-card.tsx",
      },
    ],
  },
  {
    name: "client-tweet-card",
    type: "registry:ui",
    title: "Client Tweet Card",
    description:
      "A client-side version of the tweet card that displays a tweet with the author's name, handle, and profile picture.",
    dependencies: ["react-tweet"],
    files: [
      {
        path: "registry/magicui/client-tweet-card.tsx",
        type: "registry:ui",
        target: "components/magicui/client-tweet-card.tsx",
      },
    ],
  },
  {
    name: "bento-grid",
    type: "registry:ui",
    title: "Bento Grid",
    description:
      "Bento grid is a layout used to showcase the features of a product in a simple and elegant way.",
    dependencies: ["@radix-ui/react-icons"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/magicui/bento-grid.tsx",
        type: "registry:ui",
        target: "components/magicui/bento-grid.tsx",
      },
    ],
  },
  {
    name: "particles",
    type: "registry:ui",
    title: "Particles",
    description:
      "Particles are a fun way to add some visual flair to your website. They can be used to create a sense of depth, movement, and interactivity.",
    files: [
      {
        path: "registry/magicui/particles.tsx",
        type: "registry:ui",
        target: "components/magicui/particles.tsx",
      },
    ],
  },
  {
    name: "number-ticker",
    type: "registry:ui",
    title: "Number Ticker",
    description: "Animate numbers to count up or down to a target number",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/number-ticker.tsx",
        type: "registry:ui",
        target: "components/magicui/number-ticker.tsx",
      },
    ],
  },
  {
    name: "ripple",
    type: "registry:ui",
    title: "Ripple",
    description:
      "An animated ripple effect typically used behind elements to emphasize them.",
    files: [
      {
        path: "registry/magicui/ripple.tsx",
        type: "registry:ui",
        target: "components/magicui/ripple.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-ripple":
          "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
      },
    },
    css: {
      "@keyframes ripple": {
        "0%, 100%": {
          transform: "translate(-50%, -50%) scale(1)",
        },
        "50%": {
          transform: "translate(-50%, -50%) scale(0.9)",
        },
      },
    },
  },
  {
    name: "retro-grid",
    type: "registry:ui",
    title: "Retro Grid",
    description: "An animated scrolling retro grid effect",
    files: [
      {
        path: "registry/magicui/retro-grid.tsx",
        type: "registry:ui",
        target: "components/magicui/retro-grid.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-grid": "grid 15s linear infinite",
      },
    },
    css: {
      "@keyframes grid": {
        "0%": { transform: "translateY(-50%)" },
        "100%": { transform: "translateY(0)" },
      },
    },
  },
  {
    name: "animated-list",
    type: "registry:ui",
    title: "Animated List",
    description:
      "A list that animates each item in sequence with a delay. Used to showcase notifications or events on your landing page.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/animated-list.tsx",
        type: "registry:ui",
        target: "components/magicui/animated-list.tsx",
      },
    ],
  },
  {
    name: "animated-shiny-text",
    type: "registry:ui",
    title: "Animated Shiny Text",
    description:
      "A light glare effect which pans across text making it appear as if it is shimmering.",
    files: [
      {
        path: "registry/magicui/animated-shiny-text.tsx",
        type: "registry:ui",
        target: "components/magicui/animated-shiny-text.tsx",
      },
    ],

    cssVars: {
      theme: {
        "animate-shiny-text": "shiny-text 8s infinite",
      },
    },
    css: {
      "@keyframes shiny-text": {
        "0%, 90%, 100%": {
          "background-position": "calc(-100% - var(--shiny-width)) 0",
        },
        "30%, 60%": {
          "background-position": "calc(100% + var(--shiny-width)) 0",
        },
      },
    },
  },
  {
    name: "animated-grid-pattern",
    type: "registry:ui",
    title: "Animated Grid Pattern",
    description:
      "A animated background grid pattern made with SVGs, fully customizable using Tailwind CSS.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/animated-grid-pattern.tsx",
        type: "registry:ui",
        target: "components/magicui/animated-grid-pattern.tsx",
      },
    ],
  },
  {
    name: "border-beam",
    type: "registry:ui",
    title: "Border Beam",
    description:
      "An animated beam of light which travels along the border of its container.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/border-beam.tsx",
        type: "registry:ui",
        target: "components/magicui/border-beam.tsx",
      },
    ],
  },
  {
    name: "animated-beam",
    type: "registry:ui",
    title: "Animated Beam",
    description:
      "An animated beam of light which travels along a path. Useful for showcasing the integration features of a website.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/animated-beam.tsx",
        type: "registry:ui",
        target: "components/magicui/animated-beam.tsx",
      },
    ],
  },
  {
    name: "text-reveal",
    type: "registry:ui",
    title: "Text Reveal",
    description: "Fade in text as you scroll down the page.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/text-reveal.tsx",
        type: "registry:ui",
        target: "components/magicui/text-reveal.tsx",
      },
    ],
  },
  {
    name: "hyper-text",
    type: "registry:ui",
    title: "Hyper Text",
    description:
      "A text animation that scrambles letters before revealing the final text.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/hyper-text.tsx",
        type: "registry:ui",
        target: "components/magicui/hyper-text.tsx",
      },
    ],
  },
  {
    name: "animated-gradient-text",
    type: "registry:ui",
    title: "Animated Gradient Text",
    description:
      "An animated gradient background which transitions between colors for text.",
    files: [
      {
        path: "registry/magicui/animated-gradient-text.tsx",
        type: "registry:ui",
        target: "components/magicui/animated-gradient-text.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-gradient": "gradient 8s linear infinite",
      },
    },
    css: {
      "@keyframes gradient": {
        to: {
          "background-position": "var(--bg-size, 300%) 0",
        },
      },
    },
  },
  {
    name: "orbiting-circles",
    type: "registry:ui",
    title: "Orbiting Circles",
    description:
      "A collection of circles which move in orbit along a circular path",
    files: [
      {
        path: "registry/magicui/orbiting-circles.tsx",
        type: "registry:ui",
        target: "components/magicui/orbiting-circles.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-orbit": "orbit calc(var(--duration)*1s) linear infinite",
      },
    },
    css: {
      "@keyframes orbit": {
        "0%": {
          transform:
            "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
        },
        "100%": {
          transform:
            "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))",
        },
      },
    },
  },
  {
    name: "dock",
    type: "registry:ui",
    title: "Dock",
    description:
      "An implementation of the MacOS dock using react + tailwindcss + motion",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/dock.tsx",
        type: "registry:ui",
        target: "components/magicui/dock.tsx",
      },
    ],
  },
  {
    name: "word-rotate",
    type: "registry:ui",
    title: "Word Rotate",
    description: "A vertical rotation of words",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/word-rotate.tsx",
        type: "registry:ui",
        target: "components/magicui/word-rotate.tsx",
      },
    ],
  },
  {
    name: "avatar-circles",
    type: "registry:ui",
    title: "Avatar Circles",
    description: "Overlapping circles of avatars.",
    files: [
      {
        path: "registry/magicui/avatar-circles.tsx",
        type: "registry:ui",
        target: "components/magicui/avatar-circles.tsx",
      },
    ],
  },
  {
    name: "typing-animation",
    type: "registry:ui",
    title: "Typing Animation",
    description: "Characters appearing in typed animation",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/typing-animation.tsx",
        type: "registry:ui",
        target: "components/magicui/typing-animation.tsx",
      },
    ],
  },
  {
    name: "sparkles-text",
    type: "registry:ui",
    title: "Sparkles Text",
    description:
      "A dynamic text that generates continuous sparkles with smooth transitions, perfect for highlighting text with animated stars.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/sparkles-text.tsx",
        type: "registry:ui",
        target: "components/magicui/sparkles-text.tsx",
      },
    ],
  },
  {
    name: "spinning-text",
    type: "registry:ui",
    title: "Spinning Text",
    description:
      "The Spinning Text component animates text in a circular motion with customizable speed, direction, color, and transitions for dynamic and engaging effects.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/spinning-text.tsx",
        type: "registry:ui",
        target: "components/magicui/spinning-text.tsx",
      },
    ],
  },
  {
    name: "flip-text",
    type: "registry:ui",
    title: "Flip Text",
    description: "Text flipping character animation",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/flip-text.tsx",
        type: "registry:ui",
        target: "components/magicui/flip-text.tsx",
      },
    ],
  },
  {
    name: "icon-cloud",
    type: "registry:ui",
    title: "Icon Cloud",
    description: "An interactive 3D tag cloud component",
    dependencies: [],
    files: [
      {
        path: "registry/magicui/icon-cloud.tsx",
        type: "registry:ui",
        target: "components/magicui/icon-cloud.tsx",
      },
    ],
  },
  {
    name: "text-animate",
    type: "registry:ui",
    title: "Text Animate",
    description:
      "A text animation component that animates text using a variety of different animations.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/text-animate.tsx",
        type: "registry:ui",
        target: "components/magicui/text-animate.tsx",
      },
    ],
  },
  {
    name: "scroll-based-velocity",
    type: "registry:ui",
    title: "Scroll Based Velocity",
    description: "Scrolling text whose speed changes based on scroll speed",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/scroll-based-velocity.tsx",
        type: "registry:ui",
        target: "components/magicui/scroll-based-velocity.tsx",
      },
    ],
  },
  {
    name: "scratch-to-reveal",
    type: "registry:ui",
    title: "Scratch To Reveal",
    description:
      "The ScratchToReveal component creates an interactive scratch-off effect with customizable dimensions and animations, revealing hidden content beneath.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/scratch-to-reveal.tsx",
        type: "registry:ui",
        target: "components/magicui/scratch-to-reveal.tsx",
      },
    ],
  },
  {
    name: "shiny-button",
    type: "registry:ui",
    title: "Shiny Button",
    description:
      "A shiny button component with dynamic styles in the dark mode or light mode.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/shiny-button.tsx",
        type: "registry:ui",
        target: "components/magicui/shiny-button.tsx",
      },
    ],
  },
  {
    name: "box-reveal",
    type: "registry:ui",
    title: "Box Reveal Animation",
    description: "Sliding box animation that reveals text behind it.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/box-reveal.tsx",
        type: "registry:ui",
        target: "components/magicui/box-reveal.tsx",
      },
    ],
  },
  {
    name: "shine-border",
    type: "registry:ui",
    title: "Shine Border",
    description: "Shine border is an animated background border effect.",
    files: [
      {
        path: "registry/magicui/shine-border.tsx",
        type: "registry:ui",
        target: "components/magicui/shine-border.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-shine": "shine var(--duration) infinite linear",
      },
    },
    css: {
      "@keyframes shine": {
        "0%": {
          "background-position": "0% 0%",
        },
        "50%": {
          "background-position": "100% 100%",
        },
        to: {
          "background-position": "0% 0%",
        },
      },
    },
  },
  {
    name: "animated-circular-progress-bar",
    type: "registry:ui",
    title: "Animated Circular Progress Bar",
    description:
      "Animated Circular Progress Bar is a component that displays a circular gauge with a percentage value.",
    files: [
      {
        path: "registry/magicui/animated-circular-progress-bar.tsx",
        type: "registry:ui",
        target: "components/magicui/animated-circular-progress-bar.tsx",
      },
    ],
  },
  {
    name: "confetti",
    type: "registry:ui",
    title: "Confetti",
    description:
      "Confetti animations are best used to delight your users when something special happens",
    dependencies: ["canvas-confetti", "@types/canvas-confetti"],
    registryDependencies: ["button"],
    files: [
      {
        path: "registry/magicui/confetti.tsx",
        type: "registry:ui",
        target: "components/magicui/confetti.tsx",
      },
    ],
  },
  {
    name: "animated-subscribe-button",
    type: "registry:ui",
    title: "Animated Subscribe Button",
    description:
      "An animated subscribe button useful for showing a micro animation from intial to final result.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/animated-subscribe-button.tsx",
        type: "registry:ui",
        target: "components/magicui/animated-subscribe-button.tsx",
      },
    ],
  },
  {
    name: "cool-mode",
    type: "registry:ui",
    title: "Cool Mode",
    description: "Cool mode effect for buttons, links, and other DOMs",
    files: [
      {
        path: "registry/magicui/cool-mode.tsx",
        type: "registry:ui",
        target: "components/magicui/cool-mode.tsx",
      },
    ],
  },
  {
    name: "pulsating-button",
    type: "registry:ui",
    title: "Pulsating Button",
    description:
      "An animated pulsating button useful for capturing attention of users.",
    files: [
      {
        path: "registry/magicui/pulsating-button.tsx",
        type: "registry:ui",
        target: "components/magicui/pulsating-button.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-pulse": "pulse var(--duration) ease-out infinite",
      },
    },
    css: {
      "@keyframes pulse": {
        "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
        "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
      },
    },
  },
  {
    name: "ripple-button",
    type: "registry:ui",
    title: "Ripple Button",
    description: "An animated button with ripple useful for user engagement.",
    files: [
      {
        path: "registry/magicui/ripple-button.tsx",
        type: "registry:ui",
        target: "components/magicui/ripple-button.tsx",
      },
    ],
    cssVars: {
      theme: {
        "animate-rippling": "rippling var(--duration) ease-out",
      },
    },
    css: {
      "@keyframes rippling": {
        "0%": {
          opacity: "1",
        },
        "100%": {
          transform: "scale(2)",
          opacity: "0",
        },
      },
    },
  },
  {
    name: "file-tree",
    type: "registry:ui",
    title: "File Tree",
    description:
      "A component used to showcase the folder and file structure of a directory.",
    files: [
      {
        path: "registry/magicui/file-tree.tsx",
        type: "registry:ui",
        target: "components/magicui/file-tree.tsx",
      },
    ],
  },
  {
    name: "blur-fade",
    type: "registry:ui",
    title: "Blur Fade",
    description:
      "Blur fade in and out animation. Used to smoothly fade in and out content.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui/blur-fade.tsx",
        type: "registry:ui",
        target: "components/magicui/blur-fade.tsx",
      },
    ],
  },
  {
    name: "safari",
    type: "registry:ui",
    title: "Safari",
    description: "A safari browser mockup to showcase your website.",
    files: [
      {
        path: "registry/magicui/safari.tsx",
        type: "registry:ui",
        target: "components/magicui/safari.tsx",
      },
    ],
  },
  {
    name: "iphone-15-pro",
    type: "registry:ui",
    title: "iPhone 15 Pro",
    description: "A mockup of the iPhone 15 Pro",
    files: [
      {
        path: "registry/magicui/iphone-15-pro.tsx",
        type: "registry:ui",
        target: "components/magicui/iphone-15-pro.tsx",
      },
    ],
  },
  {
    name: "rainbow-button",
    type: "registry:ui",
    title: "Rainbow Button",
    description: "An animated button with a rainbow effect.",
    files: [
      {
        path: "registry/magicui/rainbow-button.tsx",
        type: "registry:ui",
        target: "components/magicui/rainbow-button.tsx",
      },
    ],
    cssVars: {
      light: {
        "color-1": "oklch(66.2% 0.225 25.9)",
        "color-2": "oklch(60.4% 0.26 302)",
        "color-3": "oklch(69.6% 0.165 251)",
        "color-4": "oklch(80.2% 0.134 225)",
        "color-5": "oklch(90.7% 0.231 133)",
      },
      dark: {
        "color-1": "oklch(66.2% 0.225 25.9)",
        "color-2": "oklch(60.4% 0.26 302)",
        "color-3": "oklch(69.6% 0.165 251)",
        "color-4": "oklch(80.2% 0.134 225)",
        "color-5": "oklch(90.7% 0.231 133)",
      },
      theme: {
        rainbow: "rainbow var(--speed, 2s) infinite linear",
      },
    },

    css: {
      "@keyframes rainbow": {
        "0%": { "background-position": "0%" },
        "100%": { "background-position": "200%" },
      },
    },
  },
  {
    name: "interactive-hover-button",
    type: "registry:ui",
    files: [
      {
        path: "registry/magicui/interactive-hover-button.tsx",
        type: "registry:ui",
        target: "components/magicui/interactive-hover-button.tsx",
      },
    ],
  },
  {
    name: "terminal",
    type: "registry:ui",
    title: "Terminal",
    description: "A terminal component",
    files: [
      {
        path: "registry/magicui/terminal.tsx",
        type: "registry:ui",
        target: "components/magicui/terminal.tsx",
      },
    ],
  },
  {
    name: "video-text",
    type: "registry:ui",
    title: "Video Text",
    description:
      "A component that displays text with a video playing in the background.",
    files: [
      {
        path: "registry/magicui/video-text.tsx",
        type: "registry:ui",
        target: "components/magicui/video-text.tsx",
      },
    ],
  },
];
