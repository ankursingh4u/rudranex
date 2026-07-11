"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Word-by-word "reading" reveal — each word brightens opacity 0.15→1
 *  sequentially, scrubbed to scroll. Final state under reduced motion. */
export function WordScrub({
  text,
  as = "p",
  className = "",
  start = "top 80%",
  end = "top 40%",
}: {
  text: string;
  as?: "p" | "blockquote";
  className?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const spans = el.querySelectorAll(".ws-word");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(spans, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        spans,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: { each: 0.5 },
          scrollTrigger: { trigger: el, start, end, scrub: true },
        },
      );
    },
    { scope: ref },
  );

  const Comp = as as ElementType;
  return (
    <Comp ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="ws-word">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Comp>
  );
}
