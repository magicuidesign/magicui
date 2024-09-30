"use client";

import React, { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

interface CodeComparisonProps {
  beforeCode: string;
  afterCode: string;
  language: string;
  filename: string;
  lightTheme: string;
  darkTheme: string;
}

export default function CodeComparison({
  beforeCode,
  afterCode,
  language,
  filename,
  lightTheme,
  darkTheme,
}: CodeComparisonProps) {
  const { theme, systemTheme } = useTheme();
  const [highlightedBefore, setHighlightedBefore] = useState("");
  const [highlightedAfter, setHighlightedAfter] = useState("");

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const selectedTheme = currentTheme === "dark" ? darkTheme : lightTheme;

    async function highlightCode() {
      const before = await codeToHtml(beforeCode, {
        lang: language,
        theme: selectedTheme,
      });
      const after = await codeToHtml(afterCode, {
        lang: language,
        theme: selectedTheme,
      });
      setHighlightedBefore(before);
      setHighlightedAfter(after);
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
  ]);

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          className="h-full font-mono text-sm [&>pre]:h-full [&>pre]:bg-[#1e1e1e] [&>pre]:p-4 [&_code]:whitespace-pre-wrap [&_code]:break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    } else {
      return (
        <pre className="h-full whitespace-pre-wrap break-all bg-background p-4 font-mono text-sm text-foreground">
          {code}
        </pre>
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Card className="w-full">
        <CardContent className="h-full p-0">
          <div className="relative grid h-full overflow-hidden rounded-md md:grid-cols-2">
            <div className="h-full border-r border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center bg-[#1e1e1e] p-2 font-mono text-sm text-white">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z" />
                </svg>
                {filename}
                <span className="ml-auto">before</span>
              </div>
              {renderCode(beforeCode, highlightedBefore)}
            </div>
            <div className="h-full">
              <div className="flex items-center bg-[#1e1e1e] p-2 font-mono text-sm text-white">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z" />
                </svg>
                {filename}
                <span className="ml-auto">after</span>
              </div>
              {renderCode(afterCode, highlightedAfter)}
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-neutral-700 text-sm text-white">
              VS
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
