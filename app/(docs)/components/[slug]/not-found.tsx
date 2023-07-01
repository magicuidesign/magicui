import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <EmptyPlaceholder className="w-full">
        <EmptyPlaceholder.Icon name="logo" />
        <EmptyPlaceholder.Title>
          Pre-order to access Magic UI
        </EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You will get access to all the components of Magic UI
        </EmptyPlaceholder.Description>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Pre-order
        </Link>
      </EmptyPlaceholder>
    </main>
  );
}
