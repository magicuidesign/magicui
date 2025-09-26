import { TypingAnimation } from "@/registry/magicui/typing-animation"

export default function TypingAnimationDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Single string with emoji</h3>
        <TypingAnimation startOnView={true}>
          Typing Animation 👋
        </TypingAnimation>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Multiple words with loop</h3>
        <TypingAnimation
          words={["build 🔨", "scale 📈", "optimize ⚡"]}
          loop={true}
          typeSpeed={100}
          deleteSpeed={50}
          pauseDelay={1500}
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">No loop (plays once)</h3>
        <TypingAnimation
          words={["Hello", "World", "Welcome!"]}
          loop={false}
          typeSpeed={150}
          deleteSpeed={75}
        />
      </div>
    </div>
  )
}
