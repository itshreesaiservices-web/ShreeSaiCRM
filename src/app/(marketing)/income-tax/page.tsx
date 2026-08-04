import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CheckCircle2, FileText, Calculator, Landmark } from "lucide-react";

export const metadata = {
  title: "Income Tax Consulting & Filing",
  description: "Professional income tax planning, filing, and advisory for individuals and businesses.",
};

export default function IncomeTaxPage() {
  return (
    <>
      <PageHeader 
        title="Income Tax Consulting" 
        description="Navigate complex tax laws seamlessly with our expert advisory and filing services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Income Tax" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left" className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-muted p-6 rounded-2xl border border-border">
                <FileText className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">ITR Filing</h3>
                <p className="text-muted-foreground text-sm">Accurate and timely filing of Income Tax Returns for salaried individuals, freelancers, and businesses.</p>
              </div>
              <div className="bg-muted p-6 rounded-2xl border border-border">
                <Calculator className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Tax Planning</h3>
                <p className="text-muted-foreground text-sm">Strategic planning using 80C, 80D, and other sections to legally minimize your tax liability.</p>
              </div>
              <div className="bg-muted p-6 rounded-2xl border border-border sm:col-span-2">
                <Landmark className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Corporate Taxation</h3>
                <p className="text-muted-foreground text-sm">Comprehensive corporate tax advisory, GST filing, and compliance management for SMEs and large enterprises.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Expert Tax Solutions</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Taxes don't have to be taxing. Our certified consultants stay updated with the latest income tax regulations to ensure you remain fully compliant while maximizing your savings.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Maximize legal tax deductions",
                  "Error-free and timely ITR filing",
                  "Capital gains tax computation",
                  "Notice handling and assessments"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-3" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
