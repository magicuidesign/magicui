"use client"

import { Award, CheckCircle2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GlareHover } from "@/registry/magicui/glare-hover"

export default function GlareHoverDemoPurple() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <GlareHover
        className="w-full max-w-lg rounded-xl"
        glareClassName="via-purple-500/40 dark:via-purple-300/50"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-purple-500/10">
                <Award className="size-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <CardTitle>Achievement Unlocked!</CardTitle>
                <CardDescription className="mt-1">
                  You&apos;ve reached a new milestone
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-purple-500" />
                <span className="text-sm">Completed 100 tasks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-purple-500" />
                <span className="text-sm">Maintained 30-day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-purple-500" />
                <span className="text-sm">Earned Expert badge</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </GlareHover>
    </div>
  )
}
