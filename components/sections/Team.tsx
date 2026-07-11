"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { BlurText } from "@/components/ui/blur-text";
import { TEAM } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** [Team] — founder + senior engineer. Cards do a 3D staggered entrance on
 *  scroll and tilt toward the cursor (quickTo). Names/roles/text use the
 *  BlurText blur-reveal; photos zoom on hover. Tilt is disabled on touch and
 *  under reduced motion. */
export function Team() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const cards = gsap.utils.toArray<HTMLElement>(".team-card", scope);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const noHover = window.matchMedia("(hover: none)").matches;

      // 3D staggered entrance
      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0, rotateY: 0, scale: 1 });
      } else {
        gsap.set(cards, { opacity: 0, y: 60, rotateY: 10, scale: 0.94, transformOrigin: "center center" });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: EASE_OUT,
          stagger: 0.15,
          scrollTrigger: { trigger: scope, start: "top 78%", once: true },
        });
      }

      // Cursor tilt — one quickTo pair per card
      if (reduced || noHover) return;
      const cleanups: Array<() => void> = [];
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".team-tilt");
        if (!inner) return;
        const rotX = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });
        const rotY = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rotY(px * 12);
          rotX(-py * 12);
        };
        const leave = () => {
          rotX(0);
          rotY(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root },
  );

  return (
    <section id="team" ref={root} className="section" data-no-stack>
      <div className="container-x">
        <Eyebrow>{TEAM.eyebrow}</Eyebrow>
        <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
          The people who <em>build</em> it.
        </LineReveal>

        <div className="mx-auto mt-10 grid max-w-[620px] gap-6 md:grid-cols-2" style={{ perspective: "1400px" }}>
          {TEAM.members.map((m) => {
            const isLink = Boolean(m.link);
            const common =
              "team-card group block h-full rounded-[18px] [transform-style:preserve-3d]";
            const inner = (
              <div
                className="team-tilt flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-ink-2 transition-colors duration-[350ms] [transform-style:preserve-3d] group-hover:border-[rgba(61,125,255,0.5)]"
              >
                <div className="relative h-[clamp(200px,26vh,300px)] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.name}
                    style={{ objectPosition: m.imgPos }}
                    className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(30px)" }}>
                  <div className="border-b border-line pb-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">{m.role}</p>
                    <BlurText
                      text={m.name}
                      animateBy="letters"
                      delay={40}
                      className="mt-1.5 font-display text-[22px] font-medium leading-none text-bone"
                    />
                  </div>

                  {isLink ? (
                    <BlurText
                      text={m.text}
                      animateBy="words"
                      delay={28}
                      className="mt-4 text-[14px] leading-relaxed text-muted"
                    />
                  ) : (
                    <>
                      <BlurText
                        text={`“${m.text}”`}
                        animateBy="words"
                        delay={28}
                        className="mt-4 font-display text-[16px] italic leading-relaxed text-bone/85"
                      />
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        — Jatin Prajapati, Founder &amp; CEO, Rudranex
                      </p>
                    </>
                  )}

                  {isLink && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-bone">
                      Visit ankursingh.site
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-[350ms] group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </span>
                  )}
                </div>
              </div>
            );

            return isLink ? (
              <a
                key={m.name}
                href={m.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className={common}
              >
                {inner}
              </a>
            ) : (
              <div key={m.name} className={common}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
