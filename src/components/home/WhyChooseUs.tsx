"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const features = [
  "SEBI Registered Investment Advisors",
  "Tailored Tax Planning Strategies",
  "Transparent Fee Structure",
  "Dedicated Relationship Manager",
  "Data-Driven Market Insights",
  "Holistic Wealth Management",
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border">
              {/* Fallback pattern since we don't have images yet */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center bg-muted">
                 <div className="text-muted-foreground font-medium text-lg">Financial Consultation</div>
              </div>
              {/* Optional overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur border border-border p-6 rounded-2xl shadow-lg">
                <p className="text-xl font-bold text-foreground mb-2">"Our priority is your financial peace of mind."</p>
                <p className="text-sm text-muted-foreground">— Founder, ClientBridge</p>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="right">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Why Partner With ClientBridge?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We go beyond traditional advisory. By combining deep market expertise with personalized strategies, we ensure your financial portfolio is robust, tax-efficient, and aligned with your life goals.
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-3" />
                  <span className="text-foreground font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
