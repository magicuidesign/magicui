"use client"

import { useId, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { PeekList, type PeekListItem } from "@/registry/magicui/peek-list"

interface Customer {
  id: string
  name: string
  industry: string
  since: string
  metric: string
  result: string
  quote: string
  person: string
  /** The shapes of the customer's mark, drawn on a 24 by 24 grid. */
  mark: ReactNode
  /** The colour of the tile behind the mark inside the card. */
  tile: string
}

// Fictional customers, each with a simple geometric mark.
const customers: Customer[] = [
  {
    id: "northwind",
    name: "Northwind Freight",
    industry: "Logistics",
    since: "2021",
    metric: "41%",
    result: "faster freight quotes",
    quote: "Quotes go out the same afternoon.",
    person: "Ines Carver, Head of Operations",
    mark: <path d="M1 4h5l7 8-7 8H1l7-8zm9 0h5l7 8-7 8h-5l7-8z" />,
    tile: "bg-[#2563eb]",
  },
  {
    id: "halcyon",
    name: "Halcyon Health",
    industry: "Care",
    since: "2022",
    metric: "2.1M",
    result: "patient records moved in a weekend",
    quote: "Nobody on the wards noticed.",
    person: "Amara Osei, Chief Information Officer",
    mark: <path d="M2 11a10 10 0 0 1 20 0zM2 13h20a10 10 0 0 1-20 0z" />,
    tile: "bg-[#0d9488]",
  },
  {
    id: "lumen-vale",
    name: "Lumen & Vale",
    industry: "Retail",
    since: "2023",
    metric: "3×",
    result: "more repeat orders",
    quote: "Our regulars find us again.",
    person: "Jonah Pike, Founder",
    mark: (
      <>
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M12 3a9 9 0 0 1 0 18z" />
      </>
    ),
    tile: "bg-[#f97316]",
  },
  {
    id: "tessera",
    name: "Tessera Bank",
    industry: "Finance",
    since: "2020",
    metric: "99.98%",
    result: "uptime through every migration",
    quote: "Audit week is a quiet week now.",
    person: "Priya Raman, VP of Engineering",
    mark: <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />,
    tile: "bg-[#9c40ff]",
  },
  {
    id: "oakline",
    name: "Oakline Studio",
    industry: "Design",
    since: "2024",
    metric: "12 hrs",
    result: "back for the team every week",
    quote: "Reviews finally fit in a day.",
    person: "Mara Lind, Studio Lead",
    mark: <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" />,
    tile: "bg-[#16a34a]",
  },
]

function Mark({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

function StoryPreview({ customer }: { customer: Customer }) {
  const { name, since, metric, result, quote, person, mark, tile } = customer

  return (
    <div className="flex h-full flex-col justify-between gap-2 p-4 @min-[17rem]:gap-3 @xs:p-5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="flex min-w-0 items-center gap-2 font-medium">
          <span
            className={cn(
              "grid size-6 shrink-0 place-items-center rounded-md text-white",
              tile
            )}
          >
            <Mark className="size-3.5">{mark}</Mark>
          </span>
          <span className="truncate">{name}</span>
        </span>
        <span className="text-muted-foreground shrink-0 text-xs">
          Since {since}
        </span>
      </div>
      <div>
        <p className="text-4xl font-medium tracking-tight tabular-nums @min-[17rem]:text-5xl">
          {metric}
        </p>
        <p className="text-muted-foreground mt-1.5 text-sm">{result}</p>
      </div>
      <figure className="border-border border-t pt-3">
        <blockquote className="truncate text-sm">“{quote}”</blockquote>
        <figcaption className="text-muted-foreground mt-0.5 truncate text-xs">
          {person}
        </figcaption>
      </figure>
    </div>
  )
}

const items: PeekListItem[] = customers.map((customer) => ({
  id: customer.id,
  title: (
    <>
      <Mark className="mr-[0.3em] inline-block size-[0.75em] align-[-0.06em]">
        {customer.mark}
      </Mark>
      {customer.name}
    </>
  ),
  meta: customer.industry,
  href: "#",
  preview: <StoryPreview customer={customer} />,
}))

export default function PeekListDemo() {
  const heading = useId()

  return (
    <section
      aria-labelledby={heading}
      className="bg-background text-foreground w-2xl max-w-full py-12"
    >
      <p className="text-muted-foreground mb-3 text-sm">Customers</p>
      <h2
        id={heading}
        className="mb-10 text-3xl font-medium tracking-tight text-balance"
      >
        Teams that ship on Fieldnote
      </h2>
      <PeekList items={items} />
      <p className="text-muted-foreground mt-8 max-w-md text-sm text-pretty">
        From the first import to the next launch, Fieldnote gives every team its
        week back.
      </p>
    </section>
  )
}
