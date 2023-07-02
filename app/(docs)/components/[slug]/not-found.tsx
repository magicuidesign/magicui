import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <EmptyPlaceholder className="w-full">
      <EmptyPlaceholder.Icon name="logo" />
      <EmptyPlaceholder.Title>
        Pre-order to access Magic UI
      </EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You will get access to all future components and their source code so
        you can use them in your projects 🎉
      </EmptyPlaceholder.Description>
      <Link
        href="https://buy.stripe.com/3cs8zHafOdUa0tG9AA"
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({ variant: "outline" })}
      >
        Pre-order
      </Link>
    </EmptyPlaceholder>
  );
}
