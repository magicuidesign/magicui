"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface TemplateOpenProps {
  url: string;
  free?: boolean;
}

export function TemplateOpen({ url, free = false }: TemplateOpenProps) {
  if (free) {
    return (
      <Link
        href={url}
        target="_blank"
        className={cn(
          buttonVariants({
            variant: "default",
          }),
          "not-prose group relative w-full gap-2",
        )}
      >
        Download
        <GitHubLogoIcon className="size-4" />
      </Link>
    );
  }

  return (
    <Link
      href="https://pro.magicui.design/#pricing"
      target="_blank"
      className={cn(
        buttonVariants({
          variant: "default",
        }),
        "not-prose group relative w-full gap-1",
      )}
    >
      Buy Now
      <ArrowRightIcon className="size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}
