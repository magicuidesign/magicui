"use client"

import React, { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface WaterRippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Emit ripples automatically at random positions. */
  autoPlay?: boolean
  /** Milliseconds between automatic ripples. */
  autoPlayInterval?: number
  /** Emit ripples from pointer movement. */
  interactive?: boolean
  /** How quickly waves lose energy. Closer to 1 ripples for longer. */
  damping?: number
  /** Radius of a single ripple, as a fraction of the container. */
  dropRadius?: number
  /** Initial displacement of a single ripple. */
  dropStrength?: number
  /** Pixels per simulation texel. Higher is cheaper and softer. */
  resolution?: number
  /** Colour of the light hitting the water surface. */
  lightColor?: string
  /** Colour of the shaded side of each wave. */
  shadowColor?: string
  /** Highest opacity the surface reaches. */
  maxOpacity?: number
}

const MAX_DROPS = 8
const MAX_DEVICE_PIXEL_RATIO = 2
const DROP_THROTTLE_MS = 32

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;

varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Discrete wave equation. Each texel stores the surface height, and the next
// height is derived from its neighbours plus the height one step in the past.
const SIMULATION_SHADER_SOURCE = `
precision highp float;

varying vec2 v_uv;

uniform sampler2D u_previous;
uniform sampler2D u_current;
uniform vec2 u_texel;
uniform float u_damping;
uniform int u_dropCount;
uniform vec2 u_drops[${MAX_DROPS}];
uniform float u_dropRadius;
uniform float u_dropStrength;

void main() {
  float previous = texture2D(u_previous, v_uv).r;
  float left = texture2D(u_current, v_uv + vec2(-u_texel.x, 0.0)).r;
  float right = texture2D(u_current, v_uv + vec2(u_texel.x, 0.0)).r;
  float up = texture2D(u_current, v_uv + vec2(0.0, u_texel.y)).r;
  float down = texture2D(u_current, v_uv + vec2(0.0, -u_texel.y)).r;

  float next = (left + right + up + down) * 0.5 - previous;
  next *= u_damping;

  for (int i = 0; i < ${MAX_DROPS}; i++) {
    if (i >= u_dropCount) break;
    float distanceToDrop = length(v_uv - u_drops[i]);
    next += u_dropStrength * smoothstep(u_dropRadius, 0.0, distanceToDrop);
  }

  gl_FragColor = vec4(next, 0.0, 0.0, 1.0);
}
`

// Turns the height field into a lit liquid surface: the gradient becomes a
// normal, which drives specular, fresnel and caustic highlights.
const RENDER_SHADER_SOURCE = `
precision highp float;

varying vec2 v_uv;

uniform sampler2D u_ripple;
uniform vec2 u_texel;
uniform vec3 u_lightColor;
uniform vec3 u_shadowColor;
uniform float u_maxOpacity;

void main() {
  float left = texture2D(u_ripple, v_uv + vec2(-u_texel.x, 0.0)).r;
  float right = texture2D(u_ripple, v_uv + vec2(u_texel.x, 0.0)).r;
  float up = texture2D(u_ripple, v_uv + vec2(0.0, u_texel.y)).r;
  float down = texture2D(u_ripple, v_uv + vec2(0.0, -u_texel.y)).r;

  vec2 gradient = vec2(right - left, up - down);
  float slope = length(gradient);

  vec3 normal = normalize(vec3(gradient * 8.0, 1.0));
  vec3 lightDirection = normalize(vec3(0.3, 0.5, 1.0));
  vec3 viewDirection = vec3(0.0, 0.0, 1.0);
  vec3 halfway = normalize(lightDirection + viewDirection);

  float specular = pow(max(dot(normal, halfway), 0.0), 64.0);
  float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 5.0);
  float caustic = pow(slope * 12.0, 2.5) * 0.35;
  float chromaticShift = slope * 0.5;

  float highlight = specular * 0.8 + fresnel * 0.3 + caustic;
  float shadow = max(-gradient.y * 3.0, 0.0) * 0.12;

  vec3 color = mix(u_shadowColor, u_lightColor, clamp(highlight, 0.0, 1.0));
  color += vec3(0.55, 0.65, 0.85) * fresnel * 0.2;
  color.r += chromaticShift * 0.04;
  color.b -= chromaticShift * 0.04;

  float alpha = clamp(slope * 5.0 + highlight * 0.4 + shadow, 0.0, u_maxOpacity);

  gl_FragColor = vec4(color * alpha, alpha);
}
`

type RenderTarget = {
  texture: WebGLTexture
  framebuffer: WebGLFramebuffer
}

let colorResolveContext: CanvasRenderingContext2D | null | undefined

function getColorResolveContext() {
  if (colorResolveContext !== undefined) {
    return colorResolveContext
  }

  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1
  colorResolveContext = canvas.getContext("2d", { willReadFrequently: true })

  return colorResolveContext
}

/**
 * Resolves any CSS colour — including custom properties such as
 * `var(--foreground)` — against the element the ripple renders inside.
 */
function resolveColor(color: string, element: HTMLElement, fallback: number[]) {
  const resolver = document.createElement("span")
  resolver.style.color = color
  resolver.style.opacity = "0"
  resolver.style.pointerEvents = "none"
  resolver.style.position = "absolute"
  element.appendChild(resolver)

  const computedColor = getComputedStyle(resolver).color
  resolver.remove()

  const context = getColorResolveContext()

  if (!context) {
    return new Float32Array(fallback)
  }

  context.clearRect(0, 0, 1, 1)
  context.fillStyle = computedColor
  context.fillRect(0, 0, 1, 1)
  const pixel = context.getImageData(0, 0, 1, 1).data

  return new Float32Array([pixel[0] / 255, pixel[1] / 255, pixel[2] / 255])
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type)

  if (!shader) {
    return null
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)

  if (!vertexShader || !fragmentShader) {
    if (vertexShader) gl.deleteShader(vertexShader)
    if (fragmentShader) gl.deleteShader(fragmentShader)
    return null
  }

  const program = gl.createProgram()

  if (!program) {
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return null
  }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }

  return program
}

export function WaterRipple({
  className,
  autoPlay = false,
  autoPlayInterval = 300,
  interactive = true,
  damping = 0.985,
  dropRadius = 0.04,
  dropStrength = 0.15,
  resolution = 4,
  lightColor = "#faf7f2",
  shadowColor = "#6b6661",
  maxOpacity = 0.4,
  ...props
}: WaterRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Bumped when the GPU hands the context back, which rebuilds the pipeline.
  const [contextGeneration, setContextGeneration] = useState(0)

  // Kept in a ref so tweaking a prop never rebuilds the WebGL pipeline, which
  // would throw away the waves that are already on the surface.
  const optionsRef = useRef({
    autoPlay,
    autoPlayInterval,
    interactive,
    damping,
    dropRadius,
    dropStrength,
    lightColor,
    shadowColor,
    maxOpacity,
  })

  useEffect(() => {
    optionsRef.current = {
      autoPlay,
      autoPlayInterval,
      interactive,
      damping,
      dropRadius,
      dropStrength,
      lightColor,
      shadowColor,
      maxOpacity,
    }
  }, [
    autoPlay,
    autoPlayInterval,
    interactive,
    damping,
    dropRadius,
    dropStrength,
    lightColor,
    shadowColor,
    maxOpacity,
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) {
      return
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: true,
      stencil: false,
    })

    if (!gl) {
      return
    }

    const hasFloat = Boolean(gl.getExtension("OES_texture_float"))
    const halfFloat = gl.getExtension("OES_texture_half_float")
    const hasLinearFloat = Boolean(gl.getExtension("OES_texture_float_linear"))
    const hasLinearHalfFloat = Boolean(
      gl.getExtension("OES_texture_half_float_linear")
    )

    if (!hasFloat && !halfFloat) {
      return
    }

    const textureType = hasFloat
      ? gl.FLOAT
      : (halfFloat as OES_texture_half_float).HALF_FLOAT_OES
    const textureFilter =
      (hasFloat && hasLinearFloat) || (!hasFloat && hasLinearHalfFloat)
        ? gl.LINEAR
        : gl.NEAREST

    const simulationProgram = createProgram(
      gl,
      VERTEX_SHADER_SOURCE,
      SIMULATION_SHADER_SOURCE
    )
    const renderProgram = createProgram(
      gl,
      VERTEX_SHADER_SOURCE,
      RENDER_SHADER_SOURCE
    )

    if (!simulationProgram || !renderProgram) {
      if (simulationProgram) gl.deleteProgram(simulationProgram)
      if (renderProgram) gl.deleteProgram(renderProgram)
      return
    }

    const simulationUniforms = {
      position: gl.getAttribLocation(simulationProgram, "a_position"),
      previous: gl.getUniformLocation(simulationProgram, "u_previous"),
      current: gl.getUniformLocation(simulationProgram, "u_current"),
      texel: gl.getUniformLocation(simulationProgram, "u_texel"),
      damping: gl.getUniformLocation(simulationProgram, "u_damping"),
      dropCount: gl.getUniformLocation(simulationProgram, "u_dropCount"),
      drops: gl.getUniformLocation(simulationProgram, "u_drops[0]"),
      dropRadius: gl.getUniformLocation(simulationProgram, "u_dropRadius"),
      dropStrength: gl.getUniformLocation(simulationProgram, "u_dropStrength"),
    }

    const renderUniforms = {
      position: gl.getAttribLocation(renderProgram, "a_position"),
      ripple: gl.getUniformLocation(renderProgram, "u_ripple"),
      texel: gl.getUniformLocation(renderProgram, "u_texel"),
      lightColor: gl.getUniformLocation(renderProgram, "u_lightColor"),
      shadowColor: gl.getUniformLocation(renderProgram, "u_shadowColor"),
      maxOpacity: gl.getUniformLocation(renderProgram, "u_maxOpacity"),
    }

    const quadBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )

    const drawQuad = (positionLocation: number) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const createRenderTarget = (
      width: number,
      height: number
    ): RenderTarget | null => {
      const texture = gl.createTexture()
      const framebuffer = gl.createFramebuffer()

      if (!texture || !framebuffer) {
        if (texture) gl.deleteTexture(texture)
        if (framebuffer) gl.deleteFramebuffer(framebuffer)
        return null
      }

      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        textureType,
        null
      )
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, textureFilter)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, textureFilter)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      )

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)

      if (status !== gl.FRAMEBUFFER_COMPLETE) {
        gl.deleteTexture(texture)
        gl.deleteFramebuffer(framebuffer)
        return null
      }

      return { texture, framebuffer }
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    // Three targets so the simulation never samples the texture it writes to.
    let targets: RenderTarget[] = []
    let previousIndex = 0
    let currentIndex = 1
    let nextIndex = 2
    let simulationWidth = 0
    let simulationHeight = 0
    let animationFrameId: number | null = null
    let isVisible = true
    let isContextLost = false
    let lastPointerDrop = 0
    let lastAutoDrop = 0
    const pendingDrops: number[] = []
    const dropUniformData = new Float32Array(MAX_DROPS * 2)
    let resolvedLightColor = new Float32Array([0.98, 0.97, 0.95])
    let resolvedShadowColor = new Float32Array([0.42, 0.4, 0.38])

    const releaseTargets = () => {
      if (isContextLost) {
        targets = []
        return
      }

      for (const target of targets) {
        gl.deleteTexture(target.texture)
        gl.deleteFramebuffer(target.framebuffer)
      }

      targets = []
    }

    const resize = () => {
      if (isContextLost) {
        return
      }

      const width = container.clientWidth
      const height = container.clientHeight

      if (width === 0 || height === 0) {
        return
      }

      const devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO
      )
      canvas.width = Math.floor(width * devicePixelRatio)
      canvas.height = Math.floor(height * devicePixelRatio)

      const nextWidth = Math.max(2, Math.floor(width / resolution))
      const nextHeight = Math.max(2, Math.floor(height / resolution))

      if (
        nextWidth === simulationWidth &&
        nextHeight === simulationHeight &&
        targets.length === 3
      ) {
        return
      }

      simulationWidth = nextWidth
      simulationHeight = nextHeight
      releaseTargets()

      const nextTargets = [
        createRenderTarget(simulationWidth, simulationHeight),
        createRenderTarget(simulationWidth, simulationHeight),
        createRenderTarget(simulationWidth, simulationHeight),
      ]

      if (nextTargets.some((target) => target === null)) {
        for (const target of nextTargets) {
          if (target) {
            gl.deleteTexture(target.texture)
            gl.deleteFramebuffer(target.framebuffer)
          }
        }
        return
      }

      targets = nextTargets as RenderTarget[]
      previousIndex = 0
      currentIndex = 1
      nextIndex = 2
    }

    const syncColors = () => {
      resolvedLightColor = resolveColor(
        optionsRef.current.lightColor,
        container,
        [0.98, 0.97, 0.95]
      )
      resolvedShadowColor = resolveColor(
        optionsRef.current.shadowColor,
        container,
        [0.42, 0.4, 0.38]
      )
    }

    const addDrop = (x: number, y: number) => {
      if (pendingDrops.length >= MAX_DROPS * 2) {
        pendingDrops.splice(0, 2)
      }

      pendingDrops.push(x, y)
    }

    const handlePointer = (event: PointerEvent) => {
      if (!optionsRef.current.interactive || !isVisible) {
        return
      }

      const now = performance.now()

      if (now - lastPointerDrop < DROP_THROTTLE_MS) {
        return
      }

      const rect = container.getBoundingClientRect()

      if (
        rect.width === 0 ||
        rect.height === 0 ||
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        return
      }

      lastPointerDrop = now
      addDrop(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height
      )
    }

    const draw = (timestamp: number) => {
      if (targets.length !== 3) {
        return
      }

      const options = optionsRef.current

      if (
        options.autoPlay &&
        timestamp - lastAutoDrop >= Math.max(options.autoPlayInterval, 16)
      ) {
        lastAutoDrop = timestamp
        addDrop(0.15 + Math.random() * 0.7, 0.15 + Math.random() * 0.7)
      }

      gl.useProgram(simulationProgram)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, targets[previousIndex].texture)
      gl.uniform1i(simulationUniforms.previous, 0)

      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, targets[currentIndex].texture)
      gl.uniform1i(simulationUniforms.current, 1)

      gl.uniform2f(
        simulationUniforms.texel,
        1 / simulationWidth,
        1 / simulationHeight
      )
      gl.uniform1f(simulationUniforms.damping, options.damping)
      gl.uniform1f(simulationUniforms.dropRadius, options.dropRadius)
      gl.uniform1f(simulationUniforms.dropStrength, options.dropStrength)

      const dropCount = pendingDrops.length / 2
      gl.uniform1i(simulationUniforms.dropCount, dropCount)

      if (dropCount > 0) {
        dropUniformData.set(pendingDrops)
        gl.uniform2fv(simulationUniforms.drops, dropUniformData)
        pendingDrops.length = 0
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, targets[nextIndex].framebuffer)
      gl.viewport(0, 0, simulationWidth, simulationHeight)
      drawQuad(simulationUniforms.position)

      const oldPreviousIndex = previousIndex
      previousIndex = currentIndex
      currentIndex = nextIndex
      nextIndex = oldPreviousIndex

      gl.useProgram(renderProgram)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, targets[currentIndex].texture)
      gl.uniform1i(renderUniforms.ripple, 0)
      gl.uniform2f(
        renderUniforms.texel,
        1 / simulationWidth,
        1 / simulationHeight
      )
      gl.uniform3fv(renderUniforms.lightColor, resolvedLightColor)
      gl.uniform3fv(renderUniforms.shadowColor, resolvedShadowColor)
      gl.uniform1f(renderUniforms.maxOpacity, options.maxOpacity)

      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      drawQuad(renderUniforms.position)
      gl.disable(gl.BLEND)
    }

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }

    const frame = (timestamp: number) => {
      draw(timestamp)

      if (isVisible && !isContextLost && !reducedMotion.matches) {
        animationFrameId = requestAnimationFrame(frame)
        return
      }

      animationFrameId = null
    }

    const startAnimation = () => {
      if (
        animationFrameId !== null ||
        isContextLost ||
        !isVisible ||
        reducedMotion.matches
      ) {
        return
      }

      lastAutoDrop = performance.now()
      animationFrameId = requestAnimationFrame(frame)
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      isContextLost = true
      stopAnimation()
      targets = []
    }

    const handleContextRestored = () => {
      setContextGeneration((generation) => generation + 1)
    }

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        stopAnimation()
        return
      }

      startAnimation()
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting

        if (isVisible) {
          startAnimation()
          return
        }

        stopAnimation()
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(container)

    // The surface is themed with CSS colours, so re-resolve them when the
    // document flips between light and dark.
    const themeObserver = new MutationObserver(syncColors)
    themeObserver.observe(document.documentElement, {
      attributeFilter: ["class", "style", "data-theme"],
    })

    canvas.addEventListener("webglcontextlost", handleContextLost)
    canvas.addEventListener("webglcontextrestored", handleContextRestored)
    reducedMotion.addEventListener("change", handleMotionChange)
    window.addEventListener("pointermove", handlePointer, { passive: true })
    window.addEventListener("pointerdown", handlePointer, { passive: true })

    syncColors()
    resize()
    startAnimation()

    return () => {
      stopAnimation()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      canvas.removeEventListener("webglcontextlost", handleContextLost)
      canvas.removeEventListener("webglcontextrestored", handleContextRestored)
      reducedMotion.removeEventListener("change", handleMotionChange)
      window.removeEventListener("pointermove", handlePointer)
      window.removeEventListener("pointerdown", handlePointer)

      if (isContextLost) {
        return
      }

      releaseTargets()
      gl.deleteBuffer(quadBuffer)
      gl.deleteProgram(simulationProgram)
      gl.deleteProgram(renderProgram)
    }
  }, [resolution, contextGeneration])

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
