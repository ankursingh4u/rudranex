import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { LegalPageSections, legalIntros } from "@/components/page-sections";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the general website terms that govern how Rudranex content, project discussions, and site information should be understood.",
};

const sections = [
  {
    title: "Use of this website",
    body: "The Rudranex website is intended to provide information about our company, services, and contact options. Content is offered for general business information and may evolve over time.",
  },
  {
    title: "Project discussions",
    body: "Any project scope, pricing, delivery commitments, or support expectations are defined separately through direct business communication and formal agreements where applicable.",
  },
  {
    title: "Intellectual property",
    body: "Website content, branding, and original materials presented by Rudranex remain our property unless otherwise stated. Client-specific rights and deliverables are governed by separate contractual terms.",
  },
  {
    title: "Contact",
    body: "For questions about working terms or website content, contact support@rudranex.com and our team will respond with the appropriate details.",
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LegalPageSections
          eyebrow="TERMS & CONDITIONS"
          title={<>Clear expectations for how this <span className="text-shimmer">site</span> is used.</>}
          body={legalIntros.termsIntro}
          sections={[...sections]}
        />
      </main>
      <Footer />
    </>
  );
}
