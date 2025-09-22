import Link from "next/link";

import { BlockDisplay } from "@/components/block-display";
import { Button } from "@/components/ui/button";

export const dynamic = "force-static";
export const revalidate = false;

const FEATURED_BLOCKS = [
  "animated-feature-card-1",
  "animated-feature-card-2",
  "animated-feature-card-3",
  "animated-feature-card-4",
  "animated-feature-card-5",
  "animated-feature-card-6",
  "animated-feature-card-7",
  "animated-feature-card-8",
  "animated-feature-card-9",
  "animated-feature-card-10",
  "animated-feature-card-11",

  "feature-1",
  "footer-1",
  "faq-3",
  "header-1",
  "header-2",
  "header-3",
  "hero-1",
  "hero-2",
  // "hero-3",
  // "dashboard-01",
  // "sidebar-07",
  // "sidebar-03",
  // "login-03",
  // "login-04",
];

export default async function BlocksPage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {FEATURED_BLOCKS.map((name) => (
        <BlockDisplay name={name} key={name} />
      ))}
      <div className="container-wrapper">
        <div className="container flex justify-center py-6">
          <Button asChild variant="outline">
            <Link href="/blocks/sidebar">Browse more blocks</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
