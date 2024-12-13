import NumberTicker from "@/registry/default/magicui/number-ticker";

export default function NumberTickerDemo() {
  return (
    <p className="flex flex-col space-y-8 text-center whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={1234} duration={3} />
      <NumberTicker value={1234} duration={2} />
      <NumberTicker value={1234} />
    </p>
  );
}
