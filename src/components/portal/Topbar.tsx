import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { logoutUser } from "@/app/actions/logout";

export async function PortalTopbar() {
  const session = await getSession() as any;
  
  let name = "Client";
  let email = "client@example.com";
  
  if (session?.userId) {
    const user: any = await prisma.user.findUnique({
      where: { id: session.userId as string },
      include: { clientProfile: true }
    });
    if (user) {
      name = user.clientProfile?.firstName 
        ? `${user.clientProfile.firstName} ${user.clientProfile.lastName || ""}`.trim()
        : user.name;
      email = user.email;
    }
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0 transition-all duration-300">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <Link href="/portal/support">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card"></span>
          </Button>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-8 w-8 rounded-full ml-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center justify-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={logoutUser} className="w-full">
              <DropdownMenuItem render={<button type="submit" className="w-full text-left text-destructive cursor-pointer" />}>
                Log out
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
