import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { BillingPortalButton } from "@/components/stripe-portal-button";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
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

  return (
    <DashboardShell>
      <DashboardHeader heading="Billing" text="Manage billing information" />
      <BillingPortalButton>Manage Billing</BillingPortalButton>
      <Link
        href={`https://zenvoice.io/p/65d4ce3bbba9ed59ff11c076?email=${user.email}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants(), "flex w-full max-w-[400px] gap-2")}
      >
        Generate Invoice
      </Link>
      {/* <div className="grid gap-8">
        <OrderList payments={payments} />
      </div> */}
    </DashboardShell>
  );
}
