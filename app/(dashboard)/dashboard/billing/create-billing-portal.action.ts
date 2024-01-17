"use server";

import { getCurrentUser } from "@/lib/session";
import { stripe } from "@/lib/stripe";
import { getStripeCustomerByEmail } from "@/lib/stripe/get-customer";
import { getPortalSession } from "@/lib/stripe/get-portal-session";
// import { getSubscriptionByUserId } from "@/lib/stripe/get-subscription-by-user-id";
import { redirect } from "next/navigation";
import type Stripe from "stripe";

export const createBillingPortal = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  let stripeCustomer: Stripe.Customer | null = null;

  // Fallback to check if a Stripe customer already exists for the current user email.
  if (!stripeCustomer) {
    stripeCustomer = await getStripeCustomerByEmail(user.email!);
  }

  // Create a Stripe customer if it does not exist for the current user.
  if (!stripeCustomer) {
    stripeCustomer = await stripe.customers.create({
      name: user.name ?? undefined,
      email: user.email!,
      metadata: {
        userId: user.id,
      },
    });
  }

  return getPortalSession({
    customerId: stripeCustomer.id,
    returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
  });
};
