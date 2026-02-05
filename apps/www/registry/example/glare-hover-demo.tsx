"use client"

import { Sparkles } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GlareHover } from "@/registry/magicui/glare-hover"

export default function GlareHoverDemo() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <GlareHover className="w-full max-w-lg rounded-xl">
        <Card>
          <CardHeader>
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
                <Sparkles className="text-primary size-6" />
              </div>
              <div>
                <CardTitle>Interactive Glare Effect</CardTitle>
                <CardDescription className="mt-1">
                  Hover to see the magic
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This component adds a subtle glare effect that smoothly animates
              across the element when you hover over it. Perfect for adding a
              premium, polished feel to your UI components.
            </p>
          </CardContent>
        </Card>
      </GlareHover>
    </div>
  )
}
