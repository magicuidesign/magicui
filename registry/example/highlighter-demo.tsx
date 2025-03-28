import Highlighter from "@/registry/magicui/highlighter";

export default function HighlighterDemo() {
  return (
    <div className="relative justify-center">
      <p className="w-full text-center leading-loose">
        The{" "}
        <Highlighter color="#FF9800" action="underline">
          Magic UI Highlighter
        </Highlighter>{" "}
        makes important{" "}
        <Highlighter color="#87CEFA" action="highlight">
          text stand out
        </Highlighter>{" "}
        effortlessly.{" "}
        <Highlighter color="#E91E63" action="box">
          Customize colors
        </Highlighter>{" "}
        and styles to fit your needs. It offers flexible highlighting for better
        readability. Try it now and enhance{" "}
        <Highlighter color="#9C27B0" action="circle">
          {" "}
          your content
        </Highlighter>{" "}
        with ease!
      </p>
    </div>
  );
}
