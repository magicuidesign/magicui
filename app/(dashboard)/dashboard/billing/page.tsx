import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { BillingPortalButton } from "@/components/stripe-portal-button";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Billing | Magic UI",
  description: "Manage billing information.",
};

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  // const payments = await getUserPayments(user.id);

  return (
    <DashboardShell>
      <DashboardHeader heading="Billing" text="Manage billing information" />
      <BillingPortalButton>Manage Billing</BillingPortalButton>
      {/* <div className="grid gap-8">
        <OrderList payments={payments} />
      </div> */}
    </DashboardShell>
  );
}
