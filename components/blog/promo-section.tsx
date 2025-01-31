"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

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
      <Button variant="default" asChild className="w-full">
        <Link href="https://pro.magicui.design">
          Get Pro
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
