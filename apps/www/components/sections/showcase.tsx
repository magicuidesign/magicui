import Image from "next/image"
import Link from "next/link"
import { ChevronRightIcon } from "@radix-ui/react-icons"

import { showcaseSource } from "@/lib/source"
import { Marquee } from "@/registry/magicui/marquee"

function isExternalHref(href: string) {
  try {
    const url = new URL(href)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

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
  const isExternal = isExternalHref(href)
  return (
    <Link
      href={href}
      prefetch={isExternal ? false : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
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
    <section id="showcase" className="container py-10 md:py-14">
      <h2 className="text-foreground mb-2 text-center text-3xl leading-[1.2] font-semibold tracking-tighter text-balance md:text-4xl lg:text-5xl">
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
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-linear-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 h-full w-1/12 bg-linear-to-l"></div>
      </div>
    </section>
  )
}
