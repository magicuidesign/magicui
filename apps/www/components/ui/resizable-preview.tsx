"use client";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import React from "react";

interface ResizablePreviewProps {
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
  minHeight?: number;
  showThemeToggle?: boolean;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

export function ResizablePreview({
  children,
  className,
  showControls = true,
  minHeight = 500,
  showThemeToggle = false,
  isDark = false,
  onThemeToggle,
}: ResizablePreviewProps) {
  return (
    <div
      className={cn(
        "relative border border-border rounded-lg overflow-hidden",
        className,
      )}
    >
      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-end p-3 bg-muted/5 border-b border-border">
          {showThemeToggle && onThemeToggle && (
            <Button
              onClick={onThemeToggle}
              variant="outline"
              size="sm"
              className="h-8 px-3"
              title="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      )}

      <ResizablePanelGroup direction="horizontal" style={{ minHeight }}>
        <ResizablePanel
          defaultSize={100}
          minSize={30}
          className="flex items-center justify-center p-0 "
        >
          {children}
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className="w-3 bg-muted/30 hover:bg-muted/60 transition-colors"
        />

        <ResizablePanel
          defaultSize={0}
          minSize={0}
          className="flex items-center justify-center bg-muted/10"
        ></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
