"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { SERVICES } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** [5] Sticky spotlight stack — left heading pins, each right row scrubs
 *  dim→lit→dim (opacity/scale + ember number), exactly one fully lit. */
export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const rows = gsap.utils.toArray<HTMLElement>(".svc-row", scope);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(rows, { opacity: 1 });
        return;
      }
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      rows.forEach((row) => {
        const num = row.querySelector(".svc-num");
        const tags = row.querySelectorAll(".svc-tag");
        const inner = row.querySelector(".svc-inner");
        gsap.set(row, { opacity: 0.25, scale: 0.975, transformOrigin: "center" });
        gsap.set(tags, { y: 8, opacity: 0.4 });
        gsap.from(inner, {
          x: 40,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 62%", end: "bottom 38%", scrub: true },
        });
        tl.to(row, { opacity: 1, scale: 1, ease: "none", duration: 0.5 })
          .to(num, { color: "#3d7dff", ease: "none", duration: 0.5 }, 0)
          .to(tags, { y: 0, opacity: 1, ease: "none", duration: 0.35, stagger: 0.03 }, 0)
          .to(row, { opacity: 0.25, scale: 0.975, ease: "none", duration: 0.5 })
          .to(num, { color: "#495066", ease: "none", duration: 0.5 }, 0.5);
        if (desktop) {
          gsap.fromTo(
            row,
            { rotateX: 8 },
            {
              rotateX: -8,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <section id="services" className="section" data-no-stack ref={root}>
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-[18vh] lg:h-max">
          <Eyebrow>{SERVICES.eyebrow}</Eyebrow>
          <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
            Six disciplines. One <em>relentless</em> team.
          </LineReveal>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">{SERVICES.body}</p>
        </div>

        <div className="space-y-4" style={{ perspective: 1200 }}>
          {SERVICES.rows.map((r) => (
            <div
              key={r.num}
              className="svc-row rounded-[14px] border border-line bg-ink-2 p-8 transition-colors duration-300 hover:border-[rgba(61,125,255,0.4)]"
            >
              <div className="svc-inner flex gap-6">
                <span className="svc-num font-mono text-[13px] text-faint">{r.num}</span>
                <div>
                  <h3 className="h3 font-display text-bone">{r.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{r.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="svc-tag rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
