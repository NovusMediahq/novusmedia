import { Navigation } from "@/components/landing/navigation";
import { AboutSection } from "@/components/landing/about-section";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata = {
  title: "About Novus Media — Premium Motion Design for Tech",
  description:
    "Discover how Novus Media transforms complex tech products into clear, high-converting visuals using professional motion design workflows.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <AboutSection />
      <FooterSection />
    </main>
  );
}
