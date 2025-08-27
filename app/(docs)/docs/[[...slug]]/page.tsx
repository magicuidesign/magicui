import { Mdx } from "@/components/mdx-components";
import { DocPager, getPagerForDoc } from "@/components/pager";
import { badgeVariants } from "@/components/ui/badge";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, cn } from "@/lib/utils";
import { DocsCopyPage } from "@/components/docs-copy-page";

import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Contribute } from "@/components/contribute";
import { SidebarCTA } from "@/components/sidebar-cta";
import { TableOfContents } from "@/components/toc";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || "index";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.title} | Magic UI`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: doc.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [doc.image],
      creator: "@dillionverma",
    },
  };
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc || !doc.published) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);
  const pager = getPagerForDoc(doc);

  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 max-w-3xl py-6 lg:py-8">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="size-4" />
          <div className="font-medium text-foreground">{doc.title}</div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {doc.title}
          </h1>
          <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
            <DocsCopyPage page={doc.body.raw} url={absoluteUrl(doc.slug)} />
            {pager?.prev?.href && (
              <Button
                variant="secondary"
                size="icon"
                className="extend-touch-target ml-auto size-8 shadow-none md:size-7"
                asChild
              >
                <Link href={pager.prev.href}>
                  <span className="sr-only">Previous</span>
                  <IconArrowLeft />
                </Link>
              </Button>
            )}
            {pager?.next?.href && (
              <Button
                variant="secondary"
                size="icon"
                className="extend-touch-target size-8 shadow-none md:size-7"
                asChild
              >
                <Link href={pager.next.href}>
                  <span className="sr-only">Next</span>
                  <IconArrowRight />
                </Link>
              </Button>
            )}
          </div>
          {doc.description && (
            <p className="text-balance text-lg text-muted-foreground">
              {doc.description}
            </p>
          )}
        </div>
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Docs
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                API Reference
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
        <DocPager doc={doc} />
      </div>
      {doc.toc && (
        <div className="hidden border-l border-border py-6 pl-6 text-sm xl:block">
          <div className="sticky top-[90px] h-[calc(100vh-3.5rem)] space-y-4">
            <TableOfContents toc={toc} />
            <Contribute doc={doc} />
            <SidebarCTA />
          </div>
        </div>
      )}
    </main>
  );
}
