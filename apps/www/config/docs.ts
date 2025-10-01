import { NavItem, NavItemWithChildren } from "@/types"

interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItemWithChildren[]
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
      label: "",
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
          items: [],
        },
        {
          title: "MCP",
          href: "/docs/mcp",
          items: [],
          label: "",
        },
        {
          title: "Story",
          href: "/docs/story",
          items: [],
          label: "New",
        },
        {
          title: "Legacy",
          href: "/docs/legacy",
          items: [],
          label: "",
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
          label: "",
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
        {
          title: "Changelog",
          href: `/docs/templates/changelog`,
          items: [],
          label: "New",
          paid: false,
          event: "template_changelog_clicked",
        },
        {
          title: "Blog",
          href: `/docs/templates/blog`,
          items: [],
          label: "New",
          paid: false,
          event: "template_blog_clicked",
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
          label: "",
        },
        {
          title: "Progressive Blur",
          href: `/docs/components/progressive-blur`,
          items: [],
          label: "",
        },
        {
          title: "Dotted Map",
          href: `/docs/components/dotted-map`,
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
          title: "Animated Theme Toggler",
          href: `/docs/components/animated-theme-toggler`,
          items: [],
          label: "New",
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
          title: "Typing Animation",
          href: `/docs/components/typing-animation`,
          items: [],
          label: "New",
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
          label: "",
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
          title: "Scroll Based Velocity",
          href: `/docs/components/scroll-based-velocity`,
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
        {
          title: "Text Highlighter",
          href: "/docs/components/highlighter",
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
          title: "iPhone",
          href: `/docs/components/iphone`,
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
          title: "Striped Pattern",
          href: `/docs/components/striped-pattern`,
          items: [],
          label: "New",
        },
        {
          title: "Interactive Grid Pattern",
          href: `/docs/components/interactive-grid-pattern`,
          items: [],
          label: "",
        },
        {
          title: "Light Rays",
          href: `/docs/components/light-rays`,
          items: [],
          label: "New",
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          title: "Shiny Button",
          href: `/docs/components/shiny-button`,
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
          title: "Scroll Progress",
          href: `/docs/components/scroll-progress`,
          items: [],
          label: "",
        },
        {
          title: "Neon Gradient Card",
          href: `/docs/components/neon-gradient-card`,
          items: [],
          label: "",
        },
        {
          title: "Comic Text",
          href: `/docs/components/comic-text`,
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
          title: "Pixel Image",
          href: "/docs/components/pixel-image",
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
          title: "Warp Background",
          href: `/docs/components/warp-background`,
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
          title: "Animated Circular Progress Bar",
          href: `/docs/components/animated-circular-progress-bar`,
          items: [],
          label: "",
        },
      ],
    },
  ],
}
