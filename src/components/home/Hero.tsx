"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ArrowRight, ShieldCheck, Award, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-36 lg:pb-40">
       {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <AnimatedSection direction="up" className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm font-medium mb-8 bg-muted/50 backdrop-blur-sm">
            <Award className="mr-2 h-4 w-4 text-secondary" />
            <span className="text-muted-foreground">Trusted by 500+ Corporations & Individuals</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            Secure Your Financial <span className="text-primary">Future</span> With Expert Advisory
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Premium mutual funds management, corporate tax planning, and strategic financial consulting tailored to your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/book-consultation">
                Book a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
              <Link href="/services">
                Explore Services
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-border pt-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm md:text-base">Certified Experts</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm md:text-base">Data-Driven Growth</span>
            </div>
            <div className="hidden md:flex items-center justify-center gap-2 text-muted-foreground">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm md:text-base">15+ Years Experience</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
