"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Mono eyebrow — fades in while letter-spacing eases 0.4em→0.18em, scrubbed. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        el,
        { opacity: 0, letterSpacing: "0.4em" },
        {
          opacity: 1,
          letterSpacing: "0.18em",
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 66%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={`eyebrow ${className}`}>
      {children}
    </p>
  );
}
