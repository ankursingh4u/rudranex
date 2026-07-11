"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LineReveal } from "@/components/anim/LineReveal";
import { WORLDS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARALLAX = [-3, -7, -5, -8, -4, -6];

function WorldCard({ w }: { w: (typeof WORLDS)[number] }) {
  // Full-bleed image card. Hover response is pure CSS (image zoom + border glow
  // + shadow) so it works regardless of GSAP/reduced-motion. GSAP owns only the
  // outer element's scroll transforms.
  return (
    <a
      href={w.href}
      data-cursor="hover"
      className="world-card group block h-full"
      style={{ perspective: 1000 }}
    >
      <div className="relative h-full min-h-[440px] overflow-hidden rounded-[14px] border border-line shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-[400ms] group-hover:border-[rgba(61,125,255,0.6)] group-hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)]">
        {/* huge background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.09]"
          style={{ backgroundImage: `url(${w.img})` }}
        />
        {/* readability gradient */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,11,20,0.25) 0%, rgba(7,11,20,0.55) 45%, rgba(7,11,20,0.92) 100%)",
          }}
        />
        {/* content over the image */}
        <div className="relative z-10 flex h-full flex-col justify-end p-8">
          <p className="eyebrow">{w.eyebrow}</p>
          <h3 className="h3 mt-3 font-display text-bone">{w.title}</h3>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-bone/75">{w.body}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-bone">
            {w.link}
            <span
              aria-hidden
              className="inline-block transition-transform duration-[350ms] group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

export function SixWorlds() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const grid = scope.querySelector(".worlds-grid") as HTMLElement;
      const cards = gsap.utils.toArray<HTMLElement>(".world-card", scope);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mobile = window.matchMedia("(max-width: 767px)").matches;

      if (reduce) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotateY: 0 });
        return;
      }

      // obvious staggered fly-in
      cards.forEach((c, i) => {
        const col = mobile ? 1 : i % 3;
        gsap.set(c, {
          opacity: 0,
          y: mobile ? 50 : 90,
          scale: 0.9,
          rotateY: col === 0 ? -14 : col === 2 ? 14 : 0,
        });
      });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: grid, start: "top 85%", once: true },
      });

      // continuous parallax + scroll-driven 3D tilt
      cards.forEach((c, i) => {
        gsap.to(c, {
          yPercent: mobile ? -3 : PARALLAX[i],
          ease: "none",
          scrollTrigger: { trigger: grid, start: "top bottom", end: "bottom top", scrub: true },
        });
        if (!mobile) {
          gsap.fromTo(
            c,
            { rotateX: 14 },
            {
              rotateX: -14,
              ease: "none",
              scrollTrigger: { trigger: c, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <section className="section" data-no-stack ref={root}>
      <div className="container-x">
        <LineReveal as="h2" className="h-section font-display text-bone" start="top 88%" end="top 55%">
          Six <em>worlds</em>. Choose where to begin.
        </LineReveal>
        <p className="body-lg mt-6 max-w-xl text-muted">
          Each is its own destination — or scroll on for the full story.
        </p>

        <div
          className="worlds-grid mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1400 }}
        >
          {WORLDS.map((w) => (
            <WorldCard key={w.title} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
