"use client";

import BlockWrapper from "@/components/block-wrapper";
import { Icons } from "@/components/icons";
import PreOrder from "@/components/preorder";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, fetcher } from "@/lib/utils";
import { registry } from "@/registry";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";

interface BlockPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
  free?: boolean;
  scroller?: boolean;
}

const PayWall = ({ className }: { className?: string }) => {
  return (
    <>
      <PreOrder />
    </>
  );
};

export function BlockPreview({
  name,
  children,
  className,
  align = "center",
  free = false,
  scroller = false,
  ...props
}: BlockPreviewProps) {
  const { data: session, status } = useSession();
  const [paywall, setPaywall] = React.useState(false);
  const { data, isLoading } = useSWR(
    status === "authenticated" && "/api/me",
    fetcher,
  );

  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0]; // first child

  const Preview = React.useMemo(() => {
    const Component = registry[name]?.component;

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  React.useEffect(() => {
    const shouldShowPaywall =
      (!free && status === "unauthenticated") ||
      (data?.user?.customer?.payments?.length === 0 &&
        data?.user?.role !== "ADMIN");
    setPaywall(shouldShowPaywall);
  }, [free, status, data]);

  if (status === "loading") return null;
  if (isLoading) return null;

  function humanize(name: string): string {
    return name
      .replace(/-/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
      .join(" ");
  }

  return (
    <div
      className={cn(
        "not-prose relative my-4 flex flex-col space-y-2 lg:max-w-[100ch]",
        className,
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between">
          {paywall && (
            <>
              <div className="flex flex-row gap-2">
                <h2 className="text-xl font-semibold text-primary">
                  {humanize(name)}
                </h2>
                <Badge
                  variant="secondary"
                  className="hidden tracking-normal text-foreground md:inline-flex"
                >
                  Preview
                </Badge>
              </div>
              <Link
                href={"/pricing"}
                className={cn(
                  "group relative flex flex-row items-center justify-center gap-2 text-sm font-medium",
                  "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f]",
                  "transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]",
                )}
              >
                <div
                  className={cn(
                    `absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
                    `p-[1px] ![mask-composite:subtract]`,
                  )}
                />
                <LockClosedIcon className="size-4 text-[#ffaa40]" />
                <Separator className="h-4" orientation="vertical" />{" "}
                <span
                  className={cn(
                    `inline animate-gradient whitespace-pre bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent [--bg-size:300%]`,
                  )}
                >
                  Get the code
                </span>
                <Icons.chevronRight className="text-[#9c40ff]" />
              </Link>
            </>
          )}
          {!paywall && (
            <>
              <h2 className="text-xl font-semibold text-primary">
                {humanize(name)}
              </h2>
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </>
          )}
        </div>
        <TabsContent value="preview" className="relative rounded-md">
          <BlockWrapper>
            <React.Suspense
              fallback={
                <div className="space-y-4">
                  <Skeleton className="h-[150px] w-full" />
                </div>
              }
            >
              {scroller && (
                <div className="max-h-[450px] overflow-y-scroll">
                  <div className="h-screen">{Preview}</div>
                </div>
              )}
              {!scroller && Preview}
            </React.Suspense>
          </BlockWrapper>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
