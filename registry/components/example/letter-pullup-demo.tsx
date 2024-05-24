import LetterPullup from "@/registry/components/magicui/letter-pullup";

export default async function LetterPullupDemo() {
  return (
    <LetterPullup
      className="text-foreground"
      words={"Staggered Letter Pull Up"}
      delay={0.05}
    />
  );
}
