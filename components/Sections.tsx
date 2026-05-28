import Link from "next/link";

import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import {
  careerBenefits,
  caseStudies,
  companyValues,
  differentiators,
  engagementModels,
  globalCapabilities,
  homepageStats,
  industries,
  pricingTiers,
  processSteps,
  techGroups,
  testimonials,
  trustHighlights,
} from "./site-content";

export function TrustStrip() {
  const loop = [...trustHighlights, ...trustHighlights];

  return (
    <section className="border-y border-white/5 bg-graphite/30 py-5 overflow-hidden">
      <div className="relative group">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-graphite)]/70 to-transparent z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-graphite)]/70 to-transparent z-10" />
        <ul className="flex gap-10 w-max text-xs tracking-[0.35em] text-foam/60 uppercase group-hover:[animation-play-state:paused]" style={{ animation: "marquee 24s linear infinite" }}>
          {loop.map((item, i) => (
            <li key={`${item}-${i}`} className="shrink-0">{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section-shell bg-ink scroll-mt-20">
      <div className="site-container grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 items-center">
        <Reveal>
          <SectionHeading
            eyebrow="ABOUT RUDRANEX"
            align="left"
            title={<>We engineer the <span className="text-shimmer">systems</span> behind modern growth.</>}
            body="Rudranex partners with ambitious companies to design, build, and scale software that is dependable under pressure. We combine product thinking, engineering discipline, and delivery clarity to move complex initiatives forward."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {companyValues.map((value, i) => (
              <Reveal key={value.title} delay={i * 120}>
                <div className="surface-card rounded-xl p-5 h-full">
                  <h3 className="font-display font-semibold text-sm tracking-[0.18em] text-foam mb-3 uppercase">
                    {value.title}
                  </h3>
                  <p className="text-sm text-foam/65 leading-relaxed">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {homepageStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 120}>
              <div className="rounded-xl border border-white/5 bg-graphite/50 p-4 sm:p-6 backdrop-blur hover:border-cobalt/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all h-full">
                <div className="font-display font-bold text-2xl sm:text-4xl text-shimmer">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-[10px] sm:text-xs tracking-[0.18em] text-foam/60 uppercase">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="section-shell bg-graphite/25 border-y border-white/5">
      <div className="site-container">
        <Reveal className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="WHY RUDRANEX"
            title={<>Built for <span className="text-shimmer">serious</span> delivery.</>}
            body="We help teams move from ideas and bottlenecks to scalable systems, cleaner operations, and stronger product execution."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <article className="surface-card rounded-2xl p-5 sm:p-7 h-full">
                <p className="text-xs tracking-[0.28em] text-cobalt mb-3">0{i + 1}</p>
                <h3 className="font-display text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-foam/65 leading-relaxed text-sm">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section className="section-shell bg-ink">
      <div className="site-container">
        <Reveal className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="INDUSTRIES & SOLUTIONS"
            title={<>Software that meets <span className="text-shimmer">real-world</span> complexity.</>}
            body="Our teams work across regulated, operationally demanding, and growth-focused industries where reliability and clarity matter."
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.title} delay={i * 100}>
              <article className="surface-card rounded-2xl p-7 h-full">
                <h3 className="font-display font-bold text-lg mb-3">{industry.title}</h3>
                <p className="text-sm text-foam/65 leading-relaxed">{industry.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/solutions" className="button-secondary">
            Explore solutions <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section-shell bg-graphite/25 border-y border-white/5">
      <div className="site-container">
        <Reveal className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="HOW WE WORK"
            title={<>A process built for <span className="text-shimmer">clarity</span> and momentum.</>}
            body="We keep execution visible from early discovery through launch, so teams always know what is happening and why."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <article className="rounded-2xl border border-white/8 bg-white/4 p-5 sm:p-6 h-full">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cobalt/35 text-cobalt text-sm font-display font-bold">
                  {i + 1}
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-foam/65 leading-relaxed">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedCaseStudies() {
  return (
    <section className="section-shell bg-ink">
      <div className="site-container">
        <Reveal className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="CASE STUDIES"
            title={<>Proof through <span className="text-shimmer">outcomes</span>.</>}
            body="Our strongest work turns complexity into measurable business progress, not just polished interfaces."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.title} delay={i * 100}>
              <article className="surface-card rounded-2xl p-5 sm:p-6 h-full">
                <div className="flex flex-wrap gap-2 mb-3">
                  {study.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] tracking-[0.2em] text-foam/55 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg mb-3">{study.title}</h3>
                <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-foam/65">
                  <p className="line-clamp-2"><span className="text-foam">Challenge:</span> {study.challenge}</p>
                  <p className="line-clamp-2"><span className="text-foam">Outcome:</span> {study.outcome}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/case-studies" className="button-secondary">
            View case studies <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Technologies() {
  const loop = [...techGroups.flatMap((group) => group.items), ...techGroups.flatMap((group) => group.items)];

  return (
    <section id="technologies" className="section-shell bg-graphite/40 border-y border-white/5 scroll-mt-20 overflow-hidden">
      <Reveal className="mb-12 px-6">
        <SectionHeading
          eyebrow="TECHNOLOGIES"
          title={<>The <span className="text-shimmer">stack</span> we ship with.</>}
          body="We choose tools for reliability, velocity, and maintainability, not for trend-chasing."
        />
      </Reveal>

      <div className="relative group mb-12">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-graphite)]/60 to-transparent z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-graphite)]/60 to-transparent z-10" />

        <ul className="flex gap-4 w-max group-hover:[animation-play-state:paused]" style={{ animation: "marquee 30s linear infinite" }}>
          {loop.map((item, i) => (
            <li key={`${item}-${i}`} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-foam/80 hover:border-cobalt/50 hover:text-foam transition-colors">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="site-container grid gap-6 lg:grid-cols-4">
        {techGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 100}>
            <div className="surface-card rounded-2xl p-6 h-full">
              <h3 className="font-display font-bold text-lg mb-4">{group.title}</h3>
              <ul className="space-y-3 text-sm text-foam/65">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function EngagementModels() {
  return (
    <section className="section-shell bg-ink">
      <div className="site-container">
        <Reveal className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="ENGAGEMENT MODELS"
            title={<>Flexible structures for <span className="text-shimmer">different</span> growth stages.</>}
            body="Whether you need a launch partner, a delivery squad, or a long-term technology team, we adapt to the shape of the problem."
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {engagementModels.map((model, i) => (
            <Reveal key={model.title} delay={i * 100}>
              <article className="surface-card rounded-2xl p-8 h-full">
                <h3 className="font-display font-bold text-xl mb-4">{model.title}</h3>
                <p className="text-sm text-foam/65 leading-relaxed">{model.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareersTeaser() {
  return (
    <section id="careers" className="section-shell bg-ink scroll-mt-20">
      <Reveal className="site-container text-center">
        <SectionHeading
          eyebrow="CAREERS"
          title={<>Build the <span className="text-shimmer">future</span> with us.</>}
          body="We are always looking for thoughtful engineers, designers, and problem-solvers who care about quality, ownership, and meaningful work."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs tracking-[0.22em] text-foam/60 uppercase">
          {careerBenefits.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{item}</span>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/careers" className="button-primary">
            Explore opportunities <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

const statsData = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Countries Served" },
  { value: 10, suffix: "+", label: "Services Offered" },
  { value: 100, suffix: "%", label: "Custom Built" },
] as const;

export function StatsBanner() {
  return (
    <section className="relative border-y border-white/5 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.08) 50%, rgba(37,99,235,0.06) 100%), var(--color-graphite)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(37,99,235,0.15), transparent 70%)",
        }}
      />
      <div className="site-container relative py-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <div className="text-center px-4">
              <div className="font-display font-bold text-5xl sm:text-6xl text-shimmer mb-2">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm tracking-[0.2em] text-foam/55 uppercase">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function VideoShowcase() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "80vh" }}>
      {/* Background team photo */}
      <div
        className="absolute inset-0 scene-bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,1,23,0.93) 0%, rgba(0,1,23,0.78) 45%, rgba(0,1,23,0.6) 80%, rgba(0,1,23,0.75) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 80% at 15% 50%, rgba(37,99,235,0.28), transparent 65%)",
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      <div className="relative site-container py-20 flex items-center" style={{ minHeight: "80vh" }}>
        <div className="grid gap-10 lg:grid-cols-2 items-center w-full">
          {/* Left: copy */}
          <Reveal>
            <p className="text-xs tracking-[0.32em] text-cobalt mb-5 uppercase">How we work</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Not just a dev shop.
              <br />
              <span className="text-shimmer">We&apos;re your growth partner.</span>
            </h2>
            <p className="text-foam/70 leading-relaxed text-base sm:text-lg mb-8 max-w-lg">
              From concept to global launch — our engineers, designers, and strategists work alongside you at every step. We don&apos;t just write code. We help build entire businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="button-primary">
                Meet the team <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="button-secondary">
                Start a project
              </Link>
            </div>
          </Reveal>

          {/* Right: floating metric cards */}
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "500+", label: "Projects delivered", icon: "🚀" },
                { num: "40+", label: "Countries served", icon: "🌍" },
                { num: "98%", label: "Client satisfaction", icon: "⭐" },
                { num: "24h", label: "Response time", icon: "⚡" },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 80}>
                  <div
                    className="rounded-2xl border border-white/12 p-5 sm:p-6 text-center backdrop-blur-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.06))",
                    }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-display font-bold text-3xl sm:text-4xl text-shimmer mb-1">
                      {item.num}
                    </div>
                    <p className="text-[10px] tracking-[0.18em] text-foam/50 uppercase">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const capPhotos = [
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=75",
];

export function GlobalCapabilities() {
  return (
    <section className="section-shell bg-graphite/20 border-y border-white/5">
      <div className="site-container">
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="BEYOND SOFTWARE"
            title={<>We do <span className="text-shimmer">everything</span> it takes to grow a business.</>}
            body="Rudranex is not just a development company. From global business registration to digital marketing and strategic consulting — we are the partner that stays with you end to end."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {globalCapabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 90}>
              <article className="photo-card group h-full flex flex-col">
                <div className="relative overflow-hidden" style={{ height: "140px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={capPhotos[i % capPhotos.length]}
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,1,23,0.3), rgba(0,1,23,0.8))," +
                        "linear-gradient(to right, rgba(37,99,235,0.3), transparent 60%)",
                    }}
                  />
                  <p className="absolute bottom-3 left-4 text-[10px] tracking-[0.28em] text-cobalt uppercase font-semibold">
                    {cap.eyebrow}
                  </p>
                </div>
                <div className="photo-card-body flex flex-col flex-1">
                  <h3 className="font-display font-bold text-base mb-2 text-foam">{cap.title}</h3>
                  <p className="text-sm text-foam/60 leading-relaxed mb-4 flex-1">{cap.body}</p>
                  <ul className="space-y-1.5">
                    {cap.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs text-foam/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-cobalt flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-white/6">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-cobalt/70">{cap.stat}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/services" className="button-secondary">
            Explore all services <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

const testimonialPhotos = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80",
];

export function Testimonials() {
  return (
    <section className="section-shell bg-ink overflow-hidden">
      <div className="site-container">
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="CLIENT STORIES"
            title={<>Trusted by teams building <span className="text-shimmer">ambitious</span> things.</>}
            body="The work speaks through outcomes. Here is what the companies we have partnered with have found most valuable about working with Rudranex."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <article
                className="rounded-2xl p-6 h-full flex flex-col border border-white/8 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(37,99,235,0.08) 0%, rgba(26,31,43,0.9) 50%, rgba(124,58,237,0.06) 100%)",
                }}
              >
                {/* Quote mark */}
                <div
                  className="absolute top-4 right-5 font-serif text-6xl leading-none pointer-events-none select-none"
                  style={{ color: "rgba(37,99,235,0.25)" }}
                  aria-hidden
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-cobalt text-xs">★</span>
                  ))}
                </div>

                <p className="text-sm text-foam/75 leading-relaxed flex-1 italic mb-5">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonialPhotos[i % testimonialPhotos.length]}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/15"
                  />
                  <div>
                    <p className="font-display font-semibold text-sm text-foam">{item.name}</p>
                    <p className="text-[11px] text-foam/50">{item.role} · {item.company}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePricingSection() {
  return (
    <section id="pricing" className="section-shell bg-graphite/25 border-y border-white/5 scroll-mt-20">
      <div className="site-container">
        <Reveal className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="PRICING"
            title={<>Transparent investment, <span className="text-shimmer">clear outcomes</span>.</>}
            body="Every engagement is shaped around real scope. No hidden fees, no inflated packages — structured delivery that matches your goals and your stage."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 100}>
              <div className={`relative rounded-2xl p-5 sm:p-7 h-full flex flex-col ${tier.highlight ? "pricing-card-featured" : "pricing-card"}`}>
                {tier.badge ? (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-cobalt px-4 py-1.5 text-[10px] tracking-[0.2em] font-semibold uppercase text-foam shadow-[0_0_24px_rgba(37,99,235,0.55)] whitespace-nowrap">
                    {tier.badge}
                  </span>
                ) : null}
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-foam/50 mb-3">{tier.name}</p>
                  <div className="font-display font-bold text-3xl sm:text-4xl text-foam mb-1">{tier.price}</div>
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
        <Reveal className="mt-10 text-center">
          <Link href="/pricing" className="button-secondary">
            See full pricing & FAQ <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactPanel() {
  return (
    <section id="contact" className="section-shell bg-graphite/40 border-t border-white/5 scroll-mt-20">
      <Reveal className="site-container">
        <div className="surface-card rounded-[1.75rem] p-8 sm:p-12 text-center">
          <p className="font-body text-xs tracking-[0.3em] text-cobalt mb-4">CONTACT</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
            Let&apos;s build something <span className="text-shimmer">iconic</span>.
          </h2>
          <p className="mx-auto max-w-2xl text-foam/70 leading-relaxed mb-10">
            Tell us about your product, platform, or transformation goal and we&apos;ll come back with the right next step.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="button-primary">
              Request a consultation <span aria-hidden>→</span>
            </Link>
            <a href="mailto:support@rudranex.com" className="button-secondary">
              support@rudranex.com
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
