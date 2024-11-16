import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "magic-card",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/magic-card.tsx"],
  },
  {
    name: "neon-gradient-card",
    type: "registry:ui",
    files: ["magicui/neon-gradient-card.tsx"],
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
    files: ["magicui/meteors.tsx"],
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
    files: ["magicui/grid-pattern.tsx"],
  },
  {
    name: "dot-pattern",
    type: "registry:ui",
    files: ["magicui/dot-pattern.tsx"],
  },
  {
    name: "flickering-grid",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/flickering-grid.tsx"],
  },
  {
    name: "hero-video-dialog",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/hero-video-dialog.tsx"],
  },
  {
    name: "code-comparison",
    type: "registry:ui",
    dependencies: ["shiki", "next-themes"],
    files: ["magicui/code-comparison.tsx"],
  },
  {
    name: "marquee",
    type: "registry:ui",
    files: ["magicui/marquee.tsx"],
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
    dependencies: ["cobe", "react-spring"],
    files: ["magicui/globe.tsx"],
  },
  {
    name: "shimmer-button",
    type: "registry:ui",
    files: ["magicui/shimmer-button.tsx"],
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
    files: ["magicui/tweet-card.tsx"],
  },
  {
    name: "client-tweet-card",
    type: "registry:ui",
    dependencies: ["react-tweet"],
    files: ["magicui/client-tweet-card.tsx"],
  },
  {
    name: "bento-grid",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-icons"],
    files: ["magicui/bento-grid.tsx"],
  },
  {
    name: "particles",
    type: "registry:ui",
    files: ["magicui/particles.tsx"],
  },
  {
    name: "number-ticker",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/number-ticker.tsx"],
  },
  {
    name: "ripple",
    type: "registry:ui",
    files: ["magicui/ripple.tsx"],
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
    files: ["magicui/retro-grid.tsx"],
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
    dependencies: ["framer-motion"],
    files: ["magicui/animated-list.tsx"],
  },
  {
    name: "animated-shiny-text",
    type: "registry:ui",
    files: ["magicui/animated-shiny-text.tsx"],
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
    dependencies: ["framer-motion"],
    files: ["magicui/animated-grid-pattern.tsx"],
  },
  {
    name: "border-beam",
    type: "registry:ui",
    files: ["magicui/border-beam.tsx"],
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
    dependencies: ["framer-motion"],
    files: ["magicui/animated-beam.tsx"],
  },
  {
    name: "text-reveal",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/text-reveal.tsx"],
  },
  {
    name: "hyper-text",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/hyper-text.tsx"],
  },
  {
    name: "animated-gradient-text",
    type: "registry:ui",
    files: ["magicui/animated-gradient-text.tsx"],
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
    files: ["magicui/orbiting-circles.tsx"],
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
                    "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
                },
                "100%": {
                  transform:
                    "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
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
    dependencies: ["framer-motion"],
    files: ["magicui/dock.tsx"],
  },
  {
    name: "word-rotate",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/word-rotate.tsx"],
  },
  {
    name: "avatar-circles",
    type: "registry:ui",
    files: ["magicui/avatar-circles.tsx"],
  },
  {
    name: "word-pull-up",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/word-pull-up.tsx"],
  },
  {
    name: "typing-animation",
    type: "registry:ui",
    files: ["magicui/typing-animation.tsx"],
  },
  {
    name: "blur-in",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/blur-in.tsx"],
  },
  {
    name: "letter-pullup",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/letter-pullup.tsx"],
  },
  {
    name: "sparkles-text",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/sparkles-text.tsx"],
  },
  {
    name: "flip-text",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/flip-text.tsx"],
  },
  {
    name: "icon-cloud",
    type: "registry:ui",
    dependencies: ["next-themes", "react-icon-cloud"],
    files: ["magicui/icon-cloud.tsx"],
  },
  {
    name: "gradual-spacing",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/gradual-spacing.tsx"],
  },
  {
    name: "word-fade-in",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/word-fade-in.tsx"],
  },
  {
    name: "scroll-based-velocity",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/scroll-based-velocity.tsx"],
  },
  {
    name: "fade-text",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/fade-text.tsx"],
  },
  {
    name: "shiny-button",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/shiny-button.tsx"],
  },
  {
    name: "box-reveal",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/box-reveal.tsx"],
  },
  {
    name: "shine-border",
    type: "registry:ui",
    files: ["magicui/shine-border.tsx"],
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
    files: ["magicui/animated-circular-progress-bar.tsx"],
  },
  {
    name: "confetti",
    type: "registry:ui",
    dependencies: ["canvas-confetti", "@types/canvas-confetti"],
    files: ["magicui/confetti.tsx"],
  },
  {
    name: "animated-subscribe-button",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/animated-subscribe-button.tsx"],
  },
  {
    name: "cool-mode",
    type: "registry:ui",
    files: ["magicui/cool-mode.tsx"],
  },
  {
    name: "pulsating-button",
    type: "registry:ui",
    files: ["magicui/pulsating-button.tsx"],
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
    files: ["magicui/ripple-button.tsx"],
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
    files: ["magicui/file-tree.tsx"],
  },
  {
    name: "blur-fade",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    files: ["magicui/blur-fade.tsx"],
  },
  {
    name: "safari",
    type: "registry:ui",
    files: ["magicui/safari.tsx"],
  },
  {
    name: "iphone-15-pro",
    type: "registry:ui",
    files: ["magicui/iphone-15-pro.tsx"],
  },
  {
    name: "rainbow-button",
    type: "registry:ui",
    files: ["magicui/rainbow-button.tsx"],
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
];
