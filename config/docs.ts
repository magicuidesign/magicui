import { allComponents } from "@/.contentlayer/generated";
import { MainNavItem, SidebarNavItem } from "@/types/nav";

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
    //   title: "Templates",
    //   href: "/templates",
    // },
  ],
  sidebarNav: [
    {
      title: "Components",
      items: allComponents
        .filter((post) => post.date)
        .filter((post) => post.published)
        .map((component) => ({
          title: component.title,
          href: `/components/${component.slug}`,
          items: [],
        })),
    },
  ],
};
