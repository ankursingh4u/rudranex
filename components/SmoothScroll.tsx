"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LENIS_CONFIG } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/**
 * Lenis smooth scroll synced to GSAP (Law: one rAF, ScrollTrigger driven by
 * Lenis). Refreshes ScrollTrigger after fonts load and on debounced resize
 * (L3). Skips Lenis entirely under reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafId = useRef(0);

  useEffect(() => {
    // L3 — recompute after fonts settle (line splits / pins depend on metrics)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    // L3 — debounced resize refresh
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", onResize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", onResize);
      };
    }

    const instance = new Lenis(LENIS_CONFIG);
    setLenis(instance);
    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Global smooth in-page anchor scrolling so EVERY "#…" link (nav, cards,
    // footer, CTAs) lands the section's heading just below the fixed 76px nav.
    // Sections carry a large top padding (up to 140px); landing on the section
    // top edge would leave the heading floating far under the nav — so we eat
    // most of that padding and drop the content to NAV + BREATHE from the top.
    const NAV = 76;
    const BREATHE = 22;
    // Lenis: finalScroll = elementTop + offset; heading sits at elementTop +
    // paddingTop, so heading-from-top = paddingTop - offset. Solve for offset.
    const offsetFor = (el: Element) => {
      if (el === document.documentElement) return 0;
      const padTop = parseFloat(getComputedStyle(el).paddingTop) || 0;
      return padTop - NAV - BREATHE;
    };
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const href = a?.getAttribute("href");
      if (!a || !href || href.length < 2) return;
      const el = href === "#top" ? document.documentElement : document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      instance.scrollTo(el as HTMLElement, { offset: offsetFor(el), duration: 1.2 });
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onAnchorClick);

    // land on the right place if the page is opened with a #hash
    const onLoaded = () => {
      const hash = window.location.hash;
      if (hash.length > 1) {
        const el = document.querySelector(hash);
        if (el) instance.scrollTo(el as HTMLElement, { offset: offsetFor(el), immediate: true });
      }
      ScrollTrigger.refresh();
    };
    const loadedTimer = window.setTimeout(onLoaded, 300);

    return () => {
      clearTimeout(t);
      clearTimeout(loadedTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      instance.destroy();
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
