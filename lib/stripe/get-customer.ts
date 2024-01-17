import { stripe } from "@/lib/stripe";

export const getStripeCustomerByEmail = async (email: string) => {
  const foundStripeCustomers = await stripe.customers.list({
    email,
  });

  return foundStripeCustomers.data[0] ?? null;
};

export const getStripeCustomerById = async (stripeCustomerId: string) => {
  try {
    const stripeCustomer = await stripe.customers.retrieve(stripeCustomerId);

    return !stripeCustomer.deleted ? stripeCustomer : null;
  } catch {
    return null;
  }
};
