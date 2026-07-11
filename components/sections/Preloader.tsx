"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/SmoothScroll";
import { EASE_OUT, EASE_FLOW } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const KEY = "rudranex_preloaded_v2";
const LETTERS = "RUDRANEX".split("");

/** [0] Preloader — once per session. Letters rise, counter 00→100, letters
 *  exit, two ink panels wipe apart vertically; fires `rudranex:hero-entry` at
 *  t=2.0 so the hero reveals mid-wipe. Skipped (and hero fired immediately)
 *  when already seen or under reduced motion. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    const fireHero = () => window.dispatchEvent(new Event("rudranex:hero-entry"));
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      if (root.current) root.current.style.display = "none";
      requestAnimationFrame(() => {
        fireHero();
        ScrollTrigger.refresh();
      });
      return;
    }

    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();

    const ctx = gsap.context(() => {
      const c = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.body.style.overflow = "";
          lenisRef.current?.start();
          if (root.current) root.current.style.display = "none";
          ScrollTrigger.refresh();
        },
      });

      gsap.set(".pl-letter", { yPercent: 110 });

      tl.to(".pl-letter", { yPercent: 0, stagger: 0.045, duration: 0.8, ease: EASE_OUT }, 0)
        .to(
          c,
          {
            v: 100,
            duration: 1.6,
            snap: { v: 1 },
            ease: "none",
            onUpdate: () => {
              if (counter.current)
                counter.current.textContent = String(Math.round(c.v)).padStart(2, "0") + " — 100";
            },
          },
          0,
        )
        .to(".pl-letter", { yPercent: -110, stagger: 0.03, duration: 0.5, ease: EASE_OUT }, 1.7)
        .to(".pl-content", { opacity: 0, duration: 0.3 }, 1.9)
        .to(".pl-top", { yPercent: -100, duration: 0.9, ease: EASE_FLOW }, 1.9)
        .to(".pl-bottom", { yPercent: 100, duration: 0.9, ease: EASE_FLOW }, 1.9)
        .call(fireHero, [], 2.0);
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[9999]" aria-hidden>
      <div className="pl-top absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div className="pl-bottom absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
      <div className="pl-content absolute inset-0">
        <span
          ref={counter}
          className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-[0.18em] text-faint"
        >
          00 — 100
        </span>
        <div className="flex h-full items-center justify-center">
          <div className="flex font-display text-[40px] font-medium tracking-[0.02em] text-bone">
            {LETTERS.map((l, i) => (
              <span key={i} className="line-mask">
                <span className="pl-letter inline-block">{l}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
