import { DottedMap } from "@/registry/magicui/dotted-map"

export default function Component() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <div className="to-background absolute inset-0 bg-radial from-transparent to-70%" />
      <DottedMap
        markers={[
          {
            lat: 40.7128,
            lng: -74.006,
            size: 0.5,
          }, // New York
          {
            lat: 34.0522,
            lng: -118.2437,
            size: 0.5,
          }, // Los Angeles
          {
            lat: 51.5074,
            lng: -0.1278,
            size: 0.5,
          }, // London
          {
            lat: -33.8688,
            lng: 151.2093,
            size: 0.5,
          }, // Sydney
        ]}
      />
    </div>
  )
}
