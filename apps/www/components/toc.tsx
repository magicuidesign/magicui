"use client";

import { useEffect, useMemo, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";
import type { TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface TocProps {
  toc: TableOfContents;
}

export function TableOfContents({ toc }: TocProps) {
  const refinedToc = useMemo(() => {
    if (!toc.items || toc.items.length === 0) {
      return toc;
    }

    const [linksInSteps, ...rest] = toc.items;

    if (linksInSteps.items && linksInSteps.items.length > 0) {
      return {
        items: [...linksInSteps.items, ...rest],
      };
    }

    return toc;
  }, [toc]);

  const itemIds: string[] = useMemo(
    () =>
      refinedToc.items
        ? refinedToc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [refinedToc],
  ) as string[];

  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items || !mounted) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={refinedToc} activeItem={activeHeading} />
    </div>
  );
}

function useActiveItem(itemIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` },
    );

    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                item.url === `#${activeItem}`
                  ? "font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
