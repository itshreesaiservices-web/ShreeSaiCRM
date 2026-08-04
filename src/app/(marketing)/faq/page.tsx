import { PageHeader } from "@/components/shared/PageHeader";
import { FAQ as FAQSection } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about our financial advisory services.",
};

export default function FAQPage() {
  return (
    <>
      <PageHeader 
        title="Frequently Asked Questions" 
        description="Everything you need to know about our services, fees, and processes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" },
        ]}
      />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
