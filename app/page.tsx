import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { OurWorkSection } from "@/components/landing/our-work-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { SecuritySection } from "@/components/landing/security-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { IndustryStandardSection } from "@/components/landing/industry-standard-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <IndustryStandardSection />
      <OurWorkSection />
      <IntegrationsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
