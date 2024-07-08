import { Mdx } from "@/components/mdx-components";

import "@/styles/mdx.css";

import { notFound } from "next/navigation";
import { allPages } from "contentlayer/generated";

const PAGE = "home";

export default function ComponentDemos() {
  const page = allPages.find((page) => page.slugAsParams === PAGE);

  if (!page) {
    notFound();
  }

  return (
    <section id="component-demos" className="container py-14 max-w-5xl">
      <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        Component Demos
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Here are some of the components that you can use to build your landing
        pages.
      </h3>
      <Mdx code={page.body.code} />
    </section>
  );
}
