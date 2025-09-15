import { NavItem, NavItemWithChildren } from "@/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Doc } from "content-collections";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

interface DocsPagerProps {
  doc: Doc;
}

export function DocPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "outline" }), "min-w-0")}
          title={pager.prev.title}
        >
          <ChevronLeftIcon
            className="mr-2 size-4 shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">{pager.prev.title}</span>
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "ml-auto min-w-0 text-right",
          )}
          title={pager.next.title}
        >
          <span className="truncate">{pager.next.title}</span>
          <ChevronRightIcon
            className="ml-2 size-4 shrink-0"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href,
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      return flat.concat(link.items?.length ? flatten(link.items) : link);
    }, [])
    .filter((link) => !link?.disabled);
}
