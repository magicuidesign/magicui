import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DotPattern from "@/registry/components/magicui/dot-pattern";
import FadeIn from "@/registry/components/magicui/fade-in";
import { MagicCard } from "@/registry/components/magicui/magic-card";
import Meteors from "@/registry/components/magicui/meteors";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export const PriceCard = ({
  item,
  className,
}: {
  item: any;
  className?: string;
}) => {
  return (
    <FadeIn delay={0.3} className={className}>
      <MagicCard
        spotlight={false}
        className="relative flex flex-col gap-8 overflow-hidden p-8"
      >
        <div className="flex flex-col space-y-4">
          <span className="text-foreground font-medium">{item.name}</span>
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
            target="_blank"
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
          {item.features.map((featureItem: any, idx: any) => (
            <li
              key={idx}
              className="flex items-center gap-5 text-foreground text-sm"
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
  );
};
