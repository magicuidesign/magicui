"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";

export interface SessionProvider {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: SessionProvider) {
  return <NextSessionProvider>{children}</NextSessionProvider>;
}
