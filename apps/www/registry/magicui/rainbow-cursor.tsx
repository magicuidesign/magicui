"use client"

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { Mesh, Program, Renderer, Triangle } from "ogl"

import { cn } from "@/lib/utils"

const MAX_POINTS = 64
const HEX_COLOR = /^[0-9a-f]{6}$/i

const vertex = `
attribute vec2 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define MAX_POINTS 64

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];
uniform float uPointCount;
uniform vec3 uColor;
uniform vec3 uMiddleColor;
uniform vec3 uSecondaryColor;
uniform float uWidth;
uniform float uTaper;
uniform float uGlowIntensity;
uniform float uGlowSpread;
uniform float uHotspot;
uniform float uBrightness;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uTime;
uniform float uFade;

varying vec2 vUv;

vec3 ribbonColor(float progress) {
  if (progress < 0.45) {
    return mix(
      uColor,
      uMiddleColor,
      smoothstep(0.0, 0.45, progress)
    );
  }

  return mix(
    uMiddleColor,
    uSecondaryColor,
    smoothstep(0.45, 1.0, progress)
  );
}

void main() {
  vec2 pixel = vUv * uResolution;
  float denominator = max(uPointCount - 1.0, 1.0);

  float strongest = 0.0;
  float selectedProgress = 0.0;
  float selectedCore = 0.0;

  for (int i = 0; i < MAX_POINTS - 1; i++) {
    if (float(i) >= uPointCount - 1.0) {
      break;
    }

    vec2 start = uPoints[i];
    vec2 segment = uPoints[i + 1] - start;

    float segmentLength = length(segment);
    vec2 direction = segment / max(segmentLength, 0.0001);

    float along = clamp(
      dot(pixel - start, direction) / max(segmentLength, 0.0001),
      0.0,
      1.0
    );

    float progress = (float(i) + along) / denominator;
    vec2 closest = start + segment * along;
    float distanceToRibbon = length(pixel - closest);

    float taper = mix(
      1.0,
      pow(max(1.0 - progress, 0.0), 0.7),
      uTaper
    );

    float width = max(uWidth * taper, 0.3);

    float core = 1.0 - smoothstep(
      max(width - 0.65, 0.0),
      width + 0.65,
      distanceToRibbon
    );

    float haloWidth = max(
      width * (1.5 + uGlowSpread),
      1.0
    );

    float haloDistance = distanceToRibbon / haloWidth;
    float halo = exp(-haloDistance * haloDistance * 2.0);

    float tailFade = 1.0 - smoothstep(0.65, 1.0, progress);

    float pulse = 1.0
      + sin(uTime * uPulseSpeed * 2.0 - progress * 7.0)
      * 0.04
      * min(abs(uPulseSpeed), 1.0);

    float intensity = (
      core + halo * uGlowIntensity * 0.15
    ) * tailFade * pulse;

    if (intensity > strongest) {
      strongest = intensity;
      selectedProgress = progress;
      selectedCore = core;
    }
  }

  float alpha = clamp(
    strongest * uOpacity * uFade,
    0.0,
    1.0
  );

  if (alpha < 0.001) {
    discard;
  }

  vec3 color = ribbonColor(selectedProgress);

  float headHighlight = (
    1.0 - smoothstep(0.0, 0.12, selectedProgress)
  ) * selectedCore * uHotspot;

  color = mix(color, vec3(1.0), headHighlight);

  gl_FragColor = vec4(
    clamp(color * uBrightness, 0.0, 1.0),
    alpha
  );
}
`

export type RainbowCursorProps = ComponentPropsWithoutRef<"div"> & {
  headColor?: string
  midColor?: string
  tailColor?: string
  ribbonLength?: number
  ribbonWidth?: number
  taperStrength?: number
  trackingSpeed?: number
  haloIntensity?: number
  haloSpread?: number
  headHighlight?: number
  luminance?: number
  ribbonOpacity?: number
  pulseRate?: number
  fadeOnIdle?: boolean
  idleDelay?: number
  fadeTime?: number
  compositeMode?: "normal" | "screen" | "plus-lighter"
  pixelRatioCap?: number
  active?: boolean
}

function clamp(value: number, minimum: number, maximum: number) {
  if (!Number.isFinite(value)) {
    return minimum
  }

  return Math.min(Math.max(value, minimum), maximum)
}

function hexToRgb(hex: string) {
  const value = hex.trim().replace("#", "")
  const expanded =
    value.length === 3
      ? [...value].map((character) => character.repeat(2)).join("")
      : value

  if (!HEX_COLOR.test(expanded)) {
    return [0, 0, 0]
  }

  return [0, 2, 4].map(
    (offset) => Number.parseInt(expanded.slice(offset, offset + 2), 16) / 255
  )
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(query.matches)

    update()
    query.addEventListener("change", update)

    return () => query.removeEventListener("change", update)
  }, [])

  return reducedMotion
}

export function RainbowCursor({
  headColor = "#FACC15",
  midColor = "#3B82F6",
  tailColor = "#A855F7",
  ribbonLength = 40,
  ribbonWidth = 1.8,
  taperStrength = 0.95,
  trackingSpeed = 0.18,
  haloIntensity = 0.5,
  haloSpread = 0.6,
  headHighlight = 0.08,
  luminance = 1,
  ribbonOpacity = 1,
  pulseRate = 0,
  fadeOnIdle = true,
  idleDelay = 700,
  fadeTime = 900,
  compositeMode = "screen",
  pixelRatioCap = 1.5,
  active = true,
  children,
  className,
  ...props
}: RainbowCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  const config = {
    headColor,
    midColor,
    tailColor,
    ribbonLength,
    ribbonWidth,
    taperStrength,
    trackingSpeed,
    haloIntensity,
    haloSpread,
    headHighlight,
    luminance,
    ribbonOpacity,
    pulseRate,
    fadeOnIdle,
    idleDelay,
    fadeTime,
    active,
  }

  const configRef = useRef(config)

  useEffect(() => {
    configRef.current = config
  })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current

    if (!container || !canvas || reducedMotion) {
      return
    }

    const context = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    })

    if (!context) {
      return
    }

    const renderer = new Renderer({
      canvas,
      webgl: 1,
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, clamp(pixelRatioCap, 0.5, 3)),
    })

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)

    // Use a regular array for OGL's uniform-array lookup.
    const coordinates = Array.from({ length: MAX_POINTS * 2 }, () => 0)

    const points = Array.from({ length: MAX_POINTS }, () => ({
      x: 0,
      y: 0,
    }))

    const uniforms = {
      uResolution: { value: [1, 1] },
      uPoints: { value: coordinates },
      uPointCount: { value: 40 },
      uColor: { value: hexToRgb("#FACC15") },
      uMiddleColor: { value: hexToRgb("#3B82F6") },
      uSecondaryColor: { value: hexToRgb("#A855F7") },
      uWidth: { value: 1.8 },
      uTaper: { value: 0.95 },
      uGlowIntensity: { value: 0.5 },
      uGlowSpread: { value: 0.6 },
      uHotspot: { value: 0.08 },
      uBrightness: { value: 1 },
      uOpacity: { value: 1 },
      uPulseSpeed: { value: 0 },
      uTime: { value: 0 },
      uFade: { value: 0 },
    }

    const geometry = new Triangle(gl)

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
      depthTest: false,
      depthWrite: false,
    })

    const mesh = new Mesh(gl, { geometry, program })
    const target = { x: 0, y: 0 }

    let frame = 0
    let initialized = false
    let pointerInside = false
    let lastInput = 0
    let lastFrame = performance.now()
    let fade = 0

    const resize = () => {
      const width = Math.max(container.clientWidth, 1)
      const height = Math.max(container.clientHeight, 1)

      renderer.setSize(width, height)
      uniforms.uResolution.value = [width, height]
    }

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return
      }

      const rect = container.getBoundingClientRect()

      target.x =
        ((event.clientX - rect.left) / Math.max(rect.width, 1)) *
        container.clientWidth

      target.y =
        (1 - (event.clientY - rect.top) / Math.max(rect.height, 1)) *
        container.clientHeight

      if (!initialized || !pointerInside) {
        for (const point of points) {
          point.x = target.x
          point.y = target.y
        }
      }

      initialized = true
      pointerInside = true
      lastInput = performance.now()
    }

    const leave = () => {
      pointerInside = false
    }

    const render = (now: number) => {
      const current = configRef.current
      const elapsed = clamp(now - lastFrame, 0, 50)
      const delta = elapsed / (1_000 / 60)

      lastFrame = now

      const shouldFade =
        current.fadeOnIdle &&
        (!pointerInside || now - lastInput > Math.max(current.idleDelay, 0))

      const visible = initialized && current.active && !shouldFade
      const fadeStep = elapsed / Math.max(current.fadeTime, 1)

      fade = clamp(fade + (visible ? fadeStep : -fadeStep), 0, 1)

      if (initialized) {
        const speed = clamp(current.trackingSpeed, 0.01, 0.99)
        const headEase = 1 - (1 - speed) ** delta
        const chainEase = 1 - (1 - (0.28 + speed * 0.35)) ** delta

        let previous = target

        for (const [index, point] of points.entries()) {
          const ease = index === 0 ? headEase : chainEase

          point.x += (previous.x - point.x) * ease
          point.y += (previous.y - point.y) * ease

          coordinates[index * 2] = point.x
          coordinates[index * 2 + 1] = point.y

          previous = point
        }
      }

      uniforms.uPointCount.value = Math.round(
        clamp(current.ribbonLength, 2, MAX_POINTS)
      )

      uniforms.uColor.value = hexToRgb(current.headColor)
      uniforms.uMiddleColor.value = hexToRgb(current.midColor)
      uniforms.uSecondaryColor.value = hexToRgb(current.tailColor)
      uniforms.uWidth.value = clamp(current.ribbonWidth, 0.1, 100)
      uniforms.uTaper.value = clamp(current.taperStrength, 0, 1)
      uniforms.uGlowIntensity.value = clamp(current.haloIntensity, 0, 10)
      uniforms.uGlowSpread.value = clamp(current.haloSpread, 0, 10)
      uniforms.uHotspot.value = clamp(current.headHighlight, 0, 1)
      uniforms.uBrightness.value = clamp(current.luminance, 0, 10)
      uniforms.uOpacity.value = clamp(current.ribbonOpacity, 0, 1)
      uniforms.uPulseSpeed.value = clamp(current.pulseRate, -10, 10)
      uniforms.uTime.value = (now / 1_000) % 1_000
      uniforms.uFade.value = fade

      if (fade > 0) {
        renderer.render({ scene: mesh })
      } else {
        gl.clear(gl.COLOR_BUFFER_BIT)
      }

      frame = requestAnimationFrame(render)
    }

    const observer = new ResizeObserver(resize)

    observer.observe(container)

    container.addEventListener("pointerenter", updatePointer)
    container.addEventListener("pointermove", updatePointer)
    container.addEventListener("pointerleave", leave)
    container.addEventListener("pointercancel", leave)

    resize()
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()

      container.removeEventListener("pointerenter", updatePointer)
      container.removeEventListener("pointermove", updatePointer)
      container.removeEventListener("pointerleave", leave)
      container.removeEventListener("pointercancel", leave)

      geometry.remove()
      program.remove()
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
  }, [pixelRatioCap, reducedMotion])

  return (
    <div
      ref={containerRef}
      className={cn("relative size-full overflow-hidden", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block size-full select-none"
        style={{
          mixBlendMode: compositeMode,
          visibility: reducedMotion ? "hidden" : "visible",
        }}
      />

      <div className="relative z-10 size-full">{children}</div>
    </div>
  )
}
