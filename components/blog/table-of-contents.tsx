"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

// Helper function to generate consistent IDs
const generateHeadingId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s*&\s*/g, "--")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export default function BlogTableOfContents({
  headings: initialHeadings,
}: {
  headings: string[];
}) {
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [headings, setHeadings] = useState<string[]>(initialHeadings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extract headings from rendered DOM
    const extractHeadings = () => {
      const headingElements =
        document.querySelector(".article-content")?.querySelectorAll("h2") ||
        [];
      const extractedHeadings: string[] = [];
      headingElements.forEach((element) => {
        if (element.textContent) {
          extractedHeadings.push(element.textContent);
        }
      });
      setHeadings(extractedHeadings);
      setIsLoading(false);
    };

    // Extract headings after a short delay to ensure content is rendered
    const timeoutId = setTimeout(extractHeadings, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: [0, 1],
      },
    );

    const headingElements =
      document.querySelector(".article-content")?.querySelectorAll("h2") || [];
    headingElements.forEach((element) => observer.observe(element));

    // Also update active heading on scroll
    const onScroll = () => {
      const headings = Array.from(
        document.querySelector(".article-content")?.querySelectorAll("h2") ||
          [],
      );
      const middle = window.innerHeight / 2;

      for (const heading of headings) {
        const { top, bottom } = heading.getBoundingClientRect();
        if (top <= middle && bottom >= middle) {
          setActiveHeading(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial check

    return () => {
      clearTimeout(timeoutId);
      headingElements.forEach((element) => observer.unobserve(element));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = (headingId: string) => {
    setActiveHeading(headingId);
  };

  return (
    <div className="mb-6 w-full">
      <h3 className="mb-4 font-medium text-primary underline underline-offset-8">
        On this page
      </h3>
      <div className="flex w-full flex-col gap-2.5">
        {isLoading ? (
          // Skeleton loading state
          <div className="flex w-full flex-col gap-2.5">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-full" />
          </div>
        ) : (
          headings.map((heading, i) => {
            // Get the actual heading element to check its ID
            const headingElement = document.querySelector(
              `.article-content h2:nth-of-type(${i + 1})`,
            );
            const headingId = headingElement?.id || generateHeadingId(heading);
            const isActive = activeHeading === headingId;

            return (
              <a
                key={i}
                href={`#${headingId}`}
                onClick={() => handleClick(headingId)}
                className={`flex items-center gap-2 text-[15px] font-medium tracking-tight transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {heading}
              </a>
            );
          })
        )}
      </div>
    </div>
  );
}
