import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen w-full">{children}</main>
      <SiteFooter />
    </>
  );
}
