"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface Floating3DParticlesProps extends Omit<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  "width" | "height"
> {
  /**
   * Number of particles on desktop.
   * @default 400
   */
  particleCount?: number
  /**
   * Number of particles below the mobile breakpoint.
   * @default 80
   */
  mobileParticleCount?: number
  /**
   * Container width below which the mobile particle count is used.
   * @default 768
   */
  mobileBreakpoint?: number
  /**
   * Particle color, accepts 3 or 6 digit hex.
   * @default "#8B5CF6"
   */
  color?: string
  /**
   * Minimum particle radius in px.
   * @default 3
   */
  minParticleSize?: number
  /**
   * Maximum particle radius in px.
   * @default 8
   */
  maxParticleSize?: number
  /**
   * Minimum particle opacity.
   * @default 0.1
   */
  minOpacity?: number
  /**
   * Maximum particle opacity.
   * @default 0.5
   */
  maxOpacity?: number
  /**
   * Base angular velocity added to every particle.
   * @default 0.002
   */
  rotationSpeed?: number
  /**
   * Vertical floating speed in px per frame.
   * @default 0.8
   */
  floatSpeed?: number
  /**
   * Max particle orbit radius as a multiple of the container width.
   * @default 1.2
   */
  radiusScale?: number
  /**
   * Perspective field of view.
   * @default 400
   */
  fov?: number
  /**
   * Perspective distance from the viewer.
   * @default 500
   */
  perspectiveDistance?: number
  /**
   * Amplitude of the depth oscillation used by the projection.
   * @default 200
   */
  depthRange?: number
  /**
   * Whether moving the mouse rotates the particle field. Listeners are
   * attached to window while the canvas stays pointer-events-none, so the
   * interaction never blocks clicks on the content above. Set to false to
   * disable the mouse interaction entirely.
   * @default true
   */
  mouseInteraction?: boolean
  /**
   * Mouse rotation sensitivity.
   * @default 0.0001
   */
  mouseSensitivity?: number
  /**
   * Whether mouse rotation is smoothed with linear interpolation.
   * @default true
   */
  smoothMouse?: boolean
  /**
   * Mouse smoothing factor, between 0 and 1.
   * @default 0.08
   */
  mouseSmoothing?: number
  /**
   * Whether to scale the canvas by devicePixelRatio for sharper rendering.
   * @default true
   */
  highDpi?: boolean
  /**
   * Cap applied to devicePixelRatio.
   * @default 2
   */
  maxDpr?: number
  /**
   * Whether to pause rendering while the canvas is off-screen or the tab is
   * hidden.
   * @default true
   */
  pauseWhenHidden?: boolean
  /**
   * Whether to respect prefers-reduced-motion. When enabled and the user
   * prefers reduced motion, a single static frame is rendered instead of an
   * animation.
   * @default true
   */
  respectReducedMotion?: boolean
  /**
   * Background color of the canvas.
   * @default "transparent"
   */
  background?: string
  /**
   * CSS z-index of the canvas.
   * @default 0
   */
  zIndex?: number
}

interface Particle {
  angle: number
  radius: number
  y: number
  size: number
  speed: number
  opacity: number
  screenX: number
  screenY: number
  projectedScale: number
}

const DEFAULT_COLOR = "#8B5CF6"

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "").trim()
  const value =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean

  if (!/^[0-9a-f]{6}$/i.test(value)) {
    return `rgba(139, 92, 246, ${alpha})`
  }

  const parsed = Number.parseInt(value, 16)
  const r = Math.floor(parsed / 0x10000) % 0x100
  const g = Math.floor(parsed / 0x100) % 0x100
  const b = parsed % 0x100

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function createParticle(
  width: number,
  height: number,
  config: {
    radiusScale: number
    minParticleSize: number
    maxParticleSize: number
    minOpacity: number
    maxOpacity: number
  }
): Particle {
  return {
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * width * config.radiusScale,
    y: (Math.random() - 0.5) * height * 2,
    size:
      config.minParticleSize +
      Math.random() * (config.maxParticleSize - config.minParticleSize),
    speed: 0.0005 + Math.random() * 0.0015,
    opacity:
      config.minOpacity +
      Math.random() * (config.maxOpacity - config.minOpacity),
    screenX: 0,
    screenY: 0,
    projectedScale: 1,
  }
}

/**
 * Resolves the particle count based on the viewport width. Matches the
 * original implementation: the breakpoint is based on the viewport width, not
 * the container width.
 */
function getParticleCount(
  viewportWidth: number,
  mobileBreakpoint: number,
  particleCount: number,
  mobileParticleCount: number
) {
  return viewportWidth < mobileBreakpoint ? mobileParticleCount : particleCount
}

/**
 * Resolves the devicePixelRatio applied to the canvas.
 */
function getDpr(devicePixelRatio: number, highDpi: boolean, maxDpr: number) {
  return highDpi ? Math.min(devicePixelRatio || 1, maxDpr) : 1
}

/**
 * Computes the mouse-driven rotation offset around the canvas center.
 */
function getTargetRotation(
  clientX: number,
  centerX: number,
  sensitivity: number
) {
  return (clientX - centerX) * sensitivity
}

/**
 * Interpolates the current rotation towards the target rotation.
 */
function smoothRotation(current: number, target: number, smoothing: number) {
  return current + (target - current) * smoothing
}

/**
 * Projects a particle without any motion (used for the reduced-motion static
 * frame).
 */
function projectParticle(
  particle: Particle,
  options: {
    width: number
    height: number
    fov: number
    perspectiveDistance: number
  }
) {
  const scale = options.fov / (options.fov + options.perspectiveDistance)

  particle.screenX =
    options.width / 2 + Math.cos(particle.angle) * particle.radius * scale
  particle.screenY = options.height / 2 + particle.y * scale
  particle.projectedScale = scale
}

/**
 * Advances a particle by one frame: applies rotation, floating and the
 * perspective projection, and respawns the particle at the bottom when it
 * leaves the top edge.
 */
function updateParticle(
  particle: Particle,
  options: {
    width: number
    height: number
    rotation: number
    floatSpeed: number
    radiusScale: number
    fov: number
    perspectiveDistance: number
    depthRange: number
  }
) {
  particle.angle += particle.speed + options.rotation
  particle.y -= options.floatSpeed

  if (particle.y < -options.height) {
    particle.y = options.height
    particle.radius = Math.random() * options.width * options.radiusScale
  }

  const scale =
    options.fov /
    (options.fov +
      options.perspectiveDistance +
      Math.sin(particle.angle) * options.depthRange)

  particle.screenX =
    options.width / 2 + Math.cos(particle.angle) * particle.radius * scale
  particle.screenY = options.height / 2 + particle.y * scale
  particle.projectedScale = scale
}

export function Floating3DParticles({
  particleCount = 400,
  mobileParticleCount = 80,
  mobileBreakpoint = 768,
  color = DEFAULT_COLOR,
  minParticleSize = 3,
  maxParticleSize = 8,
  minOpacity = 0.1,
  maxOpacity = 0.5,
  rotationSpeed = 0.002,
  floatSpeed = 0.8,
  radiusScale = 1.2,
  fov = 400,
  perspectiveDistance = 500,
  depthRange = 200,
  mouseInteraction = true,
  mouseSensitivity = 0.0001,
  smoothMouse = true,
  mouseSmoothing = 0.08,
  highDpi = true,
  maxDpr = 2,
  pauseWhenHidden = true,
  respectReducedMotion = true,
  background = "transparent",
  zIndex = 0,
  className,
  style,
  ...canvasProps
}: Floating3DParticlesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const animationFrameRef = React.useRef<number | null>(null)
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null)
  const visibilityObserverRef = React.useRef<IntersectionObserver | null>(null)
  const mountedRef = React.useRef(false)
  const pausedRef = React.useRef(false)
  const reducedMotionRef = React.useRef(false)
  const targetRotationRef = React.useRef(0)
  const currentRotationRef = React.useRef(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    mountedRef.current = true

    let width = 0
    let height = 0
    let dpr = 1
    let particles: Particle[] = []
    let staticFrameDrawn = false

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )

    const updateReducedMotion = () => {
      reducedMotionRef.current =
        respectReducedMotion && reducedMotionQuery.matches
    }

    updateReducedMotion()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))

      dpr = getDpr(window.devicePixelRatio || 1, highDpi, maxDpr)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = getParticleCount(
        window.innerWidth,
        mobileBreakpoint,
        particleCount,
        mobileParticleCount
      )

      particles = Array.from({ length: Math.max(0, count) }, () =>
        createParticle(width, height, {
          radiusScale,
          minParticleSize,
          maxParticleSize,
          minOpacity,
          maxOpacity,
        })
      )

      staticFrameDrawn = false
    }

    const drawParticle = (particle: Particle) => {
      const alpha = particle.opacity * Math.min(1, particle.projectedScale)
      const size = particle.size * particle.projectedScale

      if (size <= 0) return

      ctx.beginPath()
      ctx.fillStyle = hexToRgba(color, alpha)
      ctx.arc(particle.screenX, particle.screenY, size, 0, Math.PI * 2)
      ctx.fill()
    }

    const clear = () => {
      ctx.clearRect(0, 0, width, height)
    }

    const renderStaticFrame = () => {
      clear()
      for (const particle of particles) {
        projectParticle(particle, { width, height, fov, perspectiveDistance })
        drawParticle(particle)
      }
    }

    const render = () => {
      if (!mountedRef.current) return

      if (pausedRef.current) {
        animationFrameRef.current = requestAnimationFrame(render)
        return
      }

      // Reduced motion: draw a single static frame and stop.
      if (reducedMotionRef.current) {
        if (!staticFrameDrawn) {
          staticFrameDrawn = true
          renderStaticFrame()
        }
        return
      }

      clear()

      currentRotationRef.current = smoothMouse
        ? smoothRotation(
            currentRotationRef.current,
            targetRotationRef.current,
            mouseSmoothing
          )
        : targetRotationRef.current

      const rotation = rotationSpeed + currentRotationRef.current

      for (const particle of particles) {
        updateParticle(particle, {
          width,
          height,
          rotation,
          floatSpeed,
          radiusScale,
          fov,
          perspectiveDistance,
          depthRange,
        })
      }

      // Painter's algorithm: draw distant particles first.
      particles.sort((a, b) => a.projectedScale - b.projectedScale)

      for (const particle of particles) {
        drawParticle(particle)
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseInteraction) return

      const rect = canvas.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      targetRotationRef.current = getTargetRotation(
        event.clientX,
        centerX,
        mouseSensitivity
      )
    }

    const resetMouseRotation = () => {
      targetRotationRef.current = 0
    }

    const handleVisibilityChange = () => {
      if (pauseWhenHidden) {
        pausedRef.current = document.hidden
      }
    }

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(resize)
      resizeObserverRef.current = observer
      observer.observe(canvas)
    } else {
      window.addEventListener("resize", resize)
    }

    if (pauseWhenHidden && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (!entry) return
          pausedRef.current = document.hidden || !entry.isIntersecting
        },
        { threshold: 0 }
      )
      visibilityObserverRef.current = observer
      observer.observe(canvas)
    }

    // Mouse listeners are attached to window so the canvas can keep
    // `pointer-events-none` and never block clicks on the content above it.
    if (mouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("blur", resetMouseRotation)
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    reducedMotionQuery.addEventListener("change", updateReducedMotion)

    resize()
    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      mountedRef.current = false

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }

      resizeObserverRef.current?.disconnect()
      resizeObserverRef.current = null
      visibilityObserverRef.current?.disconnect()
      visibilityObserverRef.current = null

      if (typeof ResizeObserver === "undefined") {
        window.removeEventListener("resize", resize)
      }

      if (mouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("blur", resetMouseRotation)
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      reducedMotionQuery.removeEventListener("change", updateReducedMotion)
    }
  }, [
    particleCount,
    mobileParticleCount,
    mobileBreakpoint,
    color,
    minParticleSize,
    maxParticleSize,
    minOpacity,
    maxOpacity,
    rotationSpeed,
    floatSpeed,
    radiusScale,
    fov,
    perspectiveDistance,
    depthRange,
    mouseInteraction,
    mouseSensitivity,
    smoothMouse,
    mouseSmoothing,
    highDpi,
    maxDpr,
    pauseWhenHidden,
    respectReducedMotion,
  ])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      style={{ zIndex, background, ...style }}
      {...canvasProps}
    />
  )
}

export default Floating3DParticles
