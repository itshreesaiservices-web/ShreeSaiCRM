import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using ClientBridge.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader 
        title="Terms & Conditions" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <AnimatedSection direction="up" className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the ClientBridge website and advisory services, you agree to comply with and be bound by these Terms and Conditions.
            </p>
            
            <h2>2. No Guarantee of Returns</h2>
            <p>
              Investments in mutual funds and equity markets are subject to market risks. ClientBridge does not guarantee any assured returns. Past performance of mutual funds is not an indicator of future results. Clients must read all scheme-related documents carefully before investing.
            </p>
            
            <h2>3. Advisory Nature of Services</h2>
            <p>
              Our tax planning and financial advisory services are based on the information provided by the client and current applicable laws. The final decision to act upon the advice rests solely with the client.
            </p>
            
            <h2>4. Limitation of Liability</h2>
            <p>
              ClientBridge shall not be held liable for any direct, indirect, or consequential loss arising from the use of our website or reliance on any information provided herein.
            </p>
            
            <h2>5. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
