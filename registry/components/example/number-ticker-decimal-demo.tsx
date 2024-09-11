import NumberTicker from "@/components/magicui/number-ticker";

const NumberTickerDemo = () => {
  return (
    <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={5.67} decimalPlaces={2} />
    </p>
  );
};

export default NumberTickerDemo;
