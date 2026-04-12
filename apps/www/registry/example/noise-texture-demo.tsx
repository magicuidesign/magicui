"use client"

import { cn } from "@/lib/utils"
import { NoiseTexture } from "@/registry/magicui/noise-texture"

export default function NoiseTextureDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-neutral-100/80 dark:bg-neutral-950">
      <NoiseTexture
        className={cn(
          "absolute inset-0",
          "mask-[radial-gradient(420px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  )
}
