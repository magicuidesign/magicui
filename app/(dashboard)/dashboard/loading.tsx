import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonRow() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Manage account"
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    </DashboardShell>
  );
}
