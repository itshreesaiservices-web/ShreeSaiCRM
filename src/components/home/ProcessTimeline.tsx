"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Discovery Call",
    description: "We understand your financial goals, risk appetite, and current portfolio.",
  },
  {
    title: "Strategy Formulation",
    description: "Our experts design a personalized roadmap for tax saving and wealth creation.",
  },
  {
    title: "Execution",
    description: "Seamlessly execute the investment or tax filing process with full compliance.",
  },
  {
    title: "Ongoing Monitoring",
    description: "Continuous portfolio tracking and strategic rebalancing as markets evolve.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Proven Process
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A structured, transparent approach to ensure you achieve your financial objectives with zero hassle.
          </p>
        </AnimatedSection>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -ml-[1px]"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <AnimatedSection key={index} direction={index % 2 === 0 ? "right" : "left"} delay={index * 0.1}>
                <div className={`relative flex items-center md:justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center -ml-4 shadow-[0_0_0_4px_var(--background)]">
                    <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
