"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavItemWithChildren } from "@/types"

import { docsConfig } from "@/config/docs"
import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface DocsSidebarNavItemsProps {
  items: NavItemWithChildren[]
  pathname: string
  level?: number
}

function DocsSidebarNavItems({
  items,
  pathname,
  level = 0,
}: DocsSidebarNavItemsProps) {
  return (
    <SidebarMenu className={cn("gap-0.5", level > 0 && "ml-4")}>
      {items.map((item) => {
        const isActive = item.href ? pathname === item.href : false
        const hasChildren = item.items && item.items.length > 0

        return (
          <div key={item.href || item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild={!!item.href}
                isActive={isActive}
                className="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-56 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() =>
                      item.event && trackEvent({ name: item.event })
                    }
                  >
                    <span className="absolute inset-0 flex w-(--sidebar-width) bg-transparent" />
                    <span className="flex items-center gap-2">
                      {item.title}
                      {item.label && (
                        <span className="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                          {item.label}
                        </span>
                      )}
                      {item.paid && (
                        <span className="rounded-md bg-gradient-to-r from-orange-400 to-orange-600 px-1.5 py-0.5 text-xs leading-none text-white no-underline group-hover:no-underline">
                          Pro
                        </span>
                      )}
                    </span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-2">
                    {item.title}
                    {item.label && (
                      <span className="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                        {item.label}
                      </span>
                    )}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
            {hasChildren && (
              <DocsSidebarNavItems
                items={item.items!}
                pathname={pathname}
                level={level + 1}
              />
            )}
          </div>
        )
      })}
    </SidebarMenu>
  )
}

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--footer-height)+2rem)] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2 pb-12">
        <div className="h-(--top-spacing) shrink-0" />
        {docsConfig.sidebarNav.map((section) => {
          return (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel className="text-muted-foreground font-medium">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <DocsSidebarNavItems
                  items={section.items || []}
                  pathname={pathname}
                />
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
    </Sidebar>
  )
}
