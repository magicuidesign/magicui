"use client"

import { useId, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { PeekList, type PeekListItem } from "@/registry/magicui/peek-list"

// Brand marks from simple-icons (CC0), drawn in the current text colour.
const logos = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  supabase:
    "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z",
  stripe:
    "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z",
  intercom:
    "M21 0H3C1.343 0 0 1.343 0 3v18c0 1.658 1.343 3 3 3h18c1.658 0 3-1.342 3-3V3c0-1.657-1.342-3-3-3zm-5.801 4.399c0-.44.36-.8.802-.8.44 0 .8.36.8.8v10.688c0 .442-.36.801-.8.801-.443 0-.802-.359-.802-.801V4.399zM11.2 3.994c0-.44.357-.799.8-.799s.8.359.8.799v11.602c0 .44-.357.8-.8.8s-.8-.36-.8-.8V3.994zm-4 .405c0-.44.359-.8.799-.8.443 0 .802.36.802.8v10.688c0 .442-.36.801-.802.801-.44 0-.799-.359-.799-.801V4.399zM3.199 6c0-.442.36-.8.802-.8.44 0 .799.358.799.8v7.195c0 .441-.359.8-.799.8-.443 0-.802-.36-.802-.8V6zM20.52 18.202c-.123.105-3.086 2.593-8.52 2.593-5.433 0-8.397-2.486-8.521-2.593-.335-.288-.375-.792-.086-1.128.285-.334.79-.375 1.125-.09.047.041 2.693 2.211 7.481 2.211 4.848 0 7.456-2.186 7.479-2.207.334-.289.839-.25 1.128.086.289.336.25.84-.086 1.128zm.281-5.007c0 .441-.36.8-.801.8-.441 0-.801-.36-.801-.8V6c0-.442.361-.8.801-.8.441 0 .801.357.801.8v7.195z",
}

const columns = [
  {
    stage: "Todo",
    dot: "bg-muted-foreground",
    issues: [
      { number: 482, title: "Pricing copy" },
      { number: 479, title: "Empty states" },
    ],
  },
  {
    stage: "Doing",
    dot: "bg-amber-500",
    issues: [{ number: 476, title: "Search filters" }],
  },
  {
    stage: "Done",
    dot: "bg-emerald-500",
    issues: [
      { number: 469, title: "Team import" },
      { number: 465, title: "Audit log" },
    ],
  },
]

const tables = [
  { name: "accounts", rows: "18,420" },
  { name: "orders", rows: "92,108" },
  { name: "products", rows: "2,640" },
  { name: "events", rows: "410,208" },
]

const threads = [
  {
    sender: "Mara at Oakline",
    subject: "Workspace is ready",
    time: "2m",
    unread: true,
  },
  {
    sender: "Theo at Tessera",
    subject: "Import completed",
    time: "14m",
    unread: true,
  },
  {
    sender: "Nia at Lumen",
    subject: "November report",
    time: "1h",
    unread: false,
  },
]

function BrandMark({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={path} />
    </svg>
  )
}

function PreviewHeader({
  logo,
  title,
  detail,
}: {
  logo: string
  title: string
  detail: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="flex min-w-0 items-center gap-2 font-medium">
        <BrandMark path={logo} className="size-4 shrink-0" />
        <span className="truncate">{title}</span>
      </span>
      <span className="text-muted-foreground shrink-0 text-xs">{detail}</span>
    </div>
  )
}

function BoardPreview() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 @xs:p-5">
      <PreviewHeader
        logo={logos.github}
        title="fieldnote/web"
        detail="Launch board"
      />
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
        {columns.map(({ stage, dot, issues }) => (
          <div
            key={stage}
            className="bg-muted flex min-w-0 flex-col gap-1.5 overflow-hidden rounded-lg p-1.5"
          >
            <p className="text-foreground/70 flex items-center gap-1.5 px-0.5 text-[11px] font-medium">
              <span className={cn("size-1.5 shrink-0 rounded-full", dot)} />
              {stage}
            </p>
            {issues.map(({ number, title }) => (
              <div
                key={number}
                className="border-border bg-card rounded-md border p-1.5 text-[11px] leading-tight"
              >
                <p className="text-muted-foreground tabular-nums">#{number}</p>
                <p className="mt-0.5 font-medium">{title}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function TablePreview() {
  return (
    <div className="flex h-full flex-col justify-between gap-2 p-4 @xs:gap-3 @xs:p-5">
      <PreviewHeader
        logo={logos.supabase}
        title="Supabase"
        detail="public schema"
      />
      <table className="w-full text-left text-xs tabular-nums">
        <thead className="text-muted-foreground">
          <tr>
            <th scope="col" className="pb-1 font-normal">
              Table
            </th>
            <th scope="col" className="pb-1 text-right font-normal">
              Rows
            </th>
          </tr>
        </thead>
        <tbody>
          {tables.map(({ name, rows }) => (
            <tr key={name} className="border-border border-t">
              <td className="py-0.5 font-mono @min-[17rem]:py-1">{name}</td>
              <td className="py-0.5 text-right @min-[17rem]:py-1">{rows}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Synced 4 minutes ago
      </p>
    </div>
  )
}

function InvoiceLine({
  label,
  value,
  className,
}: {
  label: ReactNode
  value: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex justify-between gap-4", className)}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function InvoicePreview() {
  return (
    <div className="flex h-full flex-col justify-between gap-2 p-4 text-xs @xs:p-5 @xs:text-sm">
      <PreviewHeader logo={logos.stripe} title="Invoice" detail="INV-0248" />
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground">Oakline Studio · Nov 3</span>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          Paid
        </span>
      </div>
      <div className="space-y-1.5 tabular-nums">
        <InvoiceLine label="Team plan · 12 seats" value="$216.00" />
        <InvoiceLine
          label="Tax"
          value="$24.00"
          className="text-muted-foreground"
        />
        <InvoiceLine
          label="Total paid"
          value="$240.00"
          className="border-border border-t pt-1.5 font-medium"
        />
      </div>
    </div>
  )
}

function InboxPreview() {
  return (
    <div className="flex h-full flex-col gap-2 p-4 @xs:gap-3 @xs:p-5">
      <PreviewHeader logo={logos.intercom} title="Team inbox" detail="2 open" />
      <ul className="flex flex-1 flex-col justify-between">
        {threads.map(({ sender, subject, time, unread }) => (
          <li
            key={sender}
            className="border-border flex items-start gap-2 border-t py-1.5 text-xs"
          >
            <span
              className={cn(
                "mt-1.5 size-1.5 shrink-0 rounded-full",
                unread ? "bg-blue-500" : "bg-transparent"
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{sender}</p>
              <p className="text-muted-foreground truncate">{subject}</p>
            </div>
            <span className="text-muted-foreground tabular-nums">{time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function brandTitle(logo: string, name: string): ReactNode {
  return (
    <>
      <BrandMark
        path={logo}
        className="mr-[0.3em] inline-block size-[0.75em] align-[-0.06em]"
      />
      {name}
    </>
  )
}

const items: PeekListItem[] = [
  {
    id: "github",
    title: brandTitle(logos.github, "GitHub"),
    meta: "Two-way sync",
    href: "#",
    preview: <BoardPreview />,
  },
  {
    id: "supabase",
    title: brandTitle(logos.supabase, "Supabase"),
    meta: "Hourly",
    href: "#",
    preview: <TablePreview />,
  },
  {
    id: "stripe",
    title: brandTitle(logos.stripe, "Stripe"),
    meta: "Webhooks",
    href: "#",
    preview: <InvoicePreview />,
  },
  {
    id: "intercom",
    title: brandTitle(logos.intercom, "Intercom"),
    meta: "Read only",
    href: "#",
    preview: <InboxPreview />,
  },
]

export default function PeekListDemo2() {
  const heading = useId()

  return (
    <section
      aria-labelledby={heading}
      className="bg-background text-foreground w-2xl max-w-full py-12"
    >
      <p className="text-muted-foreground mb-3 text-sm">Integrations</p>
      <h2
        id={heading}
        className="mb-10 max-w-lg text-3xl font-medium tracking-tight text-balance"
      >
        Connects to the tools you already run
      </h2>
      <PeekList items={items} />
      <p className="text-muted-foreground mt-8 text-sm">
        One workspace, with every source in step.
      </p>
    </section>
  )
}
