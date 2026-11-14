"use client"

import { useState, type ReactNode } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function TestimonialsMore({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-4 max-md:hidden">
      <motion.div
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : "11rem" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={cn(
          "overflow-hidden",
          !open &&
            "mask-[linear-gradient(to_bottom,black_calc(100%-9rem),transparent_calc(100%-1.5rem))]"
        )}
      >
        {children}
      </motion.div>
      {!open && (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="relative mx-auto -mt-5 flex"
        >
          Show more
        </Button>
      )}
    </div>
  )
}
