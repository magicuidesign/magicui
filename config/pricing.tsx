import { User2Icon } from "lucide-react";

export const plans = [
  {
    stripePriceId: "price_1ODMUcKqaLcdpMYsOJ4j8XtA",
    Icon: <User2Icon className="flex h-10 w-10 rounded-full stroke-white/40" />,
    name: "Magic UI PRO",
    sub: "For individual developers and freelancers.",
    desc: "Beautifully crafted React + Tailwind CSS + Framer Motion components and templates for your next web project.",
    discountPrice: 49,
    isDiscounted: true,
    price: 129,
    isMostPop: true,
    banner: "$80 off",
    href: "https://buy.stripe.com/14k9DLgEcg2i6S45kq?prefilled_promo_code=SPRINGSALE",
    featureHeader: "What's included:",
    features: [
      "50+ building blocks (300 expected)",
      "2 templates (5 expected)",
      "Dark mode support",
      "Lifetime access",
      "Lifetime updates",
      "Use on unlimited projects",
      "Single developer license",
    ],
  },
  // {
  //   Icon: (
  //     <Users2Icon className="flex h-10 w-10 rounded-full stroke-white/40" />
  //   ),
  //   name: "Teams",
  //   sub: "For product teams, agencies and startups.",
  //   desc: "Beautifully crafted React + Tailwind CSS + Framer Motion components and templates for your next web project.",
  //   discountPrice: 349,
  //   price: 499,
  //   isMostPop: false,
  //   banner: "30% off",
  //   href: "https://buy.stripe.com/eVabLTafO5nE4JWbIN?prefilled_promo_code=EARLYBIRDTEAM",
  //   featureHeader: "Everything in Personal, plus:",
  //   features: ["10 developer licenses"],
  // },
];
