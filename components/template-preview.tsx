import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ReactNode } from "react";

export default function TemplatePreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        "not-prose group relative w-full gap-2",
      )}
      href={href}
      target="_blank"
    >
      {children}
      <ExternalLinkIcon className="h-4 w-4" />
    </Link>
  );
}
