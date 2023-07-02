"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <section>
      <div className="container flex items-center min-h-[calc(100vh-8rem)] px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium rounded-full bg-blue-50 dark:bg-gray-800">
            <Icons.warning className="w-6 h-6" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn&apos;t exist.
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto group">
            <Button
              onClick={() => router.back()}
              className={buttonVariants({ variant: "secondary" })}
            >
              <Icons.chevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
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
