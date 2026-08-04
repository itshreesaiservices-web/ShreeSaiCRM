import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CheckCircle2, ShieldAlert, HeartPulse, Car } from "lucide-react";

export const metadata = {
  title: "Insurance Advisory Services",
  description: "Protect your family and assets with customized life, health, and general insurance solutions.",
};

export default function InsurancePage() {
  return (
    <>
      <PageHeader 
        title="Insurance Advisory" 
        description="Comprehensive risk management and insurance solutions to safeguard what matters most."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Insurance" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Comprehensive Protection</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Insurance is the foundation of any solid financial plan. We help you identify potential risks and recommend policies that provide maximum coverage at optimal premiums, ensuring you and your loved ones are protected against life's uncertainties.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Unbiased assessment of insurance needs",
                  "Comparison of top-tier providers",
                  "Assistance with claim settlements",
                  "Regular policy reviews and upgrades"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mr-3" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            
            <AnimatedSection direction="right" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-muted p-6 rounded-2xl border border-border">
                <ShieldAlert className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Life Insurance</h3>
                <p className="text-muted-foreground text-sm">Term life insurance to secure your family's financial independence in your absence.</p>
              </div>
              <div className="bg-muted p-6 rounded-2xl border border-border">
                <HeartPulse className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Health Insurance</h3>
                <p className="text-muted-foreground text-sm">Comprehensive medical cover to shield against skyrocketing healthcare costs.</p>
              </div>
              <div className="bg-muted p-6 rounded-2xl border border-border sm:col-span-2">
                <Car className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">General Insurance</h3>
                <p className="text-muted-foreground text-sm">Protection for your assets, including motor, home, and commercial property insurance.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
