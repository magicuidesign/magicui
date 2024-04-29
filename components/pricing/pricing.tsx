import { PriceCard } from "@/components/price-card";
import { plans } from "@/config/pricing";
import { db } from "@/lib/db";
import FadeIn from "@/registry/components/magicui/fade-in";
import { MagicContainer } from "@/registry/components/magicui/magic-card";
import { Gift } from "lucide-react";

export default async function Hero() {
  const payments = await db.payment.count({
    where: {
      status: "succeeded",
    },
  });

  return (
    <section id="pricing" className="py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h4 className="text-xl font-bold tracking-tight text-foreground">
              Magic UI PRO
            </h4>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
              Lifetime Access
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-xl leading-8 text-foreground/80">
              Get <strong>lifetime access</strong> to all components and
              templates available today , plus any new ones we add in the future
              for a simple one-time price.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mx-auto my-8 inline-flex w-full items-center justify-center gap-2">
            <Gift className="h-4 w-4 animate-bounce" />
            <span>
              <strong>
                $100 off for the first {Math.ceil((payments + 1) / 100) * 100}
              </strong>{" "}
              customers (
              {payments > 0
                ? Math.ceil((payments + 1) / 100) * 100 - payments
                : 0}{" "}
              left)
            </span>
          </div>
        </FadeIn>

        <MagicContainer className="mx-auto grid w-full max-w-screen-md justify-center gap-8 lg:grid-cols-1">
          {plans.map((item, idx) => (
            <PriceCard
              key={idx}
              item={item}
              className="mx-auto h-fit max-w-[400px]"
            />
          ))}
        </MagicContainer>
      </div>
    </section>
  );
}
