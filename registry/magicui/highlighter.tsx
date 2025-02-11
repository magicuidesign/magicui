"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";
import type React from "react";

interface HighlighterProps {
  children: React.ReactNode;
  action?: "highlight" | "circle";
  color?: string;
}

export default function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc", // Default pink color
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      const annotation = annotate(elementRef.current, {
        type: action === "circle" ? "circle" : "highlight",
        color: color,
        multiline: true,
        padding: action === "circle" ? 8 : 2,
        iterations: 2, // More iterations for a natural effect
        animationDuration: 500,
      });

      annotationRef.current = annotation;
      annotation.show();
    }

    return () => {
      annotationRef.current?.remove();
    };
  }, [action, color, elementRef.current]); // Added elementRef.current dependency

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
