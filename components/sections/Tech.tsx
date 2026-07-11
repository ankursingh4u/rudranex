"use client";

import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { Gravity, MatterBody, type GravityRef } from "@/components/ui/gravity";
import { TECH_GROUPS } from "@/lib/content";

const PILLS = TECH_GROUPS.flatMap((g) => g.items); // 16 tech names
const XPOS = ["8%", "24%", "40%", "56%", "72%", "88%"];

/** [8] Tech — matter-js gravity playground. The 16 tech names drop in and can
 *  be dragged/thrown around. Engine runs only while the section is on-screen. */
export function Tech() {
  const gravityRef = useRef<GravityRef>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) gravityRef.current?.start();
          else gravityRef.current?.stop();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="tech" className="section" ref={sectionRef}>
      <div className="container-x">
        <Eyebrow>THE TOOLS WE WIELD</Eyebrow>
        <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
          Known like a <em>craftsman</em> knows their hands.
        </LineReveal>
        <p className="body-lg mt-6 max-w-xl text-muted">Drag the stack around — it&apos;s alive.</p>
      </div>

      <div className="relative mt-12 h-[520px] w-full overflow-hidden">
        <Gravity ref={gravityRef} gravity={{ x: 0, y: 1 }} autoStart={false}>
          {PILLS.map((name, i) => (
            <MatterBody
              key={name}
              x={XPOS[i % XPOS.length]}
              y={`${5 + (i % 5) * 6}%`}
              angle={(i % 2 === 0 ? -1 : 1) * (5 + (i % 3) * 5)}
              matterBodyOptions={{ friction: 0.3, restitution: 0.5 }}
            >
              <div
                className={`select-none rounded-full border px-6 py-3 font-mono text-sm uppercase tracking-[0.1em] ${
                  i % 3 === 0
                    ? "border-transparent bg-ember text-ink"
                    : "border-line bg-ink-2 text-bone"
                }`}
              >
                {name}
              </div>
            </MatterBody>
          ))}
        </Gravity>
      </div>
    </section>
  );
}
