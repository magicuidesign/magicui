import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/components",
    },
    {
      title: "Templates",
      href: "https://pro.magicui.design",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [
            {
              title: "React.js",
              href: `/docs/installation/react`,
              items: [],
            },
            {
              title: "Vue.js",
              href: `/docs/installation/vue`,
              items: [],
            },
            {
              title: "Svelte",
              href: `/docs/installation/svelte`,
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Bento Grid",
          href: `/docs/components/bento-grid`,
          items: [],
        },
        {
          title: "Animated List",
          href: `/docs/components/animated-list`,
          items: [],
        },
        {
          title: "Tweet Card",
          href: `/docs/components/tweet-card`,
          items: [],
        },
        {
          title: "Marquee",
          href: `/docs/components/marquee`,
          items: [],
        },
        {
          title: "Globe",
          href: `/docs/components/globe`,
          items: [],
        },
        {
          title: "Orbiting Circles",
          href: `/docs/components/orbiting-circles`,
          items: [],
          label: "",
        },
        {
          title: "Dock",
          href: `/docs/components/dock`,
          items: [],
          label: "",
        },
        {
          title: "Avatar Circles",
          href: `/docs/components/avatar-circles`,
          items: [],
          label: "",
        },
        {
          title: "Interactive Icon Cloud",
          href: `/docs/components/icon-cloud`,
          items: [],
          label: "",
        },
        {
          title: "Gauge Circle",
          href: `/docs/components/gauge-circle`,
          items: [],
          label: "",
        },
        {
          title: "Scratch To Reveal",
          href: `/docs/components/scratch-to-reveal`,
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Special Effects",
      items: [
        {
          title: "Animated Beam",
          href: `/docs/components/animated-beam`,
          items: [],
        },
        // {
        //   title: "Animated Lines",
        //   href: `/docs/components/animated-lines`,
        //   items: [],
        // },
        {
          title: "Border Beam",
          href: `/docs/components/border-beam`,
          items: [],
        },
        {
          title: "Shine Border",
          href: `/docs/components/shine-border`,
          items: [],
          label: "",
        },
        {
          title: "Magic Card",
          href: `/docs/components/magic-card`,
          items: [],
        },
        {
          title: "Meteors",
          href: `/docs/components/meteors`,
          items: [],
        },
        {
          title: "Neon Gradient Card",
          href: `/docs/components/neon-gradient-card`,
          items: [],
          label: "",
        },
        {
          title: "Confetti",
          href: `/docs/components/confetti`,
          items: [],
          label: "New",
        },
        {
          title: "Particles",
          href: `/docs/components/particles`,
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Text Animations",
      items: [
        {
          title: "Number Ticker",
          href: `/docs/components/number-ticker`,
          items: [],
        },
        {
          title: "Animated Shiny Text",
          href: `/docs/components/animated-shiny-text`,
          items: [],
        },
        {
          title: "Animated Gradient Text",
          href: `/docs/components/animated-gradient-text`,
          items: [],
          label: "",
        },
        {
          title: "Text Reveal",
          href: `/docs/components/text-reveal`,
          items: [],
          label: "",
        },
        {
          title: "Word Rotate",
          href: `/docs/components/word-rotate`,
          items: [],
          label: "",
        },
        {
          title: "Typing Animation",
          href: `/docs/components/typing-animation`,
          items: [],
          label: "",
        },
        {
          title: "Wavy Text",
          href: `/docs/components/wavy-text`,
          items: [],
          label: "",
        },
        {
          title: "Blur In",
          href: `/docs/components/blur-in`,
          items: [],
          label: "",
        },
        {
          title: "Separate Away",
          href: `/docs/components/separate-away`,
          items: [],
          label: "",
        },
        {
          title: "Scroll Based Velocity",
          href: `/docs/components/scroll-based-velocity`,
          items: [],
          label: "",
        },
        {
          title: "Letter Pullup",
          href: `/docs/components/letter-pullup`,
          items: [],
          label: "",
        },
        {
          title: "Word Pull Up",
          href: `/docs/components/word-pull-up`,
          items: [],
          label: "",
        },
        {
          title: "Flip Text",
          href: `/docs/components/flip-text`,
          items: [],
          label: "",
        },
        {
          title: "Gradual Spacing",
          href: `/docs/components/gradual-spacing`,
          items: [],
          label: "",
        },
        {
          title: "Word Fade In",
          href: `/docs/components/word-fade-in`,
          items: [],
          label: "",
        },
        {
          title: "Fade Text",
          href: `/docs/components/fade-text`,
          items: [],
          label: "",
        },
        {
          title: "Box Reveal",
          href: `/docs/components/box-reveal`,
          items: [],
          label: "",
        },
        {
          title: "Sparkles Text",
          href: `/docs/components/sparkles-text`,
          items: [],
          label: "New",
        },
        {
          title: "Cool Mode",
          href: `/docs/components/cool-mode`,
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Buttons",
      items: [
        {
          title: "Shimmer Button",
          href: `/docs/components/shimmer-button`,
          items: [],
        },
        {
          title: "Shiny Button",
          href: `/docs/components/shiny-button`,
          items: [],
          label: "",
        },
        {
          title: "Animated Subscribe Button",
          href: `/docs/components/animated-subscribe-button`,
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Backgrounds",
      items: [
        {
          title: "Animated Grid Pattern",
          href: `/docs/components/animated-grid-pattern`,
          items: [],
          label: "",
        },
        {
          title: "Retro Grid",
          href: `/docs/components/retro-grid`,
          items: [],
        },
        {
          title: "Ripple",
          href: `/docs/components/ripple`,
          items: [],
        },
        {
          title: "Dot Pattern",
          href: `/docs/components/dot-pattern`,
          items: [],
        },
        {
          title: "Grid Pattern",
          href: `/docs/components/grid-pattern`,
          items: [],
        },
        {
          title: "Linear Gradient",
          href: `/docs/components/linear-gradient`,
          items: [],
        },
        {
          title: "Radial Gradient",
          href: `/docs/components/radial-gradient`,
          items: [],
        },
        {
          title: "Wavy Dot Pattern",
          href: `/docs/components/wavy-dot-pattern`,
          items: [],
          label: "New",
        },
      ],
    },
  ],
};
