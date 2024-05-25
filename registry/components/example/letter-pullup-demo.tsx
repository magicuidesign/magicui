import LetterPullup from "@/registry/components/magicui/letter-pullup";

export default async function LetterPullupDemo() {
  return (
    <LetterPullup
      className="text-black dark:text-white"
      words={"Staggered Letter Pull Up"}
      delay={0.05}
    />
  );
}
