import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const metadata = {
  title: "Privacy Policy",
  description: "Our commitment to protecting your privacy and financial data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader 
        title="Privacy Policy" 
        description="Effective Date: July 31, 2026"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <AnimatedSection direction="up" className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
            <h2>1. Introduction</h2>
            <p>
              ClientBridge ("we," "us," or "our") respects your privacy and is committed to protecting your personal and financial data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, PAN, Aadhaar, and other KYC documents required for financial services.</li>
              <li><strong>Financial Information:</strong> Bank account details, investment portfolios, income details, and tax records for providing our advisory and filing services.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and cookies used to improve website functionality.</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              Your data is strictly used for the following purposes:
            </p>
            <ul>
              <li>Providing customized financial planning, mutual fund advisory, and tax filing services.</li>
              <li>Complying with regulatory and legal obligations (SEBI, Income Tax Department).</li>
              <li>Communicating updates, newsletters, and appointment reminders.</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard encryption and secure server hosting to ensure your financial data is protected against unauthorized access, alteration, or destruction. We do not sell or rent your personal information to third parties.
            </p>
            
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact our Grievance Officer at privacy@shreesaiservices.com.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
