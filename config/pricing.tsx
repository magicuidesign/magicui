import { env } from "@/env.mjs";
import { User2Icon, Users2Icon } from "lucide-react";

export const plans = [
  {
    stripePriceId: "price_1ODMUcKqaLcdpMYsOJ4j8XtA",
    Icon: <User2Icon className="flex h-10 w-10 rounded-full stroke-white/40" />,
    name: "Personal",
    sub: "For individual developers and freelancers.",
    desc: "Beautifully crafted React + Tailwind CSS + Framer Motion components and templates for your next web project.",
    discountPrice: 49,
    price: 149,
    isMostPop: true,
    banner: "$100 off",
    href: env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK,
    featureHeader: "What's included:",
    features: [
      "100+ components (coming soon)",
      "50+ building blocks (coming soon)",
      "5+ full templates (coming soon)",
      "Dark mode support",
      "Lifetime access",
      "Free lifetime updates",
      "Use on unlimited projects",
      "Single developer license",
    ],
  },
  {
    Icon: (
      <Users2Icon className="flex h-10 w-10 rounded-full stroke-white/40" />
    ),
    name: "Teams",
    sub: "For product teams, agencies and startups.",
    desc: "Beautifully crafted React + Tailwind CSS + Framer Motion components and templates for your next web project.",
    discountPrice: 349,
    price: 999,
    isMostPop: false,
    banner: "65% OFF",
    href: "https://buy.stripe.com/bIY4jr87G8zQ4JW003?prefilled_promo_code=EARLYBIRDPROMO",
    featureHeader: "Everything in Personal, plus:",
    features: ["10 developer licenses"],
  },
];
