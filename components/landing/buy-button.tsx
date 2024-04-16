"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn, fetcher } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";

const LoggedInAndPaid = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/docs"
      className={cn(
        buttonVariants({
          size: "lg",
          variant: "ghost",
        }),
        "gap-2 whitespace-pre md:flex",
        "group relative w-full gap-1 overflow-hidden rounded-full text-sm font-semibold tracking-tighter",
        // "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
      )}
    >
      Get Started
      <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
};

const UnPaid = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/pricing"
      className={cn(
        buttonVariants({
          size: "lg",
          variant: "secondary",
        }),
        "gap-2 whitespace-pre md:flex",
        "group relative w-full gap-1 overflow-hidden rounded-full text-sm font-semibold tracking-tighter",
        // "transform-gpu rounded-sm ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2",
      )}
    >
      Get Magic UI Pro
      <ChevronRight className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
};

export default function BuyButton() {
  const { status } = useSession();
  const { data, isLoading } = useSWR(
    status === "authenticated" && "/api/me",
    fetcher,
  );

  const isUserAuthenticatedAndLoaded = status === "authenticated" && !isLoading;
  const hasMadePayments = data?.user?.customer?.payments?.length > 0;
  const isAdmin = data?.user?.role === "ADMIN";

  if (status === "loading" || status === "unauthenticated" || isLoading) {
    return <UnPaid />;
  }

  if (isUserAuthenticatedAndLoaded && (hasMadePayments || isAdmin)) {
    return <LoggedInAndPaid />;
  }

  return <UnPaid />;
}
