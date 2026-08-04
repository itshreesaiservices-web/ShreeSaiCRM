import { PageHeader } from "@/components/shared/PageHeader";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata = {
  title: "Our Services",
  description: "Comprehensive financial advisory, mutual funds management, and income tax consulting.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader 
        title="Our Services" 
        description="Premium financial solutions designed to protect and grow your wealth."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <ServicesOverview />
      <ContactCTA />
    </>
  );
}
