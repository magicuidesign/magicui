import { TypingAnimation } from "@/registry/magicui/typing-animation"

export default function Component() {
  return (
    <div className="flex-1 space-y-8">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">
          With blinking cursor (default) - watch during pause
        </p>
        <TypingAnimation
          words={["Type", "Pause", "Delete"]}
          blinkCursor={true}
          pauseDelay={2000}
          loop
          className="text-4xl font-bold"
        >
          Blinking cursor
        </TypingAnimation>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">
          Without blinking cursor - static during pause
        </p>
        <TypingAnimation
          words={["Type", "Pause", "Delete"]}
          blinkCursor={false}
          pauseDelay={2000}
          loop
          className="text-4xl font-bold"
        >
          Static cursor
        </TypingAnimation>
      </div>
    </div>
  )
}
