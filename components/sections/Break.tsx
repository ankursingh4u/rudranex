"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

      // ambient aurora drift — independent of scroll
      gsap.to(".brk-glow-a", { xPercent: 22, yPercent: -16, duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".brk-glow-b", { xPercent: -20, yPercent: 14, duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut" });

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
        // background hue/position drift + progress bar span the whole timeline
        tl.fromTo(".brk-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: n }, 0);
        tl.fromTo(".brk-bg", { backgroundPosition: "50% 0%" }, { backgroundPosition: "50% 100%", ease: "none", duration: n }, 0);
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
      {/* base + drifting gradient wash */}
      <div
        aria-hidden
        className="brk-bg absolute inset-0 bg-ink"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 50% -10%, rgba(61,125,255,0.16), transparent 60%), radial-gradient(100% 80% at 50% 120%, rgba(61,125,255,0.10), transparent 60%)",
          backgroundSize: "100% 200%",
        }}
      />
      {/* aurora blobs */}
      <div
        aria-hidden
        className="brk-glow-a pointer-events-none absolute -left-[12%] top-[6%] h-[72vh] w-[72vh] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(61,125,255,0.30), transparent 70%)", filter: "blur(50px)" }}
      />
      <div
        aria-hidden
        className="brk-glow-b pointer-events-none absolute -right-[8%] bottom-[2%] h-[64vh] w-[64vh] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(88,150,255,0.20), transparent 70%)", filter: "blur(60px)" }}
      />
      {/* fine grid + grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,238,248,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(233,238,248,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 50%, transparent, rgba(7,11,20,0.78))" }}
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

      {/* scroll progress bar */}
      <div aria-hidden className="absolute bottom-[10vh] left-1/2 z-10 h-px w-[min(38vw,360px)] -translate-x-1/2 overflow-hidden bg-line">
        <div className="brk-progress h-full w-full origin-left bg-ember" style={{ transform: "scaleX(0)" }} />
      </div>
    </section>
  );
}
