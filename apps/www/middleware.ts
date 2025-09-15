import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {}
