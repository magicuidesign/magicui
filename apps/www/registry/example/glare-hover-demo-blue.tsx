"use client"

import { TrendingUp, Users, Zap } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GlareHover } from "@/registry/magicui/glare-hover"

export default function GlareHoverDemoBlue() {
  return (
    <div className="relative flex w-full items-center justify-center">
      <GlareHover
        className="w-full max-w-lg rounded-xl"
        glareClassName="via-blue-500/30 dark:via-blue-400/40"
      >
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Real-time analytics dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                <Zap className="size-5 text-blue-500" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-muted-foreground text-xs">Uptime</div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                <TrendingUp className="size-5 text-blue-500" />
                <div className="text-2xl font-bold">+24%</div>
                <div className="text-muted-foreground text-xs">Growth</div>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
                <Users className="size-5 text-blue-500" />
                <div className="text-2xl font-bold">12.5k</div>
                <div className="text-muted-foreground text-xs">Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </GlareHover>
    </div>
  )
}
