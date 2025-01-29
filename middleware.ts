import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const engyneSubdomain = "magicui"; // change this to your Engyne subdomain
  const url = req.nextUrl.clone();

  const { pathname } = req.nextUrl;

  const hostname = req.headers.get("host");
  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: "No hostname found in request headers",
    });

  if (pathname === "/engyne-sitemap.xml") {
    return NextResponse.rewrite(
      new URL(pathname, `https://${engyneSubdomain}.engyne.page`)
    );
  }

  if (pathname.startsWith("/blogs") || pathname.startsWith("/tag")) {
    return NextResponse.rewrite(
      new URL(pathname, `https://${engyneSubdomain}.engyne.page`)
    );
  }
  if (pathname.startsWith("/_engyne")) {
    return NextResponse.rewrite(
      new URL(pathname, `https://${engyneSubdomain}.engyne.page`)
    );
  }

  return NextResponse.next();
}
