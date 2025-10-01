"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavItem } from "@/types"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: NavItem[]
}) {
  const pathname = usePathname()

  return (
    <nav className={cn("items-center gap-0.5", className)} {...props}>
      {items.map((item) => (
        <Button key={item.href} variant="ghost" asChild size="sm">
          <Link
            href={item.href ?? ""}
            className={cn(pathname === item.href && "text-primary")}
            onClick={() => {
              if (item.event) {
                trackEvent({ name: item.event })
              }
            }}
          >
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
