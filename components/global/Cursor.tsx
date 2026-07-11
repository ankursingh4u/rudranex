"use client";

import { useEffect, useRef } from "react";

/**
 * Global layer — 6px bone dot (instant) + 34px ember ring lerping behind
 * (factor 0.16). Ring grows over interactives, shrinks over text; dot hides
 * over interactives. Desktop pointer only; off under reduced motion.
 * (Cursor is a viewport overlay, not a scroll-scene element — direct transforms
 * are fine here; the alignment laws govern GSAP scroll content.)
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-cursor");
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rpos = { ...mouse };
    let ringTarget = 1;
    let dotTarget = 1;
    let ringScale = 1;
    let dotScale = 1;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest?.("a, button, .card, [data-cursor='hover']")) {
        ringTarget = 1.8;
        dotTarget = 0;
      } else if (el.closest?.("h1, h2, p, .h-hero, .h-section")) {
        ringTarget = 0.6;
        dotTarget = 1;
      } else {
        ringTarget = 1;
        dotTarget = 1;
      }
    };

    const loop = () => {
      rpos.x += (mouse.x - rpos.x) * 0.16;
      rpos.y += (mouse.y - rpos.y) * 0.16;
      ringScale += (ringTarget - ringScale) * 0.2;
      dotScale += (dotTarget - dotScale) * 0.2;
      if (ring.current)
        ring.current.style.transform = `translate(${rpos.x}px, ${rpos.y}px) translate(-50%, -50%) scale(${ringScale})`;
      if (dot.current)
        dot.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(${dotScale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[34px] w-[34px] rounded-full border"
        style={{ borderColor: "var(--color-ember)", transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] rounded-full bg-bone"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
}
