"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Landmark, Calculator, LineChart, ShieldCheck } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const services = [
  {
    title: "Mutual Funds",
    href: "/mutual-funds",
    description: "Expert guidance on selecting and managing high-performing mutual funds.",
    icon: <LineChart className="w-5 h-5 text-secondary" />,
  },
  {
    title: "Income Tax",
    href: "/income-tax",
    description: "Professional tax planning and filing for individuals and corporations.",
    icon: <Calculator className="w-5 h-5 text-secondary" />,
  },
  {
    title: "Financial Planning",
    href: "/financial-planning",
    description: "Comprehensive strategies to secure your financial future.",
    icon: <Landmark className="w-5 h-5 text-secondary" />,
  },
  {
    title: "Insurance",
    href: "/insurance",
    description: "Protect your assets and loved ones with tailored insurance plans.",
    icon: <ShieldCheck className="w-5 h-5 text-secondary" />,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col">
      <div className="w-full bg-primary text-primary-foreground py-1.5 text-center text-xs font-medium tracking-wide">
        Powered by <a href="https://knowflow.co.in" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white transition-colors font-bold">CodeMarket</a> - Premium IT Services
      </div>
      <div className="container mx-auto px-4 lg:px-8 flex h-16 md:h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Landmark className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="inline-block font-bold text-xl tracking-tight text-foreground">
              ClientBridge
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/" />} active={pathname === "/"} className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/about" />} active={pathname === "/about"} className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {services.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink render={<Link href={service.href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" />}>
                            <div className="flex items-center gap-2 text-sm font-medium leading-none mb-2">
                              {service.icon}
                              <span>{service.title}</span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink render={<Link href="/contact" />} active={pathname === "/contact"} className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA & Theme */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild variant="ghost" className="hidden lg:flex hover:bg-accent">
            <Link href="/login">Client Login</Link>
          </Button>
          <Button asChild variant="outline" className="hidden lg:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/book-consultation">Book Consultation</Link>
          </Button>
        </div>

        {/* Mobile Nav Drawer */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={
              <Button variant="ghost" size="icon" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" />
            }>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <Landmark className="text-primary-foreground w-5 h-5" />
                  </div>
                  <span className="font-bold text-lg">ClientBridge</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                  <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>About</Link>
                  <div className="flex flex-col gap-3 py-2">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Services</h4>
                    {services.map((service) => (
                      <Link
                        key={service.title}
                        href={service.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors pl-4 border-l-2 border-border hover:border-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                  <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
                </nav>
                <div className="flex flex-col gap-4 mt-6">
                  <Button asChild variant="ghost" className="w-full justify-center" onClick={() => setIsOpen(false)}>
                    <Link href="/login">Client Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setIsOpen(false)}>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button asChild className="w-full justify-center bg-primary text-primary-foreground" onClick={() => setIsOpen(false)}>
                    <Link href="/book-consultation">Book Consultation</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
