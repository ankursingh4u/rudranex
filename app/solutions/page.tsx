import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SharedInnerPageCta, SolutionsPageSections } from "@/components/page-sections";
import { contactDetails } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Discover the industries and business challenges Rudranex supports with secure, scalable software systems built for execution, visibility, and growth.",
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <SolutionsPageSections />
        <SharedInnerPageCta
          eyebrow="MAP THE PROBLEM"
          title={<>If the systems are getting heavier, the answer should feel <span className="text-shimmer">clearer</span>.</>}
          body="Rudranex helps businesses understand whether the real issue is architecture, workflow, product direction, or operational complexity — and what kind of build solves it best."
          primaryLabel="Use the inquiry builder"
          primaryHref="/contact"
          secondaryLabel="WhatsApp"
          secondaryHref={contactDetails.whatsappHref}
        />
      </main>
      <Footer />
    </>
  );
}
