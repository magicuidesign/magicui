"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

import { cn } from "@/lib/utils"

const randomColors = (count: number) => {
  return new Array(count).fill(0).map(
    () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
  )
}

interface TubesBackgroundProps {
  children?: React.ReactNode
  className?: string
  enableClickInteraction?: boolean
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tubesStateRef = useRef<{
    setColors: (colors: string[]) => void
    setLightsColors: (colors: string[]) => void
  } | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      })
    } catch (error) {
      console.error("Error creating WebGLRenderer", error)
      return
    }

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 100

    // Groups & Lights
    const tubesGroup = new THREE.Group()
    scene.add(tubesGroup)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const lightColors = ["#34d399", "#60a5fa", "#a78bfa", "#38bdf8"].map(
      (c) => new THREE.Color(c)
    )
    let pointLights: THREE.PointLight[] = []

    const initLights = (colors: THREE.Color[]) => {
      pointLights.forEach((l) => scene.remove(l))
      pointLights = []
      colors.forEach((c) => {
        const light = new THREE.PointLight(c, 2000, 200)
        light.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 50
        )
        scene.add(light)
        pointLights.push(light)
      })
    }
    initLights(lightColors)

    // Tube Generation Logic
    const TUBE_COUNT = 15
    let tubeColors = ["#10b981", "#3b82f6", "#8b5cf6"].map(
      (c) => new THREE.Color(c)
    )
    const tubes: {
      meshConfig: THREE.Group
      coreMesh: THREE.Mesh
      glowMesh: THREE.Mesh
      ambientMesh: THREE.Mesh
      vectors: THREE.Vector3[]
      speed: number
      angle: number
      radius: number
      coreRadius: number
      glowRadius: number
      ambientRadius: number
    }[] = []

    const createTubes = () => {
      // clear existing
      tubesGroup.children.forEach((group) => {
        ; (group as THREE.Group).children.forEach((c) => {
          ; (c as THREE.Mesh).geometry?.dispose()
            ; ((c as THREE.Mesh).material as THREE.Material)?.dispose()
        })
      })
      tubesGroup.clear()
      tubes.length = 0

      for (let i = 0; i < TUBE_COUNT; i++) {
        const vectors: THREE.Vector3[] = []
        for (let j = 0; j < 50; j++) {
          vectors.push(
            new THREE.Vector3(
              Math.sin(j * 0.1) * 10,
              Math.cos(j * 0.1) * 10,
              -j * 2
            )
          )
        }

        const curve = new THREE.CatmullRomCurve3(vectors)

        const coreRadius = 0.8 + Math.random() * 0.4
        const glowRadius = coreRadius + 1.2 + Math.random() * 0.6
        const ambientRadius = glowRadius + 4.0 + Math.random() * 2.0

        // Ambient (surrounding) glow
        const geometryAmbient = new THREE.TubeGeometry(curve, 50, ambientRadius, 8, false)
        const materialAmbient = new THREE.MeshBasicMaterial({
          color: tubeColors[i % tubeColors.length],
          transparent: true,
          opacity: 0.1,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          depthWrite: false,
        })
        const ambientMesh = new THREE.Mesh(geometryAmbient, materialAmbient)

        // Inner Glow geometry
        const geometryGlow = new THREE.TubeGeometry(curve, 50, glowRadius, 8, false)
        const materialGlow = new THREE.MeshBasicMaterial({
          color: tubeColors[i % tubeColors.length],
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          depthWrite: false,
        })
        const glowMesh = new THREE.Mesh(geometryGlow, materialGlow)

        // Core geometry
        const geometryCore = new THREE.TubeGeometry(curve, 50, coreRadius, 8, false)
        const materialCore = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xffffff),
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
        })
        const coreMesh = new THREE.Mesh(geometryCore, materialCore)

        const meshConfig = new THREE.Group()
        meshConfig.add(ambientMesh)
        meshConfig.add(glowMesh)
        meshConfig.add(coreMesh)

        tubesGroup.add(meshConfig)
        tubes.push({
          meshConfig,
          coreMesh,
          glowMesh,
          ambientMesh,
          vectors,
          speed: 0.5 + Math.random() * 1.5,
          angle: Math.random() * Math.PI * 2,
          radius: 3 + Math.random() * 12,
          coreRadius,
          glowRadius,
          ambientRadius
        })
      }
    }

    createTubes()

    // Mouse Interaction
    const mouse = new THREE.Vector2(0, 0)
    const target = new THREE.Vector3(0, 0, 0)
    let isInteracting = false
    let lastMouseMoveTime = 0

    const onPointerMove = (e: PointerEvent) => {
      isInteracting = true
      lastMouseMoveTime = performance.now()
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    const onPointerLeave = () => {
      isInteracting = false
    }

    window.addEventListener("pointermove", onPointerMove)
    containerRef.current.addEventListener("pointerleave", onPointerLeave)

    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Idle transition
      if (performance.now() - lastMouseMoveTime > 500) {
        isInteracting = false
      }

      // Calculate target position based on mouse interaction or idle
      if (isInteracting) {
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5)
        vector.unproject(camera)
        const dir = vector.sub(camera.position).normalize()
        const distance = -camera.position.z / dir.z
        target.copy(camera.position).add(dir.multiplyScalar(distance))
      } else {
        // Infinity symbol (Lissajous figure-8)
        const speed = 1.0
        target.set(
          Math.sin(time * speed) * 80,
          Math.sin(time * speed * 2) * 40,
          Math.cos(time * speed) * 20
        )
      }

      // Update tubes
      tubes.forEach((t, i) => {
        t.angle += t.speed * delta
        const offsetX = Math.cos(t.angle + i) * t.radius
        const offsetY = Math.sin(t.angle + i) * t.radius

        // Shift vectors
        t.vectors.pop()

        // Follow target + offset
        const newPos = new THREE.Vector3(
          target.x + offsetX,
          target.y + offsetY,
          target.z + Math.sin(time + i) * 5
        )

        // Smooth dampening towards target
        const smoothedPos = new THREE.Vector3().copy(t.vectors[0]).lerp(newPos, 0.15)
        t.vectors.unshift(smoothedPos)

        // Smoothly interpolate arrays to curve
        const curve = new THREE.CatmullRomCurve3(t.vectors)
        t.coreMesh.geometry.dispose()
        t.glowMesh.geometry.dispose()
        t.ambientMesh.geometry.dispose()
        t.coreMesh.geometry = new THREE.TubeGeometry(curve, 50, t.coreRadius, 8, false)
        t.glowMesh.geometry = new THREE.TubeGeometry(curve, 50, t.glowRadius, 8, false)
        t.ambientMesh.geometry = new THREE.TubeGeometry(curve, 50, t.ambientRadius, 8, false)
      })

      // Rotate point lights slowly
      pointLights.forEach((light, i) => {
        light.position.x = Math.sin(time * 0.5 + i) * 50
        light.position.y = Math.cos(time * 0.3 + i) * 50
      })

      renderer.render(scene, camera)
    }

    animate()

    tubesStateRef.current = {
      setColors: (colors) => {
        tubeColors = colors.map((c) => new THREE.Color(c))
        tubes.forEach((t, i) => {
          ; (t.glowMesh.material as THREE.MeshBasicMaterial).color =
            tubeColors[i % tubeColors.length]
          ; (t.ambientMesh.material as THREE.MeshBasicMaterial).color =
            tubeColors[i % tubeColors.length]
        })
      },
      setLightsColors: (colors) => {
        initLights(colors.map((c) => new THREE.Color(c)))
      },
    }

    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      containerRef.current?.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)

      // Proper disposal
      tubesGroup.children.forEach((group) => {
        ; (group as THREE.Group).children.forEach((c) => {
          ; (c as THREE.Mesh).geometry.dispose()
            ; ((c as THREE.Mesh).material as THREE.Material).dispose()
        })
      })
      scene.clear()
      renderer.dispose()
    }
  }, [])

  const handleClick = () => {
    if (!enableClickInteraction || !tubesStateRef.current) return

    tubesStateRef.current.setColors(randomColors(3))
    tubesStateRef.current.setLightsColors(randomColors(4))
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[#030712]",
        className
      )}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full"
        style={{ touchAction: "none" }}
      />
      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-center">
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#030712]" />
    </div>
  )
}
