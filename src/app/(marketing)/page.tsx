import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";
import { AdvertisingBanner } from "@/components/home/AdvertisingBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      <AdvertisingBanner />
      <WhyChooseUs />
      <ProcessTimeline />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
