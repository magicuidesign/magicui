import { TypingAnimation } from "@/registry/magicui/typing-animation"

export default function TypingAnimationDemo4() {
  return (
    <TypingAnimation startOnView={true} className="text-4xl font-bold">
      Starts typing when in view
    </TypingAnimation>
  )
}
