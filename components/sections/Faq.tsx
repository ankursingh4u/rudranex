"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { FAQ as FAQS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Row({ item, open, onToggle }: { item: (typeof FAQS)[number]; open: boolean; onToggle: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLParagraphElement>(null);
  const plus = useRef<HTMLSpanElement>(null);
  const q = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const p = panel.current;
      if (!p) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dur = reduce ? 0 : 0.5;
      if (open) {
        gsap.to(p, { height: inner.current?.offsetHeight || 0, duration: dur, ease: "power3.inOut" });
        gsap.fromTo(inner.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: dur, delay: 0.15, ease: "expo.out" });
        gsap.to(plus.current, { rotate: 45, duration: reduce ? 0 : 0.4, ease: "power3.inOut" });
        gsap.to(q.current, { color: "var(--color-bone)", duration: 0.3 });
      } else {
        gsap.to(p, { height: 0, duration: dur, ease: "power3.inOut" });
        gsap.to(plus.current, { rotate: 0, duration: reduce ? 0 : 0.4, ease: "power3.inOut" });
        gsap.to(q.current, { color: "var(--color-muted)", duration: 0.3 });
      }
    },
    { dependencies: [open] },
  );

  return (
    <div className="faq-row border-b border-line py-7">
      <button
        ref={q}
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 text-left font-display text-[20px] text-muted"
      >
        <span>{item.q}</span>
        <span ref={plus} className="relative block h-[14px] w-[14px] shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
        </span>
      </button>
      <div ref={panel} className="overflow-hidden" style={{ height: 0 }}>
        <p ref={inner} className="pt-5 text-[15px] leading-relaxed text-muted">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export function Faq() {
  const root = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(scope.querySelectorAll(".faq-row"), {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.querySelector(".faq-list"), start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="faq" className="section" ref={root}>
      <div className="container-x max-w-3xl">
        <Eyebrow>STRAIGHT ANSWERS</Eyebrow>
        <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
          The questions every <em>smart</em> client asks first.
        </LineReveal>
        <div className="faq-list mt-14">
          {FAQS.map((item, i) => (
            <Row key={i} item={item} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
