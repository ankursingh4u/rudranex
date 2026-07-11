"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WordScrub } from "@/components/anim/WordScrub";
import { TESTIMONIAL } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** [11] Testimonial — giant quote mark parallaxes at ~0.5×, the quote reads
 *  word-by-word, and the attribution fades up after it. */
export function Testimonial() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const attr = scope.querySelector(".t-attr");
      const mark = scope.querySelector(".t-mark");
      if (reduce) {
        gsap.set(attr, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(attr, { opacity: 0, y: 16 });
      gsap.to(attr, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope, start: "top 45%", once: true },
      });
      gsap.fromTo(
        mark,
        { yPercent: 10 },
        {
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section className="section" ref={root}>
      <div className="container-x relative mx-auto max-w-[900px]">
        <span
          aria-hidden
          className="t-mark pointer-events-none absolute -left-2 -top-16 font-display text-[140px] leading-none text-faint"
        >
          &ldquo;
        </span>
        <WordScrub
          as="blockquote"
          text={TESTIMONIAL.quote}
          className="relative font-display text-[32px] italic leading-[1.4] text-bone"
          start="top 70%"
          end="top 35%"
        />
        <p className="t-attr mt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
          {TESTIMONIAL.attribution}
        </p>
      </div>
    </section>
  );
}
