"use client";

import { PriceCard } from "@/components/price-card";
import { plans } from "@/config/pricing";
import { MagicContainer } from "@/registry/components/magicui/magic-card";
import { useSession } from "next-auth/react";

export default function PreOrder() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const url = new URL(process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK as string);

  if (status === "authenticated" && user && user.email) {
    url.searchParams.append("prefilled_email", user.email);
  }

  return (
    <MagicContainer className="not-prose max-w-[400px]">
      {plans.map((item, idx) => (
        <PriceCard key={idx} item={item} />
      ))}
    </MagicContainer>
  );
}
