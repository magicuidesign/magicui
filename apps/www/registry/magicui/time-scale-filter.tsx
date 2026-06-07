"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export interface TimeScaleFilterProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  timelineDays?: number
  initialDate?: Date
}

const BOX_WIDTH = 52

export function TimeScaleFilter({
  value,
  onValueChange,
  className,
  timelineDays = 90,
  initialDate,
}: TimeScaleFilterProps) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const todayId = today.toLocaleDateString("en-CA")

  const timeline = useMemo(() => {
    return Array.from({ length: timelineDays }, (_, i) => {
      const d = new Date(today)
      d.setDate(d.getDate() - Math.floor(timelineDays / 2) + i)
      const id = d.toLocaleDateString("en-CA")
      return {
        id,
        dayNum: d.getDate(),
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        monthName: d.toLocaleDateString("en-US", { month: "short" }),
        full: d.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        isFirst: d.getDate() === 1,
        isToday: id === todayId,
      }
    })
  }, [timelineDays, today, todayId])

  const defaultId = (initialDate ?? today).toLocaleDateString("en-CA")
  const [internalValue, setInternalValue] = useState(defaultId)
  const selectedId = value ?? internalValue

  const scrollRef = useRef<HTMLDivElement>(null)
  const pinShaftRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const rafId = useRef<number | null>(null)

  const getIndex = useCallback(
    (id: string) => timeline.findIndex((t) => t.id === id),
    [timeline]
  )

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return
    const targetLeft = index * BOX_WIDTH
    scrollEl.scrollTo({
      left: targetLeft,
      behavior: smooth ? "smooth" : "instant",
    })
  }, [])

  const punchPin = useCallback(() => {
    const el = pinShaftRef.current
    if (!el) return
    el.style.transition = "none"
    el.style.transform = "scaleY(0.65)"
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.4s cubic-bezier(.34,1.56,.64,1)"
        el.style.transform = "scaleY(1)"
      })
    })
  }, [])

  const commitIndex = useCallback(
    (index: number, smooth = true) => {
      const clamped = Math.max(0, Math.min(index, timeline.length - 1))
      const item = timeline[clamped]
      if (!item) return

      setInternalValue(item.id)
      onValueChange?.(item.id)
      scrollToIndex(clamped, smooth)
      punchPin()
    },
    [timeline, onValueChange, scrollToIndex, punchPin]
  )

  // Initial mount
  useEffect(() => {
    const idx = getIndex(selectedId)
    if (idx !== -1) scrollToIndex(idx, false)
    const item = timeline.find((t) => t.id === selectedId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // External value change
  useEffect(() => {
    if (value === undefined) return
    const idx = getIndex(value)
    if (idx !== -1) {
      scrollToIndex(idx, true)
      const item = timeline.find((t) => t.id === value)
    }
  }, [value, getIndex, scrollToIndex, timeline])

  const handleScroll = useCallback(() => {
    if (isDragging.current) return
    if (rafId.current) cancelAnimationFrame(rafId.current)

    rafId.current = requestAnimationFrame(() => {
      const scrollEl = scrollRef.current
      if (!scrollEl) return

      const idx = Math.round(scrollEl.scrollLeft / BOX_WIDTH)
      const item = timeline[Math.max(0, Math.min(idx, timeline.length - 1))]

      if (item && item.id !== selectedId) {
        setInternalValue(item.id)
        onValueChange?.(item.id)
        punchPin()
      }
    })
  }, [timeline, selectedId, onValueChange, punchPin])

  // Mouse drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = "auto"
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const walk = (e.pageX - startX.current) * 1.6 // tuned for better wheel feel
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const stopDragging = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false

    const scrollEl = scrollRef.current
    if (scrollEl) scrollEl.style.scrollBehavior = "smooth"

    const idx = Math.round((scrollEl?.scrollLeft ?? 0) / BOX_WIDTH)
    commitIndex(idx, true)
  }, [commitIndex])

  // Touch support (for better mobile wheel feel)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true
    startX.current = e.touches[0].pageX
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = "auto"
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const walk = (e.touches[0].pageX - startX.current) * 1.6
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const handleTouchEnd = stopDragging

  const selectedIdx = getIndex(selectedId)

  const neighborClass = (i: number) => {
    const d = Math.abs(i - selectedIdx)
    if (d === 0)
      return "scale-[1.13] !bg-foreground !text-background !border-transparent shadow-xl"
    if (d === 1) return "scale-[1.04] text-foreground/80 border-border/70"
    if (d === 2) return "scale-[1.02]"
    return ""
  }

  const tickNeighborClass = (i: number) => {
    const d = Math.abs(i - selectedIdx)
    if (d === 0) return "!h-7 !bg-red-500 shadow-[0_0_8px_rgba(226,75,74,.4)]"
    if (d === 1) return "!h-[22px] !bg-foreground/70"
    if (d === 2) return "!h-[19px] !bg-border"
    return ""
  }

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center overflow-x-hidden",
        className
      )}
    >
      <style>{`
        .tsc-scroll::-webkit-scrollbar{display:none}
        .tsc-scroll{-ms-overflow-style:none;scrollbar-width:none}
        .tsc-scroll * { user-select: none; -webkit-user-select: none; }
      `}</style>

      <div className="relative w-full max-w-2xl">
        {/* Pin */}
        <div className="pointer-events-none absolute top-0 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center">
          <div
            ref={pinShaftRef}
            className="h-5 w-[2px] rounded-full bg-red-500"
            style={{ transformOrigin: "top center" }}
          />
          <div className="h-0 w-0 border-t-[9px] border-r-[5px] border-l-[5px] border-t-red-500 border-r-transparent border-l-transparent" />
        </div>

        {/* Fades */}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-30 w-20 bg-gradient-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-30 w-20 bg-gradient-to-l to-transparent" />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="tsc-scroll flex cursor-grab flex-col overflow-x-auto select-none active:cursor-grabbing"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            paddingLeft: `calc(50% - ${BOX_WIDTH / 2}px)`,
            paddingRight: `calc(50% - ${BOX_WIDTH / 2}px)`,
          }}
        >
          {/* Date cards */}
          <div className="flex h-24 items-end">
            {timeline.map((item, i) => (
              <div
                key={item.id}
                style={{ width: `${BOX_WIDTH}px`, scrollSnapAlign: "center" }}
                className="relative flex shrink-0 justify-center pb-2.5"
              >
                {item.isFirst && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-[.22em] whitespace-nowrap text-blue-500 uppercase">
                    {item.monthName}
                  </span>
                )}
                <div
                  className={cn(
                    "flex h-[62px] w-[42px] flex-col items-center justify-center rounded-2xl",
                    "border-border/40 bg-background text-muted-foreground border",
                    "transition-all duration-300 ease-out",
                    item.isToday &&
                      selectedId !== item.id &&
                      "border-red-400 text-red-500",
                    selectedId === item.id &&
                      item.isToday &&
                      "!border-transparent !bg-red-500 !text-white",
                    neighborClass(i)
                  )}
                >
                  <span className="mb-1 text-[7px] font-black tracking-[.13em] uppercase opacity-50">
                    {item.dayName}
                  </span>
                  <span className="text-[19px] leading-none font-black">
                    {item.dayNum}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ticks */}
          <div className="border-border/40 flex h-11 border-t">
            {timeline.map((item, i) => (
              <div
                key={item.id}
                className="relative flex shrink-0 justify-center"
                style={{ width: `${BOX_WIDTH}px` }}
              >
                <div className="relative flex w-full flex-col items-center">
                  <div
                    className={cn(
                      "bg-border/60 h-4 w-[2px] rounded-full transition-all duration-200 ease-out",
                      item.isToday &&
                        selectedId !== item.id &&
                        "!h-5 !bg-red-400/50",
                      tickNeighborClass(i)
                    )}
                  />
                  <div className="pointer-events-none absolute top-0 left-1/2 flex w-full justify-evenly px-[2px]">
                    {[0, 1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className="bg-border/50 mt-[3px] h-2 w-[1px] rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeScaleFilter
