import { DottedMap } from "@/registry/magicui/dotted-map"
import type { Marker } from "@/registry/magicui/dotted-map"

const markers: Marker[] = [
  {
    lat: 37.5665,
    lng: 126.978,
    size: 0.3,
  },
  {
    lat: 40.7128,
    lng: -74.006,
    size: 0.3,
    pulse: false,
  },
]

export default function Component() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <div className="to-background absolute inset-0 bg-radial from-transparent to-200%" />
      <DottedMap markers={markers} pulse />
    </div>
  )
}
