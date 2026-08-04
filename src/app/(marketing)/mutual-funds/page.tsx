import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CheckCircle2, TrendingUp, ShieldCheck, Target } from "lucide-react";

export const metadata = {
  title: "Mutual Funds Investment Advisory",
  description: "Expert mutual fund investment strategies tailored to your financial goals.",
};

export default function MutualFundsPage() {
  return (
    <>
      <PageHeader 
        title="Mutual Funds" 
        description="Achieve your financial goals with data-driven mutual fund strategies."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Mutual Funds" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Why Invest in Mutual Funds?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Mutual funds offer a professionally managed, diversified portfolio that helps you build wealth over time. Whether you are looking for long-term growth, regular income, or tax savings (ELSS), our experts identify the right funds to match your risk profile and horizon.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Diversification across multiple asset classes",
                  "Professional fund management",
                  "High liquidity and flexibility",
                  "Tax-saving benefits via ELSS funds"
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
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Goal-Based Planning</h3>
                <p className="text-muted-foreground text-sm">Align your investments with life milestones like retirement or education.</p>
              </div>
              <div className="bg-muted p-6 rounded-2xl border border-border">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Portfolio Rebalancing</h3>
                <p className="text-muted-foreground text-sm">We continuously monitor and rebalance your portfolio for optimal returns.</p>
              </div>
              <div className="bg-muted p-6 rounded-2xl border border-border sm:col-span-2">
                <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Risk Management</h3>
                <p className="text-muted-foreground text-sm">Strict adherence to your risk tolerance, ensuring your capital is allocated wisely across Equity, Debt, and Hybrid funds.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
