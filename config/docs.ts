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
        //   title: "Animated Grid Pattern",
        //   href: `/docs/components/animated-grid-pattern`,
        //   items: [],
        // },
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
          title: "Magic Card",
          href: `/docs/components/magic-card`,
          items: [],
        },
        {
          title: "Meteors",
          href: `/docs/components/meteors`,
          items: [],
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
      ],
    },
    {
      title: "Backgrounds",
      items: [
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
