"use client";

import { OpenInV0Button } from "@/components/open-in-v0-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import React from "react";

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const ComponentWrapper = ({
  className,
  children,
  name,
}: ComponentWrapperProps) => {
  const [key, setKey] = React.useState(0);

  return (
    <div key={key}>
      <div className="flex items-center justify-end gap-2 p-4">
        <OpenInV0Button url={`https://magicui.design/r/${name}.json`} />
        <Button
          onClick={() => setKey((prev) => prev + 1)}
          className="flex items-center rounded-lg px-3 py-1"
          variant="ghost"
        >
          <RotateCcw aria-label="restart-btn" size={16} />
        </Button>
      </div>

      <div className="flex min-h-[450px] w-full items-center justify-center p-10">
        {children}
      </div>
    </div>
  );
};
