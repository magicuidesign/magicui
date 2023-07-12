import Facebook from "@/components/icons/facebook";
import LinkedIn from "@/components/icons/linkedin";
import Twitter from "@/components/icons/twitter";
import { Mdx } from "@/components/mdx-components";
import { DashboardTableOfContents } from "@/components/toc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/session";
import { getUserPayments } from "@/lib/stripe-utils";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils";
import { Payment } from "@prisma/client";
import { allComponents } from "contentlayer/generated";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

// TODO: Fix this in future
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams

// export async function generateStaticParams() {
//   return allComponents.map((component) => ({
//     slug: component.slugAsParams,
//   }));
// }

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
      url: absoluteUrl(slug),
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

interface Props {
  params: { slug: string };
}

export default async function Component({ params }: Props) {
  const user = await getCurrentUser();
  const { payments } = await getUserPayments(user?.id!);

  const paid = payments.some(
    (payment: Payment) => payment.status === "succeeded"
  );

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
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href={`
            http://www.linkedin.com/shareArticle?mini=true&url=https://magicuikit.com/components/${component.slugAsParams}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn className="h-6 w-6" />
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=https://magicuikit.com/components/${component.slugAsParams}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col pt-8 gap-4">
          {/* {component.video && (
            <div className="flex md:hidden overflow-hidden relative rounded-xl border dark:border-slate-800 md:p-8 justify-center items-center flex-col max-w-[65ch]">
              <video
                src={component.video}
                autoPlay
                loop
                muted
                playsInline
                className="relative -bottom-1 aspect-video" // needed because random black line at bottom of video
              />
            </div>
          )} */}
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
