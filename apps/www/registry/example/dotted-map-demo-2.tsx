import { DottedMap } from "@/registry/magicui/dotted-map"

export default function Component() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <DottedMap dotRadius={0.1} />
    </div>
  )
}
