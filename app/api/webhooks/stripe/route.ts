import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { upsertCustomer, upsertPayment } from "@/lib/stripe-utils";
import { headers } from "next/headers";
import Stripe from "stripe";

const relevantEvents = new Set([
  // "product.created",
  // "product.updated",
  // "price.created",
  // "price.updated",
  "customer.created",
  "checkout.session.completed",
  // "customer.subscription.created",
  // "customer.subscription.updated",
  // "customer.subscription.deleted",
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature") as string;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        // case 'product.created':
        // case 'product.updated':
        //   await upsertProductRecord(event.data.object as Stripe.Product);
        //   break;
        // case 'price.created':
        // case 'price.updated':
        //   await upsertPriceRecord(event.data.object as Stripe.Price);
        //   break;
        // case 'customer.subscription.created':
        // case 'customer.subscription.updated':
        // case 'customer.subscription.deleted':
        //   const subscription = event.data.object as Stripe.Subscription;
        //   await manageSubscriptionStatusChange(
        //     subscription.id,
        //     subscription.customer as string,
        //     event.type === 'customer.subscription.created'
        //   );
        //   break;

        case "customer.created":
          const customer = event.data.object as Stripe.Customer;
          console.log("Customer: ", customer);
          break;
        case "checkout.session.completed":
          const session = event.data.object as Stripe.Checkout.Session;
          if (session.mode === "subscription") {
            // const subscriptionId = session.subscription;
            // await manageSubscriptionStatusChange(
            //   subscriptionId as string,
            //   session.customer as string,
            //   true
            // );
          } else if (session.mode === "payment") {
            if (!session.customer_details?.email) {
              throw new Error("No email provided");
            }
            const customer = await upsertCustomer(
              session.customer_details.email,
              session.customer_details.name || ""
            );
            await upsertPayment(session.payment_intent as string, customer.id);

            console.log("Login Link");

            // await signIn("email", {
            //   email: session.customer_details.email,
            // });
            // await sendLoginEmail(session.customer_details.email);
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new Response("Webhook handler failed. View logs.", {
        status: 400,
      });
    }
  }

  return new Response(null, { status: 200 });
}
