import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "magic-card",
    type: "registry:ui",
    title: "Magic Card",
    description:
      "A spotlight effect that follows your mouse cursor and highlights borders on hover.",
    dependencies: ["motion"],
    files: [{ path: "magicui/magic-card.tsx", type: "registry:ui" }],
  },
  {
    name: "android",
    type: "registry:ui",
    title: "Android",
    description: "A mockup of an Android device.",
    files: [{ path: "magicui/android.tsx", type: "registry:ui" }],
  },
  {
    name: "warp-background",
    type: "registry:ui",
    title: "Warp Background",
    description: "A card with a time warping background effect.",
    dependencies: ["motion"],
    files: [{ path: "magicui/warp-background.tsx", type: "registry:ui" }],
  },
  {
    name: "line-shadow-text",
    type: "registry:ui",
    title: "Line Shadow Text",
    description: "A text component with a moving line shadow.",
    dependencies: ["motion"],
    files: [{ path: "magicui/line-shadow-text.tsx", type: "registry:ui" }],
  },
  {
    name: "aurora-text",
    type: "registry:ui",
    title: "Aurora Text",
    description: "A beautiful aurora text effect",
    dependencies: ["motion"],
    files: [{ path: "magicui/aurora-text.tsx", type: "registry:ui" }],
    cssVars: {
      light: {
        "--color-1": "0 100% 63%",
        "--color-2": "270 100% 63%",
        "--color-3": "210 100% 63%",
        "--color-4": "195 100% 63%",
        "--color-5": "90 100% 63%",
      },
      dark: {
        "--color-1": "0 100% 63%",
        "--color-2": "270 100% 63%",
        "--color-3": "210 100% 63%",
        "--color-4": "195 100% 63%",
        "--color-5": "90 100% 63%",
      },
    },
    tailwind: {
      config: {
        theme: {
          extend: {
            colors: {
              "color-1": "hsl(var(--color-1))",
              "color-2": "hsl(var(--color-2))",
              "color-3": "hsl(var(--color-3))",
              "color-4": "hsl(var(--color-4))",
              "color-5": "hsl(var(--color-5))",
            },
            keyframes: {
              "aurora-border": {
                "0%, 100%": {
                  borderRadius: "37% 29% 27% 27% / 28% 25% 41% 37%",
                },
                "25%": { borderRadius: "47% 29% 39% 49% / 61% 19% 66% 26%" },
                "50%": { borderRadius: "57% 23% 47% 72% / 63% 17% 66% 33%" },
                "75%": { borderRadius: "28% 49% 29% 100% / 93% 20% 64% 25%" },
              },
              "aurora-1": {
                "0%, 100%": { top: "0", right: "0" },
                "50%": { top: "50%", right: "25%" },
                "75%": { top: "25%", right: "50%" },
              },
              "aurora-2": {
                "0%, 100%": { top: "0", left: "0" },
                "60%": { top: "75%", left: "25%" },
                "85%": { top: "50%", left: "50%" },
              },
              "aurora-3": {
                "0%, 100%": { bottom: "0", left: "0" },
                "40%": { bottom: "50%", left: "25%" },
                "65%": { bottom: "25%", left: "50%" },
              },
              "aurora-4": {
                "0%, 100%": { bottom: "0", right: "0" },
                "50%": { bottom: "25%", right: "40%" },
                "90%": { bottom: "50%", right: "25%" },
              },
            },
          },
        },
      },
    },
  },
  {
    name: "morphing-text",
    type: "registry:ui",
    title: "Morphing Text",
    description: "A dynamic text morphing component for Magic UI.",
    files: [{ path: "magicui/morphing-text.tsx", type: "registry:ui" }],
  },
  {
    name: "scroll-progress",
    type: "registry:ui",
    title: "Scroll Progress",
    description: "Animated Scroll Progress for your pages",
    dependencies: ["motion"],
    files: [{ path: "magicui/scroll-progress.tsx", type: "registry:ui" }],
  },
  {
    name: "neon-gradient-card",
    type: "registry:ui",
    title: "Neon Gradient Card",
    description: "A beautiful neon card effect",
    files: [{ path: "magicui/neon-gradient-card.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              "background-position-spin":
                "background-position-spin 3000ms infinite alternate",
            },
            keyframes: {
              "background-position-spin": {
                "0%": { backgroundPosition: "top center" },
                "100%": { backgroundPosition: "bottom center" },
              },
            },
          },
        },
      },
    },
  },
  {
    name: "meteors",
    type: "registry:ui",
    title: "Meteors",
    description: "A meteor shower effect.",
    files: [{ path: "magicui/meteors.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              meteor: "meteor 5s linear infinite",
            },
            keyframes: {
              meteor: {
                "0%": {
                  transform: "rotate(215deg) translateX(0)",
                  opacity: "1",
                },
                "70%": { opacity: "1" },
                "100%": {
                  transform: "rotate(215deg) translateX(-500px)",
                  opacity: "0",
                },
              },
            },
          },
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
    files: [{ path: "magicui/grid-pattern.tsx", type: "registry:ui" }],
  },
  {
    name: "interactive-grid-pattern",
    type: "registry:ui",
    title: "Interactive Grid Pattern",
    description:
      "A interactive background grid pattern made with SVGs, fully customizable using Tailwind CSS.",
    files: [
      { path: "magicui/interactive-grid-pattern.tsx", type: "registry:ui" },
    ],
  },
  {
    name: "dot-pattern",
    type: "registry:ui",
    title: "Dot Pattern",
    description:
      "A background dot pattern made with SVGs, fully customizable using Tailwind CSS.",
    files: [{ path: "magicui/dot-pattern.tsx", type: "registry:ui" }],
  },
  {
    name: "flickering-grid",
    type: "registry:ui",
    title: "Flickering Grid",
    description:
      "A flickering grid background made with SVGs, fully customizable using Tailwind CSS.",
    files: [{ path: "magicui/flickering-grid.tsx", type: "registry:ui" }],
  },
  {
    name: "hero-video-dialog",
    type: "registry:ui",
    title: "Hero Video Dialog",
    description: "A hero video dialog component.",
    dependencies: ["motion"],
    files: [{ path: "magicui/hero-video-dialog.tsx", type: "registry:ui" }],
  },
  {
    name: "code-comparison",
    type: "registry:ui",
    title: "Code Comparison",
    description: "A component which compares two code snippets.",
    dependencies: ["shiki", "next-themes"],
    files: [{ path: "magicui/code-comparison.tsx", type: "registry:ui" }],
  },
  {
    name: "script-copy-btn",
    type: "registry:ui",
    title: "Script Copy Button",
    description: "Copy code to clipboard",
    dependencies: ["motion", "shiki", "next-themes"],
    registryDependencies: ["button"],
    files: [{ path: "magicui/script-copy-btn.tsx", type: "registry:ui" }],
  },
  {
    name: "marquee",
    type: "registry:ui",
    title: "Marquee",
    description:
      "An infinite scrolling component that can be used to display text, images, or videos.",
    files: [{ path: "magicui/marquee.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            keyframes: {
              marquee: {
                from: { transform: "translateX(0)" },
                to: { transform: "translateX(calc(-100% - var(--gap)))" },
              },
              "marquee-vertical": {
                from: { transform: "translateY(0)" },
                to: { transform: "translateY(calc(-100% - var(--gap)))" },
              },
            },
            animation: {
              marquee: "marquee var(--duration) infinite linear",
              "marquee-vertical":
                "marquee-vertical var(--duration) linear infinite",
            },
          },
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
    dependencies: ["cobe"],
    files: [{ path: "magicui/globe.tsx", type: "registry:ui" }],
  },
  {
    name: "shimmer-button",
    type: "registry:ui",
    title: "Shimmer Button",
    description:
      "A button with a shimmering light which travels around the perimeter.",
    files: [{ path: "magicui/shimmer-button.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              "shimmer-slide":
                "shimmer-slide var(--speed) ease-in-out infinite alternate",
              "spin-around":
                "spin-around calc(var(--speed) * 2) infinite linear",
            },
            keyframes: {
              "shimmer-slide": {
                to: {
                  transform: "translate(calc(100cqw - 100%), 0)",
                },
              },
              "spin-around": {
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
    files: [{ path: "magicui/tweet-card.tsx", type: "registry:ui" }],
  },
  {
    name: "client-tweet-card",
    type: "registry:ui",
    title: "Client Tweet Card",
    description:
      "A client-side version of the tweet card that displays a tweet with the author's name, handle, and profile picture.",
    dependencies: ["react-tweet"],
    files: [{ path: "magicui/client-tweet-card.tsx", type: "registry:ui" }],
  },
  {
    name: "bento-grid",
    type: "registry:ui",
    title: "Bento Grid",
    description:
      "Bento grid is a layout used to showcase the features of a product in a simple and elegant way.",
    dependencies: ["@radix-ui/react-icons"],
    registryDependencies: ["button"],
    files: [{ path: "magicui/bento-grid.tsx", type: "registry:ui" }],
  },
  {
    name: "particles",
    type: "registry:ui",
    title: "Particles",
    description:
      "Particles are a fun way to add some visual flair to your website. They can be used to create a sense of depth, movement, and interactivity.",
    files: [{ path: "magicui/particles.tsx", type: "registry:ui" }],
  },
  {
    name: "number-ticker",
    type: "registry:ui",
    title: "Number Ticker",
    description: "Animate numbers to count up or down to a target number",
    dependencies: ["motion"],
    files: [{ path: "magicui/number-ticker.tsx", type: "registry:ui" }],
  },
  {
    name: "ripple",
    type: "registry:ui",
    title: "Ripple",
    description:
      "An animated ripple effect typically used behind elements to emphasize them.",
    files: [{ path: "magicui/ripple.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              ripple:
                "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
            },
            keyframes: {
              ripple: {
                "0%, 100%": {
                  transform: "translate(-50%, -50%) scale(1)",
                },
                "50%": {
                  transform: "translate(-50%, -50%) scale(0.9)",
                },
              },
            },
          },
        },
      },
    },
  },
  {
    name: "retro-grid",
    type: "registry:ui",
    title: "Retro Grid",
    description: "An animated scrolling retro grid effect",
    files: [{ path: "magicui/retro-grid.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              grid: "grid 15s linear infinite",
            },
            keyframes: {
              grid: {
                "0%": { transform: "translateY(-50%)" },
                "100%": { transform: "translateY(0)" },
              },
            },
          },
        },
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
    files: [{ path: "magicui/animated-list.tsx", type: "registry:ui" }],
  },
  {
    name: "animated-shiny-text",
    type: "registry:ui",
    title: "Animated Shiny Text",
    description:
      "A light glare effect which pans across text making it appear as if it is shimmering.",
    files: [{ path: "magicui/animated-shiny-text.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              "shiny-text": "shiny-text 8s infinite",
            },
            keyframes: {
              "shiny-text": {
                "0%, 90%, 100%": {
                  "background-position": "calc(-100% - var(--shiny-width)) 0",
                },
                "30%, 60%": {
                  "background-position": "calc(100% + var(--shiny-width)) 0",
                },
              },
            },
          },
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
    files: [{ path: "magicui/animated-grid-pattern.tsx", type: "registry:ui" }],
  },
  {
    name: "border-beam",
    type: "registry:ui",
    title: "Border Beam",
    description:
      "An animated beam of light which travels along the border of its container.",
    files: [{ path: "magicui/border-beam.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              "border-beam":
                "border-beam calc(var(--duration)*1s) infinite linear",
            },
            keyframes: {
              "border-beam": {
                "100%": {
                  "offset-distance": "100%",
                },
              },
            },
          },
        },
      },
    },
  },
  {
    name: "animated-beam",
    type: "registry:ui",
    title: "Animated Beam",
    description:
      'An animated beam of light which travels along a path. Useful for showcasing the "integration" features of a website.',
    dependencies: ["motion"],
    files: [{ path: "magicui/animated-beam.tsx", type: "registry:ui" }],
  },
  {
    name: "text-reveal",
    type: "registry:ui",
    title: "Text Reveal",
    description: "Fade in text as you scroll down the page.",
    dependencies: ["motion"],
    files: [{ path: "magicui/text-reveal.tsx", type: "registry:ui" }],
  },
  {
    name: "hyper-text",
    type: "registry:ui",
    title: "Hyper Text",
    description:
      "A text animation that scrambles letters before revealing the final text.",
    dependencies: ["motion"],
    files: [{ path: "magicui/hyper-text.tsx", type: "registry:ui" }],
  },
  {
    name: "animated-gradient-text",
    type: "registry:ui",
    title: "Animated Gradient Text",
    description:
      "An animated gradient background which transitions between colors for text.",
    files: [
      { path: "magicui/animated-gradient-text.tsx", type: "registry:ui" },
    ],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              gradient: "gradient 8s linear infinite",
            },
            keyframes: {
              gradient: {
                to: {
                  backgroundPosition: "var(--bg-size) 0",
                },
              },
            },
          },
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
    files: [{ path: "magicui/orbiting-circles.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              orbit: "orbit calc(var(--duration)*1s) linear infinite",
            },
            keyframes: {
              orbit: {
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
        },
      },
    },
  },
  {
    name: "dock",
    type: "registry:ui",
    title: "Dock",
    description:
      "An implementation of the MacOS dock using react + tailwindcss + framer motion",
    dependencies: ["motion"],
    files: [{ path: "magicui/dock.tsx", type: "registry:ui" }],
  },
  {
    name: "word-rotate",
    type: "registry:ui",
    title: "Word Rotate",
    description: "A vertical rotation of words",
    dependencies: ["motion"],
    files: [{ path: "magicui/word-rotate.tsx", type: "registry:ui" }],
  },
  {
    name: "avatar-circles",
    type: "registry:ui",
    title: "Avatar Circles",
    description: "Overlapping circles of avatars.",
    files: [{ path: "magicui/avatar-circles.tsx", type: "registry:ui" }],
  },
  {
    name: "typing-animation",
    type: "registry:ui",
    title: "Typing Animation",
    description: "Characters appearing in typed animation",
    dependencies: ["motion"],
    files: [{ path: "magicui/typing-animation.tsx", type: "registry:ui" }],
  },
  {
    name: "sparkles-text",
    type: "registry:ui",
    title: "Sparkles Text",
    description:
      "A dynamic text that generates continuous sparkles with smooth transitions, perfect for highlighting text with animated stars.",
    dependencies: ["motion"],
    files: [{ path: "magicui/sparkles-text.tsx", type: "registry:ui" }],
  },
  {
    name: "flip-text",
    type: "registry:ui",
    title: "Flip Text",
    description: "Text flipping character animation",
    dependencies: ["motion"],
    files: [{ path: "magicui/flip-text.tsx", type: "registry:ui" }],
  },
  {
    name: "icon-cloud",
    type: "registry:ui",
    title: "Icon Cloud",
    description: "An interactive 3D tag cloud component",
    dependencies: [],
    files: [{ path: "magicui/icon-cloud.tsx", type: "registry:ui" }],
  },
  {
    name: "text-animate",
    type: "registry:ui",
    title: "Text Animate",
    description:
      "A text animation component that animates text using a variety of different animations.",
    dependencies: ["motion"],
    files: [{ path: "magicui/text-animate.tsx", type: "registry:ui" }],
  },
  {
    name: "scroll-based-velocity",
    type: "registry:ui",
    title: "Scroll Based Velocity",
    description: "Scrolling text whose speed changes based on scroll speed",
    dependencies: ["motion"],
    files: [{ path: "magicui/scroll-based-velocity.tsx", type: "registry:ui" }],
  },
  {
    name: "scratch-to-reveal",
    type: "registry:ui",
    title: "Scratch To Reveal",
    description:
      "The ScratchToReveal component creates an interactive scratch-off effect with customizable dimensions and animations, revealing hidden content beneath.",
    dependencies: ["motion"],
    files: [{ path: "magicui/scratch-to-reveal.tsx", type: "registry:ui" }],
  },
  {
    name: "shiny-button",
    type: "registry:ui",
    title: "Shiny Button",
    description:
      "A shiny button component with dynamic styles in the dark mode or light mode.",
    dependencies: ["motion"],
    files: [{ path: "magicui/shiny-button.tsx", type: "registry:ui" }],
  },
  {
    name: "box-reveal",
    type: "registry:ui",
    title: "Box Reveal Animation",
    description: "Sliding box animation that reveals text behind it.",
    dependencies: ["motion"],
    files: [{ path: "magicui/box-reveal.tsx", type: "registry:ui" }],
  },
  {
    name: "shine-border",
    type: "registry:ui",
    title: "Shine Border",
    description: "Shine border is an animated background border effect.",
    files: [{ path: "magicui/shine-border.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              shine: "shine var(--duration) infinite linear",
            },
            keyframes: {
              shine: {
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
        path: "magicui/animated-circular-progress-bar.tsx",
        type: "registry:ui",
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
    files: [{ path: "magicui/confetti.tsx", type: "registry:ui" }],
  },
  {
    name: "animated-subscribe-button",
    type: "registry:ui",
    title: "Animated Subscribe Button",
    description:
      "An animated subscribe button useful for showing a micro animation from intial to final result.",
    dependencies: ["motion"],
    files: [
      { path: "magicui/animated-subscribe-button.tsx", type: "registry:ui" },
    ],
  },
  {
    name: "cool-mode",
    type: "registry:ui",
    title: "Cool Mode",
    description: "Cool mode effect for buttons, links, and other DOMs",
    files: [{ path: "magicui/cool-mode.tsx", type: "registry:ui" }],
  },
  {
    name: "pulsating-button",
    type: "registry:ui",
    title: "Pulsating Button",
    description:
      "An animated pulsating button useful for capturing attention of users.",
    files: [{ path: "magicui/pulsating-button.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              pulse: "pulse var(--duration) ease-out infinite",
            },
            keyframes: {
              pulse: {
                "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
                "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
              },
            },
          },
        },
      },
    },
  },
  {
    name: "ripple-button",
    type: "registry:ui",
    title: "Ripple Button",
    description: "An animated button with ripple useful for user engagement.",
    files: [{ path: "magicui/ripple-button.tsx", type: "registry:ui" }],
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              rippling: "rippling var(--duration) ease-out",
            },
            keyframes: {
              rippling: {
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
    files: [{ path: "magicui/file-tree.tsx", type: "registry:ui" }],
  },
  {
    name: "blur-fade",
    type: "registry:ui",
    title: "Blur Fade",
    description:
      "Blur fade in and out animation. Used to smoothly fade in and out content.",
    dependencies: ["motion"],
    files: [{ path: "magicui/blur-fade.tsx", type: "registry:ui" }],
  },
  {
    name: "safari",
    type: "registry:ui",
    title: "Safari",
    description: "A safari browser mockup to showcase your website.",
    files: [{ path: "magicui/safari.tsx", type: "registry:ui" }],
  },
  {
    name: "iphone-15-pro",
    type: "registry:ui",
    title: "iPhone 15 Pro",
    description: "A mockup of the iPhone 15 Pro",
    files: [{ path: "magicui/iphone-15-pro.tsx", type: "registry:ui" }],
  },
  {
    name: "rainbow-button",
    type: "registry:ui",
    title: "Rainbow Button",
    description: "An animated button with a rainbow effect.",
    files: [{ path: "magicui/rainbow-button.tsx", type: "registry:ui" }],
    cssVars: {
      light: {
        "--color-1": "0 100% 63%",
        "--color-2": "270 100% 63%",
        "--color-3": "210 100% 63%",
        "--color-4": "195 100% 63%",
        "--color-5": "90 100% 63%",
      },
      dark: {
        "--color-1": "0 100% 63%",
        "--color-2": "270 100% 63%",
        "--color-3": "210 100% 63%",
        "--color-4": "195 100% 63%",
        "--color-5": "90 100% 63%",
      },
    },
    tailwind: {
      config: {
        theme: {
          extend: {
            colors: {
              "color-1": "hsl(var(--color-1))",
              "color-2": "hsl(var(--color-2))",
              "color-3": "hsl(var(--color-3))",
              "color-4": "hsl(var(--color-4))",
              "color-5": "hsl(var(--color-5))",
            },
            animation: {
              rainbow: "rainbow var(--speed, 2s) infinite linear",
            },
            keyframes: {
              rainbow: {
                "0%": { "background-position": "0%" },
                "100%": { "background-position": "200%" },
              },
            },
          },
        },
      },
    },
  },
  {
    name: "interactive-hover-button",
    type: "registry:ui",
    files: [
      { path: "magicui/interactive-hover-button.tsx", type: "registry:ui" },
    ],
  },
];
