import TypingAnimation from "@/registry/components/magicui/typing-animation";

export default async function TypingAnimationDemo() {
  return (
    <TypingAnimation
      className="text-4xl font-bold text-black dark:text-white tracking-[-0.02em] md:text-7xl md:leading-[5rem]"
      text="Building Magic"
    />
  );
}
