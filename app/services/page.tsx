import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServicesPageSections, SharedInnerPageCta } from "@/components/page-sections";
import { contactDetails } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Rudranex software development services, from custom platforms and cloud delivery to AI automation, design systems, and dedicated engineering teams.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ServicesPageSections />
        <SharedInnerPageCta
          eyebrow="DISCUSS DELIVERY"
          title={<>Need a serious team for a <span className="text-shimmer">serious build</span>?</>}
          body="Rudranex supports software, platform, automation, and interface work where stronger delivery structure matters as much as the final output. If you already have scope context, start the conversation directly."
          primaryLabel="Request a discussion"
          primaryHref="/contact"
          secondaryLabel="WhatsApp Rudranex"
          secondaryHref={contactDetails.whatsappHref}
        />
      </main>
      <Footer />
    </>
  );
}
