"use client"

import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface TemplateOpenProps {
  url: string
  free?: boolean
}

export function TemplateOpen({ url, free = false }: TemplateOpenProps) {
  if (free) {
    return (
      <Link
        href={url}
        target="_blank"
        className={cn(
          buttonVariants({
            variant: "default",
          }),
          "not-prose group relative w-full shrink gap-2"
        )}
      >
        Download
        <GitHubLogoIcon className="size-4" />
      </Link>
    )
  }

  return (
    <Link
      href="https://pro.magicui.design/"
      target="_blank"
      className={cn(
        buttonVariants({
          variant: "default",
        }),
        "not-prose group relative w-full shrink gap-1"
      )}
    >
      Buy Now
      <ArrowRightIcon className="size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  )
}
