"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { CTA, FOOTER, NAV_LINKS } from "@/lib/content";
import { VIDEO_1 } from "@/lib/assets";
import { EASE_OUT } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Turn a contact string into a real mailto:/tel: link (or null for plain text). */
const contactHref = (v: string): string | null =>
  v.includes("@") ? `mailto:${v}` : /^\+?[\d\s]+$/.test(v) ? `tel:${v.replace(/\s+/g, "")}` : null;

/** Magnetic "Launch a Project" — bone pill; an ember circle wipes from the
 *  cursor entry point on hover (text stays ink). */
function LaunchButton() {
  const btn = useRef<HTMLAnchorElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = btn.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let inside = false;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < 90) {
        inside = true;
        target.x = Math.max(-10, Math.min(10, dx * 0.4));
        target.y = Math.max(-10, Math.min(10, dy * 0.4));
      } else if (inside) {
        inside = false;
        target.x = target.y = 0;
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: EASE_OUT });
      }
    };
    const loop = () => {
      if (inside) {
        cur.x += (target.x - cur.x) * 0.18;
        cur.y += (target.y - cur.y) * 0.18;
        gsap.set(el, { x: cur.x, y: cur.y });
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const enter = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.set(fill.current, { left: e.clientX - r.left - 150, top: e.clientY - r.top - 150, scale: 0 });
    gsap.to(fill.current, { scale: 2.5, duration: 0.5, ease: EASE_OUT });
  };
  const leave = () => gsap.to(fill.current, { scale: 0, duration: 0.5, ease: EASE_OUT });

  return (
    <a
      ref={btn}
      href="mailto:hello@rudranex.in?subject=New%20project%20inquiry"
      data-cursor="hover"
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="relative inline-flex overflow-hidden rounded-full bg-bone px-8 py-4"
    >
      <span
        ref={fill}
        aria-hidden
        className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-ember"
        style={{ scale: 0 }}
      />
      <span className="relative font-mono text-[12px] uppercase tracking-[0.18em] text-ink">
        {CTA.button} →
      </span>
    </a>
  );
}

export function CtaFooter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        scope.querySelector(".cta-video"),
        { scale: 1 },
        {
          scale: 1.1,
          ease: "none",
          scrollTrigger: { trigger: scope.querySelector(".cta-block"), start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(scope.querySelectorAll(".foot-col"), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.querySelector(".site-footer"), start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="contact" data-no-stack ref={root}>
      <div className="cta-block relative flex h-[90vh] items-center justify-center overflow-hidden">
        <video
          className="cta-video absolute inset-0 h-full w-full object-cover"
          src={VIDEO_1}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ opacity: 0.25 }}
        />
        <div aria-hidden className="absolute inset-0 bg-ink/70" />
        <div className="container-x relative z-10 text-center">
          <Eyebrow>{CTA.eyebrow}</Eyebrow>
          <LineReveal
            as="h2"
            className="h-section mx-auto mt-6 max-w-4xl font-display text-bone"
            start="top 80%"
            end="top 50%"
          >
            People who build this, can build <em>anything</em>.
          </LineReveal>
          <div className="mt-10 flex justify-center">
            <LaunchButton />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
            {CTA.contact.map((c) => {
              const href = contactHref(c);
              return href ? (
                <a key={c} href={href} data-cursor="hover" className="transition-colors hover:text-ember">
                  {c}
                </a>
              ) : (
                <span key={c}>{c}</span>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="site-footer border-t border-line">
        <div className="container-x grid gap-10 py-16 md:grid-cols-3">
          <div className="foot-col">
            <p className="font-display text-[18px] text-bone">RUDRANEX</p>
            <p className="mt-4 max-w-xs text-[14px] text-muted">{FOOTER.tagline}</p>
          </div>
          <div className="foot-col">
            <p className="eyebrow mb-4">EXPLORE</p>
            <ul className="space-y-2.5 text-[14px]">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-muted transition-colors hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot-col">
            <p className="eyebrow mb-4">CONNECT</p>
            <ul className="space-y-2.5 text-[14px] text-muted">
              {FOOTER.connect.map((c) => {
                const href = contactHref(c);
                return (
                  <li key={c}>
                    {href ? (
                      <a href={href} className="transition-colors hover:text-bone">
                        {c}
                      </a>
                    ) : (
                      <span>{c}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="container-x py-6 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            {FOOTER.copyright}
          </div>
        </div>
      </footer>
    </section>
  );
}
