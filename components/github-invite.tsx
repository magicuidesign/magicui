"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function GithubInvite({
  repo,
  owner,
  username,
}: {
  repo: string;
  owner: string;
  username: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/repo/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ repo, owner, username }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      toast.error("Error occured while downloading. Please try again.");
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleDownload}
        disabled={loading}
        className="not-prose group relative w-full gap-2"
      >
        {loading ? "Downloading" : "Download"}
        {!loading && <Download className="h-4 w-4" />}
        {loading && <Icons.spinner className="h-4 w-4 animate-spin" />}
      </Button>
    </>
  );
}
