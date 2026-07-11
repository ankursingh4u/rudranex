"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { NetworkBg } from "@/components/ui/network-bg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Phrases that swap one-by-one as the section is pinned and scrolled. The
 *  emphasized word renders in the ember accent (themed <em>). */
const LINES = [
  { plain: "What we've", em: "shipped." },
  { plain: "Fintech that", em: "scales." },
  { plain: "Commerce that", em: "converts." },
  { plain: "AI that actually", em: "ships." },
  { plain: "Software teams can", em: "trust." },
];

/** [6] Cinematic interlude — a pinned section with a slow-drifting blue aurora
 *  background. As the user scrolls, each phrase blurs + rises into focus and the
 *  previous one lifts away, so the headline keeps changing under the cursor. A
 *  thin progress bar tracks position. Reduced motion / mobile fall back to a
 *  shorter, calmer version. */
export function Break() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const lines = gsap.utils.toArray<HTMLElement>(".brk-line", scope);
      if (!lines.length) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(lines, { opacity: 0 });
        gsap.set(lines[0], { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 });
        return;
      }

      const n = lines.length;
      const build = (slot: number) => {
        gsap.set(lines, { opacity: 0, y: 64, filter: "blur(16px)", scale: 0.95 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: `+=${n * slot}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
        lines.forEach((el, i) => {
          tl.fromTo(
            el,
            { opacity: 0, y: 64, filter: "blur(16px)", scale: 0.95 },
            { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.55, ease: "expo.out" },
            i,
          );
          if (i < n - 1) {
            tl.to(
              el,
              { opacity: 0, y: -64, filter: "blur(16px)", scale: 1.04, duration: 0.45, ease: "power2.in" },
              i + 0.55,
            );
          }
        });
        return () => tl.scrollTrigger?.kill();
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => build(560));
      mm.add("(max-width: 767px)", () => build(360));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-no-stack
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* deep base */}
      <div aria-hidden className="absolute inset-0 bg-ink" />
      {/* live software-network canvas */}
      <NetworkBg className="absolute inset-0 h-full w-full" />
      {/* subtle depth glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(90% 70% at 50% -10%, rgba(61,125,255,0.14), transparent 60%)",
        }}
      />
      {/* vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 50%, rgba(7,11,20,0.15), rgba(7,11,20,0.82))" }}
      />

      <p className="eyebrow absolute top-[14vh] left-1/2 z-10 -translate-x-1/2 text-center">
        OUR WORK, IN A LINE
      </p>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        {LINES.map((l, i) => (
          <h2
            key={i}
            className="brk-line absolute max-w-[92vw] text-center font-display font-medium text-bone"
            style={{ fontSize: "clamp(38px, 7vw, 104px)", lineHeight: 0.98 }}
            aria-label={`${l.plain} ${l.em}`}
          >
            {l.plain} <em>{l.em}</em>
          </h2>
        ))}
      </div>
    </section>
  );
}
