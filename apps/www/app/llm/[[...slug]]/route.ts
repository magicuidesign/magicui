import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { allDocs } from "content-collections";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug: slugSegments } = await params;
  const slug = slugSegments?.join("/") || "index";
  const doc = allDocs.find((d) => d.slugAsParams === slug);

  if (!doc) {
    notFound();
  }

  const mdx = (doc.body as any).rawWithFrontmatter ?? doc.body.raw;
  return new NextResponse(mdx, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams === "index" ? [] : doc.slugAsParams.split("/"),
  }));
}
