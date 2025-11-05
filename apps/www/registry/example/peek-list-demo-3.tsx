"use client"

import { useId } from "react"

import { cn } from "@/lib/utils"
import { PeekList, type PeekListItem } from "@/registry/magicui/peek-list"

interface Note {
  id: string
  title: string
  date: string
  category: string
  dot: string
  readTime: string
  author: string
  initials: string
  excerpt: string
}

const notes: Note[] = [
  {
    id: "quieter-migration",
    title: "A quieter migration",
    date: "Oct 28",
    category: "Engineering",
    dot: "bg-blue-500",
    readTime: "6 min read",
    author: "Mara Lind",
    initials: "ML",
    excerpt:
      "How we moved a decade of records into one workspace in a single weekend.",
  },
  {
    id: "next-idea",
    title: "Room for the next idea",
    date: "Oct 16",
    category: "Product",
    dot: "bg-violet-500",
    readTime: "4 min read",
    author: "Theo Brandt",
    initials: "TB",
    excerpt:
      "Shared views that keep the next release visible from sketch to review.",
  },
  {
    id: "between-launches",
    title: "The work between launches",
    date: "Oct 2",
    category: "Studio",
    dot: "bg-amber-500",
    readTime: "5 min read",
    author: "Nia Okafor",
    initials: "NO",
    excerpt:
      "The small changes that gave our studio twelve hours back every week.",
  },
]

function NotePreview({ note }: { note: Note }) {
  return (
    <div className="flex h-full flex-col justify-between gap-3 p-4 @xs:p-5">
      <div className="text-muted-foreground flex items-center justify-between gap-3 text-xs">
        <span className="border-border flex items-center gap-1.5 rounded-full border px-2 py-0.5">
          <span className={cn("size-1.5 rounded-full", note.dot)} />
          {note.category}
        </span>
        <span>{note.readTime}</span>
      </div>
      <p className="text-lg leading-snug font-medium tracking-tight text-balance @sm:text-2xl">
        {note.excerpt}
      </p>
      <div className="flex items-center gap-2 text-xs">
        <span className="bg-muted text-foreground/70 grid size-6 place-items-center rounded-full text-[10px] font-medium">
          {note.initials}
        </span>
        <span className="text-muted-foreground">{note.author}</span>
      </div>
    </div>
  )
}

const items: PeekListItem[] = notes.map((note) => ({
  id: note.id,
  title: note.title,
  meta: note.date,
  href: "#",
  preview: <NotePreview note={note} />,
}))

export default function PeekListDemo3() {
  const heading = useId()

  return (
    <section
      aria-labelledby={heading}
      className="bg-background text-foreground grid w-2xl max-w-full gap-8 py-12 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-10"
    >
      <div>
        <p className="text-muted-foreground mb-3 text-sm">
          From the Fieldnote studio
        </p>
        <h2
          id={heading}
          className="text-2xl font-medium tracking-tight text-balance"
        >
          Latest field notes
        </h2>
        <p className="text-muted-foreground mt-3 text-sm text-pretty">
          Short essays on shipping calmer software, every other week.
        </p>
      </div>
      <PeekList items={items} intro={false} />
    </section>
  )
}
