import { TypingAnimation } from "@/registry/magicui/typing-animation"

export default function TypingAnimationDemo9() {
  return (
    <TypingAnimation
      words={["First", "Second", "Final"]}
      loop={false}
      className="text-4xl font-bold"
    />
  )
}
