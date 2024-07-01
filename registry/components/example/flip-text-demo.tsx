import FlipText from "@/components/magicui/flip-text";

export default async function FlipTextDemo() {
  return (
    <FlipText
      className="text-4xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
      word="Flip Text"
    />
  );
}
