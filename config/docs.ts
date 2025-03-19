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
      event: "header_cta_clicked",
      label: "New",
    },
    {
      title: "Showcase",
      href: "/showcase",
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
              title: "Next.js",
              href: `/docs/installation/next`,
              items: [],
            },
            {
              title: "Vite",
              href: `/docs/installation/vite`,
              items: [],
            },
            {
              title: "Remix",
              href: `/docs/installation/remix`,
              items: [],
            },
            {
              title: "Astro",
              href: `/docs/installation/astro`,
              items: [],
            },
            {
              title: "Laravel",
              href: `/docs/installation/laravel`,
              items: [],
            },
            {
              title: "Gatsby",
              href: `/docs/installation/gatsby`,
              items: [],
            },
            {
              title: "Manual",
              href: `/docs/installation/manual`,
              items: [],
            },
          ],
        },
        {
          title: "Tailwind v4",
          href: "/docs/tailwind-v4",
          items: [],
          label: "New",
        },
        {
          title: "MCP",
          href: "/docs/mcp",
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Templates",
      items: [
        {
          title: "AI Agent",
          href: `/docs/templates/agent`,
          items: [],
          label: "New",
          paid: true,
          event: "template_agent_clicked",
        },
        {
          title: "Dev Tool",
          href: `/docs/templates/devtool`,
          items: [],
          label: "",
          paid: true,
          event: "template_devtool_clicked",
        },
        {
          title: "Mobile",
          href: `/docs/templates/mobile`,
          items: [],
          label: "",
          paid: true,
          event: "template_mobile_clicked",
        },
        {
          title: "SaaS",
          href: `/docs/templates/saas`,
          items: [],
          label: "",
          paid: true,
          event: "template_saas_clicked",
        },

        {
          title: "Startup",
          href: `/docs/templates/startup`,
          items: [],
          label: "",
          paid: true,
          event: "template_startup_clicked",
        },
        {
          title: "Portfolio",
          href: `/docs/templates/portfolio`,
          items: [],
          label: "",
          event: "template_portfolio_clicked",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Marquee",
          href: `/docs/components/marquee`,
          items: [],
        },
        {
          title: "Terminal",
          href: `/docs/components/terminal`,
          items: [],
          label: "",
        },
        {
          title: "Hero Video Dialog",
          href: `/docs/components/hero-video-dialog`,
          items: [],
          label: "",
        },
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
          title: "Dock",
          href: `/docs/components/dock`,
          items: [],
          label: "",
        },
        {
          title: "Globe",
          href: `/docs/components/globe`,
          items: [],
        },
        {
          title: "Tweet Card",
          href: `/docs/components/tweet-card`,
          items: [],
        },
        {
          title: "Orbiting Circles",
          href: `/docs/components/orbiting-circles`,
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
          title: "Icon Cloud",
          href: `/docs/components/icon-cloud`,
          items: [],
          label: "",
        },
        {
          title: "Animated Circular Progress Bar",
          href: `/docs/components/animated-circular-progress-bar`,
          items: [],
          label: "",
        },
        {
          title: "File Tree",
          href: `/docs/components/file-tree`,
          items: [],
          label: "",
        },
        {
          title: "Code Comparison",
          href: `/docs/components/code-comparison`,
          items: [],
          label: "",
        },
        {
          title: "Script Copy Button",
          href: `/docs/components/script-copy-btn`,
          items: [],
          label: "",
        },
        {
          title: "Scroll Progress",
          href: `/docs/components/scroll-progress`,
          items: [],
          label: "",
        },
        {
          title: "Lens",
          href: `/docs/components/lens`,
          items: [],
          label: "",
        },
        {
          title: "Pointer",
          href: `/docs/components/pointer`,
          items: [],
          label: "",
        },
        {
          title: "Smooth Cursor",
          href: `/docs/components/smooth-cursor`,
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Device Mocks",
      items: [
        {
          title: "Safari",
          href: `/docs/components/safari`,
          items: [],
          label: "",
        },
        {
          title: "iPhone 15 Pro",
          href: `/docs/components/iphone-15-pro`,
          items: [],
          label: "",
        },
        {
          title: "Android",
          href: `/docs/components/android`,
          items: [],
          label: "",
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
          label: "",
        },
        {
          title: "Particles",
          href: `/docs/components/particles`,
          items: [],
          label: "",
        },
        {
          title: "Cool Mode",
          href: `/docs/components/cool-mode`,
          items: [],
          label: "",
        },
        {
          title: "Scratch To Reveal",
          href: `/docs/components/scratch-to-reveal`,
          items: [],
          label: "",
        },
      ],
    },
    {
      title: "Animations",
      items: [
        {
          title: "Blur Fade",
          href: `/docs/components/blur-fade`,
          items: [],
          label: "",
        },
      ],
    },
    {
      title: "Text Animations",
      items: [
        {
          title: "Text Animate",
          href: `/docs/components/text-animate`,
          items: [],
          label: "",
        },
        {
          title: "Line Shadow Text",
          href: `/docs/components/line-shadow-text`,
          items: [],
          label: "",
        },
        {
          title: "Aurora Text",
          href: `/docs/components/aurora-text`,
          items: [],
          label: "",
        },
        {
          title: "Video Text",
          href: `/docs/components/video-text`,
          items: [],
          label: "New",
        },
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
          title: "Hyper Text",
          href: `/docs/components/hyper-text`,
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
          title: "Scroll Based Velocity",
          href: `/docs/components/scroll-based-velocity`,
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
          title: "Box Reveal",
          href: `/docs/components/box-reveal`,
          items: [],
          label: "",
        },
        {
          title: "Sparkles Text",
          href: `/docs/components/sparkles-text`,
          items: [],
          label: "",
        },
        {
          title: "Morphing Text",
          href: `/docs/components/morphing-text`,
          items: [],
          label: "",
        },
        {
          title: "Spinning Text",
          href: `/docs/components/spinning-text`,
          items: [],
          label: "",
        },
      ],
    },
    {
      title: "Buttons",
      items: [
        {
          title: "Rainbow Button",
          href: `/docs/components/rainbow-button`,
          items: [],
          label: "",
        },
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
          title: "Interactive Hover Button",
          href: `/docs/components/interactive-hover-button`,
          items: [],
          label: "",
        },
        {
          title: "Animated Subscribe Button",
          href: `/docs/components/animated-subscribe-button`,
          items: [],
          label: "",
        },
        {
          title: "Pulsating Button",
          href: "/docs/components/pulsating-button",
          items: [],
          label: "",
        },
        {
          title: "Ripple Button",
          href: "/docs/components/ripple-button",
          items: [],
          label: "",
        },
      ],
    },
    {
      title: "Backgrounds",
      items: [
        {
          title: "Warp Background",
          href: `/docs/components/warp-background`,
          items: [],
          label: "",
        },
        {
          title: "Flickering Grid",
          href: `/docs/components/flickering-grid`,
          items: [],
          label: "",
        },
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
          title: "Interactive Grid Pattern",
          href: `/docs/components/interactive-grid-pattern`,
          items: [],
          label: "",
        },
      ],
    },
  ],
};
