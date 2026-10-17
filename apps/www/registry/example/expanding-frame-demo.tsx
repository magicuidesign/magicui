"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { ExpandingFrame } from "@/registry/magicui/expanding-frame"

// Brand marks from Simple Icons (CC0), drawn in the current text color.
const logos = {
  vercel: "M24 22.525H0l12-21.05 12 21.05z",
  figma:
    "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z",
  linear:
    "M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z",
  notion:
    "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  stripe:
    "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z",
}

const transactions = [
  {
    day: 28,
    vendor: "Vercel",
    category: "Hosting",
    amount: "$2,400.00",
    logo: logos.vercel,
  },
  {
    day: 26,
    vendor: "Figma",
    category: "Design",
    amount: "$1,800.00",
    logo: logos.figma,
  },
  {
    day: 24,
    vendor: "Linear",
    category: "Software",
    amount: "$1,280.00",
    logo: logos.linear,
  },
  {
    day: 21,
    vendor: "Notion",
    category: "Software",
    amount: "$960.00",
    logo: logos.notion,
  },
  {
    day: 18,
    vendor: "GitHub",
    category: "Software",
    amount: "$840.00",
    logo: logos.github,
  },
  {
    day: 14,
    vendor: "Stripe",
    category: "Fees",
    amount: "$612.40",
    logo: logos.stripe,
  },
]

// Outline icons on a 16 px grid, one path each.
const icons = {
  overview:
    "M2.5 2.5h4.5v4.5H2.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5H2.5zM9 9h4.5v4.5H9z",
  accounts: "M2.5 6 8 2.75 13.5 6M3 13.25h10M4.5 7.5v4M8 7.5v4M11.5 7.5v4",
  reconcile: "M2.75 5.5h10l-2.5-2.5M13.25 10.5h-10l2.5 2.5",
  reports: "M3.5 13.25v-4M8 13.25v-10M12.5 13.25v-6.5",
  check:
    "M5.5 8.25 7.25 10l3.25-3.5M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0",
  pending: "M8 4.75V8l2 1.25M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0",
}

const navigation = [
  { label: "Overview", icon: icons.overview },
  { label: "Accounts", icon: icons.accounts },
  { label: "Reconcile", icon: icons.reconcile, active: true },
  { label: "Reports", icon: icons.reports },
]

const approvers = [
  { initials: "AC", name: "Ana", done: true },
  { initials: "MK", name: "Mo", done: true },
  { initials: "JL", name: "Jo", done: false },
]

// The outer cards only fit the widest frames.
const summary = [
  { label: "Accounts", value: "4", outer: true },
  { label: "Matched", value: "1,248" },
  { label: "Open items", value: "0" },
  { label: "Difference", value: "$0.00" },
  { label: "Due", value: "Jul 3", outer: true },
]

const stats = [
  { value: "99.8%", label: "match accuracy" },
  { value: "4 hours", label: "saved per close" },
  { value: "40+", label: "bank feeds" },
]

// The surface has three layouts, chosen by the frame's width: a phone app
// below 30rem, a desktop window with icon rails from 30rem, and the full
// workspace with labelled rails and a wider table from 40rem.
const desk = "hidden @min-[30rem]:flex"
const phone = "@min-[30rem]:hidden"

// The window's chrome is tinted, so the open frame shows where it ends.
const chrome = "border-border bg-muted/40 text-foreground/70 shrink-0"

// The rails fill the margin the resting frame hides, so they come into view
// as it opens. Under reduced motion that margin is 0 and they fit content.
const rail = cn(
  chrome,
  desk,
  "w-[var(--frame-inset)] flex-col items-center gap-1 px-2 py-5",
  "motion-reduce:w-auto @min-[40rem]:items-stretch"
)

// The `62cqw` and `49cqw` widths below match the default `inset` and `scale`;
// retune them if you change either.

// Before it arrives, a narrow frame shows about the middle two thirds of the
// surface, so content that must read in that first frame stays inside this
// column. Wide frames line everything up with the table instead.
const column = "mx-auto w-[62cqw] @min-[40rem]:mx-6 @min-[40rem]:w-auto"

// The table's middle track is what the first frame shows, and the date and
// status tracks fill in as the frame opens. Wide frames have room for all
// three. From `19rem` the phone list reaches toward the frame's edges too,
// with its day and status in tracks the resting frame hides. The desktop
// window between `30rem` and `40rem` keeps to the middle track.
const transactionList = "@min-[19rem]:w-[92cqw] @min-[30rem]:w-[62cqw]"
const tableRow = cn(
  "grid grid-cols-1 items-center",
  "@min-[19rem]:grid-cols-[minmax(0,1fr)_62cqw_minmax(0,1fr)]",
  "@min-[30rem]:grid-cols-1",
  "@min-[40rem]:grid-cols-[minmax(0,1fr)_49cqw_minmax(0,1fr)]"
)
const outerCell = cn(
  "hidden items-center",
  "@min-[19rem]:flex @min-[30rem]:hidden @min-[40rem]:flex"
)
const headerCell = "hidden truncate @min-[40rem]:block"

// The summary cards sit over the table's middle track, lined up with its
// text, so the first frame shows them whole. The widest frames add a card
// over each outer track and span the table; the gap between the outer and
// middle cards is where the first frame's edges fall.
const summaryRow = cn(
  desk,
  "mx-auto mt-3 w-[62cqw] gap-2",
  "@min-[40rem]:mt-4 @min-[40rem]:w-[calc(49cqw-1.5rem)]",
  "@min-[56rem]:mx-6 @min-[56rem]:w-auto @min-[56rem]:gap-6"
)
const summaryCard = "border-border rounded-lg border px-2.5 py-1.5"
const outerSummaryCard = cn(
  "hidden shrink-0 @min-[56rem]:block",
  "w-[calc((100%-49cqw)/2-0.75rem)]"
)

function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-3.5 shrink-0", className)}
    >
      <path d={path} />
    </svg>
  )
}

function Logo({ path }: { path: string }) {
  return (
    <span className="border-border bg-background flex size-5 shrink-0 items-center justify-center rounded-md border">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-2.5"
      >
        <path d={path} />
      </svg>
    </span>
  )
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="bg-muted text-foreground/70 flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-medium">
      {initials}
    </span>
  )
}

// Hidden above the resting frame: the app's header on phones and the
// window's title bar on desktops.
function TopBar() {
  return (
    <div
      className={cn(
        chrome,
        "flex h-11 items-center gap-3 border-b px-4 @min-[40rem]:h-12"
      )}
    >
      <div aria-hidden="true" className="hidden gap-1.5 @min-[30rem]:flex">
        <span className="bg-muted-foreground/40 size-2 rounded-full" />
        <span className="bg-muted-foreground/40 size-2 rounded-full" />
        <span className="bg-muted-foreground/40 size-2 rounded-full" />
      </div>
      <p className="text-foreground flex items-center gap-1.5 font-semibold tracking-tight @min-[30rem]:mx-auto">
        <Icon path={icons.check} />
        Ledgerline
      </p>
      <span className="ml-auto @min-[30rem]:ml-0">
        <Avatar initials="JL" />
      </span>
    </div>
  )
}

// Hidden below the resting frame: the app's tab bar on phones and a status
// bar on desktops.
function BottomBar() {
  return (
    <>
      <div className={cn(chrome, phone, "grid h-11 grid-cols-4 border-t")}>
        {navigation.map((item) => (
          <span
            key={item.label}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 text-[10px]",
              item.active && "text-foreground font-medium"
            )}
          >
            <Icon path={item.icon} />
            {item.label}
          </span>
        ))}
      </div>
      <div
        className={cn(
          chrome,
          desk,
          "h-10 items-center justify-between gap-3 border-t px-4"
        )}
      >
        <span className="truncate">Bank feed synced 2 min ago</span>
        <span className="shrink-0 tabular-nums">1,248 transactions</span>
      </div>
    </>
  )
}

function NavigationRail() {
  return (
    <div className={cn(rail, "border-r")}>
      {/* Each item fits its label, so the active pill ends with it and both
          cross the frame's edge together as it opens. */}
      {navigation.map((item) => (
        <span
          key={item.label}
          className={cn(
            "flex items-center gap-1.5 rounded-md p-1.5 @min-[40rem]:self-start",
            item.active && "bg-muted text-foreground font-medium"
          )}
        >
          <Icon path={item.icon} />
          <span className="sr-only truncate @min-[40rem]:not-sr-only">
            {item.label}
          </span>
        </span>
      ))}
      <span className="mt-auto hidden truncate px-1.5 @min-[40rem]:block">
        Acme, Inc.
      </span>
    </div>
  )
}

function SignOffRail() {
  return (
    <div className={cn(rail, "border-l @min-[40rem]:px-3")}>
      <p className="text-foreground hidden truncate font-medium @min-[40rem]:block">
        Sign-off
      </p>
      <ul className="space-y-2.5 @min-[40rem]:mt-2">
        {approvers.map((approver) => (
          <li key={approver.initials} className="flex items-center gap-2">
            <Avatar initials={approver.initials} />
            <span className="hidden min-w-0 flex-1 truncate @min-[40rem]:block">
              {approver.name}
            </span>
            <Icon
              path={approver.done ? icons.check : icons.pending}
              className="hidden size-3 @min-[48rem]:block"
            />
          </li>
        ))}
      </ul>
      <div className="border-border mt-4 hidden border-t pt-4 @min-[40rem]:block">
        <p className="truncate">Bank balance</p>
        <p className="text-foreground mt-0.5 truncate font-semibold tabular-nums">
          $48,210.55
        </p>
      </div>
      <button
        type="button"
        className="border-border bg-background text-foreground focus-visible:outline-ring mt-auto flex h-7 w-full items-center justify-center rounded-md border font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Icon path={icons.check} className="@min-[40rem]:hidden" />
        <span className="sr-only @min-[40rem]:not-sr-only">Approve</span>
      </button>
    </div>
  )
}

function Transactions() {
  return (
    <div
      className={cn(
        column,
        transactionList,
        "border-border mt-3 overflow-hidden border-y",
        "@min-[30rem]:rounded-lg @min-[30rem]:border"
      )}
    >
      <div
        className={cn(
          tableRow,
          "border-border bg-muted/50 text-foreground/70 hidden h-7 border-b @min-[30rem]:grid"
        )}
      >
        <span className={cn(headerCell, "pl-3")}>Date</span>
        <span className="flex justify-between gap-3 px-3">
          <span>Transaction</span>
          <span>Amount</span>
        </span>
        <span className={cn(headerCell, "pr-3 text-right")}>Status</span>
      </div>
      {transactions.map((transaction) => (
        <div
          key={transaction.vendor}
          className={cn(tableRow, "border-border h-8 border-b last:border-b-0")}
        >
          {/* Phones show the day alone. */}
          <span
            className={cn(
              outerCell,
              "text-muted-foreground tabular-nums @min-[40rem]:pl-3"
            )}
          >
            <span className="hidden @min-[40rem]:inline">Jun&nbsp;</span>
            {transaction.day}
          </span>
          <span className="flex min-w-0 items-center gap-2 @min-[30rem]:px-3">
            <Logo path={transaction.logo} />
            <span className="truncate font-medium">{transaction.vendor}</span>
            <span className="text-muted-foreground hidden truncate @min-[56rem]:inline">
              {transaction.category}
            </span>
            <span className="ml-auto whitespace-nowrap tabular-nums">
              {transaction.amount}
            </span>
          </span>
          <span
            className={cn(outerCell, "justify-end gap-1 @min-[40rem]:pr-3")}
          >
            <Icon path={icons.check} className="size-3" />
            <span className="hidden @min-[42.5rem]:inline">Matched</span>
          </span>
        </div>
      ))}
    </div>
  )
}

function Workspace() {
  return (
    <div className="bg-background flex flex-col text-[11px] @min-[56rem]:text-xs">
      <TopBar />

      <div className="flex min-h-0 flex-1">
        <NavigationRail />

        {/* On narrow frames, the top padding keeps the first lines clear of
            the rounded corners the frame has before it arrives. */}
        <div className="flex min-w-0 flex-1 flex-col pt-10 @min-[40rem]:pt-6">
          {/* On wide frames this row sits above the first view, so it comes
              in with the arrival, lined up with the table below. */}
          <div
            className={cn(
              column,
              "flex flex-col",
              "@min-[40rem]:h-7 @min-[40rem]:flex-row-reverse @min-[40rem]:items-center @min-[40rem]:justify-between @min-[40rem]:gap-3"
            )}
          >
            <p className="text-muted-foreground truncate leading-4">
              June 2026 close
              <span className="hidden @min-[40rem]:inline">
                {" "}
                · Jun 1 – Jun 30
              </span>
            </p>
            <h3 className="mt-1 truncate text-base leading-6 font-semibold tracking-tight @min-[40rem]:mt-0 @min-[40rem]:text-lg @min-[40rem]:leading-7">
              All matched up.
            </h3>
          </div>

          <div className={summaryRow}>
            {summary.map((item) => (
              <div
                key={item.label}
                className={cn(
                  summaryCard,
                  item.outer ? outerSummaryCard : "min-w-0 flex-1"
                )}
              >
                <p className="text-muted-foreground truncate text-[10px]">
                  {item.label}
                </p>
                <p className="truncate text-sm font-semibold tabular-nums">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <Transactions />

          <div className={cn(column, phone, "mt-3")}>
            <p className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 *:whitespace-nowrap">
              <span className="font-medium">Ready for sign-off</span>
              <span className="text-muted-foreground tabular-nums">
                Difference $0.00
              </span>
            </p>
            <button
              type="button"
              className="bg-primary text-primary-foreground focus-visible:outline-ring mt-3 h-8 w-full rounded-md font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Approve close
            </button>
            <div className="mt-3 flex items-center justify-between gap-1.5">
              <p className="text-muted-foreground truncate">Signed 2 of 3</p>
              {/* The approver still to sign has a dashed ring. */}
              <ul className="flex shrink-0 gap-0.5">
                {approvers.map((approver) => (
                  <li
                    key={approver.initials}
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full text-[9px] font-medium",
                      approver.done
                        ? "bg-muted text-foreground/70"
                        : "border-muted-foreground/50 bg-background text-muted-foreground border border-dashed"
                    )}
                  >
                    <span aria-hidden="true">{approver.initials}</span>
                    <span className="sr-only">
                      {approver.name},{" "}
                      {approver.done ? "signed off" : "pending"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <SignOffRail />
      </div>

      <BottomBar />
    </div>
  )
}

export default function ExpandingFrameDemo() {
  const page = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: page })
  // The page's edges fade while the hero is in view, softening the rows the
  // fold cuts, and are sharp again before the open frame reaches them.
  const fade = useTransform(scrollY, [0, 160], [40, 0])
  const maskImage = useTransform(() =>
    fade.get() > 0
      ? `linear-gradient(transparent, #000 ${fade.get()}px, #000 calc(100% - ${fade.get()}px), transparent)`
      : "none"
  )

  return (
    <motion.div
      ref={page}
      style={{ maskImage }}
      className="bg-background text-foreground @container-size relative h-[540px] w-screen max-w-full overflow-y-auto"
    >
      <div className="mx-auto max-w-xl px-6 pt-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-balance @min-[40rem]:text-3xl">
          Close the books before lunch
        </h2>
        <p className="text-muted-foreground mt-2 text-sm text-balance">
          One workspace for every match, review and close.
        </p>
        <button
          type="button"
          className="bg-primary text-primary-foreground focus-visible:outline-ring mt-5 h-8 rounded-md px-4 text-xs font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Meet Ledgerline
        </button>
      </div>

      {/* The gap above is a margin, so the hero ends clear of the enlarged
          surface, which reaches a little above the resting frame. */}
      <ExpandingFrame className="mt-8">
        <Workspace />
      </ExpandingFrame>

      <div className="mx-auto grid max-w-xl grid-cols-3 gap-3 px-6 py-10 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-xl font-semibold tracking-tight @min-[40rem]:text-2xl">
              {stat.value}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
