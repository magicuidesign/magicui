"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { MagicCard } from "@/registry/magicui/magic-card"

import { AvatarCircles } from "../magicui/avatar-circles"

export default function MagicCardDemo() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted
    ? (theme === "system" ? systemTheme : theme) === "dark"
    : true

  return (
    <Card className="w-full max-w-sm border-none p-0 shadow-none">
      <MagicCard
        mode="orb"
        glowFrom={isDark ? "#ee4f27" : "#E9D5FF"}
        glowTo={isDark ? "#6b21ef" : "#FBCFE8"}
        className="p-0"
      >
        <CardHeader className="border-border border-b p-4 [.border-b]:pb-4">
          <div className="flex items-center gap-3">
            <AvatarCircles
              avatarUrls={[
                {
                  imageUrl: "https://avatars.githubusercontent.com/u/81306489",
                  profileUrl: "https://github.com/Yeom-JinHo",
                },
              ]}
            />
            <div className="flex-1">
              <CardTitle>Yeom JinHo</CardTitle>
              <CardDescription className="mt-1">
                Frontend Developer
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <p className="text-sm font-medium">
            Frontend Developer focused on Interactive UI &amp; Performance
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            I&apos;m passionate about visual presentation and currently focusing
            on interactive UI.
          </p>
        </CardContent>
        <CardFooter className="border-border border-t p-4 [.border-t]:pt-4">
          <Button asChild className="w-full">
            <Link
              href="https://github.com/Yeom-JinHo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Icons.gitHub className="size-4" />
              View on GitHub
            </Link>
          </Button>
        </CardFooter>
      </MagicCard>
    </Card>
  )
}
