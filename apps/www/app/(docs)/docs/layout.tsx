import { DocsSidebarNav } from "@/components/sidebar-nav";
import { docsConfig } from "@/config/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </div>
        </aside>
        {children}
      </div>
    </div>
  );
}
