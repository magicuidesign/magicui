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

function OverlayCard({ title, image, href, affiliation }: ShowcaseCardProps) {
  const isExternal = isExternalHref(href)
  return (
    <Link
      href={href}
      prefetch={isExternal ? false : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      className="group/card relative block h-[200px] w-[320px] overflow-hidden rounded-xl border"
    >
      <Image
        src={image}
        alt={title}
        width={320}
        height={200}
        className="size-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/80 to-transparent p-3 pt-10 text-white">
        <span className="truncate text-sm font-semibold">{title}</span>
        <span className="max-w-[55%] truncate text-[11px] text-white/70">
          {affiliation}
        </span>
      </div>
    </Link>
  )
}

export function Showcase() {
  const items: ShowcaseCardProps[] = showcaseSource
    .getPages()
    .filter((showcase) => showcase.data.featured)
    .map((showcase) => ({
      title: showcase.data.title ?? "",
      image: showcase.data.image ?? "",
      href: showcase.data.href ?? showcase.url,
      affiliation: showcase.data.affiliation ?? "",
    }))
  const half = Math.ceil(items.length / 2)
  return (
    <section id="showcase" className="py-10 md:py-14">
      <div className="container mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-foreground text-3xl leading-[1.2] font-semibold tracking-tighter md:text-4xl">
            Showcase
          </h2>
          <p className="text-muted-foreground mt-1 text-base tracking-tight">
            Real sites built with Magic UI.
          </p>
        </div>
        <Link
          href="/showcase"
          className="text-foreground/80 hover:text-foreground group inline-flex items-center gap-1 text-sm font-medium"
        >
          View all showcase
          <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="relative flex flex-col gap-4">
        <Marquee pauseOnHover className="[--duration:70s]">
          {items.slice(0, half).map((item) => (
            <OverlayCard key={item.href} {...item} />
          ))}
        </Marquee>
        <Marquee pauseOnHover reverse className="[--duration:70s]">
          {items.slice(half).map((item) => (
            <OverlayCard key={item.href} {...item} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 hidden w-1/12 bg-linear-to-r md:block" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 hidden w-1/12 bg-linear-to-l md:block" />
      </div>
    </section>
  )
}
