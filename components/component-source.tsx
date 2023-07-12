"use client";

import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import PreOrder from "@/components/preorder";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import * as React from "react";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
}

export function ComponentSource({
  children,
  className,
  ...props
}: ComponentSourceProps) {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") return null;
  if (status === "unauthenticated") return <PreOrder />;

  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("my-6 overflow-hidden rounded-md", className)}
    >
      {children}
    </CodeBlockWrapper>
  );
}
