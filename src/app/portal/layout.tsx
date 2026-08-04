import { PortalSidebar } from "@/components/portal/Sidebar";
import { PortalTopbar } from "@/components/portal/Topbar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden md:block">
        <PortalSidebar />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <PortalTopbar />
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
