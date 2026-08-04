"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Calculator, Landmark, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Mutual Funds",
    href: "/mutual-funds",
    description: "Expert guidance on selecting and managing high-performing mutual funds tailored to your risk appetite.",
    icon: <LineChart className="w-10 h-10 text-primary" />,
  },
  {
    title: "Income Tax",
    href: "/income-tax",
    description: "Professional tax planning, advisory, and filing for individuals and corporations ensuring compliance.",
    icon: <Calculator className="w-10 h-10 text-primary" />,
  },
  {
    title: "Financial Planning",
    href: "/financial-planning",
    description: "Comprehensive strategies to secure your financial future, including retirement and child education planning.",
    icon: <Landmark className="w-10 h-10 text-primary" />,
  },
  {
    title: "Insurance",
    href: "/insurance",
    description: "Protect your assets and loved ones with tailored life, health, and general insurance plans.",
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Services</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive financial solutions designed to protect and grow your wealth across generations.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} direction="up" delay={index * 0.1}>
              <Link href={service.href} className="block group h-full">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card group-hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-4 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-6">
                      {service.description}
                    </CardDescription>
                    <div className="flex items-center text-primary font-medium group-hover:underline">
                      Learn more <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
