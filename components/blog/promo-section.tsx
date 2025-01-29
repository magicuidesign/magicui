"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function PromoSection() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-3.5 rounded-xl border bg-indigo-600 p-5 text-white">
      <h2 className="text-balance text-center text-lg font-semibold tracking-tighter">
        Want to save time? Get beautifully designed website templates with Magic
        UI Pro.
      </h2>
      <p className="text-balance text-center">
        30+ beautiful sections and templates built with React, Typescript,
        Tailwind CSS, and Framer Motion.
      </p>
      <Button
        variant="outline"
        asChild
        className="flex w-full items-center justify-center bg-white text-indigo-600"
      >
        <Link href="/">
          Get Pro
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
