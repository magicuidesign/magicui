import { source } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { notFound } from "next/navigation";

const PAGE = "home";

export function ComponentDemos() {
  const pages = source.getPages();
  const page = pages.find((page) => page.url === PAGE);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <section id="component-demos" className="container max-w-5xl py-14">
      <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        Component Demos
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Here are some of the components that you can use to build your landing
        pages.
      </h3>
      <MDX components={mdxComponents} />
    </section>
  );
}
