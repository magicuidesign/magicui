import { showcaseSource } from "@/lib/source"
import { ShowcaseCard } from "@/components/sections/showcase"
import { BlurFade } from "@/registry/magicui/blur-fade"

export default function Page() {
  const showcases = showcaseSource.getPages()
  return (
    <article className="container max-w-[120ch] py-14">
      <h2 className="text-foreground mb-2 text-center text-5xl leading-[1.2] font-bold tracking-tighter">
        Showcase
      </h2>
      <h3 className="text-foreground/80 mx-auto mb-8 text-center text-lg font-medium tracking-tight text-balance">
        Companies choose Magic UI to build their landing pages.
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {showcases.map((showcase, idx) => (
          <BlurFade key={idx} delay={0.25 + idx * 0.05}>
            <ShowcaseCard
              {...showcase}
              href={showcase.url}
              title={showcase.data.title ?? ""}
              image={showcase.data.image ?? ""}
              affiliation={showcase.data.affiliation ?? ""}
            />
          </BlurFade>
        ))}
      </div>
    </article>
  )
}
