import Highlighter from "@/registry/magicui/highlighter";

export default function HighlighterDemo() {
  return (
    <div className="relative justify-center">
      <p className="w-full text-center">
        This is <Highlighter color="#FF9800"> Magic UI Highlighter</Highlighter>{" "}
        component, designed to make important text stand out effortlessly.
        Customize colors, actions, and styles to fit your needs.{" "}
        <Highlighter color="#FFC107" action="circle">
          Try it out now!
        </Highlighter>
      </p>
    </div>
  );
}
