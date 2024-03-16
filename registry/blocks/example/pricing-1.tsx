"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState } from "react";

type Interval = "month" | "year";

export const toHumanPrice = (price: number, decimals: number = 2) => {
  return Number(price / 100).toFixed(decimals);
};

// Demo prices object to simulate dynamic pricing data with added plans
const demoPrices = {
  month: [
    {
      id: "price_1",
      product: {
        name: "Basic",
        description: "A basic plan for startups and individual users",
        features: [
          "AI-powered analytics",
          "Basic support",
          "5 projects limit",
          "Access to basic AI tools",
        ],
      },
      unit_amount: 1000,
    },
    {
      id: "price_2",
      product: {
        name: "Premium",
        description: "A premium plan for growing businesses",
        features: [
          "Advanced AI insights",
          "Priority support",
          "Unlimited projects",
          "Access to all AI tools",
          "Custom integrations",
        ],
      },
      unit_amount: 2000,
    },
    {
      id: "price_5",
      product: {
        name: "Enterprise",
        description:
          "An enterprise plan with advanced features for large organizations",
        features: [
          "Custom AI solutions",
          "24/7 dedicated support",
          "Unlimited projects",
          "Access to all AI tools",
          "Custom integrations",
          "Data security and compliance",
        ],
      },
      unit_amount: 5000,
    },
    {
      id: "price_6",
      product: {
        name: "Ultimate",
        description: "The ultimate plan with all features for industry leaders",
        features: [
          "Bespoke AI development",
          "White-glove support",
          "Unlimited projects",
          "Priority access to new AI tools",
          "Custom integrations",
          "Highest data security and compliance",
        ],
      },
      unit_amount: 8000,
    },
  ],
  year: [
    {
      id: "price_3",
      product: {
        name: "Basic",
        description:
          "A basic plan, billed annually, for startups and individual users",
        features: [
          "AI-powered analytics",
          "Basic support",
          "5 projects limit",
          "Access to basic AI tools",
        ],
      },
      unit_amount: 10000,
    },
    {
      id: "price_4",
      product: {
        name: "Premium",
        description: "A premium plan, billed annually, for growing businesses",
        features: [
          "Advanced AI insights",
          "Priority support",
          "Unlimited projects",
          "Access to all AI tools",
          "Custom integrations",
        ],
      },
      unit_amount: 20000,
    },
    {
      id: "price_7",
      product: {
        name: "Enterprise",
        description:
          "An enterprise plan with advanced features, billed annually, for large organizations",
        features: [
          "Custom AI solutions",
          "24/7 dedicated support",
          "Unlimited projects",
          "Access to all AI tools",
          "Custom integrations",
          "Data security and compliance",
        ],
      },
      unit_amount: 50000,
    },
    {
      id: "price_8",
      product: {
        name: "Ultimate",
        description:
          "The ultimate plan with all features, billed annually, for industry leaders",
        features: [
          "Bespoke AI development",
          "White-glove support",
          "Unlimited projects",
          "Priority access to new AI tools",
          "Custom integrations",
          "Highest data security and compliance",
        ],
      },
      unit_amount: 80000,
    },
  ],
};

export default function Pricing() {
  const [interval, setInterval] = useState<Interval>("month");
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const onSubscribeClick = async (priceId: string) => {
    setIsLoading(true);
    setId(priceId);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    setIsLoading(false);
  };

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="pricing">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div>
            <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
              Pricing
            </h4>
          </div>
          <div>
            <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
              Simple pricing for everyone.
            </h2>
          </div>
          <div>
            <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white">
              Choose an <strong>affordable plan</strong> that&apos;s packed with
              the best features for engaging your audience, creating customer
              loyalty, and driving sales.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center space-x-2">
          <Switch
            id="interval"
            onCheckedChange={(checked) => {
              setInterval(checked ? "year" : "month");
            }}
          />
          <Label htmlFor="interval">Annual</Label>
          <span className="inline-block whitespace-nowrap rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white dark:bg-white dark:text-black">
            2 MONTHS FREE ✨
          </span>
        </div>

        <div className="mx-auto grid w-full justify-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {demoPrices[interval].map((price, idx) => (
            <motion.div
              key={price.id}
              initial="initial"
              animate="animate"
              variants={fadeUpVariants}
              transition={{
                duration: 0.6,
                delay: 0.1 + idx * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={cn("relative h-full max-w-[400px]")}
            >
              <div
                className={cn(
                  "relative flex h-full flex-col gap-8 overflow-hidden rounded-2xl border p-4 text-black dark:text-white",
                )}
              >
                <div className="z-10 flex h-full w-full flex-col gap-4">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <h2 className="text-base font-semibold leading-7">
                        {price.product.name}
                      </h2>
                      <p className="h-16 text-sm leading-5 text-black/70 dark:text-white">
                        {price.product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-1">
                    <span className="text-4xl font-bold text-black dark:text-white">
                      ${toHumanPrice(price.unit_amount ?? 0, 0)}
                      <span className="text-xs"> / {interval}</span>
                    </span>
                  </div>

                  <Button
                    className={cn(
                      "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                      "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
                    )}
                    disabled={isLoading}
                    onClick={() => void onSubscribeClick(price.id)}
                  >
                    <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black" />
                    {(!isLoading || (isLoading && id !== price.id)) && (
                      <p>Subscribe</p>
                    )}

                    {isLoading && id === price.id && <p>Subscribing</p>}
                    {isLoading && id === price.id && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                  </Button>

                  <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0" />
                  {price.product.features &&
                    price.product.features.length > 0 && (
                      <ul className="flex flex-col gap-2 font-normal">
                        {price.product.features.map(
                          (feature: any, idx: any) => (
                            <li
                              key={idx}
                              className="flex items-center gap-3 text-xs font-medium text-black dark:text-white"
                            >
                              <CheckIcon className="h-5 w-5 shrink-0 rounded-full bg-green-400 p-[2px] text-black dark:text-white" />
                              <span className="flex">{feature}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
