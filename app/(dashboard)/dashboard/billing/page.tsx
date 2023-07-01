import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Billing | Magic UI",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  // const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // // If user has a pro plan, check cancel status on Stripe.
  // let isCanceled = false;
  // if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
  //   const stripePlan = await stripe.subscriptions.retrieve(
  //     subscriptionPlan.stripeSubscriptionId
  //   );
  //   isCanceled = stripePlan.cancel_at_period_end;
  // }

  return (
    <DashboardShell>
      <DashboardHeader heading="Billing" text="Manage billing information" />
      <div className="grid gap-8">
        {/* <BillingForm
          subscriptionPlan={
            {
              // ...subscriptionPlan,
              // isCanceled,
            }
          }
        /> */}
      </div>
    </DashboardShell>
  );
}
