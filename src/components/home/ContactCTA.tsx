"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <AnimatedSection direction="up" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-6">
            Ready to Take Control of Your Financial Future?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Schedule a free consultation with our experts today. Let us help you create a personalized roadmap for wealth creation and tax optimization.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 px-8 text-lg" asChild>
              <Link href="/book-consultation">
                Book Consultation Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 h-14 px-8 text-lg" asChild>
              <Link href="tel:+919876543210">
                <PhoneCall className="mr-2 w-5 h-5" /> Call Us Directly
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
