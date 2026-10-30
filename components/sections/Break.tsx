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
      // Discrete swaps instead of a scrubbed timeline: scroll position only
      // picks WHICH phrase is active; the in/out tweens always run to
      // completion, so stopping mid-scroll never strands a half-blurred line.
      const build = (slot: number) => {
        gsap.set(lines, { opacity: 0 });
        let idx = -1;
        const show = (i: number, dir: 1 | -1) => {
          const prev = idx;
          idx = i;
          if (prev >= 0 && prev !== i) {
            gsap.to(lines[prev], {
              opacity: 0,
              y: -52 * dir,
              filter: "blur(12px)",
              scale: 1.03,
              duration: 0.4,
              ease: "power2.in",
              overwrite: true,
            });
          }
          gsap.fromTo(
            lines[i],
            { opacity: 0, y: 56 * dir, filter: "blur(14px)", scale: 0.96 },
            { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.65, ease: "expo.out", overwrite: true },
          );
        };
        const st = ScrollTrigger.create({
          trigger: scope,
          start: "top top",
          end: `+=${n * slot}`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const i = Math.min(n - 1, Math.floor(self.progress * n));
            if (i !== idx) show(i, self.direction === -1 ? -1 : 1);
          },
        });
        show(0, 1);
        return () => st.kill();
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => build(520));
      mm.add("(max-width: 767px)", () => build(340));
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
      {/* deep base — this section stays deliberately dark: the one cinematic
          moment on the light site, so colors here are literal, not tokens */}
      <div aria-hidden className="absolute inset-0 bg-[#070b14]" />
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

      <p
        className="eyebrow absolute top-[14vh] left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ color: "#8b95ac" }}
      >
        OUR WORK, IN A LINE
      </p>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        {LINES.map((l, i) => (
          <h2
            key={i}
            className="brk-line absolute max-w-[92vw] text-center font-display font-medium text-[#e9eef8]"
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
