import { TypingAnimation } from "@/registry/magicui/typing-animation"

export default function TypingAnimationDemo() {
  return (
<<<<<<< HEAD:apps/www/registry/example/typing-animation-demo.tsx
    <TypingAnimation startOnView={true}>Typing Animation 👋</TypingAnimation>
  )
=======
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Single string with emoji</h3>
        <TypingAnimation startOnView={true}>
          Typing Animation 👋
        </TypingAnimation>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Multiple words with loop</h3>
        <TypingAnimation
          words={["build 🔨", "scale 📈", "optimize ⚡"]}
          loop={true}
          typeSpeed={100}
          deleteSpeed={50}
          pauseDelay={1500}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">No loop (plays once)</h3>
        <TypingAnimation
          words={["Hello", "World", "Welcome!"]}
          loop={false}
          typeSpeed={150}
          deleteSpeed={75}
        />
      </div>
    </div>
  );
>>>>>>> 65e3f543 (feat(typing-animation): add multi-word animation and cursor control):registry/example/typing-animation-demo.tsx
}
