import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Award, Users, Target, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us",
  description: "Learn more about Shree Sai Services, your trusted partner in wealth management.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader 
        title="About Shree Sai Services" 
        description="Over 15 years of excellence in financial advisory and wealth management."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <AnimatedSection direction="up" className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p>
              At Shree Sai Services, our mission is to empower individuals and corporations to achieve absolute financial security through expert, unbiased, and customized advisory solutions. We believe that wealth creation is a journey, not a destination, and we are committed to walking that path with our clients.
            </p>
            <p>
              Founded with the vision to demystify complex financial structures, we have grown into a highly trusted advisory firm, managing significant portfolios and offering seamless tax solutions.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="bg-muted p-8 rounded-2xl h-full border border-border">
                <Target className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">To be the most trusted and preferred financial advisory partner in India, recognized for our integrity, expertise, and unwavering commitment to client success.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-muted p-8 rounded-2xl h-full border border-border">
                <ShieldCheck className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Core Values</h3>
                <p className="text-muted-foreground">Transparency, Integrity, Client-Centricity, and Continuous Innovation. We place your interests above all else.</p>
              </div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Dummy leaders */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm text-center group">
                  <div className="aspect-square bg-muted relative">
                     {/* Placeholder for actual portrait */}
                     <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <Users className="w-16 h-16 opacity-20" />
                     </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">Executive Name</h3>
                    <p className="text-primary font-medium mb-2">Partner & Founder</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      A certified financial planner with over 20 years of experience in the equity and mutual fund markets.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
