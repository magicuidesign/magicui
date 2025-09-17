import { showcaseSource } from "@/lib/source";
import { ShowcaseCard } from "@/components/sections/showcase";
import { BlurFade } from "@/registry/magicui/blur-fade";

export default function Page() {
  const showcases = showcaseSource.getPages();
  return (
    <article className="container max-w-[120ch] py-14">
      <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        Showcase
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Companies choose Magic UI to build their landing pages.
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {showcases.map((showcase, idx) => (
          <BlurFade key={idx} delay={0.25 + idx * 0.05}>
            <ShowcaseCard
              {...showcase}
              href={showcase.url}
              title={showcase.data.title ?? ""}
              // @ts-expect-error - revisit fumadocs types.
              image={showcase.data.image ?? ""}
              // @ts-expect-error - revisit fumadocs types.
              affiliation={showcase.data.affiliation ?? ""}
            />
          </BlurFade>
        ))}
      </div>
    </article>
  );
}
