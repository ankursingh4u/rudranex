import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SharedInnerPageCta } from "@/components/page-sections";
import { contactDetails, pricingFaq, pricingTiers } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for software development, IT consulting, business registration, digital marketing, and product roadmap services by Rudranex.",
};

const featureMatrix = [
  {
    category: "Delivery",
    rows: [
      { label: "Custom web application", scoped: true, platform: true, partner: true },
      { label: "Mobile application (iOS/Android)", scoped: false, platform: true, partner: true },
      { label: "CI/CD pipeline & DevOps", scoped: false, platform: true, partner: true },
      { label: "Cloud deployment & hosting setup", scoped: true, platform: true, partner: true },
    ],
  },
  {
    category: "Support & Communication",
    rows: [
      { label: "Post-launch support", scoped: "30 days", platform: "90 days", partner: "Ongoing" },
      { label: "Dedicated project lead", scoped: false, platform: true, partner: true },
      { label: "Priority response time", scoped: false, platform: true, partner: true },
      { label: "SLA-backed response", scoped: false, platform: false, partner: true },
    ],
  },
  {
    category: "Strategy & Consulting",
    rows: [
      { label: "Product roadmap creation", scoped: false, platform: true, partner: true },
      { label: "CTO-level technology strategy", scoped: false, platform: false, partner: true },
      { label: "IT consulting & architecture audits", scoped: false, platform: false, partner: true },
    ],
  },
  {
    category: "Business & Marketing",
    rows: [
      { label: "Business registration support (global)", scoped: false, platform: false, partner: true },
      { label: "Digital marketing & SEO", scoped: false, platform: false, partner: true },
      { label: "Go-to-market strategy", scoped: false, platform: false, partner: true },
    ],
  },
];

function MatrixCell({ value }: { value: boolean | string }) {
  if (value === false) {
    return (
      <td className="px-4 py-4 text-center">
        <span className="text-foam/25 text-lg" aria-label="Not included">—</span>
      </td>
    );
  }
  if (value === true) {
    return (
      <td className="px-4 py-4 text-center">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cobalt/20 text-cobalt text-xs font-bold" aria-label="Included">✓</span>
      </td>
    );
  }
  return (
    <td className="px-4 py-4 text-center">
      <span className="text-xs text-cobalt/80 font-medium">{value}</span>
    </td>
  );
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="page-hero pt-32 pb-20">
          <div className="page-hero-orbit pointer-events-none absolute inset-0" aria-hidden />
          <div className="site-container relative text-center">
            <Reveal>
              <p className="text-xs tracking-[0.3em] text-cobalt mb-5 uppercase">Pricing</p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
                Transparent pricing for <span className="text-shimmer">every stage</span>.
              </h1>
              <p className="mx-auto max-w-2xl text-foam/65 leading-relaxed text-lg">
                From a focused first product to a long-term technology partnership — every engagement is shaped around real scope and real outcomes.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pricing tier cards */}
        <section className="section-shell bg-ink">
          <div className="site-container">
            <div className="grid gap-6 lg:grid-cols-3">
              {pricingTiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 100}>
                  <div className={`relative rounded-[1.7rem] p-8 h-full flex flex-col ${tier.highlight ? "pricing-card-featured" : "pricing-card"}`}>
                    {tier.badge ? (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cobalt px-5 py-1.5 text-[10px] tracking-[0.2em] font-semibold uppercase text-foam shadow-[0_0_24px_rgba(37,99,235,0.55)] whitespace-nowrap">
                        {tier.badge}
                      </span>
                    ) : null}
                    <div>
                      <p className="text-[10px] tracking-[0.28em] uppercase text-foam/50 mb-3">{tier.name}</p>
                      <div className="font-display font-bold text-5xl text-foam mb-1">{tier.price}</div>
                      <p className="text-xs text-foam/40 mb-5 tracking-wide">{tier.period}</p>
                      <p className="text-sm text-foam/65 leading-relaxed mb-8">{tier.description}</p>
                    </div>
                    <ul className="space-y-3.5 text-sm text-foam/70 flex-1 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-3 items-start">
                          <span className="mt-0.5 text-cobalt font-bold leading-none flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={tier.ctaHref}
                      className={`${tier.highlight ? "button-primary" : "button-secondary"} justify-center text-center`}
                    >
                      {tier.cta} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Feature comparison matrix */}
        <section className="section-shell bg-graphite/20 border-y border-white/5">
          <div className="site-container">
            <Reveal className="mb-12">
              <SectionHeading
                eyebrow="COMPARISON"
                title={<>Everything included <span className="text-shimmer">at a glance</span>.</>}
                body="A detailed breakdown of what each engagement includes so you can choose the right fit without guessing."
              />
            </Reveal>
            <Reveal>
              <div className="overflow-x-auto rounded-[1.5rem] border border-white/8">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="px-6 py-5 text-left text-xs tracking-[0.22em] uppercase text-foam/40 font-normal w-1/2">Feature</th>
                      {pricingTiers.map((tier) => (
                        <th key={tier.name} className={`px-4 py-5 text-center text-xs tracking-[0.18em] uppercase font-semibold ${tier.highlight ? "text-cobalt" : "text-foam/60"}`}>
                          {tier.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureMatrix.map((group) => (
                      <>
                        <tr key={`${group.category}-header`} className="bg-white/[0.025]">
                          <td colSpan={4} className="px-6 py-3 text-[10px] tracking-[0.28em] uppercase text-cobalt/70">
                            {group.category}
                          </td>
                        </tr>
                        {group.rows.map((row) => (
                          <tr key={row.label} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 text-sm text-foam/70">{row.label}</td>
                            <MatrixCell value={row.scoped} />
                            <MatrixCell value={row.platform} />
                            <MatrixCell value={row.partner} />
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What is always included */}
        <section className="section-shell bg-ink">
          <div className="site-container">
            <Reveal className="mb-12">
              <SectionHeading
                eyebrow="ALWAYS INCLUDED"
                title={<>Every engagement comes with <span className="text-shimmer">this foundation</span>.</>}
                body="Regardless of tier, every Rudranex project starts with honesty, senior execution, and a structured delivery process."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                { number: "01", title: "Discovery session", body: "We align on business goals, constraints, and delivery priorities before architecture begins." },
                { number: "02", title: "Written scope document", body: "Every engagement is captured in writing so both sides know exactly what is being built and why." },
                { number: "03", title: "Regular progress updates", body: "You always know what is happening through structured check-ins and visible milestone tracking." },
                { number: "04", title: "Post-launch handover", body: "We document the system, hand over credentials, and leave things in a state your team can manage." },
              ].map((item, i) => (
                <Reveal key={item.number} delay={i * 80}>
                  <div className="surface-card rounded-2xl p-7 h-full">
                    <p className="text-xs tracking-[0.28em] text-cobalt mb-4">{item.number}</p>
                    <h3 className="font-display font-bold text-lg mb-3">{item.title}</h3>
                    <p className="text-sm text-foam/65 leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-shell bg-graphite/25 border-y border-white/5">
          <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <Reveal>
              <SectionHeading
                eyebrow="FAQ"
                align="left"
                title={<>Common <span className="text-shimmer">questions</span> answered.</>}
                body="If something is not covered here, reach out directly and we will give you a straight answer."
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="button-primary">Ask a question <span aria-hidden>→</span></Link>
                <a href={contactDetails.whatsappHref} className="button-secondary">WhatsApp us</a>
              </div>
            </Reveal>
            <div className="space-y-4">
              {pricingFaq.map((item, i) => (
                <Reveal key={item.question} delay={i * 70}>
                  <div className="story-panel rounded-2xl p-7">
                    <h3 className="font-display font-bold text-lg mb-3">{item.question}</h3>
                    <p className="text-sm text-foam/65 leading-relaxed">{item.answer}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <SharedInnerPageCta
          eyebrow="READY TO START?"
          title={<>Not sure which tier fits? <span className="text-shimmer">Talk to us first.</span></>}
          body="We always start with a free first conversation to understand the real need before recommending the wrong path. No commitment required."
          primaryLabel="Request a consultation"
          primaryHref="/contact"
          secondaryLabel="WhatsApp Rudranex"
          secondaryHref={contactDetails.whatsappHref}
        />
      </main>
      <Footer />
    </>
  );
}
