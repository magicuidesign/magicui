import { notFound } from "next/navigation"
import { NextResponse, type NextRequest } from "next/server"

import { replaceComponentSource } from "@/lib/docs"
import { source } from "@/lib/source"

export const revalidate = false

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const slug = (await params).slug
  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  let mdx = await page.data.getText("raw")

  // Replace component tags with actual source code
  mdx = await replaceComponentSource(mdx)

  return new NextResponse(mdx, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  })
}

export function generateStaticParams() {
  return source.generateParams()
}
