"use client"

import { useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { BlogTableOfContents } from "./table-of-contents"

export function MobileTOC() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-8 bottom-8 z-50 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="bg-primary text-primary-foreground size-12 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            aria-label="Table of contents"
          >
            <Menu className="size-5" />
            <span className="sr-only">Table of contents</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="border-border bg-background/60 right-4! bottom-4! left-4! h-fit max-h-[60vh] overflow-hidden rounded-2xl border p-0 shadow-2xl backdrop-blur-xl"
        >
          <SheetHeader className="bg-muted border-border border-b px-6 py-3">
            <SheetTitle className="item-start flex text-left font-semibold">
              On this page
            </SheetTitle>
          </SheetHeader>
          <div className="bg-card max-h-[calc(60vh-8rem)] overflow-y-auto p-6 pt-4">
            <BlogTableOfContents
              className="[&_a:hover]:bg-muted/50 p-0 [&_a]:transition-colors [&_nav]:space-y-2 [&>p]:hidden"
              onLinkClick={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
