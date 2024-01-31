import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const db = new PrismaClient();

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});

async function seed() {
  const user = await db.user.findFirst({
    where: {
      email: "astrecttv@gmail.com",
    },
    include: {
      customer: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.customer) {
    throw new Error("Customer not found");
  }

  try {
    await db.payment.create({
      data: {
        stripeId: user.customer.stripeId,
        amount: 0,
        currency: "USD",
        status: "succeeded",
        customer: { connect: { id: user.customer.id } },
      },
    });

    console.log("✅ ");
  } catch (e) {
    console.log("❌ ");
    console.error(e);
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
