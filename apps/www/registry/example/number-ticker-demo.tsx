import { NumberTicker } from "@/registry/magicui/number-ticker"

export default function NumberTickerDemo() {
  return (
    <NumberTicker
      value={100}
      className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
    />
  )
}
