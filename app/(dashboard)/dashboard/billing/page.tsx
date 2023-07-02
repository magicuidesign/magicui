import { DashboardHeader } from "@/components/dashboard/header";
import { OrderList } from "@/components/dashboard/order-list";
import { DashboardShell } from "@/components/dashboard/shell";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { getUserPayments } from "@/lib/stripe-utils";
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

  const payments = await getUserPayments(user.id);

  return (
    <DashboardShell>
      <DashboardHeader heading="Billing" text="Manage billing information" />
      <div className="grid gap-8">
        <OrderList payments={payments} />
      </div>
    </DashboardShell>
  );
}
