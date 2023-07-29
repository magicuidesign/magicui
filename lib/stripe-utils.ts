import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { UserPayments } from "@/types";

export async function getUserPayments(userId: string): Promise<UserPayments> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      customer: {
        include: {
          payments: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.customer) {
    throw new Error("Customer not found");
  }

  return {
    ...user,
    payments: user.customer.payments,
  };

  // Check if user is on a pro plan.
  // const isPro = user.stripePriceId === proPlan.stripePriceId;
  // user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  // const plan = isPro ? proPlan : freePlan;

  // return {
  //   ...plan,
  //   ...user,
  //   // stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
  //   isPro,
  // };
}

export const upsertPayment = async (
  paymentIntent: string,
  customerId: string,
) => {
  const p = await stripe.paymentIntents.retrieve(paymentIntent);

  const payment = await db.payment.create({
    data: {
      stripeId: paymentIntent,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      customerId: customerId,
    },
  });

  console.log(p);
};

export const upsertCustomer = async (email: string, name?: string) => {
  // Create or update user in our table
  const user = await db.user.upsert({
    where: { email },
    create: { email, name },
    update: { email, name },
  });

  const stripeCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  let stripeCustomer = stripeCustomers.data[0];

  if (stripeCustomers.data.length === 0) {
    stripeCustomer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId: user.id,
      },
    });
  }

  // create or update customer in our table
  const customer = await db.customer.upsert({
    where: {
      userId: user.id,
    },
    create: {
      stripeId: stripeCustomer.id,
      userId: user.id,
    },
    update: {
      stripeId: stripeCustomer.id,
    },
  });

  return customer;
};
