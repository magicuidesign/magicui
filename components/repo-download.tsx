"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, Download } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface RepoDownloadProps {
  repo: string;
  owner: string;
  free?: boolean;
}

export default function RepoDownload({
  repo,
  owner,
  free = false,
}: RepoDownloadProps) {
  const [loading, setLoading] = useState(false);

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

  if (free) {
    return (
      <Button
        onClick={handleDownload}
        disabled={loading}
        className="not-prose group relative w-full gap-2"
      >
        {loading ? "Downloading" : "Free Download"}
        {!loading && <Download className="size-4" />}
        {loading && <Icons.spinner className="size-4 animate-spin" />}
      </Button>
    );
  }

  return (
    <Link
      href="https://pro.magicui.design/#pricing"
      target="_blank"
      className={cn(
        buttonVariants({
          variant: "default",
        }),
        "not-prose group relative w-full gap-1",
      )}
    >
      Buy Now
      <ArrowRightIcon className="size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}
