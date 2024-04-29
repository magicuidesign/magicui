import { DealBanner } from "@/components/deal-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/session";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <>
      <DealBanner />
      {/* <SiteBanner /> */}
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />

      {/* Top Ellipse Gradient */}
      <div className="pointer-events-none absolute inset-0 h-screen bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,189,122,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.5),rgba(255,255,255,0))]" />
    </>
  );
}
