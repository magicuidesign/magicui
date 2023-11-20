import { allComponents } from "@/.contentlayer/generated";
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
      title: "Components",
      items: allComponents
        .filter(
          (post) => post.date <= new Date().toISOString() && post.published,
        )
        .sort((a, b) => {
          return compareDesc(new Date(a.date), new Date(b.date));
        })
        .map((component) => ({
          title: component.title,
          href: `/components/${component.slugAsParams}`,
          items: [],
        })),
    },
  ],
};
