"use client";

import { FileIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface CodeComparisonProps {
  beforeCode: string;
  afterCode: string;
  language: string;
  filename: string;
  lightTheme: string;
  darkTheme: string;
  beforeHighlightRange?: { start: number; end: number };
  afterHighlightRange?: { start: number; end: number };
  highlightColor?: string;
}

export function CodeComparison({
  beforeCode,
  afterCode,
  language,
  filename,
  lightTheme,
  darkTheme,
  beforeHighlightRange,
  afterHighlightRange,
  highlightColor = "#ff3333",
}: CodeComparisonProps) {
  const { theme, systemTheme } = useTheme();
  const [highlightedBefore, setHighlightedBefore] = useState("");
  const [highlightedAfter, setHighlightedAfter] = useState("");

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const selectedTheme = currentTheme === "dark" ? darkTheme : lightTheme;

    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const { transformerNotationHighlight } = await import(
          "@shikijs/transformers"
        );

        const before = await codeToHtml(beforeCode, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight(),
            {
              name: "line-highlight",
              line(node, line) {
                if (
                  beforeHighlightRange &&
                  line >= beforeHighlightRange.start &&
                  line <= beforeHighlightRange.end
                ) {
                  node.properties.class =
                    (node.properties.class || "") + " highlighted";
                  node.properties.style = `background-color: ${highlightColor};`;
                }
                return node;
              },
            },
          ],
        });
        const after = await codeToHtml(afterCode, {
          lang: language,
          theme: selectedTheme,
          transformers: [
            transformerNotationHighlight(),
            {
              name: "line-highlight",
              line(node, line) {
                if (
                  afterHighlightRange &&
                  line >= afterHighlightRange.start &&
                  line <= afterHighlightRange.end
                ) {
                  node.properties.class =
                    (node.properties.class || "") + " highlighted";
                  node.properties.style = `background-color: ${highlightColor};`;
                }
                return node;
              },
            },
          ],
        });
        setHighlightedBefore(before);
        setHighlightedAfter(after);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedBefore(`<pre>${beforeCode}</pre>`);
        setHighlightedAfter(`<pre>${afterCode}</pre>`);
      }
    }
    highlightCode();
  }, [
    theme,
    systemTheme,
    beforeCode,
    afterCode,
    language,
    lightTheme,
    darkTheme,
    beforeHighlightRange,
    afterHighlightRange,
    highlightColor,
  ]);

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          className="h-full w-full overflow-auto bg-background font-mono text-xs [&>.shiki]:bg-red-500 [&>pre]:h-full [&>pre]:!bg-transparent [&>pre]:p-4"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    } else {
      return (
        <pre className="h-full overflow-auto break-all bg-background p-4 font-mono text-xs text-foreground">
          {code}
        </pre>
      );
    }
  };
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative w-full overflow-hidden rounded-md border border-border">
        <div className="relative grid md:grid-cols-2 md:divide-x md:divide-border">
          <div>
            <div className="flex items-center bg-accent p-2 text-sm text-foreground">
              <FileIcon className="mr-2 h-4 w-4" />
              {filename}
              <span className="ml-auto">before</span>
            </div>
            {renderCode(beforeCode, highlightedBefore)}
          </div>
          <div>
            <div className="flex items-center bg-accent p-2 text-sm text-foreground">
              <FileIcon className="mr-2 h-4 w-4" />
              {filename}
              <span className="ml-auto">after</span>
            </div>
            {renderCode(afterCode, highlightedAfter)}
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-accent text-xs text-foreground">
          VS
        </div>
      </div>
    </div>
  );
}
