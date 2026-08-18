"use client"

import {
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type HTMLInputTypeAttribute,
} from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"

import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP, MorphSVGPlugin)

const FLIGHT_DUR = 0.7
const FADE_FRAC = 0.9
const GRAVITY = 140
const MAX_PARTICLES = 7000
const SAMPLE_CSS_PX = 2
const BLOW_X = 440
const BLOW_Y = 160
const ARROW_REST = "M3 12h14M13 6l6 6-6 6"

type Particle = {
  ox: number
  oy: number
  vx: number
  vy: number
  wobble: number
  phase: number
  size: number
  alpha: number
  r: number
  g: number
  b: number
}

type GlyphRegion = {
  left: number
  top: number
  width: number
  height: number
}

export type FadeInputProps = Omit<
  ComponentPropsWithoutRef<"form">,
  "onSubmit"
> & {
  placeholder?: string
  type?: HTMLInputTypeAttribute
  name?: string
  label?: string
  onValueSubmit?: (value: string) => void
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const sampleGlyphs = (
  ctx: CanvasRenderingContext2D,
  region: GlyphRegion,
  dpr: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  const sx = Math.max(0, Math.floor(region.left * dpr))
  const sy = Math.max(0, Math.floor(region.top * dpr))
  const sw = Math.max(
    1,
    Math.min(canvasWidth - sx, Math.ceil(region.width * dpr))
  )
  const sh = Math.max(
    1,
    Math.min(canvasHeight - sy, Math.ceil(region.height * dpr))
  )
  const { data, width, height } = ctx.getImageData(sx, sy, sw, sh)
  const step = Math.max(1, Math.round(SAMPLE_CSS_PX * dpr))
  const particles: Particle[] = []

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4
      const alpha = data[i + 3]
      if (alpha < 80) {
        continue
      }

      particles.push({
        ox: (sx + x) / dpr,
        oy: (sy + y) / dpr,
        vx: 200 + Math.random() * 460,
        vy: -60 + (Math.random() - 0.55) * 220,
        wobble: 6 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        size: 1.1 + Math.random() * 1.1,
        alpha: alpha / 255,
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
      })
    }
  }

  if (particles.length <= MAX_PARTICLES) {
    return particles
  }

  const kept: Particle[] = []
  const ratio = MAX_PARTICLES / particles.length
  for (const particle of particles) {
    if (Math.random() < ratio) {
      kept.push(particle)
    }
  }
  return kept
}

const prepareCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  form: HTMLFormElement,
  extraX: number,
  extraY: number
) => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const formRect = form.getBoundingClientRect()
  const cssW = formRect.width + extraX
  const cssH = formRect.height + extraY

  canvas.style.width = `${cssW}px`
  canvas.style.height = `${cssH}px`
  canvas.style.left = "0px"
  canvas.style.top = `${-extraY / 2}px`
  canvas.width = Math.max(1, Math.floor(cssW * dpr))
  canvas.height = Math.max(1, Math.floor(cssH * dpr))

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, cssW, cssH)

  return { dpr, cssW, cssH, formRect, extraY }
}

const paintInputText = (
  ctx: CanvasRenderingContext2D,
  input: HTMLInputElement,
  formRect: DOMRect,
  extraY: number
) => {
  const style = getComputedStyle(input)
  const inputRect = input.getBoundingClientRect()
  const padL = Number.parseFloat(style.paddingLeft) || 0
  const x = inputRect.left - formRect.left + padL
  const y = inputRect.top - formRect.top + extraY / 2 + inputRect.height / 2

  ctx.font = style.font
  ctx.letterSpacing = style.letterSpacing
  ctx.fillStyle = style.color
  ctx.textBaseline = "middle"
  ctx.textAlign = "left"
  ctx.fillText(input.value, x, y)

  const fontSize = Number.parseFloat(style.fontSize) || 48
  const pad = 6
  return {
    left: Math.max(0, x - pad),
    top: Math.max(0, y - fontSize * 0.8 - pad),
    width: ctx.measureText(input.value).width + pad * 2,
    height: fontSize * 1.5 + pad * 2,
  }
}

const renderDust = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  progress: number,
  cssW: number,
  cssH: number
) => {
  ctx.clearRect(0, 0, cssW, cssH)

  const t = progress * FLIGHT_DUR
  const fade = Math.min(1, (1 - progress) / FADE_FRAC)

  for (const particle of particles) {
    const x =
      particle.ox +
      particle.vx * t +
      Math.sin(t * 9 + particle.phase) * particle.wobble
    const y =
      particle.oy +
      particle.vy * t +
      0.5 * GRAVITY * t * t +
      Math.cos(t * 7 + particle.phase) * particle.wobble * 0.6
    const alpha = particle.alpha * fade
    if (alpha <= 0.02) {
      continue
    }

    ctx.globalAlpha = alpha
    ctx.fillStyle = `rgb(${particle.r},${particle.g},${particle.b})`
    ctx.fillRect(x, y, particle.size, particle.size)
  }

  ctx.globalAlpha = 1
}

export function FadeInput({
  className,
  placeholder = "Enter your em@il",
  type = "email",
  name = "email",
  label = "Email",
  onValueSubmit,
  ...props
}: FadeInputProps) {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const arrowRef = useRef<SVGPathElement>(null)
  const penRef = useRef<SVGPathElement>(null)
  const busyRef = useRef(false)
  const writingRef = useRef(false)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const onValueSubmitRef = useRef(onValueSubmit)
  onValueSubmitRef.current = onValueSubmit

  const { contextSafe } = useGSAP(
    () => {
      return () => {
        tweenRef.current?.kill()
      }
    },
    { scope: formRef }
  )

  const morphArrow = contextSafe((ready: boolean) => {
    const arrow = arrowRef.current
    const pen = penRef.current
    if (!arrow || !pen || ready === writingRef.current) {
      return
    }

    writingRef.current = ready
    gsap.to(arrow, {
      duration: 0.45,
      ease: "power2.inOut",
      overwrite: "auto",
      morphSVG: {
        shape: ready ? pen : ARROW_REST,
        type: "rotational",
        map: "position",
      },
    })
  })

  const unlock = () => {
    const input = inputRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    busyRef.current = false

    if (input) {
      input.readOnly = false
      input.style.color = ""
      input.style.caretColor = ""
      input.value = ""
      input.focus()
    }

    if (canvas) {
      canvas.classList.add("opacity-0")
    }

    if (ctx && canvas) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    morphArrow(false)
  }

  const handleInput = contextSafe(() => {
    const input = inputRef.current
    if (!input) {
      return
    }
    morphArrow(input.value.trim().length > 0)
  })

  const handleSubmit = contextSafe((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = formRef.current
    const input = inputRef.current
    const canvas = canvasRef.current
    if (!form || !input || !canvas || busyRef.current) {
      return
    }

    const value = input.value.trim()
    if (!value) {
      return
    }

    onValueSubmitRef.current?.(value)

    if (prefersReducedMotion()) {
      input.value = ""
      morphArrow(false)
      return
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) {
      return
    }

    busyRef.current = true
    input.readOnly = true
    tweenRef.current?.kill()

    const { dpr, cssW, cssH, formRect, extraY } = prepareCanvas(
      canvas,
      ctx,
      form,
      BLOW_X,
      BLOW_Y
    )
    const region = paintInputText(ctx, input, formRect, extraY)

    canvas.classList.remove("opacity-0")
    input.style.color = "transparent"
    input.style.caretColor = "transparent"

    const particles = sampleGlyphs(
      ctx,
      region,
      dpr,
      canvas.width,
      canvas.height
    )
    const drive = { T: 0.08 }

    tweenRef.current = gsap.to(drive, {
      T: 1,
      duration: FLIGHT_DUR,
      ease: "none",
      onUpdate: () => renderDust(ctx, particles, drive.T, cssW, cssH),
      onComplete: unlock,
    })
  })

  return (
    <form
      {...props}
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className={cn(
        "border-foreground/10 text-foreground relative flex w-full items-center overflow-visible rounded-2xl border px-5 py-3 text-3xl tracking-tighter lg:px-8 lg:py-5 lg:text-5xl",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 z-10 opacity-0"
      />
      <label htmlFor={id} className="flex min-w-0 flex-1 items-center">
        <span className="sr-only">{label}</span>
        <input
          ref={inputRef}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          onChange={handleInput}
          className="text-foreground placeholder:text-foreground/30 relative z-50 h-full w-full min-w-0 appearance-none border-none bg-transparent focus:ring-0 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="text-foreground/50 relative z-50 flex shrink-0 cursor-pointer items-center justify-center pl-4"
        aria-label="Submit"
      >
        <svg
          className="h-[0.75em] w-[0.75em]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <title>Submit</title>
          <path
            ref={arrowRef}
            d={ARROW_REST}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={penRef}
            className="invisible"
            d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  )
}
