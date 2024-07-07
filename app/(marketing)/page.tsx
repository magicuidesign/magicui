import Hero from "@/components/hero";
import { Mdx } from "@/components/mdx-components";

import "@/styles/mdx.css";

import { notFound } from "next/navigation";
import { allPages } from "contentlayer/generated";

import Testimonials from "@/components/testimonials";

const PAGE = "home";

export default async function Home() {
  const page = allPages.find((page) => page.slugAsParams === PAGE);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Hero />
      <section id="component-demos" className="container max-w-5xl">
        <Mdx code={page.body.code} />
      </section>
      <Testimonials />
      {/* <CTASection /> */}
    </>
  );
}
