"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import posthog from "posthog-js";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="space-y-0 gap-0">
        <Link
          href="/"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex items-center h-16 px-4 border-b border-border"
        >
          <Icons.logo className="mr-2 size-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <ScrollArea className="h-[calc(100vh-4rem)] p-4">
          <div className="flex flex-col space-y-1.5">
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink key={item.href} href={item.href}>
                    {item.title}
                  </MobileLink>
                ),
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col gap-y-1.5 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item.items?.map((item) =>
                  !item.disabled && item.href ? (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onClick={() => item.event && posthog.capture(item.event)}
                      className={cn(
                        "flex justify-between text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-60",
                      )}
                    >
                      {item.title}
                      <div>
                        {item.label && (
                          <span className="ml-2 rounded-md bg-[#FFBD7A] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                            {item.label}
                          </span>
                        )}
                        {item.paid && (
                          <span className="ml-2 rounded-md bg-[#4ade80] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                            Pro
                          </span>
                        )}
                      </div>
                    </MobileLink>
                  ) : (
                    <span
                      key={index}
                      className={cn(
                        "text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-60",
                      )}
                    >
                      {item.title}
                      {item.label && (
                        <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                          {item.label}
                        </span>
                      )}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <SheetClose asChild>
      <Link
        href={href}
        onClick={() => {
          router.push(href.toString());
          onOpenChange?.(false);
        }}
        className={cn(
          className,
          "p-1 pl-2.5 text-[15px]",
          isActive
            ? "rounded-r-md border-l-2 border-primary/70 bg-secondary font-medium text-primary"
            : "",
        )}
        {...props}
      >
        {children}
      </Link>
    </SheetClose>
  );
}
