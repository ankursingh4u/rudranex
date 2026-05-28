import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import {
  About,
  CareersTeaser,
  ContactPanel,
  FeaturedCaseStudies,
  GlobalCapabilities,
  HomePricingSection,
  Industries,
  Process,
  StatsBanner,
  Technologies,
  Testimonials,
  TrustStrip,
  VideoShowcase,
  WhyChooseUs,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VideoShowcase />
        <TrustStrip />
        <StatsBanner />
        <About />
        <Services compact />
        <GlobalCapabilities />
        <WhyChooseUs />
        <Industries />
        <Process />
        <FeaturedCaseStudies />
        <Testimonials />
        <Technologies />
        <HomePricingSection />
        <CareersTeaser />
        <ContactPanel />
      </main>
      <Footer />
    </>
  );
}
