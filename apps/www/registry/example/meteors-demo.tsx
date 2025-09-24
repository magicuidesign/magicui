import { Meteors } from "@/registry/magicui/meteors"

export default function MeteorDemo() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <Meteors number={30} />
    </div>
  )
}
