"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HERO } from "@/lib/content";
import { VIDEO_1 } from "@/lib/assets";
import { EASE_OUT, EASE_FLOW } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// 3 fixed lines so the scrub can shear each independently (words are verbatim)
const LINES = ["Building Digital", "Solutions for"];

const CARDS = [
  { pos: "left-[6%] top-[18%]", yp: -34, x: -20, dur: 3.8 },
  { pos: "right-[7%] top-[22%]", yp: -18, x: 20, dur: 4.3 },
  { pos: "left-[9%] bottom-[20%]", yp: -26, x: -20, dur: 4.7 },
  { pos: "right-[8%] bottom-[16%]", yp: -12, x: 20, dur: 5.1 },
];

function parse(v: string): [number, string] {
  const m = v.match(/^(\d+)(.*)$/);
  return m ? [Number(m[1]), m[2]] : [0, v];
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const played = useRef(false);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(scope);

      // ── initial states (L2 — never via CSS) ──
      const setFinal = () => {
        gsap.set(q(".hero-eyebrow"), { opacity: 1, letterSpacing: "0.18em" });
        gsap.set(q(".hero-inner"), { yPercent: 0, rotateZ: 0 });
        gsap.set([q(".hero-sub"), q(".hero-cta > *")], { opacity: 1, y: 0 });
        gsap.set(q(".hero-card"), { opacity: 1, scale: 1 });
        q(".hero-count").forEach((el) => {
          const [n, s] = parse((el as HTMLElement).dataset.v || "");
          el.textContent = n + s;
        });
      };

      if (reduce) {
        setFinal();
        return;
      }

      gsap.set(q(".hero-eyebrow"), { opacity: 0, letterSpacing: "0.45em" });
      gsap.set(q(".hero-inner"), { yPercent: 112, rotateZ: 2 });
      gsap.set([q(".hero-sub"), q(".hero-cta > *")], { opacity: 0, y: 24 });
      gsap.set(q(".hero-card"), { opacity: 0, scale: 0.92 });
      gsap.set(q(".hero-datalabel"), { opacity: 0, letterSpacing: "0.5em" });

      // ── ENTRY timeline (fires on rudranex:hero-entry, once) ──
      const playEntry = () => {
        if (played.current) return;
        played.current = true;
        const tl = gsap.timeline();
        tl.to(q(".hero-eyebrow"), { opacity: 1, letterSpacing: "0.18em", duration: 1.1, ease: EASE_OUT }, 0)
          .to(q(".hero-inner"), { yPercent: 0, rotateZ: 0, stagger: 0.13, duration: 1.2, ease: EASE_OUT }, 0.15)
          .to(q(".hero-sub"), { opacity: 1, y: 0, duration: 0.9, ease: EASE_OUT }, 0.5)
          .to(q(".hero-cta > *"), { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: EASE_OUT }, 0.65)
          .to(q(".hero-card"), { opacity: 1, scale: 1, stagger: 0.09, duration: 1.0, ease: EASE_OUT }, 0.8);

        // count up (0.8→2.0) + start idle floats after
        q(".hero-count").forEach((el) => {
          const [n, s] = parse((el as HTMLElement).dataset.v || "");
          const o = { v: 0 };
          tl.to(o, {
            v: n,
            duration: 1.2,
            ease: "power2.out",
            snap: { v: 1 },
            onUpdate: () => (el.textContent = Math.round(o.v) + s),
          }, 0.8);
        });
        tl.call(() => {
          q(".hero-float").forEach((el, i) =>
            gsap.to(el, { y: 7, duration: CARDS[i]?.dur ?? 4, ease: "sine.inOut", yoyo: true, repeat: -1 }),
          );
        });
      };
      window.addEventListener("rudranex:hero-entry", playEntry);

      // D — scroll-cue line pulse (scaleY 0.4→1→0.4, 2.2s loop, origin top)
      gsap.fromTo(
        q(".hero-cue-line"),
        { scaleY: 0.4 },
        { scaleY: 1, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "top" },
      );

      // ── SCRUB timeline (desktop pin) / mobile: no pin ──
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: scope, start: "top top", end: "+=2200", scrub: 1, pin: true },
        });
        // lines shear apart
        tl.to(q(".hero-mask-0"), { y: -60, ease: EASE_FLOW }, 0)
          .to(q(".hero-mask-1"), { y: -20, ease: EASE_FLOW }, 0)
          .to(q(".hero-mask-2"), { y: 30, ease: EASE_FLOW }, 0)
          .to([q(".hero-eyebrow"), q(".hero-sub")], { opacity: 0.3, ease: EASE_FLOW }, 0);
        // cards travel at different rates + drift outward (0.15–0.55)
        CARDS.forEach((c, i) =>
          tl.to(q(`.hero-card-${i}`), { yPercent: c.yp, x: c.x, ease: EASE_FLOW, duration: 0.4 }, 0.15),
        );
        // video zoom + overlay darken (0.30–0.60)
        tl.to(q(".hero-video"), { scale: 1.09, ease: EASE_FLOW, duration: 0.3 }, 0.3)
          .to(q(".hero-overlay"), { opacity: 0.8, ease: EASE_FLOW, duration: 0.3 }, 0.3);
        // cards + text fade out (0.55–0.80)
        tl.to([q(".hero-card"), q(".hero-text")], { opacity: 0, y: -40, ease: EASE_FLOW, duration: 0.25 }, 0.55);
        // center data label + hero dim (0.70–1.00)
        tl.to(q(".hero-datalabel"), { opacity: 1, letterSpacing: "0.2em", ease: EASE_OUT, duration: 0.3 }, 0.7)
          .to(q(".hero-fade"), { opacity: 0.45, ease: EASE_FLOW, duration: 0.3 }, 0.7);
      });

      return () => {
        window.removeEventListener("rudranex:hero-entry", playEntry);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="hero-fade absolute inset-0">
        {/* A. video + gradient */}
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          src={VIDEO_1}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div
          className="hero-overlay absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 40%, transparent 0%, rgba(14,13,11,0.85) 85%), linear-gradient(0deg, rgba(14,13,11,0.9) 0%, transparent 30%)",
          }}
        />

        {/* B. floating stat cards */}
        {HERO.cards.map((card, i) => (
          <div
            key={card.label}
            className={`hero-card hero-card-${i} absolute z-[5] hidden w-[190px] md:block ${CARDS[i].pos}`}
          >
            <div className="hero-float glass rounded-[14px] p-[22px]">
              <div className="font-display text-[44px] leading-none text-bone">
                <span className="hero-count" data-v={card.value}>
                  {card.value}
                </span>
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {card.label}
              </div>
            </div>
          </div>
        ))}

        {/* C. text block */}
        <div className="container-x relative z-10 flex h-full flex-col justify-center">
          <div className="hero-text max-w-[760px]">
            <p className="hero-eyebrow font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              {HERO.eyebrow}
            </p>
            <h1
              className="h-hero mt-6 font-display font-medium text-bone"
              aria-label="Building Digital Solutions for the Next Era"
            >
              {LINES.map((line, i) => (
                <span key={i} className={`line-mask hero-mask-${i}`} aria-hidden>
                  <span className="hero-inner inline-block">{line}</span>
                </span>
              ))}
              <span className="line-mask hero-mask-2" aria-hidden>
                <span className="hero-inner inline-block">
                  the Next <em>Era</em>
                </span>
              </span>
            </h1>
            <p className="hero-sub body-lg mt-8 max-w-[540px] text-muted">{HERO.sub}</p>
            <div className="hero-cta mt-10 flex flex-wrap gap-6">
              {HERO.ctas.map((cta) => (
                <a key={cta.label} href={cta.href} className="link-underline">
                  {cta.label} <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* center data label (phase C) */}
        <div className="hero-datalabel pointer-events-none absolute inset-0 z-[6] flex items-center justify-center">
          <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-bone">
            {HERO.centerLabel}
          </span>
        </div>

        {/* D. scroll cue */}
        <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {HERO.scrollLabel}
          </span>
          <span className="hero-cue-line block h-[48px] w-px origin-top bg-line" />
        </div>
      </div>
    </section>
  );
}
