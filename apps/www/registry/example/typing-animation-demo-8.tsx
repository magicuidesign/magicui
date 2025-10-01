import { TypingAnimation } from "@/registry/magicui/typing-animation"

export default function Component() {
  return (
    <div className="flex-1 space-y-8">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">
          Line cursor (default)
        </p>
        <TypingAnimation
          words={["Line cursor"]}
          cursorStyle="line"
          loop
          className="text-4xl font-bold"
        />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">
          Block cursor (VSCode style)
        </p>
        <TypingAnimation
          words={["Block cursor"]}
          cursorStyle="block"
          loop
          className="text-4xl font-bold"
        />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Underscore cursor</p>
        <TypingAnimation
          words={["Underscore cursor"]}
          cursorStyle="underscore"
          loop
          className="text-4xl font-bold"
        />
      </div>
    </div>
  )
}
