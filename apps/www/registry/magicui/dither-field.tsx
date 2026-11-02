"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

/**
 * Each pattern is the GLSL body of `float pattern(vec2 p, vec2 size, float t)`.
 * `p` is the position in CSS pixels from the bottom-left corner, `size` is
 * the field size in CSS pixels and `t` is the time in seconds. Return the
 * light level, where 0 is dark and 1 is full light. Add an entry here to add
 * a pattern; the `pattern` prop type follows.
 */
const PATTERNS = {
  // A low sun on the bottom edge, with haze bands that drift up through it.
  horizon: `
    float r = max(min(size.x * 0.42, size.y * 0.8), 90.0);
    vec2 d = (p - vec2(0.5 * size.x, -0.15 * r)) / vec2(1.25 * r, r);
    float wobble = fbm(vec2(atan(d.y, d.x) * 1.8, t * 0.04)) - 0.5;
    float rim = length(d) * (1.0 + 0.14 * wobble);
    float sun = exp(-3.4 * max(rim - 0.42, 0.0)) * 0.78;
    float h = p.y / r;
    float drift = (fbm(vec2(p.x / 320.0, t * 0.03)) - 0.5) * 2.4;
    float band = 0.5 + 0.5 * sin(log(1.0 + 7.0 * h) * 8.0 - t * 0.45 + drift);
    float haze = smoothstep(0.25, 0.95, band) * exp(-1.9 * h) * 0.5;
    float ground = exp(-p.y / 22.0) * 0.32;
    float sides = smoothstep(0.0, 0.2, p.x / size.x) * smoothstep(1.0, 0.8, p.x / size.x);
    return (sun * (1.0 + haze) + haze * 0.35 + ground) * sides * (1.0 + 0.04 * sin(t * 0.4));
  `,
  // A soft orb in the middle that breathes and wanders a little.
  glow: `
    vec2 c = 0.5 * size + vec2(sin(t * 0.21), cos(t * 0.17)) * 0.05 * size;
    float r = 0.5 * min(size.x, size.y);
    float d = length(p - c) / r;
    float n = fbm(p / 170.0 + vec2(t * 0.05, -t * 0.04));
    return exp(-1.7 * d * d) * (0.75 + 0.45 * n) + 0.12 * n * exp(-d);
  `,
  // Curtains of light that hang from the top and sway.
  aurora: `
    float sway = fbm(vec2(p.x / 600.0, t * 0.05));
    float d = p.y / size.y - (0.45 + 0.35 * (sway - 0.5));
    float curtain = d > 0.0 ? exp(-d * 4.0) : exp(d * 22.0);
    float rays = fbm(vec2(p.x / 70.0 + sway * 6.0, p.y / 900.0 - t * 0.08));
    float shimmer = fbm(vec2(p.x / 40.0 - t * 0.05, 3.0));
    return curtain * (0.25 + 0.75 * smoothstep(0.3, 0.75, rays)) * (0.6 + 0.5 * shimmer);
  `,
  // Slow diagonal swells, like dunes or contour lines.
  waves: `
    vec2 q = p / 32.0;
    float warp = fbm(q * 0.09 + vec2(t * 0.035, t * 0.02));
    float s = 0.5 + 0.5 * sin(q.x * 0.9 + q.y * 0.6 + warp * 5.0 - t * 0.4);
    float crest = s * s * s * s;
    return crest * (0.5 + 0.5 * p.y / size.y) + 0.12 * warp;
  `,
  // Drifting clouds that fill the whole area evenly.
  clouds: `
    float n = fbm(p / 210.0 + vec2(t * 0.03, t * 0.012));
    float m = fbm(p / 80.0 - vec2(t * 0.02, 0.0));
    return smoothstep(0.28, 0.78, n) * (0.7 + 0.5 * m);
  `,
} as const

export type DitherPattern = keyof typeof PATTERNS

/** One colour, or a `[low, mid, high]` ramp from dim dots to bright dots. */
export type DitherColor = string | readonly [string, string, string]

export interface DitherFieldProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "color"
> {
  /**
   * The procedural light field that the dots follow.
   * @default "horizon"
   */
  pattern?: DitherPattern
  /**
   * An image or video URL to dither instead of the pattern. Bright areas get
   * more dots. URLs ending in .mp4, .webm, .ogv, .mov or .m4v (or
   * `data:video/` URLs) play as muted, looping video. Remote files must allow
   * CORS.
   */
  src?: string
  /**
   * Any CSS colour, including `var(--primary)` and `currentColor`, or a
   * `[low, mid, high]` ramp. One colour fades from 35% to full opacity.
   * @default "currentColor"
   */
  color?: DitherColor
  /**
   * The size of one dot in CSS pixels. Dots snap to whole device pixels.
   * @default 1
   */
  dotSize?: number
  /**
   * Brightness of the field. 0 shows only the pointer glow; above 1 fills more.
   * @default 0.75
   */
  intensity?: number
  /**
   * Animation speed multiplier. `0` holds a still frame.
   * @default 1
   */
  speed?: number
  /**
   * Frame rate cap. The dots read as a still texture, so 30 is plenty.
   * @default 30
   */
  fps?: number
  /**
   * Brighten the field around the mouse, the pen or a held finger.
   * @default true
   */
  interactive?: boolean
}

type Rgba = [number, number, number, number]

type Media = HTMLImageElement | HTMLVideoElement

type Renderer = {
  /** Sizes the dot grid (canvas pixels) and the field (CSS pixels). */
  resize: (dotsX: number, dotsY: number, cssX: number, cssY: number) => void
  setRamp: (ramp: Rgba[]) => void
  setIntensity: (intensity: number) => void
  setMedia: (media: Media | null) => void
  draw: (time: number, pointer: [number, number, number]) => void
  dispose: () => void
}

const VERTEX = `#version 300 es
void main() {
  vec2 corner = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  gl_Position = vec4(corner, 0.0, 1.0);
}`

const FIELD_HEADER = `#version 300 es
precision highp float;
uniform vec2 uSize;
uniform vec2 uView;
uniform float uTime;
out vec4 outColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat2 turn = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p);
    p = turn * p * 2.0 + 11.7;
    amp *= 0.5;
  }
  return sum;
}
`

const FIELD_MAIN = `
void main() {
  vec2 p = gl_FragCoord.xy / uView * uSize;
  float v = pattern(p, uSize, uTime);
  outColor = vec4(clamp(v, 0.0, 1.0), 0.0, 0.0, 1.0);
}`

// Image and video: luminance under a cover fit, so bright areas get more dots.
const MEDIA_PATTERN = `
uniform sampler2D uMedia;
uniform vec2 uMediaSize;

float pattern(vec2 p, vec2 size, float t) {
  float scale = max(size.x / uMediaSize.x, size.y / uMediaSize.y);
  vec2 uv = (p - 0.5 * size) / (uMediaSize * scale) + 0.5;
  vec4 c = texture(uMedia, vec2(uv.x, 1.0 - uv.y));
  return dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
}
`

const DITHER = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uView;
uniform vec4 uLow;
uniform vec4 uMid;
uniform vec4 uHigh;
uniform float uIntensity;
uniform vec3 uPointer;
uniform float uDot;
out vec4 outColor;

// 8x8 ordered-dither threshold, built from the 2x2 matrix [0 2; 3 1]. The
// lowest bit of the cell position carries the largest weight.
float threshold(vec2 cell) {
  vec2 c = floor(cell);
  float sum = 0.0;
  float weight = 16.0;
  for (int i = 0; i < 3; i++) {
    vec2 b = mod(c, 2.0);
    sum += weight * mod(2.0 * b.x + 3.0 * b.y, 4.0);
    c = floor(c * 0.5);
    weight *= 0.25;
  }
  return (sum + 0.5) / 64.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uView;
  float base = texture(uField, uv).r;
  float halo = textureLod(uField, uv, 1.0).r * 0.45
    + textureLod(uField, uv, 2.2).r * 0.35
    + textureLod(uField, uv, 3.4).r * 0.2;
  float v = base + 0.55 * halo;
  float over = max(v - 0.85, 0.0);
  v = min(v, 0.85) + over / (1.0 + 4.0 * over);
  v = clamp(v * uIntensity, 0.0, 1.0);
  // The pointer glow comes after intensity, so it shows on quiet fields too.
  vec2 away = gl_FragCoord.xy * uDot - uPointer.xy;
  v = min(v + uPointer.z * exp(-dot(away, away) / 28000.0) * (0.35 + 0.5 * v), 1.0);
  // Drop the faintest light, so empty areas stay empty instead of showing
  // a sparse, even grid.
  v = max(v - 0.02, 0.0) / 0.98;
  float on = step(threshold(gl_FragCoord.xy), v);
  vec4 c = v < 0.5 ? mix(uLow, uMid, v * 2.0) : mix(uMid, uHigh, v * 2.0 - 1.0);
  outColor = vec4(c.rgb * c.a, c.a) * on;
}`

/** The light field renders at this fraction of the CSS size, then blooms. */
const FIELD_SCALE = 0.6
const POINTER_EASE = 6
const VIDEO_FILE = /^data:video\/|\.(mp4|webm|ogv|mov|m4v)(\?|#|$)/i

function compile(gl: WebGL2RenderingContext, fragment: string) {
  const program = gl.createProgram()
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, fragment],
  ] as const) {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("DitherField: shader error", gl.getShaderInfoLog(shader))
    }
    gl.attachShader(program, shader)
    gl.deleteShader(shader)
  }
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  return program
}

function createTexture(gl: WebGL2RenderingContext, mipmaps: boolean) {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  const min = mipmaps ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, min)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return texture
}

/**
 * Two passes: the light field renders small into a mipmapped texture, then
 * the dither pass reads it with a bloom from the blurred mip levels and
 * thresholds it into dots, one canvas pixel per dot. Returns null when the
 * shaders do not compile, so the caller can fall back.
 */
function createRenderer(
  gl: WebGL2RenderingContext,
  patternSource: string
): Renderer | null {
  const field = compile(gl, `${FIELD_HEADER}${patternSource}${FIELD_MAIN}`)
  const dither = compile(gl, DITHER)
  if (!field || !dither) {
    gl.deleteProgram(field)
    gl.deleteProgram(dither)
    return null
  }
  const at = (program: WebGLProgram, name: string) =>
    gl.getUniformLocation(program, name)

  const fieldTexture = createTexture(gl, true)
  const mediaTexture = createTexture(gl, false)
  const framebuffer = gl.createFramebuffer()
  let media: Media | null = null
  // Images upload once; video uploads a new frame on every draw.
  let mediaStale = false
  let view = [1, 1]
  let fieldView = [1, 1]
  let css = [1, 1]

  gl.useProgram(dither)
  gl.uniform1i(at(dither, "uField"), 0)
  gl.useProgram(field)
  gl.uniform1i(at(field, "uMedia"), 1)

  return {
    resize(dotsX, dotsY, cssX, cssY) {
      view = [dotsX, dotsY]
      css = [cssX, cssY]
      fieldView = [
        Math.max(1, Math.round(cssX * FIELD_SCALE)),
        Math.max(1, Math.round(cssY * FIELD_SCALE)),
      ]
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, fieldTexture)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        fieldView[0],
        fieldView[1],
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      )
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        fieldTexture,
        0
      )
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    },
    setRamp([low, mid, high]) {
      gl.useProgram(dither)
      gl.uniform4f(at(dither, "uLow"), ...low)
      gl.uniform4f(at(dither, "uMid"), ...mid)
      gl.uniform4f(at(dither, "uHigh"), ...high)
    },
    setIntensity(intensity) {
      gl.useProgram(dither)
      gl.uniform1f(at(dither, "uIntensity"), intensity)
    },
    setMedia(next) {
      media = next
      mediaStale = true
    },
    draw(time, pointer) {
      gl.useProgram(field)
      if (media) {
        const source = media
        const isVideo = source instanceof HTMLVideoElement
        const width = isVideo ? source.videoWidth : source.naturalWidth
        const height = isVideo ? source.videoHeight : source.naturalHeight
        if (!width || !height) return
        if (mediaStale || isVideo) {
          gl.activeTexture(gl.TEXTURE1)
          gl.bindTexture(gl.TEXTURE_2D, mediaTexture)
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            source
          )
          gl.uniform2f(at(field, "uMediaSize"), width, height)
          mediaStale = false
        }
      }
      gl.uniform2f(at(field, "uSize"), css[0], css[1])
      gl.uniform2f(at(field, "uView"), fieldView[0], fieldView[1])
      gl.uniform1f(at(field, "uTime"), time)
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
      gl.viewport(0, 0, fieldView[0], fieldView[1])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, fieldTexture)
      gl.generateMipmap(gl.TEXTURE_2D)

      gl.useProgram(dither)
      gl.uniform2f(at(dither, "uView"), view[0], view[1])
      gl.uniform1f(at(dither, "uDot"), css[0] / view[0])
      gl.uniform3f(at(dither, "uPointer"), ...pointer)
      gl.viewport(0, 0, view[0], view[1])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    dispose() {
      gl.deleteProgram(field)
      gl.deleteProgram(dither)
      gl.deleteTexture(fieldTexture)
      gl.deleteTexture(mediaTexture)
      gl.deleteFramebuffer(framebuffer)
    },
  }
}

const toRamp = (color: DitherColor) =>
  typeof color === "string" ? [color, color, color] : [...color]

/**
 * Resolves CSS colours (`var(--x)`, `currentColor`, `oklch()`) in the
 * context of `host`, then reads them back as straight RGBA through a
 * 1x1 canvas. A single colour fades from 35% to full opacity.
 */
function resolveRamp(host: HTMLElement, color: DitherColor): Rgba[] {
  const probe = document.createElement("span")
  probe.style.display = "none"
  host.appendChild(probe)
  const context = document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true })
  const fades = typeof color === "string" ? [0.35, 0.75, 1] : [1, 1, 1]
  const ramp = toRamp(color).map((value, index): Rgba => {
    probe.style.color = ""
    probe.style.color = value
    if (!context) return [0.5, 0.5, 0.5, fades[index]]
    context.clearRect(0, 0, 1, 1)
    context.fillStyle = "#808080"
    context.fillStyle = getComputedStyle(probe).color
    context.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data
    return [r / 255, g / 255, b / 255, (a / 255) * fades[index]]
  })
  probe.remove()
  return ramp
}

function loadMedia(
  src: string,
  onReady: (media: Media) => void,
  onError: () => void
) {
  if (VIDEO_FILE.test(src)) {
    const video = document.createElement("video")
    video.crossOrigin = "anonymous"
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = "auto"
    video.addEventListener("loadeddata", () => onReady(video), { once: true })
    video.addEventListener("error", onError, { once: true })
    video.src = src
    return video
  }
  const image = new Image()
  image.crossOrigin = "anonymous"
  image.decoding = "async"
  image.addEventListener("load", () => onReady(image), { once: true })
  image.addEventListener("error", onError, { once: true })
  image.src = src
  return image
}

const ease = (from: number, to: number, rate: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-rate * dt))

/**
 * An animated ordered-dither background. A soft light field, or an image or
 * video, is thresholded against an 8x8 Bayer matrix into crisp square dots
 * coloured from a three-stop ramp. Children render above the dots.
 */
export function DitherField({
  pattern = "horizon",
  src,
  color = "currentColor",
  dotSize = 1,
  intensity = 0.75,
  speed = 1,
  fps = 30,
  interactive = true,
  className,
  children,
  ...props
}: DitherFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  // The GL context only exists while the field is near the viewport, so a
  // page with many fields stays under the browser's cap of live contexts.
  const [near, setNear] = useState(false)
  const [fallback, setFallback] = useState(false)
  // Bumped when the browser restores a lost WebGL context.
  const [contextKey, setContextKey] = useState(0)
  // Read every frame, so changing them never rebuilds the GL state.
  const live = useRef({ color, intensity, speed, fps, interactive })
  live.current = { color, intensity, speed, fps, interactive }
  const repaint = useRef(() => {})
  // Kept across rebuilds, so a field that scrolls back into view resumes.
  const time = useRef(10)
  const shown = useRef(false)
  const colorKey = toRamp(color).join("|")

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "100px" }
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const layer = layerRef.current
    if (!near || !root || !layer) return

    const canvas = document.createElement("canvas")
    canvas.className =
      "absolute top-0 left-0 opacity-0 transition-opacity duration-700 [image-rendering:pixelated] data-[ready]:opacity-100 motion-reduce:transition-none"
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    })
    const renderer = gl
      ? createRenderer(
          gl,
          src
            ? MEDIA_PATTERN
            : `float pattern(vec2 p, vec2 size, float t) {${PATTERNS[pattern]}}`
        )
      : null
    if (!gl || !renderer) {
      gl?.getExtension("WEBGL_lose_context")?.loseContext()
      setFallback(true)
      return
    }
    setFallback(false)
    // A field that comes back into view skips the fade-in.
    if (shown.current) canvas.dataset.ready = ""
    layer.appendChild(canvas)

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointer = { x: 0, y: 0, clientX: 0, clientY: 0, on: false, hover: 0 }
    let previous = 0
    let frame = 0
    let cssHeight = 0
    let ready = !src
    let lost = false
    let disposed = false

    const draw = () => {
      if (!ready || !cssHeight || lost) return
      renderer.draw(time.current, [pointer.x, pointer.y, pointer.hover])
      canvas.dataset.ready = ""
      shown.current = true
    }

    const paint = () => {
      renderer.setRamp(resolveRamp(root, live.current.color))
      renderer.setIntensity(live.current.intensity)
      draw()
    }
    repaint.current = paint
    // Theme changes can arrive in bursts; resolve the colours once a frame.
    let paintFrame = 0
    const schedulePaint = () => {
      cancelAnimationFrame(paintFrame)
      paintFrame = requestAnimationFrame(paint)
    }

    // One dot is a whole number of device pixels, so dots stay crisp
    // squares on any screen. The canvas may overhang the root by under a
    // dot; the root clips it. Layout size, so transforms on a parent (an
    // entrance animation, say) do not shrink the grid.
    const resize = () => {
      const width = root.clientWidth
      const height = root.clientHeight
      if (!width || !height) return
      const dpr = window.devicePixelRatio || 1
      const devicePerDot = Math.max(1, Math.round(dotSize * dpr))
      const cssPerDot = devicePerDot / dpr
      const dotsX = Math.ceil((width * dpr) / devicePerDot)
      const dotsY = Math.ceil((height * dpr) / devicePerDot)
      cssHeight = dotsY * cssPerDot
      canvas.width = dotsX
      canvas.height = dotsY
      canvas.style.width = `${dotsX * cssPerDot}px`
      canvas.style.height = `${cssHeight}px`
      renderer.resize(dotsX, dotsY, dotsX * cssPerDot, cssHeight)
      draw()
    }

    // Animate only while the tab is visible and motion is allowed.
    // Otherwise hold the last frame.
    const sync = () => {
      const running =
        ready && !lost && !document.hidden && !reducedMotion.matches
      if (running && !frame) {
        previous = 0
        frame = requestAnimationFrame(tick)
        video?.play().catch(() => {})
      } else if (!running && frame) {
        cancelAnimationFrame(frame)
        frame = 0
        video?.pause()
      }
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const { speed, fps, interactive } = live.current
      if (previous && now - previous < 1000 / Math.max(fps, 1) - 2) return
      // Real time since the last drawn frame, so a low fps keeps the same
      // speed. The clock restarts on resume, and a stalled main thread
      // cannot jump the field by more than 2 s.
      const dt = previous ? Math.min((now - previous) / 1000, 2) : 0
      previous = now
      time.current += dt * speed
      const box = root.getBoundingClientRect()
      const left = box.left + root.clientLeft
      const top = box.top + root.clientTop
      const inside =
        interactive &&
        pointer.on &&
        pointer.clientX >= box.left &&
        pointer.clientX <= box.right &&
        pointer.clientY >= box.top &&
        pointer.clientY <= box.bottom
      pointer.x = ease(pointer.x, pointer.clientX - left, POINTER_EASE, dt)
      pointer.y = ease(
        pointer.y,
        top + cssHeight - pointer.clientY,
        POINTER_EASE,
        dt
      )
      pointer.hover = ease(pointer.hover, inside ? 1 : 0, 4, dt)
      draw()
    }

    const media = src
      ? loadMedia(
          src,
          (source) => {
            if (disposed) return
            renderer.setMedia(source)
            ready = true
            draw()
            sync()
          },
          () => {
            if (!disposed) setFallback(true)
          }
        )
      : null
    const video = media instanceof HTMLVideoElement ? media : null

    const onPointer = (event: PointerEvent) => {
      // A finger only counts while it is down. Hover events from a lifted
      // finger would leave the glow stuck where it last tapped.
      if (event.pointerType === "touch" && event.buttons === 0) return
      if (!pointer.on) {
        const box = root.getBoundingClientRect()
        pointer.x = event.clientX - box.left - root.clientLeft
        pointer.y = box.top + root.clientTop + cssHeight - event.clientY
      }
      pointer.clientX = event.clientX
      pointer.clientY = event.clientY
      pointer.on = true
    }
    const onLeave = () => {
      pointer.on = false
    }
    // Lifting the finger, or the browser taking over the touch to scroll,
    // fades the glow out. The listeners are passive, so scrolling is never
    // blocked.
    const onTouchEnd = (event: PointerEvent) => {
      if (event.pointerType === "touch") pointer.on = false
    }

    // A move to a screen with another pixel ratio changes the dot size
    // without resizing the element.
    let ratioQuery: MediaQueryList | null = null
    const watchRatio = () => {
      ratioQuery?.removeEventListener("change", onRatio)
      ratioQuery = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`
      )
      ratioQuery.addEventListener("change", onRatio)
    }
    const onRatio = () => {
      resize()
      watchRatio()
    }

    // A lost context shows the CSS dots until the browser gives it back.
    const onLost = (event: Event) => {
      event.preventDefault()
      lost = true
      sync()
      setFallback(true)
    }
    const onRestored = () => setContextKey((key) => key + 1)

    const resizeObserver = new ResizeObserver(resize)
    // Theme switches usually toggle a class or attribute on <html>.
    const themeObserver = new MutationObserver(schedulePaint)
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    resize()
    paint()
    sync()
    watchRatio()
    resizeObserver.observe(root)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })
    // The root's own class or style can change `currentColor` or a CSS
    // variable in the ramp, for example text-red-500 to text-blue-500.
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })
    darkQuery.addEventListener("change", schedulePaint)
    reducedMotion.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    window.addEventListener("pointerdown", onPointer, { passive: true })
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("pointerup", onTouchEnd, { passive: true })
    window.addEventListener("pointercancel", onTouchEnd, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    canvas.addEventListener("webglcontextlost", onLost)
    canvas.addEventListener("webglcontextrestored", onRestored)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cancelAnimationFrame(paintFrame)
      repaint.current = () => {}
      resizeObserver.disconnect()
      themeObserver.disconnect()
      ratioQuery?.removeEventListener("change", onRatio)
      darkQuery.removeEventListener("change", schedulePaint)
      reducedMotion.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
      window.removeEventListener("pointerdown", onPointer)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerup", onTouchEnd)
      window.removeEventListener("pointercancel", onTouchEnd)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
      if (video) {
        video.pause()
        video.removeAttribute("src")
        video.load()
      } else {
        media?.removeAttribute("src")
      }
      renderer.dispose()
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      canvas.remove()
    }
  }, [near, pattern, src, dotSize, contextKey])

  useEffect(() => {
    repaint.current()
  }, [colorKey, intensity])

  const [, mid] = toRamp(color)
  const fallbackStyle: CSSProperties = {
    backgroundImage: `radial-gradient(${mid} 0.6px, transparent 0.9px)`,
    backgroundSize: `${3 * dotSize}px ${3 * dotSize}px`,
    maskImage: "radial-gradient(ellipse at 50% 70%, black, transparent 75%)",
    WebkitMaskImage:
      "radial-gradient(ellipse at 50% 70%, black, transparent 75%)",
    opacity: Math.min(1, intensity),
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={fallback ? fallbackStyle : undefined}
      />
      {children}
    </div>
  )
}
