import FlipText from "@/registry/components/magicui/flip-text";

export default async function FlipTextDemo() {
  return (
    <FlipText
      className="text-4xl font-bold text-black dark:text-white tracking-[-0.02em] md:text-7xl md:leading-[5rem]"
      word="Building Magic"
    />
  );
}
