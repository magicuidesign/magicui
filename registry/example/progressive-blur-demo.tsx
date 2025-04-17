"use client";

import React from "react";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

export default function ProgressiveBlurDemo() {
  return (
    <div className="relative h-[400px] w-full overflow-auto border rounded-xl">
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">
          Scrollable Content with Progressive Blur
        </h2>
        <p className="text-gray-500">
          Scroll down to see the blur effect at the bottom
        </p>

        {/* Sample content to demonstrate scrolling */}
        <ul className="space-y-2">
          {Array.from({ length: 30 }).map((_, index) => (
            <li key={index} className="p-3 border rounded-lg bg-card">
              Item {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Apply the progressive blur effect */}
      <ProgressiveBlur height="60%" position="bottom" />
    </div>
  );
}
