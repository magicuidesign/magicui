import { ReactNode } from "react"
import Link from "next/link"
import { ExternalLinkIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function TemplatePreview({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        "not-prose group relative w-full shrink gap-2"
      )}
      href={href}
      target="_blank"
    >
      {children}
      <ExternalLinkIcon className="size-4" />
    </Link>
  )
}
