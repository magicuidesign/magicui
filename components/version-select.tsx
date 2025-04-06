"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const DOMAINS = {
  v3: "https://v3.magicui.design",
  v4: "https://magicui.design",
} as const;

export function VersionSelect() {
  const [mounted, setMounted] = React.useState(false);

  // Only render the select after component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleVersionChange = (value: keyof typeof DOMAINS) => {
    window.location.href = DOMAINS[value];
  };

  // Show skeleton while not mounted
  if (!mounted) {
    return (
      <Skeleton className="h-7 w-14 rounded-full border border-muted-foreground/20" />
    );
  }

  return (
    <Select defaultValue="v4" onValueChange={handleVersionChange}>
      <SelectTrigger className="w-14 rounded-full bg-muted px-2 pr-1 py-1 text-sm font-medium text-muted-foreground h-7! flex items-center justify-center cursor-pointer [&>.select-icon]:border [&>.select-icon]:border-muted-foreground/20 [&>.select-icon]:rounded-full [&>.select-icon]:size-5">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="v4">v4</SelectItem>
        <SelectItem value="v3">v3</SelectItem>
      </SelectContent>
    </Select>
  );
}
