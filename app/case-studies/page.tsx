import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CaseStudiesPageSections, SharedInnerPageCta } from "@/components/page-sections";
import { contactDetails } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how Rudranex delivers measurable business outcomes through enterprise software, automation, modern portals, and performance-focused platforms.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CaseStudiesPageSections />
        <SharedInnerPageCta
          eyebrow="CONFIDENTIAL WORK"
          title={<>Need help with a project that cannot be shown <span className="text-shimmer">publicly</span>?</>}
          body="A lot of meaningful work happens behind confidentiality constraints. Rudranex can still help you think through the system, delivery path, and outcome shape with the right level of discretion."
          primaryLabel="Discuss a confidential scope"
          primaryHref="/contact"
          secondaryLabel="WhatsApp"
          secondaryHref={contactDetails.whatsappHref}
        />
      </main>
      <Footer />
    </>
  );
}
