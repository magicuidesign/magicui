import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { env } from "process";

export default async function NotFound() {
  const user = await getCurrentUser();
  const url = new URL(
    env.NODE_ENV === "development"
      ? "https://buy.stripe.com/test_bIY7uvbbzecfcw09AB"
      : "https://buy.stripe.com/3cs8zHafOdUa0tG9AA"
  );

  if (user && user.email) {
    url.searchParams.append("prefilled_email", user.email);
  }

  return (
    <EmptyPlaceholder className="w-full">
      <EmptyPlaceholder.Icon name="logo" />
      <EmptyPlaceholder.Title>
        Pre-order to get access Magic UI
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You get the complete source code of all components and templates so you
        can use them in your projects 🎉
      </EmptyPlaceholder.Description>
      <Link
        href={url.toString()}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({ variant: "default" })}
      >
        Pre-order
      </Link>
    </EmptyPlaceholder>
  );
}
