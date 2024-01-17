"use client";

import { createBillingPortal } from "@/app/(dashboard)/dashboard/billing/create-billing-portal.action";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export const BillingPortalButton = ({
  children = "Manage Subscription",
}: {
  children?: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchPortalUrl = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const sessionUrl = await createBillingPortal();

      if (!sessionUrl) {
        throw new Error("NO_SESSION");
      }

      window.open(sessionUrl, "_blank");
    } catch (e: any) {
      let description =
        "We are unable to proceed to the billing portal at this time. Please try again, or contact support.";

      if (e.message === "CUSTOMER_NOT_FOUND") {
        description =
          "You do not currently have a customer record, this should not happen. Please contact support for assistance.";
      }

      toast({
        title: "Something went wrong",
        description,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Button
      onClick={async () => handleFetchPortalUrl()}
      disabled={isLoading}
      className="flex w-full max-w-[400px] gap-2"
    >
      {children}
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};
