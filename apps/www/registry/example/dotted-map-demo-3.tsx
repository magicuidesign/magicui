import { DottedMap } from "@/registry/magicui/dotted-map"
import type { Marker } from "@/registry/magicui/dotted-map"

type PulseMarker = Marker & {
  overlay?: {
    pulse?: boolean
  }
}

const markers: PulseMarker[] = [
  {
    lat: 37.5665,
    lng: 126.978,
    size: 0.3,
    overlay: { pulse: true },
  },
  {
    lat: 40.7128,
    lng: -74.006,
    size: 0.3,
  },
]

export default function Component() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <div className="to-background absolute inset-0 bg-radial from-transparent to-200%" />
      <DottedMap<PulseMarker>
        markers={markers}
        renderMarkerOverlay={({ x, y, r, marker }) => {
          if (!marker.overlay?.pulse) return null

          const to = r * 2.8

          return (
            <g style={{ pointerEvents: "none" }}>
              <circle
                cx={x}
                cy={y}
                r={r}
                fill="none"
                stroke="#FF6900"
                strokeOpacity={1}
                strokeWidth={0.35}
              >
                <animate
                  attributeName="r"
                  values={`${r};${to}`}
                  dur="1.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="1;0"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={x}
                cy={y}
                r={r}
                fill="none"
                stroke="#FF6900"
                strokeOpacity={0.9}
                strokeWidth={0.3}
              >
                <animate
                  attributeName="r"
                  values={`${r};${to}`}
                  dur="1.4s"
                  begin="0.7s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.9;0"
                  dur="1.4s"
                  begin="0.7s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )
        }}
      />
    </div>
  )
}
