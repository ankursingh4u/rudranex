"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Line-split heading — lines masked in overflow-hidden wrappers rise y:110%→0,
 *  scrubbed. Accepts children so an ember <em> word survives inside a line.
 *  Re-splits on resize/font load (autoSplit). Final state under reduced motion. */
export function LineReveal({
  as = "h2",
  className = "",
  children,
  start = "top 88%",
  end = "top 55%",
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "reveal-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start, end, scrub: true },
          }),
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  const Comp = as as ElementType;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
