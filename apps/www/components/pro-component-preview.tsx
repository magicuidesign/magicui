"use client";
import { ResizablePreview } from "@/components/ui/resizable-preview";
import { cn } from "@/lib/utils";
import React from "react";

export function ProComponentPreview({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const [isDark, setIsDark] = React.useState(false);

  return (
    <div className={cn("relative mx-auto my-4", className)}>
      <ResizablePreview
        showControls={true}
        minHeight={600}
        showThemeToggle={true}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      >
        <iframe
          src={`https://pro.magicui.design/preview/${name}${isDark ? "?theme=dark" : "?theme=light"}`}
          className="w-full h-full border-0"
          title={`${name} preview`}
        />
      </ResizablePreview>
    </div>
  );
}
