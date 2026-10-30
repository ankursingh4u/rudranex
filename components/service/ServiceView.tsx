"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NetworkBg } from "@/components/ui/network-bg";
import { CTA, FOOTER } from "@/lib/content";
import type { ServiceDetail, ServiceStat } from "@/lib/services";
import { EASE_OUT, EASE_FLOW, prefersReduced } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ───────────────────────── helpers ───────────────────────── */

/** Count a number up from 0 when it scrolls into view (once). */
function Counter({ stat, className = "" }: { stat: ServiceStat; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const node = el.current;
    if (!node) return;
    if (prefersReduced()) {
      node.textContent = String(stat.value);
      return;
    }
    const c = { v: 0 };
    gsap.to(c, {
      v: stat.value,
      duration: 1.6,
      ease: EASE_OUT,
      snap: { v: stat.value % 1 === 0 ? 1 : 0.1 },
      scrollTrigger: { trigger: node, start: "top 88%", once: true },
      onUpdate: () => {
        node.textContent = String(Math.round(c.v));
      },
    });
  }, [stat.value]);

  return (
    <span className={className}>
      <span ref={el}>0</span>
      {stat.suffix}
    </span>
  );
}

/** Build an SVG path through normalized (0–100) points inside a w×h box. */
const linePath = (series: readonly number[], w: number, h: number, pad = 14) => {
  const n = series.length - 1;
  return series
    .map((v, i) => {
      const x = pad + (i / n) * (w - pad * 2);
      const y = h - pad - (v / 100) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
};

/** Scrub-draw every `.draw-line` path inside the scope as it enters. */
function useDrawLines(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const paths = root.querySelectorAll<SVGPathElement>(".draw-line");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        if (prefersReduced()) return; // leave fully drawn
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: p, start: "top 85%", end: "top 35%", scrub: 1 },
          },
        );
      });
    },
    { scope },
  );
}

/* ───────────────────────── sections ───────────────────────── */

function ServiceNav({ s }: { s: ServiceDetail }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[9996] h-[68px] border-b border-line bg-ink/80 backdrop-blur-[16px]">
      <div className="container-x flex h-full items-center justify-between">
        <Link href="/" className="font-display text-[1.125rem] font-medium text-bone">
          RUDRANEX
        </Link>
        <Link
          href="/#services"
          data-cursor="hover"
          className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-bone"
        >
          ← All services
        </Link>
        <a
          href={`mailto:${CTA.contact[0]}?subject=${encodeURIComponent(`${s.title} inquiry`)}`}
          data-cursor="hover"
          className="pill transition-colors hover:border-ember hover:text-ember"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}

function Hero({ s }: { s: ServiceDetail }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReduced() || !root.current) return;
      const tl = gsap.timeline({ delay: 0.45 }); // entering behind the wipe
      tl.from(".sv-eyebrow", { opacity: 0, letterSpacing: "0.5em", duration: 1, ease: EASE_OUT })
        .from(".sv-line", { yPercent: 115, duration: 1, ease: EASE_OUT, stagger: 0.08 }, 0.1)
        .from(".sv-intro", { opacity: 0, y: 28, duration: 0.9, ease: EASE_OUT }, 0.45)
        .from(".sv-stat", { opacity: 0, y: 34, stagger: 0.09, duration: 0.8, ease: EASE_OUT }, 0.6);
      // slow parallax drift of the whole hero as you leave it
      gsap.to(".sv-hero-inner", {
        yPercent: -12,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "bottom bottom", end: "bottom 20%", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-screen items-center overflow-hidden pt-[68px]">
      <NetworkBg variant="light" className="absolute inset-0 h-full w-full opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(75% 60% at 50% 0%, rgba(37,99,235,0.13), transparent 70%)" }}
      />
      <div className="sv-hero-inner container-x relative z-10 py-24">
        <p className="sv-eyebrow eyebrow">{s.eyebrow}</p>
        <h1 className="h-hero mt-6 max-w-4xl font-display font-medium text-bone">
          <span className="line-mask">
            <span className="sv-line block">
              {s.title.split(s.em)[0]}
              <em className="display-em">{s.em}</em>
              {s.title.split(s.em)[1]}
            </span>
          </span>
        </h1>
        <p className="sv-intro body-lg mt-8 max-w-2xl text-muted">{s.intro}</p>
        <div className="mt-14 grid max-w-2xl grid-cols-3 gap-6">
          {s.heroStats.map((st) => (
            <div key={st.label} className="sv-stat border-l border-line pl-5">
              <Counter stat={st} className="font-display text-[2.125rem] leading-none text-bone" />
              <p className="mono-label mt-2">{st.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ s }: { s: ServiceDetail }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope || prefersReduced()) return;
      // spine grows with scroll
      gsap.fromTo(
        ".sv-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".sv-steps", start: "top 75%", end: "bottom 55%", scrub: 1 },
        },
      );
      // steps swing in alternately with a blur settle
      gsap.utils.toArray<HTMLElement>(".sv-step", scope).forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 ? 70 : -70,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: EASE_OUT,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section border-t border-line">
      <div className="container-x">
        <p className="eyebrow">HOW IT WORKS</p>
        <h2 className="h-section mt-5 max-w-3xl font-display text-bone">
          From first call to <em>running in production</em>.
        </h2>
        <div className="sv-steps relative mx-auto mt-20 max-w-3xl">
          <div
            aria-hidden
            className="sv-spine absolute left-[7px] top-0 h-full w-px origin-top bg-ember md:left-1/2"
          />
          {s.how.map((step, i) => (
            <div
              key={step.num}
              className={`sv-step relative mb-14 pl-10 md:w-1/2 md:pl-0 ${
                i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
              }`}
            >
              <span
                aria-hidden
                className={`absolute top-1 h-[15px] w-[15px] rounded-full border-2 border-ember bg-ink ${
                  i % 2 ? "left-0 md:-left-[7.5px]" : "left-0 md:left-auto md:-right-[7.5px]"
                }`}
              />
              <p className="font-mono text-[0.8125rem] text-ember">{step.num}</p>
              <h3 className="h3 mt-2 font-display text-bone">{step.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GrowthChart({ s }: { s: ServiceDetail }) {
  const root = useRef<HTMLElement>(null);
  const W = 820;
  const H = 320;
  useDrawLines(root);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope || prefersReduced()) return;
      gsap.from(".sv-dot", {
        scale: 0,
        transformOrigin: "center",
        stagger: 0.06,
        duration: 0.5,
        ease: "back.out(2.5)",
        scrollTrigger: { trigger: ".sv-chart", start: "top 60%", once: true },
      });
      gsap.from(".sv-area", {
        opacity: 0,
        duration: 1.2,
        ease: EASE_FLOW,
        scrollTrigger: { trigger: ".sv-chart", start: "top 55%", once: true },
      });
      gsap.from(".sv-chart-label", {
        opacity: 0,
        y: 12,
        stagger: 0.05,
        duration: 0.6,
        ease: EASE_OUT,
        scrollTrigger: { trigger: ".sv-chart", start: "top 55%", once: true },
      });
    },
    { scope: root },
  );

  const pts = s.growth.series;
  const path = linePath(pts, W, H);
  const area = `${path} L${W - 14} ${H - 14} L14 ${H - 14} Z`;

  return (
    <section ref={root} className="section border-t border-line bg-ink-2">
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">THE TRAJECTORY</p>
            <h2 className="h-section mt-5 max-w-2xl font-display text-bone">
              What the first year <em>looks like</em>.
            </h2>
          </div>
          <div className="lg:text-right">
            <Counter stat={s.growth.headline} className="font-display text-[3.375rem] leading-none text-ember" />
            <p className="mono-label mt-2">{s.growth.headline.label}</p>
          </div>
        </div>

        <div className="sv-chart glass mt-14 rounded-[18px] p-6 shadow-card md:p-10">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={s.growth.caption}>
            <defs>
              <linearGradient id="svArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(37,99,235,0.28)" />
                <stop offset="100%" stopColor="rgba(37,99,235,0)" />
              </linearGradient>
            </defs>
            {/* grid */}
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1="14"
                x2={W - 14}
                y1={14 + t * (H - 28)}
                y2={14 + t * (H - 28)}
                stroke="rgba(13,20,40,0.08)"
                strokeWidth="1"
              />
            ))}
            <path className="sv-area" d={area} fill="url(#svArea)" />
            <path
              className="draw-line"
              d={path}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {pts.map((v, i) => {
              const x = 14 + (i / (pts.length - 1)) * (W - 28);
              const y = H - 14 - (v / 100) * (H - 28);
              return <circle key={i} className="sv-dot" cx={x} cy={y} r="4.5" fill="#2563eb" />;
            })}
          </svg>
          <div className="mt-4 flex justify-between">
            {s.growth.labels.map((l) => (
              <span key={l} className="sv-chart-label font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-faint">
                {l}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-[0.875rem] leading-relaxed text-muted">{s.growth.caption}</p>
      </div>
    </section>
  );
}

function Benefits({ s }: { s: ServiceDetail }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope || prefersReduced()) return;
      gsap.from(".sv-benefit", {
        y: 64,
        opacity: 0,
        rotateX: -8,
        transformOrigin: "top center",
        stagger: 0.12,
        duration: 1,
        ease: EASE_OUT,
        scrollTrigger: { trigger: scope, start: "top 72%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section border-t border-line" style={{ perspective: 1200 }}>
      <div className="container-x">
        <p className="eyebrow">WHY IT PAYS OFF</p>
        <h2 className="h-section mt-5 max-w-3xl font-display text-bone">
          Built to be <em>measurably</em> worth it.
        </h2>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {s.benefits.map((b) => (
            <div
              key={b.title}
              data-cursor="hover"
              className="sv-benefit group rounded-[16px] border border-line bg-ink-2 p-8 shadow-card transition-colors duration-300 hover:border-[rgba(37,99,235,0.45)]"
            >
              <Counter stat={b.stat} className="font-display text-[2.5rem] leading-none text-ember" />
              <p className="mono-label mt-2">{b.stat.label}</p>
              <h3 className="h3 mt-6 font-display text-bone">{b.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The "what you lose by waiting" split — deliberately dark, like the Break. */
function CostOfWaiting({ s }: { s: ServiceDetail }) {
  const root = useRef<HTMLElement>(null);
  const W = 360;
  const H = 150;
  useDrawLines(root);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope || prefersReduced()) return;
      gsap.utils.toArray<HTMLElement>(".sv-lose-item", scope).forEach((el, i) => {
        gsap.from(el, {
          x: -26,
          opacity: 0,
          duration: 0.7,
          delay: (i % 4) * 0.08,
          ease: EASE_OUT,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.from(".sv-lose-panel", {
        y: 70,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: EASE_OUT,
        scrollTrigger: { trigger: scope, start: "top 70%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-[#070b14] py-24 md:py-36">
      <NetworkBg className="absolute inset-0 h-full w-full opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(90% 70% at 50% 0%, rgba(61,125,255,0.12), transparent 60%)" }}
      />
      <div className="container-x relative z-10">
        <p className="eyebrow" style={{ color: "#8b95ac" }}>
          THE HONEST MATH
        </p>
        <h2 className="h-section mt-5 max-w-3xl font-display text-[#e9eef8]">{s.lose.heading}</h2>
        <p className="body-lg mt-6 max-w-2xl text-[#8b95ac]">{s.lose.sub}</p>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {/* WITHOUT */}
          <div className="sv-lose-panel rounded-[18px] border border-[#2a1b1f] bg-[rgba(255,92,92,0.04)] p-8 md:p-10">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#ff8080]">
                Without it
              </p>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#ff8080]">▼ drifting</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full" aria-hidden>
              <path
                className="draw-line"
                d={linePath(s.lose.decline, W, H, 8)}
                fill="none"
                stroke="#ff5c5c"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <ul className="mt-8 space-y-4">
              {s.lose.without.map((t) => (
                <li key={t} className="sv-lose-item flex gap-3 text-[0.9375rem] leading-relaxed text-[#b9c0d4]">
                  <span aria-hidden className="mt-[2px] text-[#ff5c5c]">
                    ✕
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* WITH */}
          <div className="sv-lose-panel rounded-[18px] border border-[rgba(61,125,255,0.3)] bg-[rgba(61,125,255,0.06)] p-8 md:p-10">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#7da7ff]">
                With Rudranex
              </p>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#7da7ff]">▲ compounding</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full" aria-hidden>
              <path
                className="draw-line"
                d={linePath(s.lose.rise, W, H, 8)}
                fill="none"
                stroke="#3d7dff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <ul className="mt-8 space-y-4">
              {s.lose.withUs.map((t) => (
                <li key={t} className="sv-lose-item flex gap-3 text-[0.9375rem] leading-relaxed text-[#dfe6f5]">
                  <span aria-hidden className="mt-[2px] text-[#3d7dff]">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCta({ s }: { s: ServiceDetail }) {
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  // magnetic pull (same physics as the home CTA)
  useEffect(() => {
    const el = btn.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let inside = false;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < 100) {
        inside = true;
        target.x = Math.max(-12, Math.min(12, dx * 0.4));
        target.y = Math.max(-12, Math.min(12, dy * 0.4));
      } else if (inside) {
        inside = false;
        target.x = target.y = 0;
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: EASE_OUT });
      }
    };
    const loop = () => {
      if (inside) {
        cur.x += (target.x - cur.x) * 0.18;
        cur.y += (target.y - cur.y) * 0.18;
        gsap.set(el, { x: cur.x, y: cur.y });
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const enter = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.set(fill.current, { left: e.clientX - r.left - 150, top: e.clientY - r.top - 150, scale: 0 });
    gsap.to(fill.current, { scale: 2.5, duration: 0.5, ease: EASE_OUT });
  };
  const leave = () => gsap.to(fill.current, { scale: 0, duration: 0.5, ease: EASE_OUT });

  useGSAP(
    () => {
      if (prefersReduced() || !root.current) return;
      gsap.from(".sv-cta-el", {
        y: 44,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: EASE_OUT,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section border-t border-line text-center">
      <div className="container-x">
        <p className="sv-cta-el eyebrow">{CTA.eyebrow}</p>
        <h2 className="sv-cta-el h-section mx-auto mt-6 max-w-3xl font-display text-bone">{s.ctaLine}</h2>
        <div className="sv-cta-el mt-12 flex justify-center">
          <a
            ref={btn}
            href={`mailto:${CTA.contact[0]}?subject=${encodeURIComponent(`${s.title} inquiry`)}`}
            data-cursor="hover"
            onMouseEnter={enter}
            onMouseLeave={leave}
            className="relative inline-flex overflow-hidden rounded-full bg-bone px-9 py-4"
          >
            <span
              ref={fill}
              aria-hidden
              className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-ember"
              style={{ scale: 0 }}
            />
            <span className="relative font-mono text-[0.75rem] uppercase tracking-[0.18em] text-ink">
              {CTA.button} →
            </span>
          </a>
        </div>
        <div className="sv-cta-el mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {s.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
              {t}
            </span>
          ))}
        </div>
      </div>
      <footer className="mt-24 border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
          <span>{FOOTER.copyright}</span>
          <Link href="/#services" data-cursor="hover" className="transition-colors hover:text-bone">
            ← All services
          </Link>
        </div>
      </footer>
    </section>
  );
}

/* ───────────────────────── page shell ───────────────────────── */

export function ServiceView({ s }: { s: ServiceDetail }) {
  const wipe = useRef<HTMLDivElement>(null);

  // page-enter wipe: an ink panel lifts away, revealing the hero mid-motion
  useEffect(() => {
    const el = wipe.current;
    if (!el) return;
    if (prefersReduced()) {
      el.style.display = "none";
      return;
    }
    gsap.to(el, {
      yPercent: -100,
      duration: 0.9,
      delay: 0.15,
      ease: EASE_FLOW,
      onComplete: () => {
        el.style.display = "none";
        ScrollTrigger.refresh();
      },
    });
  }, []);

  return (
    <main>
      <div ref={wipe} aria-hidden className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink">
        <span className="font-display text-[1.25rem] font-medium tracking-[0.02em] text-bone">RUDRANEX</span>
      </div>
      <ServiceNav s={s} />
      <Hero s={s} />
      <HowItWorks s={s} />
      <GrowthChart s={s} />
      <Benefits s={s} />
      <CostOfWaiting s={s} />
      <ServiceCta s={s} />
    </main>
  );
}
