import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils";
import DotPattern from "@/registry/components/magicui/dot-pattern";
import FadeIn from "@/registry/components/magicui/fade-in";
import GridPattern from "@/registry/components/magicui/grid-pattern";
import LinearGradient from "@/registry/components/magicui/linear-gradient";
import {
  MagicCard,
  MagicContainer,
} from "@/registry/components/magicui/magic-card";
import Meteors from "@/registry/components/magicui/meteors";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Lifetime Access to Beautifully Crafted Tailwind CSS Components",
  description:
    "Get lifetime access to beautifully crafted React + Tailwind CSS + Framer Motion components and templates for your next web project. Get lifetime access to all components and templates",
  image: absoluteUrl(`/api/og`),
});

export default function Buy() {
  const plans = [
    {
      name: "Magic UI",
      desc: "Beautifully crafted React + Tailwind CSS + Framer Motion components and templates for your next web project.",
      discountPrice: 49,
      price: 79,
      isMostPop: false,
      features: [
        "100+ components (coming soon)",
        "50+ building blocks (coming soon)",
        "5+ full templates (coming soon)",
        "Lifetime Access",
        "Lifetime Updates",
      ],
    },
  ];

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <h4 className="text-xl font-bold tracking-tight text-foreground">
              Magic UI
            </h4>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
              Lifetime Access
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-xl leading-8 text-foreground/60">
              Get <strong>lifetime access</strong> to all components and
              templates available today , plus any new ones we add in the future
              for a simple one-time price.
            </p>
          </FadeIn>
        </div>
        <MagicContainer className="mt-16 justify-center gap-6 flex items-center">
          {plans.map((item, idx) => (
            <FadeIn key={idx} delay={0.3}>
              <MagicCard
                spotlight={false}
                className="flex flex-col gap-8 overflow-hidden p-8 cursor-pointer w-[400px] max-w-max"
              >
                <div className="flex flex-col space-y-4">
                  <span className="text-foreground font-medium">
                    {item.name}
                  </span>
                  <div className="flex flex-row gap-2">
                    <span className="text-7xl text-foreground font-semibold">
                      ${item.discountPrice}
                    </span>
                    <span className="line-through text-4xl text-gray-700 font-normal">
                      ${item.price}
                    </span>
                  </div>
                  {/* <span className="text-xl text-foreground/20 font-semibold">
                    one-time payment
                  </span> */}
                  <p className="text-foreground">{item.desc}</p>
                  <Link
                    href="https://buy.stripe.com/00g7vD4Vu8zQb8k5kl?prefilled_promo_code=EARLYBIRD"
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "w-full"
                    )}
                  >
                    Get Lifetime Access
                    <ExternalLinkIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <ul className="space-y-3">
                  <li className="pb-2 text-foreground font-medium">
                    <p>Features</p>
                  </li>
                  {item.features.map((featureItem, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-5 text-foreground"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-foreground"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {featureItem}
                    </li>
                  ))}
                </ul>

                <Meteors />
                <DotPattern
                  width={20}
                  height={20}
                  x={-10}
                  y={-10}
                  cx={1}
                  cy={1}
                  cr={1}
                  className={cn(
                    "absolute w-full h-full inset-0 fill-white/20",
                    "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)]"
                  )}
                />
              </MagicCard>
            </FadeIn>
          ))}
        </MagicContainer>
      </div>
      <GridPattern
        width={80}
        height={80}
        x={-1}
        y={-1}
        className={cn(
          "absolute w-screen h-screen inset-0 stroke-white/10 fill-white/10",
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] -z-50",
          "skew-y-12 inset-x-0 h-[70%] -z-50"
        )}
      />
      <LinearGradient
        className="w-screen h-screen"
        from="rgba(120,119,198,0.3)"
        to="rgba(0,0,0,0.0)"
        direction="bottom right"
      />
    </section>
  );
}
