import { ShimmerButton } from "@/registry/magicui/shimmer-button"

export default function ShimmerButtonDemo() {
  return (
    <ShimmerButton className="shadow-2xl">
      <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10">
        Shimmer Button
      </span>
    </ShimmerButton>
  )
}
