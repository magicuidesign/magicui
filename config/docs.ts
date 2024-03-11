import { allDocs } from "@/.contentlayer/generated";
import { MainNavItem, SidebarNavItem } from "@/types";
import { compareDesc } from "date-fns";

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
      title: "Blocks",
      href: "/blocks",
    },
    // {
    //   title: "Pricing",
    //   href: "/pricing",
    // },
    // {
    //   title: "Submit Feedback",
    //   href: "https://magicui.featurebase.app/",
    //   external: true,
    // },
    // {
    //   title: "Roadmap",
    //   href: "https://magicui.featurebase.app/roadmap",
    //   external: true,
    // },
  ],
  sidebarNav: [
    {
<<<<<<< HEAD
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        // {
        //   title: "Installation",
        //   href: "/docs/installation",
        //   items: [],
        // },
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
=======
      title: "Blocks",
      items: [
        {
          title: "Header",
          href: `/blocks/header`,
          items: [],
        },
        {
          title: "Hero",
          href: `/blocks/hero`,
          items: [],
        },
        {
          title: "Social Proof Press",
          href: `/blocks/social-proof-press`,
          items: [],
        },
        {
          title: "Social Proof Companies",
          href: `/blocks/social-proof-companies`,
          items: [],
        },
        {
          title: "Social Proof Testimonials",
          href: `/blocks/social-proof-testimonials`,
          items: [],
        },
        {
          title: "Features",
          href: `/blocks/features`,
          items: [],
        },
        {
          title: "Call To Action",
          href: `/blocks/call-to-action`,
          items: [],
        },
        {
          title: "Pricing",
          href: `/blocks/pricing`,
          items: [],
        },
        {
          title: "FAQ",
          href: `/blocks/faq`,
          items: [],
        },
        {
          title: "Footer",
          href: `/blocks/footer`,
          items: [],
        },
>>>>>>> 0c5630b (wip: magic ui blocks wip)
      ],
    },
    {
      title: "Components",
      items: allDocs
        .filter(
          (post) =>
            post.date &&
            post.date <= new Date().toISOString() &&
            post.published,
        )
        .sort((a, b) => {
          if (!a.date && !b.date) return 0; // Both dates are undefined, keep original order
          if (!a.date) return 1; // Move a to the end if date is undefined
          if (!b.date) return -1; // Move b to the end if date is undefined
          return compareDesc(new Date(a.date), new Date(b.date)); // Both dates are defined, proceed with comparison
        })
        .map((component) => ({
          title: component.title,
          href: `/docs/${component.slugAsParams}`,
          items: [],
        })),
    },
  ],
};
