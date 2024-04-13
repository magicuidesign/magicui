"use client";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, fetcher } from "@/lib/utils";
import { ArrowRightIcon, Download } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export default function RepoDownload({
  repo,
  owner,
}: {
  repo: string;
  owner: string;
}) {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [paywall, setPaywall] = useState(true);
  const { data, isLoading } = useSWR(
    status === "authenticated" && "/api/me",
    fetcher,
  );

  useEffect(() => {
    const shouldShowPaywall =
      status === "unauthenticated" ||
      (data?.user?.customer?.payments?.length === 0 &&
        data?.user?.role !== "ADMIN");
    setPaywall(shouldShowPaywall);
  }, [status, data]);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/repo/download`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repo, owner }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const downloadUrl = data.downloadUrl;
      /* window.open(downloadUrl, "_blank"); */
      window.location.href = downloadUrl;
    } catch (error) {
      toast.error("Error occured while downloading. Please try again.");
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {paywall ? (
        <Link
          href="/pricing"
          className={cn(
            buttonVariants({
              variant: "default",
            }),
            "not-prose group relative w-full gap-1",
          )}
        >
          Buy Now
          <ArrowRightIcon className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      ) : (
        <Button
          onClick={handleDownload}
          disabled={loading}
          className="not-prose group relative w-full gap-2"
        >
          {loading ? "Downloading" : "Download"}
          {!loading && <Download className="h-4 w-4" />}
          {loading && <Icons.spinner className="h-4 w-4 animate-spin" />}
        </Button>
      )}
    </>
  );
}
