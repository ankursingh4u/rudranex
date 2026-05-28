import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import {
  AboutPageSections,
  SharedInnerPageCta,
  TechnologiesGridSection,
} from "@/components/page-sections";
import { contactDetails } from "@/components/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Rudranex partners with ambitious businesses to deliver enterprise software, cloud systems, and scalable digital products with clarity and ownership.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutPageSections />
        <TechnologiesGridSection />
        <SharedInnerPageCta
          eyebrow="START A CONVERSATION"
          title={<>Need a partner who brings <span className="text-shimmer">clarity</span> early?</>}
          body="If your business is dealing with product ambiguity, scattered systems, or a high-stakes technical decision, Rudranex can help shape the right next move."
          primaryLabel="Start with the inquiry builder"
          primaryHref="/contact"
          secondaryLabel="WhatsApp"
          secondaryHref={contactDetails.whatsappHref}
        />
      </main>
      <Footer />
    </>
  );
}
