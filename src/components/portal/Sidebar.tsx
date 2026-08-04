"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PieChart,
  FileSpreadsheet,
  FolderOpen,
  CalendarDays,
  MessageSquare,
  User,
  LogOut
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { logoutUser } from "@/app/actions/logout";

const portalLinks = [
  { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { name: "My Portfolio", href: "/portal/portfolio", icon: PieChart },
  { name: "Tax Returns", href: "/portal/tax", icon: FileSpreadsheet },
  { name: "Document Vault", href: "/portal/documents", icon: FolderOpen },
  { name: "Appointments", href: "/portal/appointments", icon: CalendarDays },
  { name: "Support", href: "/portal/support", icon: MessageSquare },
  { name: "My Profile", href: "/portal/profile", icon: User },
];

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card border-r border-border w-64 flex-shrink-0 transition-all duration-300">
      <div className="p-6">
        <Link href="/portal/dashboard" className="flex items-center gap-2">
           <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="font-bold text-primary-foreground">S</span>
           </div>
           <div>
             <span className="font-bold text-lg tracking-tight text-foreground block leading-tight">Shree Sai</span>
             <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Client Portal</span>
           </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {portalLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border mt-auto flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
        </div>
        <form action={logoutUser}>
          <button type="submit" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
