import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "magic-card",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/magic-card.tsx", type: "registry:ui" }],
  },
  {
    name: "android",
    type: "registry:ui",
    files: [{ path: "magicui/android.tsx", type: "registry:ui" }],
  },
  {
    name: "warp-background",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/warp-background.tsx", type: "registry:ui" }],
  },
  {
    name: "line-shadow-text",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/line-shadow-text.tsx", type: "registry:ui" }],
  },
  {
    name: "aurora-text",
    type: "registry:ui",
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
    files: [{ path: "magicui/morphing-text.tsx", type: "registry:ui" }],
  },
  {
    name: "scroll-progress",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/scroll-progress.tsx", type: "registry:ui" }],
  },
  {
    name: "neon-gradient-card",
    type: "registry:ui",
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
    files: [{ path: "magicui/grid-pattern.tsx", type: "registry:ui" }],
  },
  {
    name: "interactive-grid-pattern",
    type: "registry:ui",
    files: [
      { path: "magicui/interactive-grid-pattern.tsx", type: "registry:ui" },
    ],
  },
  {
    name: "dot-pattern",
    type: "registry:ui",
    files: [{ path: "magicui/dot-pattern.tsx", type: "registry:ui" }],
  },
  {
    name: "flickering-grid",
    type: "registry:ui",
    files: [{ path: "magicui/flickering-grid.tsx", type: "registry:ui" }],
  },
  {
    name: "hero-video-dialog",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/hero-video-dialog.tsx", type: "registry:ui" }],
  },
  {
    name: "code-comparison",
    type: "registry:ui",
    dependencies: ["shiki", "next-themes"],
    files: [{ path: "magicui/code-comparison.tsx", type: "registry:ui" }],
  },
  {
    name: "script-copy-btn",
    type: "registry:ui",
    dependencies: ["motion", "shiki", "next-themes"],
    registryDependencies: ["button"],
    files: [{ path: "magicui/script-copy-btn.tsx", type: "registry:ui" }],
  },
  {
    name: "marquee",
    type: "registry:ui",
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
    dependencies: ["cobe"],
    files: [{ path: "magicui/globe.tsx", type: "registry:ui" }],
  },
  {
    name: "shimmer-button",
    type: "registry:ui",
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
    dependencies: ["react-tweet"],
    files: [{ path: "magicui/tweet-card.tsx", type: "registry:ui" }],
  },
  {
    name: "client-tweet-card",
    type: "registry:ui",
    dependencies: ["react-tweet"],
    files: [{ path: "magicui/client-tweet-card.tsx", type: "registry:ui" }],
  },
  {
    name: "bento-grid",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-icons"],
    registryDependencies: ["button"],
    files: [{ path: "magicui/bento-grid.tsx", type: "registry:ui" }],
  },
  {
    name: "particles",
    type: "registry:ui",
    files: [{ path: "magicui/particles.tsx", type: "registry:ui" }],
  },
  {
    name: "number-ticker",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/number-ticker.tsx", type: "registry:ui" }],
  },
  {
    name: "ripple",
    type: "registry:ui",
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
    dependencies: ["motion"],
    files: [{ path: "magicui/animated-list.tsx", type: "registry:ui" }],
  },
  {
    name: "animated-shiny-text",
    type: "registry:ui",
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
    dependencies: ["motion"],
    files: [{ path: "magicui/animated-grid-pattern.tsx", type: "registry:ui" }],
  },
  {
    name: "border-beam",
    type: "registry:ui",
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
    dependencies: ["motion"],
    files: [{ path: "magicui/animated-beam.tsx", type: "registry:ui" }],
  },
  {
    name: "text-reveal",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/text-reveal.tsx", type: "registry:ui" }],
  },
  {
    name: "hyper-text",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/hyper-text.tsx", type: "registry:ui" }],
  },
  {
    name: "animated-gradient-text",
    type: "registry:ui",
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
    dependencies: ["motion"],
    files: [{ path: "magicui/dock.tsx", type: "registry:ui" }],
  },
  {
    name: "word-rotate",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/word-rotate.tsx", type: "registry:ui" }],
  },
  {
    name: "avatar-circles",
    type: "registry:ui",
    files: [{ path: "magicui/avatar-circles.tsx", type: "registry:ui" }],
  },
  {
    name: "typing-animation",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/typing-animation.tsx", type: "registry:ui" }],
  },
  {
    name: "sparkles-text",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/sparkles-text.tsx", type: "registry:ui" }],
  },
  {
    name: "flip-text",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/flip-text.tsx", type: "registry:ui" }],
  },
  {
    name: "icon-cloud",
    type: "registry:ui",
    dependencies: [],
    files: [{ path: "magicui/icon-cloud.tsx", type: "registry:ui" }],
  },
  {
    name: "text-animate",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/text-animate.tsx", type: "registry:ui" }],
  },
  {
    name: "scroll-based-velocity",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/scroll-based-velocity.tsx", type: "registry:ui" }],
  },
  {
    name: "scratch-to-reveal",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/scratch-to-reveal.tsx", type: "registry:ui" }],
  },
  {
    name: "shiny-button",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/shiny-button.tsx", type: "registry:ui" }],
  },
  {
    name: "box-reveal",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/box-reveal.tsx", type: "registry:ui" }],
  },
  {
    name: "shine-border",
    type: "registry:ui",
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
    dependencies: ["canvas-confetti", "@types/canvas-confetti"],
    registryDependencies: ["button"],
    files: [{ path: "magicui/confetti.tsx", type: "registry:ui" }],
  },
  {
    name: "animated-subscribe-button",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      { path: "magicui/animated-subscribe-button.tsx", type: "registry:ui" },
    ],
  },
  {
    name: "cool-mode",
    type: "registry:ui",
    files: [{ path: "magicui/cool-mode.tsx", type: "registry:ui" }],
  },
  {
    name: "pulsating-button",
    type: "registry:ui",
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
    files: [{ path: "magicui/file-tree.tsx", type: "registry:ui" }],
  },
  {
    name: "blur-fade",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [{ path: "magicui/blur-fade.tsx", type: "registry:ui" }],
  },
  {
    name: "safari",
    type: "registry:ui",
    files: [{ path: "magicui/safari.tsx", type: "registry:ui" }],
  },
  {
    name: "iphone-15-pro",
    type: "registry:ui",
    files: [{ path: "magicui/iphone-15-pro.tsx", type: "registry:ui" }],
  },
  {
    name: "rainbow-button",
    type: "registry:ui",
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
