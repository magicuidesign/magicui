interface ComponentLayoutProps {
  children: React.ReactNode;
}

export default function ComponentLayout({ children }: ComponentLayoutProps) {
  return (
    <div className="container flex-1 items-start">
      {/* <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </ScrollArea>
        </aside> */}
      {children}
    </div>
  );
}
