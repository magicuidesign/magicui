import { Highlighter } from "@/registry/magicui/highlighter"

export default function HighlighterDemo() {
  return (
    <div className="text-center">
      <p className="leading-relaxed">
        The{" "}
        <Highlighter action="underline" color="#FF9800">
          Magic UI Highlighter
        </Highlighter>{" "}
        makes important{" "}
        <Highlighter action="highlight" color="#6366F1">
          text stand out
        </Highlighter>{" "}
        effortlessly.
      </p>
    </div>
  )
}
