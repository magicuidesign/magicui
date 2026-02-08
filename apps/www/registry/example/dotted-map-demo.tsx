import { DottedMap } from "@/registry/magicui/dotted-map"
import type { Marker } from "@/registry/magicui/dotted-map"

type MyMarker = Marker & {
  overlay: {
    countryCode: string // "kr", "us"
    label: string
  }
}

const markers: MyMarker[] = [
  {
    lat: 37.5665,
    lng: 126.978,
    size: 2.8,
    overlay: { countryCode: "kr", label: "Seoul" },
  },
  {
    lat: 40.7128,
    lng: -74.006,
    size: 2.8,
    overlay: { countryCode: "us", label: "NYC" },
  },
]

export default function Component() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <div className="to-background absolute inset-0 bg-radial from-transparent to-200%" />
      <DottedMap<MyMarker>
        markers={markers}
        renderMarkerOverlay={({ marker, x, y, r, index }) => {
          const { countryCode, label } = marker.overlay
          const href = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` // FlagCDN  [oai_citation:7‡Flagpedia](https://flagpedia.net/download/api)

          const clipId = `flag-clip-${index}`
          const imgR = r * 0.75

          const fontSize = r * 0.9
          const pillH = r * 1.5
          const pillW = label.length * (fontSize * 0.62) + r * 1.4
          const pillX = x + r + r * 0.6
          const pillY = y - pillH / 2

          return (
            <g style={{ pointerEvents: "none" }}>
              <clipPath id={clipId}>
                <circle cx={x} cy={y} r={imgR} />
              </clipPath>

              <image
                href={href}
                x={x - imgR}
                y={y - imgR}
                width={imgR * 2}
                height={imgR * 2}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
              />

              <rect
                x={pillX}
                y={pillY}
                width={pillW}
                height={pillH}
                rx={pillH / 2}
                fill="rgba(0,0,0,0.55)"
              />
              <text
                x={pillX + r * 0.7}
                y={y + fontSize * 0.35}
                fontSize={fontSize}
                fill="white"
              >
                {label}
              </text>
            </g>
          )
        }}
      />
    </div>
  )
}
