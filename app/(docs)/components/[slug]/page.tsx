import ComponentWrapper from "@/components/component-wrapper";
import Facebook from "@/components/icons/facebook";
import LinkedIn from "@/components/icons/linkedin";
import Twitter from "@/components/icons/twitter";
import {
  MagicBorderCard,
  MagicBorderContainer,
} from "@/components/magicui/magic-border";
import { Mdx } from "@/components/mdx-components";
import { DashboardTableOfContents } from "@/components/toc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTableOfContents } from "@/lib/toc";
import { cn, constructMetadata } from "@/lib/utils";
import { allComponents } from "contentlayer/generated";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

export async function generateStaticParams() {
  return allComponents.map((component) => ({
    slug: component.slugAsParams,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const component = allComponents.find(
    (component) => component.slugAsParams === params.slug
  );
  if (!component) {
    return;
  }

  const {
    title,
    date: publishedTime,
    summary: description,
    image,
    slug,
  } = component;

  return constructMetadata({
    title: `${title} - Magic UI`,
    description,
    image,
    openGraph: {
      title: `${title} - Magic UI`,
      description,
      type: "article",
      publishedTime,
      tags: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Landing Page",
        "Components",
        "Next.js",
      ],
      url: `https://magicuikit.com/components/${slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Magic UI",
        },
      ],
    },
  });
}

export default async function Post({ params }: { params: { slug: string } }) {
  const component = allComponents.find(
    (component) => component.slugAsParams === params.slug
  );
  if (!component) {
    notFound();
  }

  const toc = await getTableOfContents(component.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <Link
            href="/components"
            className="transition-colors  hover:text-foreground/80"
          >
            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
              Components
            </div>
          </Link>
          <ChevronRight className="h-4 w-4" />
          <div className="font-medium text-foreground">{component.title}</div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {component.title}
          </h1>
          {component.summary && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{component.summary}</Balancer>
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href={`https://twitter.com/intent/tweet?text=${component.title}&url=https://magicuikit.com/components/${component.slugAsParams}&via=${component.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href={`
            http://www.linkedin.com/shareArticle?mini=true&url=https://magicuikit.com/components/${component.slugAsParams}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <LinkedIn className="h-6 w-6" />
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=https://magicuikit.com/components/${component.slugAsParams}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <Facebook className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="pb-12 pt-8">
          <ComponentWrapper>
            <MagicBorderContainer
              className={
                "grid w-full sm:grid-cols-2 grid-cols-1 gap-4 min-h-[300px] p-8"
              }
            >
              <MagicBorderCard className="group relative rounded-xl bg-gray-200 dark:bg-gray-800 p-4 shadow-2xl flex justify-center items-center  overflow-hidden border dark:border-gray-800 border-gray-200 bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 from-gray-100 to-gray-200">
                <p className="text-4xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200">
                  Magic
                </p>
              </MagicBorderCard>
              <MagicBorderCard className="group relative rounded-xl bg-gray-200 dark:bg-gray-800 p-4 shadow-2xl flex justify-center items-center dark:to-gray-900 overflow-hidden border dark:border-gray-800 border-gray-200 bg-gradient-to-br dark:from-gray-800 from-gray-100 to-gray-200">
                <p className="text-4xl font-semibold whitespace-nowrap text-gray-800 dark:text-gray-200">
                  Border
                </p>
              </MagicBorderCard>
            </MagicBorderContainer>
          </ComponentWrapper>
          <Mdx code={component.body.code} />
        </div>
      </div>

      {component.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
            <ScrollArea className="pb-10">
              <DashboardTableOfContents toc={toc} />
            </ScrollArea>
          </div>
        </div>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(component.structuredData),
        }}
      />
    </main>
  );
}
