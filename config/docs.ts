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
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Submit Feedback",
      href: "https://magicui.featurebase.app/",
      external: true,
    },
    {
      title: "Roadmap",
      href: "https://magicui.featurebase.app/roadmap",
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
        {
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: allDocs
        .filter(
          (post) => post.date <= new Date().toISOString() && post.published,
        )
        .sort((a, b) => {
          return compareDesc(new Date(a.date), new Date(b.date));
        })
        .map((component) => ({
          title: component.title,
          href: `/docs/${component.slugAsParams}`,
          items: [],
        })),
    },
  ],
};
