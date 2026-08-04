import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Financial Planning Services",
  description: "Comprehensive financial planning and wealth management for a secure future.",
};

export default function FinancialPlanningPage() {
  return (
    <>
      <PageHeader 
        title="Financial Planning" 
        description="A structured roadmap to achieve your life's most important financial milestones."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Financial Planning" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Your Financial Future, Secured</h2>
            <p className="text-lg text-muted-foreground">
              Financial planning is more than just investing; it's about evaluating your current financial standing and creating a viable blueprint for your future.
            </p>
          </AnimatedSection>
          
          <div className="space-y-8">
            {[
              {
                title: "Retirement Planning",
                desc: "Build a robust corpus that guarantees a comfortable and independent lifestyle post-retirement, factoring in inflation and healthcare costs."
              },
              {
                title: "Child's Education & Marriage",
                desc: "Start early to combat the rising costs of higher education. We help you create dedicated portfolios for your children's future milestones."
              },
              {
                title: "Estate Planning",
                desc: "Ensure a smooth and tax-efficient transfer of your wealth to the next generation through wills and trusts setup advisory."
              }
            ].map((feature, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="bg-card border border-border p-8 rounded-2xl shadow-sm flex items-start gap-6">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
