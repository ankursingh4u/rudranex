"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** PART4.3 — subtle stacking: each non-pinned section scales 1→0.985 + dims
 *  1→0.75 as it exits, giving depth as the next arrives. Skips [data-no-stack]
 *  (pinned + sticky sections) so pins/sticky aren't broken by an ancestor
 *  transform. */
export function SectionStacking() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const triggers: ScrollTrigger[] = [];
    const id = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("main > section:not([data-no-stack])").forEach((sec) => {
        const t = gsap.fromTo(
          sec,
          { scale: 1, opacity: 1 },
          {
            scale: 0.985,
            opacity: 0.75,
            ease: "none",
            scrollTrigger: { trigger: sec, start: "bottom 60%", end: "bottom 10%", scrub: true },
          },
        );
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      });
      ScrollTrigger.refresh();
    }, 200);
    return () => {
      clearTimeout(id);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
