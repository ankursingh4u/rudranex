import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ContactPageSections, SharedInnerPageCta } from "@/components/page-sections";
import { contactDetails } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Rudranex about your software project, digital product, modernization roadmap, or dedicated engineering team requirements.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContactPageSections />
        <SharedInnerPageCta
          eyebrow="DIRECT ACCESS"
          title={<>Need the fastest path? Use <span className="text-shimmer">WhatsApp</span> or email.</>}
          body="If your need is time-sensitive or already clearly scoped, use the direct channel that feels fastest and Rudranex will respond within one business day."
          primaryLabel="Email Rudranex"
          primaryHref={`mailto:${contactDetails.email}`}
          secondaryLabel="WhatsApp Rudranex"
          secondaryHref={contactDetails.whatsappHref}
        />
      </main>
      <Footer />
    </>
  );
}
