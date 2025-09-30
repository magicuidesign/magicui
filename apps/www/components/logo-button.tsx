"use client"

import Link from "next/link"
import { toast } from "sonner"

import { siteConfig } from "@/config/site"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Icons } from "@/components/icons"

export function LogoButton() {
  function copyLogoAsSVG(path: string) {
    fetch(path)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onload = function (event) {
          const svgContent = event.target?.result
          navigator.clipboard.writeText(svgContent as string)
        }
        reader.readAsText(blob)
        toast.success("Logo copied to clipboard")
      })
  }

  function copyLogoAsPNG(path: string) {
    fetch(path)
      .then((response) => response.blob())
      .then((blob) => {
        const item = new ClipboardItem({ "image/png": blob })
        navigator.clipboard.write([item])
        toast.success("Logo copied to clipboard")
      })
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          href="/"
          className="relative mr-6 flex items-center space-x-2"
          aria-label="Home"
        >
          <Icons.logo className="size-6" />
          <span className="hidden font-bold md:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="flex items-center gap-2"
          onClick={() => copyLogoAsSVG("/icon.svg")}
        >
          <Icons.logo className="size-4" />
          <span>Copy Logo as SVG</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex items-center gap-2"
          onClick={() => copyLogoAsPNG("/icon.png")}
        >
          <Icons.logo className="size-4" />
          <span>Copy Logo as PNG</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
