import { useId } from "react"

import { cn } from "@/lib/utils"

interface HexagonPatternProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The radius of each hexagon (center to vertex).
   * @default 40
   */
  radius?: number
  /**
   * Spacing in pixels between adjacent hexagons.
   * The tile grows by this amount while the visual radius stays fixed,
   * so the gap is evenly distributed on all sides of each hexagon.
   * @default 0
   */
  gap?: number
  /**
   * Offset applied to the pattern origin on the x-axis.
   * @default -1
   */
  x?: number
  /**
   * Offset applied to the pattern origin on the y-axis.
   * @default -1
   */
  y?: number
  /**
   * Controls the orientation of the hexagons.
   * - `"horizontal"` — flat-top hexagons tiled in a horizontal honeycomb grid.
   * - `"vertical"` — pointy-top hexagons tiled in a vertical honeycomb grid.
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical"
  /**
   * SVG stroke-dasharray applied to each hexagon outline.
   * @default "0"
   */
  strokeDasharray?: string
  /**
   * Array of [col, row] coordinates for hexagons that should be highlighted
   * (filled) on top of the repeating pattern — mirrors the `squares` prop of
   * GridPattern.
   */
  hexagons?: Array<[col: number, row: number]>
  className?: string
  [key: string]: unknown
}

type HexPoint = readonly [number, number]

function hexVertexList(
  cx: number,
  cy: number,
  r: number,
  direction: "horizontal" | "vertical"
): HexPoint[] {
  const startAngle = direction === "horizontal" ? 0 : 30
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((startAngle + i * 60) * Math.PI) / 180
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const
  })
}

function hexPoints(
  cx: number,
  cy: number,
  r: number,
  direction: "horizontal" | "vertical"
): string {
  return hexVertexList(cx, cy, r, direction)
    .map(([px, py]) => `${px},${py}`)
    .join(" ")
}

function edgeLexKey(a: HexPoint, b: HexPoint): string {
  const [p, q] =
    a[0] < b[0] || (a[0] === b[0] && a[1] <= b[1]) ? [a, b] : [b, a]
  return `${p[0].toFixed(6)},${p[1].toFixed(6)}|${q[0].toFixed(6)},${q[1].toFixed(6)}`
}

function collectUniqueHexEdges(
  centers: [number, number][],
  r: number,
  direction: "horizontal" | "vertical"
): [HexPoint, HexPoint][] {
  const seen = new Set<string>()
  const edges: [HexPoint, HexPoint][] = []
  for (const [cx, cy] of centers) {
    const verts = hexVertexList(cx, cy, r, direction)
    for (let i = 0; i < 6; i++) {
      const a = verts[i]
      const b = verts[(i + 1) % 6]
      const key = edgeLexKey(a, b)
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([a, b])
      }
    }
  }
  return edges
}

function isSolidStrokeDasharray(strokeDasharray: string): boolean {
  const t = strokeDasharray.trim()
  return t === "" || t === "none" || t === "0"
}

function getHexSpacing(
  r: number,
  direction: "horizontal" | "vertical",
  gap: number
): {
  colStep: number
  rowStep: number
  tileW: number
  tileH: number
} {
  const sqrt3 = Math.sqrt(3)

  // `gap` should match the visible edge-to-edge spacing, so we add it along
  // the shared-edge normal instead of directly on the raw x/y axes.
  if (direction === "horizontal") {
    const colStep = (3 * r) / 2 + (sqrt3 * gap) / 2
    const rowStep = sqrt3 * r + gap

    return {
      colStep,
      rowStep,
      tileW: colStep * 2,
      tileH: rowStep,
    }
  }

  const colStep = sqrt3 * r + gap
  const rowStep = (3 * r) / 2 + (sqrt3 * gap) / 2

  return {
    colStep,
    rowStep,
    tileW: colStep,
    tileH: rowStep * 2,
  }
}

function getTileGeometry(
  r: number,
  direction: "horizontal" | "vertical",
  gap: number
): {
  tileW: number
  tileH: number
  centers: [number, number][]
} {
  if (direction === "horizontal") {
    const { colStep, rowStep, tileW, tileH } = getHexSpacing(r, direction, gap)

    const canonical: [number, number][] = [
      [colStep / 2, rowStep / 2],
      [(colStep * 3) / 2, rowStep],
    ]

    const centers: [number, number][] = []
    for (const [cx, cy] of canonical) {
      centers.push([cx, cy])
      if (cy - r < 0) centers.push([cx, cy + tileH])
      if (cy + r > tileH) centers.push([cx, cy - tileH])
      if (cx - r < 0) centers.push([cx + tileW, cy])
      if (cx + r > tileW) centers.push([cx - tileW, cy])
      if (cy - r < 0 && cx - r < 0) centers.push([cx + tileW, cy + tileH])
      if (cy - r < 0 && cx + r > tileW) centers.push([cx - tileW, cy + tileH])
      if (cy + r > tileH && cx - r < 0) centers.push([cx + tileW, cy - tileH])
      if (cy + r > tileH && cx + r > tileW)
        centers.push([cx - tileW, cy - tileH])
    }

    return { tileW, tileH, centers }
  } else {
    const { colStep, rowStep, tileW, tileH } = getHexSpacing(r, direction, gap)

    const canonical: [number, number][] = [
      [colStep / 2, rowStep / 2],
      [colStep, (rowStep * 3) / 2],
    ]

    const centers: [number, number][] = []
    for (const [cx, cy] of canonical) {
      centers.push([cx, cy])
      if (cy - r < 0) centers.push([cx, cy + tileH])
      if (cy + r > tileH) centers.push([cx, cy - tileH])
      if (cx - r < 0) centers.push([cx + tileW, cy])
      if (cx + r > tileW) centers.push([cx - tileW, cy])
      if (cy - r < 0 && cx - r < 0) centers.push([cx + tileW, cy + tileH])
      if (cy - r < 0 && cx + r > tileW) centers.push([cx - tileW, cy + tileH])
      if (cy + r > tileH && cx - r < 0) centers.push([cx + tileW, cy - tileH])
      if (cy + r > tileH && cx + r > tileW)
        centers.push([cx - tileW, cy - tileH])
    }

    return { tileW, tileH, centers }
  }
}

function hexCenter(
  col: number,
  row: number,
  r: number,
  direction: "horizontal" | "vertical",
  gap: number
): [number, number] {
  if (direction === "horizontal") {
    const { colStep, rowStep } = getHexSpacing(r, direction, gap)
    const x = col * colStep + colStep / 2
    const y = row * rowStep + rowStep / 2 + (col % 2 !== 0 ? rowStep / 2 : 0)
    return [x, y]
  } else {
    const { colStep, rowStep } = getHexSpacing(r, direction, gap)
    const x = col * colStep + colStep / 2 + (row % 2 !== 0 ? colStep / 2 : 0)
    const y = row * rowStep + rowStep / 2
    return [x, y]
  }
}

export function HexagonPattern({
  radius = 40,
  gap = 0,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  direction = "horizontal",
  hexagons,
  className,
  ...props
}: HexagonPatternProps) {
  const id = useId()

  const { tileW, tileH, centers } = getTileGeometry(radius, direction, gap)
  const solidStroke = isSolidStrokeDasharray(strokeDasharray)
  const dashedEdges = solidStroke
    ? null
    : collectUniqueHexEdges(centers, radius, direction)

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={tileW}
          height={tileH}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          {solidStroke
            ? centers.map(([cx, cy]) => (
                <polygon
                  className="fill-none"
                  key={`${cx}-${cy}`}
                  points={hexPoints(cx, cy, radius, direction)}
                  strokeDasharray={strokeDasharray}
                />
              ))
            : dashedEdges?.map(([a, b]) => (
                <line
                  className="fill-none"
                  key={edgeLexKey(a, b)}
                  x1={a[0]}
                  x2={b[0]}
                  y1={a[1]}
                  y2={b[1]}
                  strokeDasharray={strokeDasharray}
                />
              ))}
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />

      {hexagons && hexagons.length > 0 && (
        <svg aria-hidden="true" className="overflow-visible" x={x} y={y}>
          {hexagons.map(([col, row]) => {
            const [cx, cy] = hexCenter(col, row, radius, direction, gap)
            return (
              <polygon
                key={`${col}-${row}`}
                points={hexPoints(cx, cy, radius - 1, direction)}
                strokeWidth="0"
              />
            )
          })}
        </svg>
      )}
    </svg>
  )
}
