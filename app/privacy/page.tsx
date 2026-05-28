import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { LegalPageSections, legalIntros } from "@/components/page-sections";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Rudranex privacy policy for a general overview of how business inquiry information is handled and communicated.",
};

const sections = [
  {
    title: "Information we collect",
    body: "We may collect the information you choose to share with us through project inquiries, business conversations, and communication channels related to potential or active engagements.",
  },
  {
    title: "How we use information",
    body: "We use shared information to respond to inquiries, evaluate project fit, communicate about our services, and support active client relationships in a professional and secure manner.",
  },
  {
    title: "Data handling",
    body: "Rudranex aims to handle business information responsibly and limit access to the people directly involved in communication, delivery, or support. Sensitive client details should be shared through appropriate channels during formal engagement.",
  },
  {
    title: "Contact",
    body: "If you have questions about how Rudranex handles information, contact us at support@rudranex.com and our team will guide you further.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LegalPageSections
          eyebrow="PRIVACY POLICY"
          title={<>Your information, handled with <span className="text-shimmer">care</span>.</>}
          body={legalIntros.privacyIntro}
          sections={[...sections]}
        />
      </main>
      <Footer />
    </>
  );
}
