"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const DOMAINS = {
  v3: "https://v3.magicui.design",
  v4: "https://magicui.design",
} as const;

export function VersionSelect() {
  const [mounted, setMounted] = React.useState(false);
  // Changed default version to v4
  const [version, setVersion] = React.useState<keyof typeof DOMAINS>("v4");

  // ... existing code ...
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleVersionChange = (value: keyof typeof DOMAINS) => {
    setVersion(value);
    window.location.href = DOMAINS[value];
  };

  if (!mounted) {
    return (
      <Skeleton className="h-7 w-14 rounded-full border border-muted-foreground/20" />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-7 w-14 cursor-pointer items-center justify-between rounded-full bg-muted py-1 pl-2 pr-0.5 text-sm font-medium text-muted-foreground">
        {version}
        <div className="flex size-5 items-center justify-center rounded-full border border-muted-foreground/20">
          <ChevronDownIcon className="size-4 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => handleVersionChange("v3")}
          className={cn(
            "flex justify-between",
            version === "v3" && "bg-muted text-primary",
          )}
        >
          Tailwind v3
          {version === "v3" && <CheckIcon className="ml-2 size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleVersionChange("v4")}
          className={cn(
            "flex justify-between",
            version === "v4" && "bg-muted text-primary",
          )}
        >
          Tailwind v4
          {version === "v4" && <CheckIcon className="ml-2 size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
