"use client";

import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { cn } from "@/lib/utils";
import * as React from "react";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  multi?: boolean;
}

export function ComponentSource({
  children,
  className,
  multi,
  ...props
}: ComponentSourceProps) {
  return (
    <CodeBlockWrapper
      multi={multi}
      expandButtonTitle="Expand"
      className={cn("my-6 overflow-hidden rounded-md", className)}
      {...props}
    >
      {children}
    </CodeBlockWrapper>
  );
}
