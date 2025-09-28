import { TypingAnimation } from "@/registry/magicui/typing-animation"

export default function TypingAnimationDemo3() {
  return (
    <TypingAnimation
      words={["Fast typing", "Slow delete"]}
      typeSpeed={50}
      deleteSpeed={150}
      pauseDelay={2000}
      loop={true}
      className="text-4xl font-bold"
    />
  )
}
