"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn, hasApplePay } from "@/lib/utils";
import DotPattern from "@/registry/components/magicui/dot-pattern";
import FadeIn from "@/registry/components/magicui/fade-in";
import { MagicCard } from "@/registry/components/magicui/magic-card";
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
        className="relative flex flex-col gap-8 overflow-hidden bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#ffaa40_0,#9c40ff_50%,transparent_100%)] p-8 text-black dark:text-white"
      >
        <div className="z-10 flex h-full w-full flex-col gap-4">
          <div className="flex items-center">
            <div>{item.Icon}</div>
            <div className="ml-4">
              <h2 className="text-base font-semibold leading-7">{item.name}</h2>
              <p className="text-sm leading-5 text-foreground/70">{item.sub}</p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <span className="text-7xl font-bold text-foreground">
              ${item.discountPrice}
            </span>
            <span className="text-4xl font-bold text-gray-600 line-through dark:text-gray-400">
              ${item.price}
            </span>
          </div>
          {/* <span className="text-xl font-semibold text-foreground/20">
            one-time payment
          </span> */}

          <Link
            href={item.href}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "group relative w-full gap-1 overflow-hidden rounded-sm text-lg font-semibold tracking-tighter",
              "transform-gpu rounded-sm ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
            )}
          >
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
            {hasApplePay() && <Icons.apple className="ml-2 h-5 w-5" />}
            {hasApplePay() && <p>Pay</p>}
            {!hasApplePay() && <p>Get Lifetime Access</p>}
          </Link>
          <p className="text-base font-medium tracking-tight text-foreground">
            {item.desc}
          </p>
          {item.features.length > 0 && (
            <div>
              <p className="pb-2 font-medium text-foreground">Features</p>
              <ul className="flex flex-col gap-2 font-normal">
                {item.features.map((featureItem: any, idx: any) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-foreground"
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
            </div>
          )}
        </div>

        {/* <Meteors /> */}
        {/* <div className="absolute inset-[1px] rounded-2xl bg-[radial-gradient(164.75%_100%_at_50%_0%,#334155_0%,#0F172A_48.73%)]" /> */}

        <DotPattern
          width={20}
          height={20}
          x={-10}
          y={-10}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "absolute inset-0 h-full w-full fill-black/[0.2] dark:fill-white/[0.2]",
            "[mask-image:linear-gradient(to_top_left,white,transparent,transparent)]",
          )}
        />
      </MagicCard>
    </FadeIn>
  );
};
