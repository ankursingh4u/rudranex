"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { PROCESS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** [9] Process — ember line draws with scroll (scrub); each node pops + emits a
 *  ring and its step text line-reveals as it enters. Horizontal on desktop,
 *  vertical on mobile. */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const steps = gsap.utils.toArray<HTMLElement>(".proc-step", scope);

      if (reduce) {
        if (line.current) gsap.set(line.current, { strokeDashoffset: 0 });
        steps.forEach((s) => gsap.set(s.querySelectorAll(".proc-text > *, .proc-node"), { opacity: 1, y: 0, scale: 1 }));
        return;
      }

      // scrubbed line draw
      if (line.current) {
        const len = line.current.getTotalLength();
        gsap.set(line.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top 70%", end: "bottom 60%", scrub: true },
        });
      }

      // per-step node pop + ring + text reveal
      steps.forEach((s) => {
        const node = s.querySelector(".proc-node");
        const ring = s.querySelector(".proc-ring");
        const textEls = s.querySelectorAll(".proc-text > *");
        gsap.set(node, { scale: 0 });
        gsap.set(textEls, { y: 24, opacity: 0 });
        ScrollTrigger.create({
          trigger: s,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(node, { scale: 1, duration: 0.4, ease: "expo.out" });
            gsap.fromTo(ring, { scale: 1, opacity: 0.5 }, { scale: 2.4, opacity: 0, duration: 0.7, ease: "expo.out" });
            gsap.to(textEls, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.06 });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="process" className="section" ref={root}>
      <div className="container-x">
        <Eyebrow>THE JOURNEY</Eyebrow>
        <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
          One continuous <em>arc</em>, from idea to scale.
        </LineReveal>

        <div className="relative mt-20">
          {/* desktop horizontal line */}
          <svg
            aria-hidden
            className="absolute left-0 right-0 top-[6px] hidden h-[2px] w-full lg:block"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            <path d="M0 1 H1000" fill="none" stroke="var(--color-line)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path
              ref={line}
              d="M0 1 H1000"
              fill="none"
              stroke="var(--color-ember)"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="grid gap-12 border-l border-line pl-8 lg:grid-cols-4 lg:gap-10 lg:border-l-0 lg:pl-0">
            {PROCESS.map((s) => (
              <div key={s.num} className="proc-step relative">
                <span className="proc-node absolute -left-[41px] top-0 block h-3 w-3 rounded-full bg-ember lg:static lg:mb-8">
                  <span className="proc-ring absolute inset-0 rounded-full border border-ember" />
                </span>
                <div className="proc-text lg:mt-0">
                  <span className="block font-mono text-[13px] text-ember">{s.num}</span>
                  <h3 className="h3 mt-3 font-display text-bone">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
