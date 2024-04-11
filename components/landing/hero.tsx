import { allDocs } from "@/.contentlayer/generated";
import HeroClient from "@/components/landing/hero-client";
import { db } from "@/lib/db";
import { compareDesc } from "date-fns";

export default async function Hero() {
  const payments = await db.payment.count({
    where: {
      status: "succeeded",
    },
  });

  const post = allDocs
    .filter(
      (post) =>
        post.date && post.date <= new Date().toISOString() && post.published,
    )
    .sort((a, b) => {
      if (!a.date && !b.date) return 0; // Both dates are undefined, keep original order
      if (!a.date) return 1; // Move a to the end if date is undefined
      if (!b.date) return -1; // Move b to the end if date is undefined
      return compareDesc(new Date(a.date), new Date(b.date)); // Both dates are defined, proceed with comparison
    })[0];

  return <HeroClient payments={payments} post={post} />;
}
