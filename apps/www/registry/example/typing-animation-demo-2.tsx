import { TypingAnimation } from "@/registry/magicui/typing-animation"

export default function TypingAnimationDemo2() {
  return (
    <TypingAnimation
      words={["Design 🎨", "Build 🔨", "Ship 🚀"]}
      loop={true}
      className="text-4xl font-bold"
    />
  )
}
