import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import GridPattern from "@/registry/components/magicui/grid-pattern";
import LinearGradient from "@/registry/components/magicui/linear-gradient";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col relative">
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />

      {/* Top Ellipse Gradient */}
      <div className="pointer-events-none h-screen absolute inset-0 dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />

      {/* Grid Pattern */}
      <GridPattern
        width={80}
        height={80}
        x={-1}
        y={-1}
        className={cn(
          "absolute w-screen h-screen inset-0 stroke-white/10 fill-white/10",
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] -z-50",
          "skew-y-12 inset-x-0 -top-[20rem] -z-50"
        )}
      />

      {/* Linear Gradient */}
      <LinearGradient
        className="w-screen h-screen"
        from="rgba(120,119,198,0.1)"
        to="rgba(0,0,0,0.0)"
        direction="bottom right"
      />
    </div>
  );
}
