"use client";

import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import PreOrder from "@/components/preorder";
import { cn, fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import * as React from "react";
import useSWR from "swr";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
}

const Preview = ({ className }: { className?: string }) => {
  return (
    <>
      <PreOrder />
    </>
  );
};

export function ComponentSource({
  children,
  className,
  ...props
}: ComponentSourceProps) {
  const { data: session, status } = useSession();
  const { data, isLoading } = useSWR(
    status === "authenticated" && "/api/me",
    fetcher,
  );

  if (status === "loading") return null;
  if (status === "unauthenticated") return <Preview />;
  if (isLoading) return null;

  // TODO: Make this cleaner
  if (
    data?.user?.customer?.payments.length === 0 &&
    data?.user.role !== "ADMIN"
  )
    return <Preview />;

  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("my-6 overflow-hidden rounded-md", className)}
    >
      {children}
    </CodeBlockWrapper>
  );
}
