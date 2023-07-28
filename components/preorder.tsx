import { PriceCard } from "@/components/price-card";
import { plans } from "@/config/pricing";
import { MagicContainer } from "@/registry/components/magicui/magic-card";
import { useSession } from "next-auth/react";

export default function PreOrder() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const url = new URL(
    process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_bIY7uvbbzecfcw09AB"
      : "https://buy.stripe.com/00g7vD4Vu8zQb8k5kl?prefilled_promo_code=EARLYBIRD"
  );

  if (status === "authenticated" && user && user.email) {
    url.searchParams.append("prefilled_email", user.email);
  }

  return (
    <MagicContainer className="not-prose w-full">
      {plans.map((item, idx) => (
        <PriceCard key={idx} item={item} />
      ))}
    </MagicContainer>
  );
}
