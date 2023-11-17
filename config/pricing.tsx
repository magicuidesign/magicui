import { env } from "@/env.mjs";
import { User2Icon, Users2Icon } from "lucide-react";

export const plans = [
  {
    Icon: <User2Icon className="flex h-10 w-10 rounded-full stroke-white/40" />,
    name: "Personal",
    sub: "For individual projects.",
    desc: "Beautifully crafted React + Tailwind CSS + Framer Motion components and templates for your next web project.",
    discountPrice: 79,
    price: 149,
    isMostPop: false,
    href: env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK,
    features: [
      "100+ components (coming soon)",
      "50+ building blocks (coming soon)",
      "5+ full templates (coming soon)",
      "Lifetime Access",
      "Lifetime Updates",
    ],
  },
  {
    Icon: (
      <Users2Icon className="flex h-10 w-10 rounded-full stroke-white/40" />
    ),
    name: "Teams",
    sub: "For product teams and agencies.",
    desc: "Get access for your entire team - up to 25 people to accommodate even the largest teams at your company.",
    discountPrice: 349,
    price: 999,
    isMostPop: false,
    href: "https://buy.stripe.com/bIY4jr87G8zQ4JW003?prefilled_promo_code=EARLYBIRDPROMO",
    features: [
      // "Get access for your entire team — team licenses include access for up to 25 people to accommodate even the largest teams at your company.",
    ],
  },
];
