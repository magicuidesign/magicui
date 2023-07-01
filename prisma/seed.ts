import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const db = new PrismaClient();

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});

class StripeService {
  async getCustomers() {
    const customers = [];
    for await (const customer of stripe.customers.list()) {
      customers.push(customer);
    }
    return customers;
  }

  async getPaymentIntents(customerId: string) {
    const payments = [];
    for await (const payment of stripe.charges.list({ customer: customerId })) {
      payments.push(payment);
    }
    return payments;
  }
}

async function seed() {
  const stripe = new StripeService();
  const customers = await stripe.getCustomers();

  for (const c of customers) {
    if (!c.email) throw new Error("Customer email is required");
    try {
      const user = await db.user.upsert({
        where: { email: c.email },
        update: {},
        create: { email: c.email },
      });

      const customer = await db.customer.upsert({
        where: { stripeId: c.id },
        update: {},
        create: {
          stripeId: c.id,
          user: { connect: { id: user.id } },
        },
      });

      const stripePayments = await stripe.getPaymentIntents(c.id);

      for (const stripePayment of stripePayments) {
        await db.payment.create({
          data: {
            stripeId: stripePayment.id,
            amount: stripePayment.amount,
            currency: stripePayment.currency,
            customerId: customer.id,
          },
        });
      }
      console.log("✅ " + c.email);
    } catch (e) {
      console.log("❌ " + c.email);
    }
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
