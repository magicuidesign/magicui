import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"

import { source } from "@/lib/source"

const PAGE = "home"

export function ComponentDemos() {
  const pages = source.getPages()
  const page = pages.find((page) => page.url === PAGE)

  if (!page) {
    notFound()
  }

  const MDX = page.data.body

  return (
    <section id="component-demos" className="container max-w-5xl py-14">
      <h2 className="text-foreground mb-2 text-center text-5xl leading-[1.2] font-bold tracking-tighter">
        Component Demos
      </h2>
      <h3 className="text-foreground/80 mx-auto mb-8 text-center text-lg font-medium tracking-tight text-balance">
        Here are some of the components that you can use to build your landing
        pages.
      </h3>
      <MDX components={mdxComponents} />
    </section>
  )
}
