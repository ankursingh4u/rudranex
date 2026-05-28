import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CareersPageSections, SharedInnerPageCta } from "@/components/page-sections";
import { contactDetails } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Rudranex to work on meaningful software, modern engineering systems, and high-ownership delivery for ambitious client products and platforms.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CareersPageSections />
        <SharedInnerPageCta
          eyebrow="JOIN THE WORK"
          title={<>If this way of working feels right, <span className="text-shimmer">reach out</span>.</>}
          body="Rudranex values people who like ownership, thoughtful building, and helping turn difficult technical work into dependable outcomes."
          primaryLabel="Email your introduction"
          primaryHref={`mailto:${contactDetails.email}`}
          secondaryLabel="WhatsApp"
          secondaryHref={contactDetails.whatsappHref}
        />
      </main>
      <Footer />
    </>
  );
}
