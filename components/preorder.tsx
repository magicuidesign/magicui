"use client";

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function PreOrder() {
  const { data: session } = useSession();
  const user = session?.user;

  const url = new URL(
    process.env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_bIY7uvbbzecfcw09AB"
      : "https://buy.stripe.com/3cs8zHafOdUa0tG9AA"
  );

  if (user && user.email) {
    url.searchParams.append("prefilled_email", user.email);
  }

  return (
    <EmptyPlaceholder className="w-full">
      <EmptyPlaceholder.Icon name="logo" />
      <EmptyPlaceholder.Title className="lg:text-2xl">
        Pre-order to get access Magic UI 🪄
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You get the complete source code of all components and templates so you
        can use them in your projects 🎉
      </EmptyPlaceholder.Description>
      <Link
        href={url.toString()}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        Pre-order
      </Link>
    </EmptyPlaceholder>
  );
}
