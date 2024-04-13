import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { UserProfileForm } from "@/components/dashboard/user-profile-form";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Settings | Magic UI",
  description: "Manage account settings.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage account settings." />
      <div className="grid gap-10">
        <UserProfileForm />
      </div>
    </DashboardShell>
  );
}
