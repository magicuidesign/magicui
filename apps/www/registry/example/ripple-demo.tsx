import { Ripple } from "@/registry/magicui/ripple"

export default function RippleDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <p className="z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-white">
        Ripple
      </p>
      <Ripple />
    </div>
  )
}
