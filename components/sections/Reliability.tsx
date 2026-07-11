"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { WordScrub } from "@/components/anim/WordScrub";
import { ParticleSphere } from "@/components/ui/ParticleSphere";
import { RELIABILITY } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const R = 54;
const C = 2 * Math.PI * R;

/** [10] Reliability — the paragraph reads word-by-word (scrub); each stat counts
 *  up while its ember ring draws in perfect sync, then label + body fade up. */
export function Reliability() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stats = gsap.utils.toArray<HTMLElement>(".stat", scope);
      const grid = scope.querySelector(".stat-grid") as HTMLElement;

      const read = (st: HTMLElement) => {
        const num = st.querySelector<HTMLElement>(".stat-num")!;
        const ring = st.querySelector<SVGCircleElement>(".stat-ring")!;
        const meta = st.querySelectorAll(".stat-meta");
        return { num, ring, meta, value: Number(num.dataset.v), suffix: num.dataset.s || "" };
      };

      stats.forEach((st) => {
        const { num, ring, meta, value, suffix } = read(st);
        if (reduce) {
          num.textContent = value + suffix;
          gsap.set(ring, { strokeDashoffset: 0 });
          gsap.set(meta, { opacity: 1, y: 0 });
          return;
        }
        gsap.set(ring, { strokeDasharray: C, strokeDashoffset: C });
        gsap.set(meta, { opacity: 0, y: 16 });
        gsap.set(st, { y: 30, rotateX: 8 });
      });
      if (reduce) return;

      const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: "top 75%", once: true } });
      stats.forEach((st, i) => {
        const { num, ring, meta, value, suffix } = read(st);
        const o = { v: 0 };
        tl.to(st, { y: 0, rotateX: 0, duration: 0.9, ease: "expo.out" }, i * 0.12);
        tl.to(
          o,
          {
            v: value,
            duration: 1.4,
            ease: "power2.out",
            snap: { v: 1 },
            onUpdate: () => (num.textContent = Math.round(o.v) + suffix),
          },
          i * 0.12,
        )
          .to(ring, { strokeDashoffset: 0, duration: 1.4, ease: "power2.out" }, i * 0.12)
          .to(meta, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, i * 0.12 + 0.3);
      });
    },
    { scope: root },
  );

  return (
    <section id="about" className="section relative overflow-hidden" ref={root}>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[540px] w-[540px] -translate-y-1/2 opacity-70 lg:block"
      >
        <ParticleSphere className="h-full w-full" />
      </div>
      <div className="container-x relative z-10">
        <Eyebrow>WHY RUDRANEX</Eyebrow>
        <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
          Built to be <em>relied</em> on.
        </LineReveal>
        <WordScrub text={RELIABILITY.paragraph} className="body-lg mt-10 max-w-3xl text-bone" />

        <div className="stat-grid mt-16 grid gap-6 sm:grid-cols-2" style={{ perspective: 1200 }}>
          {RELIABILITY.stats.map((s) => (
            <div
              key={s.label}
              className="stat flex items-center gap-6 rounded-[16px] border border-line bg-ink-2 p-7"
            >
              <div className="relative h-[120px] w-[120px] shrink-0">
                <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r={R} fill="none" stroke="var(--color-line)" strokeWidth="1.5" />
                  <circle
                    className="stat-ring"
                    cx="60"
                    cy="60"
                    r={R}
                    fill="none"
                    stroke="var(--color-ember)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="stat-num font-display text-[34px] text-bone"
                    data-v={s.value}
                    data-s={s.suffix}
                  >
                    {s.value}
                    {s.suffix}
                  </span>
                </div>
              </div>
              <div>
                <p className="stat-meta font-display text-[20px] text-bone">{s.label}</p>
                <p className="stat-meta mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
