import { SubscriptionPlan } from "types";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan has limited access. Upgrade to the PRO plan for unlimited access to all features.",
  stripePriceId: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited access to all features.",
  stripePriceId: "price_1NNmTCKqaLcdpMYsfbisFtY2",
};
