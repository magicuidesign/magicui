import { createMap } from "svg-dotted-map"

import { cn } from "@/lib/utils"

interface Marker {
  lat: number
  lng: number
  size?: number
}

export interface DottedMapProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  mapSamples?: number
  markers?: Marker[]
  dotColor?: string
  markerColor?: string
  dotRadius?: number
}

export function DottedMap({
  width = 150,
  height = 75,
  mapSamples = 5500,
  markers = [],
  markerColor = "#FF6900",
  dotRadius = 0.2,
  className,
  style,
}: DottedMapProps) {
  const { points, addMarkers } = createMap({
    width,
    height,
    mapSamples,
  })

  const processedMarkers = addMarkers(markers)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("fill-black dark:fill-white", className)}
      style={{ width: "100%", height: "100%", ...style }}
    >
      {points.map((point, index) => {
        return (
          <circle
            cx={point.x}
            cy={point.y}
            r={dotRadius}
            fill="currentColor"
            key={`${point.x}-${point.y}-${index}`}
          />
        )
      })}
      {processedMarkers.map((marker, index) => {
        return (
          <circle
            cx={marker.x}
            cy={marker.y}
            r={marker.size ?? dotRadius}
            fill={markerColor}
            key={`${marker.x}-${marker.y}-${index}`}
          />
        )
      })}
    </svg>
  )
}
