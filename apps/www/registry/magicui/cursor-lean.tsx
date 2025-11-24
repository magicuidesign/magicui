"use client"

import React from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

import { passSample18 } from "./cursor-lean-pass"

void passSample18(0)
export interface CursorLeanProps extends React.ComponentProps<"span"> {
  /** Sensing distance past each side in pixels. @default 56 */
  distance?: number
  /** Maximum body displacement in pixels. @default 9 */
  offset?: number
  /** Total label displacement as a multiple of the body. @default 1.4 */
  depth?: number
  /** Approach duration in seconds. @default 0.28 */
  duration?: number
  /** Spring bounce on release; approach never overshoots. @default 0.38 */
  bounce?: number
  /** Keep the same markup without movement. @default false */
  isStatic?: boolean
}

const LabelContext = React.createContext<MotionValue<number>[] | null>(null)
const pointerQuery = "(any-hover: hover) and (any-pointer: fine)"
const controlSelector =
  'button, a, input[type="button"], input[type="submit"], summary, [role="button"], [role="link"]'
const unavailableSelector = ':disabled, [aria-disabled="true"], [inert]'

export function CursorLean({
  children,
  className,
  distance = 56,
  offset = 9,
  depth = 1.4,
  duration = 0.28,
  bounce = 0.38,
  isStatic = false,
  ref,
  ...props
}: CursorLeanProps) {
  const root = React.useRef<HTMLSpanElement>(null)
  React.useImperativeHandle(ref, () => root.current as HTMLSpanElement, [])
  const preference = useReducedMotion()
  const visible = useInView(root)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const strength = useMotionValue(0)
  const labelX = useMotionValue(0)
  const labelY = useMotionValue(0)
  const values = React.useRef([x, y, strength, labelX, labelY]).current
  const textX = useTransform(() => labelX.get() - x.get())
  const textY = useTransform(() => labelY.get() - y.get())
  const scale = useTransform(strength, [0, 1], [1, 1.02])
  const config = React.useRef({ distance, offset, depth, duration, bounce })
  const hasChildren = React.Children.toArray(children).some(Boolean)

  React.useEffect(() => {
    config.current = { distance, offset, depth, duration, bounce }
  }, [distance, offset, depth, duration, bounce])

  React.useEffect(() => {
    const node = root.current
    if (!node || !hasChildren || !visible || isStatic) return
    const media = window.matchMedia(pointerQuery)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const controller = new AbortController()
    const options = { signal: controller.signal, capture: true, passive: true }
    let bounds = node.getBoundingClientRect()
    let active = false

    const drive = (tx = 0, ty = 0, power = 0) => {
      const settings = config.current
      const targets = [tx, ty, power, tx * settings.depth, ty * settings.depth]
      const time = Math.max(0.01, settings.duration) * (active ? 1 : 2.2)
      const rebound = active ? 0 : settings.bounce
      for (const [index, value] of values.entries()) {
        const visualDuration = time * (!active && index > 2 ? 1.12 : 1)
        const frequency = (2 * Math.PI) / (visualDuration * 1.2)
        animate(value, targets.at(index) ?? 0, {
          type: "spring",
          visualDuration,
          bounce: rebound,
          stiffness: frequency ** 2,
          damping: 2 * Math.max(0.05, 1 - rebound) * frequency,
        })
      }
    }
    const reset = () => {
      active = false
      for (const value of values) value.jump(0)
    }
    const release = () => {
      if (!active) return
      active = false
      drive()
    }
    const refresh = () => {
      release()
      bounds = node.getBoundingClientRect()
    }
    const track = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reduced.matches) return reset()
      const control = node.querySelector(controlSelector)
      if (!control || control.closest(unavailableSelector)) return release()
      if (control.matches(":focus-visible")) return reset()
      if (event.buttons) return
      const width = bounds.width / 2
      const height = bounds.height / 2
      const dx = event.clientX - bounds.left - width
      const dy = event.clientY - bounds.top - height
      const settings = config.current
      const reach = Math.max(0, settings.distance)
      const zone = Math.hypot(dx / (width + reach), dy / (height + reach))
      if (!width || !height || zone >= 1) return release()
      const box = Math.max(Math.abs(dx) / width, Math.abs(dy) / height)
      const progress = (1 - zone) / (1 - zone / box)
      const power = box <= 1 ? box : progress ** 2 * (3 - 2 * progress)
      const radius = Math.hypot(dx, dy) || 1
      const amount = Math.min(radius, Math.max(0, settings.offset) * power)
      active = true
      drive((dx / radius) * amount, (dy / radius) * amount, power)
    }
    const listen = () => {
      window.removeEventListener("pointermove", track, true)
      if (media.matches && !reduced.matches && !document.hidden)
        window.addEventListener("pointermove", track, options)
      else reset()
    }
    const on = (target: EventTarget, type: string, action: EventListener) =>
      target.addEventListener(type, action, options)
    const resize = new ResizeObserver(refresh)
    const availability = new MutationObserver(refresh)
    resize.observe(node)
    resize.observe(document.documentElement)
    availability.observe(document.documentElement, {
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled", "aria-disabled", "inert"],
    })

    on(media, "change", listen)
    on(reduced, "change", listen)
    on(document, "visibilitychange", listen)
    on(window, "scroll", refresh)
    on(window, "blur", release)
    on(window, "pointerout", (event) => {
      if (!(event as PointerEvent).relatedTarget) release()
    })
    on(node, "pointerdown", (event) => {
      if ((event as PointerEvent).pointerType === "touch") return reset()
      if (active) {
        for (const value of values) value.stop()
      }
    })
    on(window, "pointercancel", reset)
    on(node, "focusin", () => {
      if (node.querySelector(":focus-visible")) reset()
    })
    listen()
    return () => {
      controller.abort()
      resize.disconnect()
      availability.disconnect()
      reset()
    }
  }, [hasChildren, isStatic, preference, values, visible])

  return (
    <span {...props} ref={root} className={cn("inline-flex", className)}>
      <LabelContext.Provider value={[textX, textY]}>
        <motion.span className="inline-flex flex-1" style={{ x, y, scale }}>
          {children}
        </motion.span>
      </LabelContext.Provider>
    </span>
  )
}

export function CursorLeanLabel(props: React.ComponentProps<"span">) {
  const axes = React.useContext(LabelContext)
  if (!axes) return <span {...props} />
  return (
    <span {...props} className={cn(props.className)}>
      <motion.span
        className="inline-block"
        style={{ x: axes.at(0), y: axes.at(1) }}
      >
        {props.children}
      </motion.span>
    </span>
  )
}
