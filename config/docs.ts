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
    // {
    //   title: "Blocks",
    //   href: "/blocks",
    // },
    // {
    //   title: "Pricing",
    //   href: "/pricing",
    // },
    // {
    //   title: "Submit Feedback",
    //   href: "https://magicui.featurebase.app/",
    //   external: true,
    // },
    {
      title: "Roadmap",
      href: "https://magicui.featurebase.app/roadmap",
      external: true,
    },
    {
      title: "Discord",
      href: "/discord",
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
        // {
        //   title: "Changelog",
        //   href: "/docs/changelog",
        //   items: [],
        // },
        // {
        //   title: "Story",
        //   href: "/docs/story",
        //   items: [],
        // },
      ],
    },
    {
      title: "Templates",
      items: [
        {
          title: "Startup",
          href: `/docs/templates/startup`,
          items: [],
          label: "Coming soon",
        },
        // {
        //   title: "Dark",
        //   href: `/docs/templates/dark`,
        //   items: [],
        //   label: "Coming soon",
        // },
      ],
    },
    {
      title: "Page Sections",
      items: [
        {
          title: "Header",
          href: `/docs/sections/header`,
          items: [],
        },
        // {
        //   title: "Hero",
        //   href: `/docs/sections/hero`,
        //   items: [],
        // label: "New",
        // },
        {
          title: "Social Proof Press",
          href: `/docs/sections/social-proof-press`,
          items: [],
        },
        {
          title: "Social Proof Companies",
          href: `/docs/sections/social-proof-companies`,
          items: [],
        },
        {
          title: "Social Proof Testimonials",
          href: `/docs/sections/social-proof-testimonials`,
          items: [],
        },
        // {
        //   title: "Features",
        //   href: `/docs/sections/features`,
        //   items: [],
        // },
        {
          title: "Call To Action",
          href: `/docs/sections/call-to-action`,
          items: [],
        },

        {
          title: "Pricing",
          href: `/docs/sections/pricing`,
          items: [],
        },
        {
          title: "FAQ",
          href: `/docs/sections/faq`,
          items: [],
        },
        {
          title: "Footer",
          href: `/docs/sections/footer`,
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Feature Cards",
          href: `/docs/components/feature-cards`,
          items: [],
          label: "8+ New",
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
          title: "Animated Gradient Pill",
          href: `/docs/components/animated-gradient-pill`,
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
          title: "Text Shimmer",
          href: `/docs/components/text-shimmer`,
          items: [],
        },
        {
          title: "Text Reveal",
          href: `/docs/components/text-reveal`,
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

    // {
    //   title: "Components",
    //   items: allDocs
    //     .filter(
    //       (post) =>
    //         post.date &&
    //         post.date <= new Date().toISOString() &&
    //         post.published &&
    //         post.slug.includes("components"),
    //     )
    //     .sort((a, b) => {
    //       if (!a.date && !b.date) return 0; // Both dates are undefined, keep original order
    //       if (!a.date) return 1; // Move a to the end if date is undefined
    //       if (!b.date) return -1; // Move b to the end if date is undefined
    //       return compareDesc(new Date(a.date), new Date(b.date)); // Both dates are defined, proceed with comparison
    //     })
    //     .map((component) => ({
    //       title: component.title,
    //       href: `/docs/${component.slugAsParams}`,
    //       items: [],
    //     })),
    // },
  ],
};
