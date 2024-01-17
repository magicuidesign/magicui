"use server";

import { stripe } from "@/lib/stripe";

export type GetPortalSessionOptions = {
  customerId: string;
  returnUrl: string;
};

export const getPortalSession = async ({
  customerId,
  returnUrl,
}: GetPortalSessionOptions) => {
  "use server";

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session.url;
};
