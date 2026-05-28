"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";

import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import {
  aboutPageContent,
  caseStudiesPageContent,
  careersPageContent,
  contactDetails,
  contactPageContent,
  legalPageContent,
  serviceIcon,
  servicesPageContent,
  solutionsPageContent,
  techGroups,
} from "./site-content";

function MediaPanel({
  src,
  alt,
  badge,
  stat,
  compact = false,
}: {
  src: string;
  alt: string;
  badge?: string;
  stat?: string;
  compact?: boolean;
}) {
  return (
    <div className={`media-panel ${compact ? "media-panel-compact" : ""} rounded-[1.8rem] p-3`}>
      <div className="media-panel-inner relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-ink/80">
        <div className="media-panel-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className={`${compact ? "aspect-[16/10]" : "aspect-[5/4]"} relative`}>
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 30rem, 100vw" className="object-contain p-4" unoptimized />
        </div>
        {(badge || stat) ? (
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3">
            {badge ? <span className="media-chip">{badge}</span> : <span />}
            {stat ? <span className="media-chip media-chip-strong">{stat}</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FounderNote() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 flex flex-col"
      style={{
        background:
          "linear-gradient(155deg, rgba(37,99,235,0.13) 0%, rgba(26,31,43,0.97) 45%, rgba(124,58,237,0.09) 100%)",
      }}
    >
      {/* Photo header */}
      <div className="relative overflow-hidden" style={{ height: "160px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
          alt="Jatin Prajapati — Founder & CEO, Rudranex"
          className="w-full h-full object-cover object-top"
        />
        {/* Bottom gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,1,23,0.1) 0%, rgba(0,1,23,0.0) 35%, rgba(26,31,43,0.98) 100%)",
          }}
        />
        {/* Cobalt tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, transparent 60%)",
          }}
        />
        {/* Name badge pinned to bottom */}
        <div className="absolute bottom-3 left-4">
          <p className="font-display font-bold text-base sm:text-lg text-foam leading-tight">
            Jatin Prajapati
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.22em] text-cobalt uppercase mt-0.5">
            Founder &amp; CEO · Rudranex
          </p>
        </div>
        {/* Verified badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-cobalt/40 bg-ink/70 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-cobalt text-xs">✦</span>
          <span className="text-[10px] tracking-[0.18em] text-foam/70 uppercase">Founder</span>
        </div>
      </div>

      {/* Quote body */}
      <div className="p-5 sm:p-6 flex-1">
        {/* Decorative opening quote */}
        <div
          className="font-serif leading-none mb-2 select-none text-4xl sm:text-5xl"
          style={{ color: "rgba(37,99,235,0.35)", lineHeight: 1 }}
          aria-hidden
        >
          &ldquo;
        </div>

        <blockquote className="text-xs sm:text-sm leading-relaxed text-foam/85 italic mb-4 line-clamp-4 sm:line-clamp-none">
          {aboutPageContent.founder.quote}
        </blockquote>

        <p className="hidden sm:block text-xs text-foam/50 leading-relaxed line-clamp-3">
          {aboutPageContent.founder.body}
        </p>
      </div>

      {/* Bottom gradient accent bar */}
      <div
        className="mx-5 mb-5 h-px rounded-full"
        style={{
          background:
            "linear-gradient(to right, #2563eb, #7c3aed 50%, transparent)",
        }}
      />

      {/* CTA row */}
      <div className="px-5 pb-5 flex items-center justify-between">
        <p className="text-[10px] tracking-[0.22em] uppercase text-foam/40">
          {aboutPageContent.founder.label}
        </p>
        <a
          href="https://wa.me/917725971086"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.18em] uppercase text-cobalt hover:text-foam transition-colors"
        >
          Say hello →
        </a>
      </div>
    </div>
  );
}

function ProofStrip({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: React.ReactNode;
  items: ReadonlyArray<{ label: string; value: string }>;
}) {
  return (
    <section className="section-shell bg-graphite/25 border-y border-white/5">
      <div className="site-container">
        <Reveal className="mb-10">
          <SectionHeading eyebrow={eyebrow} title={title} body="A clearer picture of how Rudranex approaches important software work." />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
              <div className="proof-pill rounded-2xl p-6 h-full">
                <p className="text-xs uppercase tracking-[0.24em] text-foam/45 mb-4">{item.label}</p>
                <p className="font-display text-2xl font-bold text-foam">{item.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySplitSection({
  eyebrow,
  title,
  body,
  points,
  media,
  mediaAlt,
  accent,
  stat,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  points: readonly string[];
  media: string;
  mediaAlt: string;
  accent?: React.ReactNode;
  stat?: string;
}) {
  return (
    <section className="section-shell bg-ink">
      <div className="site-container story-split story-split-featured">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} align="left" title={title} body={body} />
          <div className="mt-8 story-panel story-panel-accent rounded-[1.75rem] p-7 sm:p-8">
            {accent ? <div className="mb-6">{accent}</div> : null}
            <ul className="space-y-4 text-sm leading-relaxed text-foam/68">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 text-cobalt">●</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <MediaPanel src={media} alt={mediaAlt} badge={eyebrow} stat={stat} />
        </Reveal>
      </div>
    </section>
  );
}

function TimelineSection({
  eyebrow,
  title,
  body,
  steps,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  steps: ReadonlyArray<{ title: string; body: string }>;
}) {
  return (
    <section className="section-shell bg-graphite/20 border-y border-white/5">
      <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} align="left" title={title} body={body} />
        </Reveal>
        <div className="timeline-rail space-y-6">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="timeline-node story-panel rounded-[1.6rem] p-6 sm:p-7">
                <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-3">0{i + 1}</p>
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-foam/68 leading-relaxed">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityRows() {
  return (
    <section className="section-shell bg-ink">
      <div className="site-container space-y-6">
        {servicesPageContent.capabilities.map((item, i) => (
          <Reveal key={item.title} delay={i * 70}>
            <article className="story-panel story-panel-accent rounded-[1.8rem] p-5 sm:p-7 capability-row">
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cobalt mb-4">{item.eyebrow}</p>
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cobalt/25 bg-cobalt/12 text-cobalt">
                    {serviceIcon(i)}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm uppercase tracking-[0.22em] text-foam/48">{item.signal}</p>
                </div>
                <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                  <div className="grid gap-6">
                    <MediaPanel src={item.media} alt={item.mediaAlt} badge={item.eyebrow} stat="Rudranex capability" compact />
                    <div>
                      <p className="text-sm leading-relaxed text-foam/70 mb-4">{item.body}</p>
                      <p className="text-sm leading-relaxed text-foam/88">{item.outcome}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/8 h-full flex flex-col">
                    <div
                      className="relative h-28 flex-shrink-0"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=70')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,1,23,0.4), rgba(0,1,23,0.85))" }} />
                      <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.24em] text-cobalt font-semibold">What this includes</p>
                    </div>
                    <div className="p-5 bg-white/[0.03] flex-1">
                      <ul className="space-y-3 text-sm text-foam/66">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cobalt/70 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function EngagementChooser() {
  return (
    <section className="section-shell bg-graphite/25 border-y border-white/5">
      <div className="site-container">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="ENGAGEMENT PATHS"
            title={<>Choose the kind of <span className="text-shimmer">partnership</span> the work actually needs.</>}
            body="Different initiatives need different levels of structure, continuity, and strategic involvement. We design the delivery shape around that reality."
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {servicesPageContent.engagementPaths.map((path, i) => (
            <Reveal key={path.title} delay={i * 90}>
              <div className="decision-card rounded-[1.6rem] p-7 h-full">
                <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-4">0{i + 1}</p>
                <h3 className="font-display text-2xl font-bold mb-4">{path.title}</h3>
                <p className="text-sm text-foam/68 leading-relaxed mb-5">{path.body}</p>
                <p className="text-sm text-foam/82">{path.fit}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section-shell bg-ink border-t border-white/5">
      <div className="site-container grid gap-8 xl:grid-cols-[0.8fr_1.2fr] items-start">
        <Reveal>
          <SectionHeading
            eyebrow={servicesPageContent.pricing.eyebrow}
            align="left"
            title={<>Pricing guidance with <span className="text-shimmer">real context</span>.</>}
            body={servicesPageContent.pricing.body}
          />
          <div className="mt-8 story-panel rounded-[1.7rem] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-foam/45 mb-4">What affects the range</p>
            <ul className="space-y-3 text-sm text-foam/68">
              {servicesPageContent.pricing.factors.map((factor) => (
                <li key={factor} className="flex gap-3"><span className="text-cobalt">●</span><span>{factor}</span></li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {servicesPageContent.pricing.bands.map((band, i) => (
            <Reveal key={band.name} delay={i * 80}>
              <div className="pricing-card rounded-[1.7rem] p-7 h-full">
                <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-3">{band.name}</p>
                <p className="font-display text-3xl font-bold mb-4">{band.range}</p>
                <p className="text-sm text-foam/68 leading-relaxed">{band.fit}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContextPanels() {
  return (
    <section className="section-shell bg-ink">
      <div className="site-container">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="OPERATING CONTEXT"
            title={<>Digital work behaves differently in <span className="text-shimmer">high-friction</span> environments.</>}
            body="Rudranex is most useful when the work is meaningful, the systems are becoming harder to manage, and the next decision matters more than just adding another feature."
          />
        </Reveal>
        <div className="story-grid-alt gap-6">
          {solutionsPageContent.contexts.map((context, i) => (
            <Reveal key={context.title} delay={i * 90}>
              <div className="story-panel rounded-[1.7rem] p-7 h-full">
                <h3 className="font-display text-2xl font-bold mb-4">{context.title}</h3>
                <p className="text-sm leading-relaxed text-foam/68">{context.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScenarioMatrix() {
  return (
    <section className="section-shell bg-graphite/25 border-y border-white/5">
      <div className="site-container grid gap-6 lg:grid-cols-2">
        {solutionsPageContent.matrix.map((item, i) => (
          <Reveal key={item.issue} delay={i * 70}>
            <div className="story-panel story-panel-accent rounded-[1.7rem] p-7 h-full">
              <p className="text-xs uppercase tracking-[0.24em] text-foam/45 mb-4">If the issue is</p>
              <h3 className="font-display text-2xl font-bold mb-4">{item.issue}</h3>
              <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-3">We usually solve it with</p>
              <p className="text-sm text-foam/72 leading-relaxed">{item.solveWith}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SolutionScenarios() {
  return (
    <section className="section-shell bg-ink">
      <div className="site-container space-y-6">
        {solutionsPageContent.scenarios.map((scenario, i) => (
          <Reveal key={scenario.title} delay={i * 70}>
            <div className="story-panel rounded-[1.8rem] p-7 sm:p-8 solution-scenario">
              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <MediaPanel src={scenario.media} alt={scenario.mediaAlt} badge={`Scenario ${i + 1}`} stat={scenario.title} compact />
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-4">SOLUTION SCENARIO {i + 1}</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mb-6">{scenario.title}</h3>
                  <div className="grid gap-5 lg:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-foam/45 mb-3">Challenge</p>
                      <p className="text-sm text-foam/68 leading-relaxed">{scenario.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-3">Rudranex response</p>
                      <p className="text-sm text-foam/82 leading-relaxed">{scenario.response}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CaseStudySpotlight() {
  const spotlight = caseStudiesPageContent.spotlight;

  return (
    <section className="section-shell bg-ink">
      <div className="site-container story-split story-split-featured">
        <Reveal>
          <div className="story-panel story-panel-accent rounded-2xl p-5 sm:p-7 lg:p-8 h-full">
            <p className="text-xs uppercase tracking-[0.28em] text-cobalt mb-3">{spotlight.label}</p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-4">{spotlight.title}</h2>
            <p className="hidden sm:block text-sm text-foam/72 leading-relaxed">{spotlight.body}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid gap-4">
            <MediaPanel src={spotlight.media} alt={spotlight.mediaAlt} badge="Confidential program" stat="Enterprise transformation" compact />
            <div className="story-panel rounded-2xl p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-foam/45 mb-4">Transformation signal</p>
              <ul className="space-y-3 text-sm text-foam/74 leading-relaxed">
                {spotlight.impact.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 text-cobalt flex-shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudyStories() {
  return (
    <section className="section-shell bg-graphite/25 border-y border-white/5">
      <div className="site-container grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {caseStudiesPageContent.studies.map((study, i) => (
          <Reveal key={study.title} delay={i * 80}>
            <article className="story-panel rounded-2xl p-3 sm:p-4 h-full">
              <MediaPanel src={study.media} alt={study.mediaAlt} badge={`Program ${i + 1}`} stat={study.title} compact />
              <div className="p-2 sm:p-3">
                <h3 className="font-display text-base sm:text-lg font-bold mb-2">{study.title}</h3>
                <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-foam/68">
                  <p className="line-clamp-2"><span className="text-foam">Challenge:</span> {study.challenge}</p>
                  <p className="line-clamp-2 hidden sm:block"><span className="text-foam">Approach:</span> {study.approach}</p>
                  <p className="line-clamp-2"><span className="text-foam">Result:</span> {study.result}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="site-container mt-12">
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-foam/55">
          {caseStudiesPageContent.outcomeBands.map((item) => (
            <span key={item} className="proof-pill rounded-full px-4 py-3">{item}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ThrivePanels() {
  return (
    <section className="section-shell bg-graphite/25 border-y border-white/5">
      <div className="site-container">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="WHO THRIVES HERE"
            title={<>The people who do well here usually value <span className="text-shimmer">judgment</span> as much as skill.</>}
            body="Rudranex works best for people who want meaningful responsibility, thoughtful collaboration, and a stronger standard for what gets shipped."
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {careersPageContent.thriveProfiles.map((profile, i) => (
            <Reveal key={profile.title} delay={i * 80}>
              <div className="story-panel rounded-[1.7rem] p-7 h-full">
                <h3 className="font-display text-2xl font-bold mb-4">{profile.title}</h3>
                <p className="text-sm leading-relaxed text-foam/68">{profile.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactDecisionBlock() {
  return (
    <section className="section-shell bg-ink">
      <div className="site-container grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <Reveal>
          <div className="story-panel story-panel-accent rounded-[2rem] p-8 sm:p-10 h-full">
            <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-4">WHAT TO REACH OUT ABOUT</p>
            <div className="grid gap-4">
              {contactPageContent.paths.map((path) => (
                <div key={path.title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <h3 className="font-display text-xl font-bold mb-2">{path.title}</h3>
                  <p className="text-sm text-foam/68 leading-relaxed">{path.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="grid gap-6">
            <div className="story-panel rounded-[2rem] p-8 sm:p-10">
              <h3 className="font-display text-2xl font-bold mb-5">Direct channels</h3>
              <div className="space-y-4 text-sm text-foam/70 leading-relaxed">
                <p><span className="text-foam">Email:</span> {contactDetails.email}</p>
                <p><span className="text-foam">Phone:</span> {contactDetails.phoneLabel}</p>
                <p><span className="text-foam">Location:</span> {contactDetails.location}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={`mailto:${contactDetails.email}`} className="button-primary">Email us <span aria-hidden>→</span></a>
                <a href={contactDetails.whatsappHref} className="button-secondary">WhatsApp us</a>
              </div>
            </div>
            <div className="story-panel rounded-[2rem] p-8 sm:p-10">
              <h3 className="font-display text-2xl font-bold mb-5">What happens next</h3>
              <ul className="space-y-3 text-sm text-foam/68 leading-relaxed mb-6">
                {contactPageContent.nextSteps.map((step) => (
                  <li key={step}>• {step}</li>
                ))}
              </ul>
              <p className="text-sm text-foam/82 italic">"{contactPageContent.founderNote}"</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactInquiryBuilder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<(typeof contactPageContent.form.projectTypes)[number]>(
    contactPageContent.form.projectTypes[0],
  );
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(
      [
        `Hello Rudranex,`,
        `I want to discuss: ${projectType}`,
        name ? `Name: ${name}` : "",
        email ? `Email: ${email}` : "",
        company ? `Company: ${company}` : "",
        timeline ? `Timeline: ${timeline}` : "",
        budget ? `Budget context: ${budget}` : "",
        details ? `Details: ${details}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    return `${contactDetails.whatsappHref}?text=${text}`;
  }, [budget, company, details, email, name, projectType, timeline]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, projectType, timeline, budget, details }),
    })
      .then((res) => {
        if (res.ok) {
          setSubmitted(true);
        } else {
          setError("Could not send the message. Please email us directly at support@rudranex.com");
        }
      })
      .catch(() => setError("Network error. Please email us directly at support@rudranex.com"))
      .finally(() => setSubmitting(false));
  }

  return (
    <section className="section-shell bg-graphite/25 border-y border-white/5">
      <div className="site-container grid gap-6 xl:grid-cols-[1.15fr_0.85fr] items-start">
        <Reveal>
          {submitted ? (
            <div className="story-panel story-panel-accent rounded-[2rem] p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full border border-cobalt/40 bg-cobalt/15 flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-cobalt">
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">Message sent.</h2>
              <p className="text-foam/70 leading-relaxed mb-8 max-w-md mx-auto">
                We have received your inquiry and will respond within one business day. In the meantime, feel free to reach out via WhatsApp for faster response.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={contactDetails.whatsappHref} className="button-secondary">WhatsApp us</a>
                <button type="button" onClick={() => { setSubmitted(false); setName(""); setEmail(""); setCompany(""); setTimeline(""); setBudget(""); setDetails(""); }} className="text-sm text-foam/50 hover:text-foam transition-colors">
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="story-panel story-panel-accent rounded-[2rem] p-8 sm:p-10 inquiry-form-shell">
              <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-4">SEND A MESSAGE</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Write your message and send it directly.</h2>
              <p className="text-sm text-foam/70 leading-relaxed mb-8">Fill in the details below and hit send — your message arrives directly at Rudranex without needing to open your email client.</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-field">
                  <span>Name</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
                </label>
                <label className="form-field">
                  <span>Email address</span>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" required />
                </label>
                <label className="form-field">
                  <span>Company</span>
                  <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company or brand" />
                </label>
                <label className="form-field">
                  <span>Project type</span>
                  <select
                    value={projectType}
                    onChange={(event) =>
                      setProjectType(event.target.value as (typeof contactPageContent.form.projectTypes)[number])
                    }
                  >
                    {contactPageContent.form.projectTypes.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="form-field">
                  <span>Timeline</span>
                  <input value={timeline} onChange={(event) => setTimeline(event.target.value)} placeholder="For example: 4–8 weeks" />
                </label>
                <label className="form-field">
                  <span>Budget context</span>
                  <input value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Optional budget or range" />
                </label>
                <label className="form-field sm:col-span-2">
                  <span>Your message</span>
                  <textarea value={details} onChange={(event) => setDetails(event.target.value)} placeholder="What are you building, fixing, or trying to improve? The more context you share, the better our first response will be." rows={6} required />
                </label>
              </div>
              {error ? (
                <p className="mt-4 text-sm text-red-400/80">{error}</p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-4">
                <button type="submit" disabled={submitting} className="button-primary disabled:opacity-60">
                  {submitting ? "Sending…" : "Send message"} {!submitting && <span aria-hidden>→</span>}
                </button>
                <a href={whatsappHref} className="button-secondary">Send via WhatsApp</a>
              </div>
            </form>
          )}
        </Reveal>
        <Reveal delay={100}>
          <div className="grid gap-6">
            <div className="story-panel rounded-[2rem] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-4">WHAT TO INCLUDE</p>
              <ul className="space-y-4 text-sm text-foam/68 leading-relaxed">
                {contactPageContent.checklist.map((item) => (
                  <li key={item} className="flex gap-3"><span className="text-cobalt">●</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="story-panel rounded-[2rem] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-4">BUDGET CLARITY</p>
              <h3 className="font-display text-2xl font-bold mb-5">{contactPageContent.pricing.title}</h3>
              <p className="text-sm text-foam/68 leading-relaxed mb-6">{contactPageContent.pricing.body}</p>
              <div className="grid gap-4">
                {contactPageContent.pricing.bands.map((band) => (
                  <div key={band.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <p className="text-sm uppercase tracking-[0.18em] text-foam/50">{band.label}</p>
                      <p className="font-display text-xl text-foam">{band.value}</p>
                    </div>
                    <p className="text-sm text-foam/68 leading-relaxed">{band.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutPageSections() {
  return (
    <>
      <PageHero
        eyebrow={aboutPageContent.hero.eyebrow}
        title={<>A technology partner for teams building the <span className="text-shimmer">next era.</span></>}
        body={aboutPageContent.hero.body}
        highlights={aboutPageContent.hero.highlights}
        actions={
          <>
            <Link href="/case-studies" className="button-primary">See confidential work stories <span aria-hidden>→</span></Link>
            <a href={contactDetails.whatsappHref} className="button-secondary">WhatsApp Rudranex</a>
          </>
        }
        variant="split"
        media={{ src: aboutPageContent.hero.media, alt: aboutPageContent.hero.mediaAlt }}
        aside={<FounderNote />}
      />
      <ProofStrip
        eyebrow="AT A GLANCE"
        title={<>Built for <span className="text-shimmer">high-trust</span> delivery.</>}
        items={aboutPageContent.proof}
      />
      {aboutPageContent.story.map((section) => (
        <StorySplitSection
          key={section.title}
          eyebrow={section.eyebrow}
          title={section.title}
          body={section.body}
          points={section.points}
          media={section.media}
          mediaAlt={section.mediaAlt}
          stat={section.stat}
          accent={<div className="font-display text-5xl text-shimmer">RDX</div>}
        />
      ))}
      <TimelineSection
        eyebrow="DELIVERY PHILOSOPHY"
        title={<>A company story shaped around <span className="text-shimmer">clarity</span>, not chaos.</>}
        body="The way Rudranex operates is as important as what it builds. The delivery model is designed to reduce confusion, improve judgment, and create systems that remain useful after the first release."
        steps={aboutPageContent.journey}
      />
    </>
  );
}

export function ServicesPageSections() {
  return (
    <>
      <PageHero
        eyebrow={servicesPageContent.hero.eyebrow}
        title={<>Enterprise software delivery with more <span className="text-shimmer">depth</span> than noise.</>}
        body={servicesPageContent.hero.body}
        highlights={servicesPageContent.hero.highlights}
        actions={
          <>
            <Link href="/case-studies" className="button-primary">View anonymized work <span aria-hidden>→</span></Link>
            <a href={contactDetails.whatsappHref} className="button-secondary">Discuss on WhatsApp</a>
          </>
        }
        variant="spotlight"
        media={{ src: servicesPageContent.hero.media, alt: servicesPageContent.hero.mediaAlt }}
      />
      <CapabilityRows />
      <EngagementChooser />
      <PricingSection />
      <TimelineSection
        eyebrow="DELIVERY MOTION"
        title={<>From scope clarity to <span className="text-shimmer">launch confidence</span>.</>}
        body="We use a structured but practical delivery model that helps teams make good decisions early and keep momentum once execution begins."
        steps={[
          {
            title: "Define the real objective",
            body: "We map the business outcome, current friction, and delivery constraint before recommending the wrong kind of build.",
          },
          {
            title: "Shape the architecture and execution path",
            body: "We connect product direction, technical design, and delivery milestones so the path is clear before momentum increases.",
          },
          {
            title: "Build with visibility",
            body: "The work stays structured, reviewable, and aligned to outcomes instead of drifting into disconnected implementation.",
          },
          {
            title: "Leave behind something dependable",
            body: "The final system is designed to keep working for your team rather than becoming another fragile layer to manage.",
          },
        ]}
      />
    </>
  );
}

export function SolutionsPageSections() {
  return (
    <>
      <PageHero
        eyebrow={solutionsPageContent.hero.eyebrow}
        title={<>Built for industries and systems where <span className="text-shimmer">execution</span> cannot be casual.</>}
        body={solutionsPageContent.hero.body}
        highlights={solutionsPageContent.hero.highlights}
        actions={
          <>
            <Link href="/services" className="button-primary">See core capabilities <span aria-hidden>→</span></Link>
            <Link href="/contact" className="button-secondary">Talk through your situation</Link>
          </>
        }
        variant="split"
        media={{ src: solutionsPageContent.hero.media, alt: solutionsPageContent.hero.mediaAlt }}
      />
      <ContextPanels />
      <SolutionScenarios />
      <ScenarioMatrix />
      <TechnologiesGridSection
        eyebrow="PRACTICAL STACK FIT"
        title={<>Technology choices should support the <span className="text-shimmer">business reality</span>.</>}
        body="We choose the stack around maintainability, team fit, scale expectations, and the long-term health of the system rather than trend value alone."
      />
    </>
  );
}

export function CaseStudiesPageSections() {
  return (
    <>
      <PageHero
        eyebrow={caseStudiesPageContent.hero.eyebrow}
        title={<>Work measured through <span className="text-shimmer">transformation</span>, not publicity.</>}
        body={caseStudiesPageContent.hero.body}
        highlights={caseStudiesPageContent.hero.highlights}
        actions={
          <>
            <Link href="/services" className="button-primary">See service depth <span aria-hidden>→</span></Link>
            <a href={contactDetails.whatsappHref} className="button-secondary">Ask about a similar project</a>
          </>
        }
        variant="spotlight"
        media={{ src: caseStudiesPageContent.hero.media, alt: caseStudiesPageContent.hero.mediaAlt }}
      />
      <CaseStudySpotlight />
      <CaseStudyStories />
    </>
  );
}

export function CareersPageSections() {
  return (
    <>
      <PageHero
        eyebrow={careersPageContent.hero.eyebrow}
        title={<>Join a team that values <span className="text-shimmer">craft</span> and responsibility.</>}
        body={careersPageContent.hero.body}
        highlights={careersPageContent.hero.highlights}
        actions={
          <>
            <a href={`mailto:${contactDetails.email}`} className="button-primary">Start a conversation <span aria-hidden>→</span></a>
            <a href={contactDetails.whatsappHref} className="button-secondary">WhatsApp the team</a>
          </>
        }
        variant="split"
        media={{ src: careersPageContent.hero.media, alt: careersPageContent.hero.mediaAlt }}
      />
      <StorySplitSection
        eyebrow="CULTURE"
        title={careersPageContent.culture.title}
        body={careersPageContent.culture.body}
        points={careersPageContent.culture.points}
        media={careersPageContent.hero.media}
        mediaAlt={careersPageContent.hero.mediaAlt}
        stat="High-accountability culture"
        accent={<div className="font-display text-5xl text-shimmer">OWN</div>}
      />
      <ThrivePanels />
      <TimelineSection
        eyebrow="HIRING JOURNEY"
        title={<>A straightforward process that respects <span className="text-shimmer">clarity</span>.</>}
        body="We keep hiring direct and thoughtful. The goal is to understand fit, expectations, and how someone likes to build."
        steps={careersPageContent.hiringJourney.map((step) => ({ title: step, body: "A focused step in the hiring process designed to keep expectations clear on both sides." }))}
      />
    </>
  );
}

export function ContactPageSections() {
  return (
    <>
      <PageHero
        eyebrow={contactPageContent.hero.eyebrow}
        title={<>Tell Rudranex what you are building, fixing, or <span className="text-shimmer">scaling</span>.</>}
        body={contactPageContent.hero.body}
        highlights={contactPageContent.hero.highlights}
        actions={
          <>
            <a href={`mailto:${contactDetails.email}`} className="button-primary">Email Rudranex <span aria-hidden>→</span></a>
            <a href={contactDetails.whatsappHref} className="button-secondary">WhatsApp now</a>
          </>
        }
        variant="split"
        media={{ src: contactPageContent.hero.media, alt: contactPageContent.hero.mediaAlt }}
      />
      <ContactDecisionBlock />
      <ContactInquiryBuilder />
      <section className="section-shell bg-ink border-t border-white/5">
        <div className="site-container grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <Reveal>
            <div className="story-panel rounded-[2rem] p-8 sm:p-10 h-full">
              <h2 className="font-display text-3xl font-bold mb-6">What to include in your inquiry</h2>
              <ul className="space-y-4 text-sm text-foam/68 leading-relaxed">
                {contactPageContent.checklist.map((item) => (
                  <li key={item} className="flex gap-3"><span className="text-cobalt">●</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="story-panel story-panel-accent rounded-[2rem] p-8 sm:p-10 h-full">
              <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-4">FOUNDER-LED RESPONSE</p>
              <h3 className="font-display text-3xl font-bold mb-5">A calmer first conversation usually leads to a better project decision.</h3>
              <p className="text-sm text-foam/70 leading-relaxed mb-6">
                Rudranex is designed to understand the real business and technical need before overcommitting to a solution shape. That is why the first step focuses on clarity, context, and fit.
              </p>
              <p className="text-sm text-foam/85">— {contactDetails.founder}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function LegalPageSections({
  eyebrow,
  title,
  body,
  sections,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  sections: Array<{ title: string; body: string }>;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        body={body}
        highlights={["Readable", "Concise", "Direct contact available"]}
        actions={<a href={`mailto:${contactDetails.email}`} className="button-secondary">Contact Rudranex</a>}
        variant="default"
      />
      <section className="section-shell bg-ink">
        <div className="site-container max-w-5xl grid gap-0 lg:grid-cols-[0.34fr_0.66fr] story-panel overflow-hidden rounded-[2rem]">
          <div className="border-b border-white/8 p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-4">On this page</p>
            <ul className="space-y-4 text-sm text-foam/62">
              {sections.map((section) => (
                <li key={section.title}>{section.title}</li>
              ))}
            </ul>
          </div>
          <div className="divide-y divide-white/8">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 60}>
                <article className="p-8 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.24em] text-cobalt mb-3">Section {i + 1}</p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">{section.title}</h2>
                  <p className="text-sm text-foam/68 leading-relaxed">{section.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell bg-graphite/25 border-t border-white/5">
        <Reveal className="site-container text-center">
          <SectionHeading
            eyebrow="NEXT STEP"
            title={<>Need clarification on a <span className="text-shimmer">policy</span> or working term?</>}
            body="Reach out directly and Rudranex will help clarify the right detail without making the process harder than it needs to be."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={`mailto:${contactDetails.email}`} className="button-primary">Email Rudranex <span aria-hidden>→</span></a>
            <a href={contactDetails.whatsappHref} className="button-secondary">WhatsApp</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export function TechnologiesGridSection({
  eyebrow = "TECH CAPABILITIES",
  title = <>A modern stack with <span className="text-shimmer">practical</span> choices.</>,
  body = "We choose technologies based on performance, maintainability, developer velocity, and the long-term health of the product.",
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <section className="section-shell bg-ink border-t border-white/5">
      <div className="site-container">
        <Reveal className="mb-14">
          <SectionHeading eyebrow={eyebrow} title={title} body={body} />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-4">
          {techGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 90}>
              <div className="story-panel rounded-[1.6rem] p-7 h-full">
                <h3 className="font-display text-lg font-bold mb-4">{group.title}</h3>
                <ul className="space-y-3 text-sm text-foam/65">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SharedInnerPageCta({
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className="section-shell bg-graphite/40 border-t border-white/5">
      <Reveal className="site-container">
        <div className="story-panel story-panel-accent rounded-[2rem] p-8 sm:p-12 text-center">
          <p className="font-body text-xs tracking-[0.3em] text-cobalt mb-4">{eyebrow}</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">{title}</h2>
          <p className="mx-auto max-w-2xl text-foam/70 leading-relaxed mb-10">{body}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={primaryHref} className="button-primary">{primaryLabel} <span aria-hidden>→</span></a>
            <a href={secondaryHref} className="button-secondary">{secondaryLabel}</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export const legalIntros = legalPageContent;
