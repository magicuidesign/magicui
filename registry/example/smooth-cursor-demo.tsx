"use client";

import React from "react";
import { SmoothCursor } from "@/registry/magicui/smooth-cursor";

export default function SmoothCursorDemo() {
  return (
    <div className="z-10 rounded-lg p-4">
      <h2 className="pb-4 font-bold">
        Note: The smooth cursor is shown on the page.
      </h2>
      <SmoothCursor />
    </div>
  );
}
