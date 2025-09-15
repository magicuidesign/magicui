import { NumberTicker } from "@/registry/magicui/number-ticker";

export default function NumberTickerDemo() {
  return (
    <NumberTicker
      value={5.67}
      decimalPlaces={2}
      className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
    />
  );
}
