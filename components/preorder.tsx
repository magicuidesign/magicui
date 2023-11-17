"use client";

import { PriceCard } from "@/components/price-card";
import { plans } from "@/config/pricing";
import { env } from "@/env.mjs";
import { MagicContainer } from "@/registry/components/magicui/magic-card";
import { useSession } from "next-auth/react";

export default function PreOrder() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const url = new URL(env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK);

  if (status === "authenticated" && user && user.email) {
    url.searchParams.append("prefilled_email", user.email);
  }

  return (
    <MagicContainer className="not-prose mt-8 grid w-full max-w-screen-md justify-center gap-8 lg:grid-cols-2">
      {plans.map((item, idx) => (
        <PriceCard key={idx} item={item} className="h-fit" />
      ))}
    </MagicContainer>
  );
}
