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
  // const { data: session, status } = useSession();
  // const [paywall, setPaywall] = useState(true);
  // const { data, isLoading } = useSWR(
  //   status === "authenticated" && "/api/me",
  //   fetcher,
  // );

  // useEffect(() => {
  //   const shouldShowPaywall =
  //     status === "unauthenticated" ||
  //     (data?.user?.customer?.payments?.length === 0 &&
  //       data?.user?.role !== "ADMIN");
  //   setPaywall(shouldShowPaywall);
  // }, [status, data]);

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
      // const downloadUrl = data.downloadUrl;
      // /* window.open(downloadUrl, "_blank"); */
      // window.location.href = downloadUrl;
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
