"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function NotFound() {
  const router = useRouter();
  return (
    <section>
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center px-6 py-12">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="rounded-full bg-blue-50 p-3 text-sm font-medium dark:bg-gray-800">
            <Icons.warning className="size-6" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn&apos;t exist.
          </p>

          <div className="group mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
            <Button
              onClick={() => router.back()}
              className={buttonVariants({ variant: "secondary" })}
            >
              <Icons.chevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span>Go back</span>
            </Button>

            <Link href="/" className={buttonVariants({ variant: "default" })}>
              Take me home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
