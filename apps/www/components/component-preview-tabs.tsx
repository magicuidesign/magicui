"use client"

import * as React from "react"
import { RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OpenInV0Button } from "@/components/open-in-v0-button"

export function ComponentPreviewTabs({
  className,
  name,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [key, setKey] = React.useState(0)
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      className={cn("relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs
        className="relative mr-auto w-full"
        value={tab}
        onValueChange={setTab}
      >
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList className="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
              <TabsTrigger
                value="preview"
                className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
              >
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="data-[tab=code]:border-code relative rounded-lg border md:-mx-1"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible overflow-hidden data-[active=true]:visible"
        >
          <div className="flex items-center justify-end gap-2 p-4">
            <OpenInV0Button url={`https://magicui.design/r/${name}.json`} />
            <Button
              onClick={() => setKey((prev) => prev + 1)}
              className="flex items-center rounded-lg px-3 py-1"
              variant="ghost"
            >
              <RotateCcw aria-label="restart-btn" size={16} />
            </Button>
          </div>
          <div
            key={key}
            data-align={align}
            className={cn(
              "preview flex min-h-[450px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
            )}
          >
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-hidden rounded-md data-[active=true]:block **:[figure]:!m-0 **:[figure]:h-full **:[pre]:h-full **:[pre]:max-h-full"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
