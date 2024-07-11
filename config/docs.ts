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
      title: "Showcase",
      href: "/showcase",
    },
    {
      title: "Templates",
      href: "https://pro.magicui.design",
      external: true,
      event: "header_cta_clicked",
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
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
      ],
    },
    {
      title: "Templates",
      items: [
        {
          title: "Portfolio",
          href: `/docs/templates/portfolio`,
          items: [],
          label: "New",
          event: "template_portfolio_clicked",
        },
        {
          title: "Startup",
          href: `/docs/templates/startup`,
          items: [],
          label: "New",
          paid: true,
          event: "template_startup_clicked",
        },
        {
          title: "SaaS",
          href: `/docs/templates/saas`,
          items: [],
          disabled: true,
          label: "Coming soon",
          paid: true,
          event: "template_saas_clicked",
        },
        {
          title: "Mobile App",
          href: `/docs/templates/app`,
          items: [],
          disabled: true,
          label: "Coming soon",
          paid: true,
          event: "template_app_clicked",
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
          title: "Interactive Icon Cloud",
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
      ],
    },
    {
      title: "Animations",
      items: [
        {
          title: "Blur Fade",
          href: `/docs/components/blur-fade`,
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
          title: "Blur In",
          href: `/docs/components/blur-in`,
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
          label: "",
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
          label: "",
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
      ],
    },
  ],
};
