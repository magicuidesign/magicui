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
      title: "Magic UI PRO",
      href: "https://pro.magicui.design",
      external: true,
    },
    {
      title: "Roadmap",
      href: "https://magicui.featurebase.app/roadmap",
      external: true,
    },
    {
      title: "Discord",
      href: "https://discord.gg/X4BBMBjHNf",
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
          items: [],
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
          label: "New",
        },
        {
          title: "Dock",
          href: `/docs/components/dock`,
          items: [],
          label: "New",
        },
        {
          title: "Avatar Circles",
          href: `/docs/components/avatar-circles`,
          items: [],
          label: "New",
        },
        {
          title: "Interactive Icon Cloud",
          href: `/docs/components/icon-cloud`,
          items: [],
          label: "New",
        },
        {
          title: "Gauge Circle",
          href: `/docs/components/gauge-circle`,
          items: [],
          label: "New",
        }
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
          label: "New",
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
          label: "New",
        },
        {
          title: "Typing Animation",
          href: `/docs/components/typing-animation`,
          items: [],
          label: "New",
        },
        {
          title: "Wavy Text",
          href: `/docs/components/wavy-text`,
          items: [],
          label: "New",
        },
        {
          title: "Blur In",
          href: `/docs/components/blur-in`,
          items: [],
          label: "New",
        },
        {
          title: "Separate Away",
          href: `/docs/components/separate-away`,
          items: [],
          label: "New",
        },
        {
          title: "Scroll Based Velocity",
          href: `/docs/components/scroll-based-velocity`,
          items: [],
          label: "New",
        },
        {
          title: "Letter Pullup",
          href: `/docs/components/letter-pullup`,
          items: [],
          label: "New",
        },
        {
          title: "Word Pull Up",
          href: `/docs/components/word-pull-up`,
          items: [],
          label: "New",
        },
        {
          title: "Flip Text",
          href: `/docs/components/flip-text`,
          items: [],
          label: "New",
        },
        {
          title: "Gradual Spacing",
          href: `/docs/components/gradual-spacing`,
          items: [],
          label: "New",
        },
        {
          title: "Word Fade In",
          href: `/docs/components/word-fade-in`,
          items: [],
          label: "New",
        },
        {
          title: "Fade Text",
          href: `/docs/components/fade-text`,
          items: [],
          label: "New",
        },
        {
          title: "Box Reveal",
          href: `/docs/components/box-reveal`,
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
          label: "New",
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
      ],
    },
  ],
};
