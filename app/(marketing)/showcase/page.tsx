import { allShowcases } from "content-collections";

import { ShowcaseCard } from "@/components/sections/showcase";
import { BlurFade } from "@/registry/magicui/blur-fade";

export default function Page() {
  return (
    <article className="container max-w-[120ch] py-14">
      <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        Showcase
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Companies choose Magic UI to build their landing pages.
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allShowcases.map((showcase, idx) => (
          <BlurFade key={idx} delay={0.25 + idx * 0.05}>
            <ShowcaseCard {...showcase} href={showcase.slug} />
          </BlurFade>
        ))}
      </div>
    </article>
  );
}
