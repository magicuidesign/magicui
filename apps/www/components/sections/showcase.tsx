import Image from "next/image"
import Link from "next/link"
import { ChevronRightIcon } from "@radix-ui/react-icons"

import { showcaseSource } from "@/lib/source"
import { Marquee } from "@/registry/magicui/marquee"

export interface ShowcaseCardProps {
  title: string
  image: string
  href: string
  affiliation?: string
}
export function ShowcaseCard({
  title,
  image,
  href,
  affiliation,
}: ShowcaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex cursor-pointer flex-col gap-2 overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="size-full h-[300px] max-h-[300px] rounded-xl object-cover"
      />

      <div className="flex flex-col">
        <div className="group inline-flex cursor-pointer items-center justify-start gap-1 text-xl font-semibold text-neutral-700 duration-200 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200">
          {title}
          <ChevronRightIcon className="size-4 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
        <p className="text-sm text-neutral-400">{affiliation}</p>
      </div>
    </Link>
  )
}

export function Showcase() {
  const showcases = showcaseSource.getPages()
  return (
    <section id="showcase" className="container py-14">
      <h2 className="text-foreground mb-2 text-center text-5xl leading-[1.2] font-bold tracking-tighter">
        Showcase
      </h2>
      <h3 className="text-foreground/80 mx-auto mb-8 text-center text-lg font-medium tracking-tight text-balance">
        Companies choose Magic UI to build their landing pages.
      </h3>
      <div className="relative flex flex-col">
        <Marquee className="max-w-screen [--duration:90s]">
          {showcases
            .filter((showcase) => showcase.data.featured)
            .map((showcase, idx) => (
              <ShowcaseCard
                key={idx}
                {...showcase}
                href={showcase.url}
                title={showcase.data.title ?? ""}
                affiliation={showcase.data.affiliation ?? ""}
                image={showcase.data.image ?? ""}
              />
            ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 h-full w-1/12 bg-gradient-to-l"></div>
      </div>
    </section>
  )
}
