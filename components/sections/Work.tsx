"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { WORK } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SPARKS = [
  "M0 40 L30 34 L60 38 L90 22 L120 26 L150 10",
  "M0 30 L30 36 L60 20 L90 24 L120 12 L150 16",
  "M0 44 L30 30 L60 34 L90 18 L120 22 L150 6",
  "M0 36 L30 24 L60 28 L90 14 L120 18 L150 8",
];

// decorative dashboard metrics (fake-but-plausible per the brief's allowance)
const METRICS = [
  { value: "+42%", change: "18%", bars: [40, 55, 48, 70, 62, 85], a: "Q1", b: "Q4" },
  { value: "40+", change: "12", bars: [30, 45, 50, 60, 72, 90], a: "2019", b: "2026" },
  { value: "3.4x", change: "24%", bars: [50, 42, 60, 55, 78, 88], a: "Reach", b: "Convert" },
  { value: "12mo", change: "9%", bars: [45, 52, 48, 66, 74, 82], a: "Plan", b: "Ship" },
];

function Panel({ i, b, spark }: { i: number; b: (typeof WORK)[number]; spark?: boolean }) {
  const m = METRICS[i];
  return (
    <div className="relative flex h-full flex-col">
      {/* faint grid backdrop → dashboard feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,238,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(233,238,248,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{b.title}</p>
          <div className="mt-2 font-display text-[40px] leading-none text-bone">{m.value}</div>
        </div>
        <span className="rounded-full bg-[rgba(61,125,255,0.15)] px-2.5 py-1 font-mono text-[11px] text-ember">
          ▲ {m.change}
        </span>
      </div>
      <div className="relative mt-6 flex flex-1 items-end gap-2">
        {m.bars.map((h, bi) => (
          <div
            key={bi}
            className="flex-1 rounded-t-[3px]"
            style={{ height: `${h}%`, background: "linear-gradient(180deg, rgba(61,125,255,0.65), rgba(61,125,255,0.12))" }}
          />
        ))}
      </div>
      <svg viewBox="0 0 150 50" preserveAspectRatio="none" className="mt-4 h-[42px] w-full">
        <path
          className={spark ? `work-spark-${i}` : ""}
          d={SPARKS[i]}
          fill="none"
          stroke="#3d7dff"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
        <span>{m.a}</span>
        <span>{m.b}</span>
      </div>
    </div>
  );
}

/** [7] Sticky media swap — left blocks scroll, right glass panel crossfades +
 *  scales to the centered block; its sparkline redraws on each swap. */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      const blocks = gsap.utils.toArray<HTMLElement>(".work-block", scope);
      const triggers = blocks.map((b, i) =>
        ScrollTrigger.create({
          trigger: b,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );

      // staggered card entrance for the left blocks
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      if (!reduce) {
        gsap.from(blocks, {
          y: 40,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: "top 78%", once: true },
        });
      }
      // scroll-driven 3D tilt on the sticky media panel
      if (!reduce && desktop) {
        gsap.fromTo(
          ".work-panel",
          { rotateX: 6 },
          {
            rotateX: -6,
            ease: "none",
            scrollTrigger: { trigger: scope, start: "top center", end: "bottom center", scrub: true },
          },
        );
      }
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: root },
  );

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = scope.querySelectorAll<HTMLElement>(".work-layer");
    const blocks = scope.querySelectorAll<HTMLElement>(".work-block");
    layers.forEach((l, i) => {
      if (reduce) {
        l.style.opacity = i === active ? "1" : "0";
        return;
      }
      if (i === active)
        gsap.fromTo(l, { opacity: 0, y: 24, scale: 1.04 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "expo.out" });
      else gsap.to(l, { opacity: 0, y: -16, scale: 0.98, duration: 0.35, ease: "power3.inOut" });
    });
    blocks.forEach((b, i) => gsap.to(b, { opacity: i === active ? 1 : 0.3, duration: 0.4, ease: "power3.inOut" }));
    const path = scope.querySelector<SVGPathElement>(`.work-spark-${active}`);
    if (path && !reduce) {
      const len = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.8, ease: "expo.out" });
    }
  }, [active]);

  return (
    <section id="work" className="section" data-no-stack ref={root}>
      <div className="container-x">
        <Eyebrow>BEYOND SOFTWARE</Eyebrow>
        <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
          A <em>full-stack</em> business partner.
        </LineReveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="lg:space-y-[28vh]">
            {WORK.map((b, i) => (
              <div
                key={b.title}
                className="work-block flex flex-col justify-center rounded-[14px] border border-line bg-ink-2 p-8 lg:min-h-[420px]"
                style={{ opacity: 0.3 }}
              >
                <span className="font-mono text-[13px] text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3 mt-3 font-display text-bone">{b.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 h-[280px] glass rounded-[14px] p-8 lg:hidden">
                  <Panel i={i} b={b} />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-[20vh]" style={{ perspective: 1000 }}>
              <div
                className="work-panel relative h-[420px] w-full max-w-[480px] overflow-hidden rounded-[14px] glass"
                style={{ transformStyle: "preserve-3d" }}
              >
                {WORK.map((b, i) => (
                  <div key={b.title} className="work-layer absolute inset-0 p-9" style={{ opacity: i === 0 ? 1 : 0 }}>
                    <Panel i={i} b={b} spark />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
