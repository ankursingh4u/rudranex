"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MARQUEE } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** [3] Tech marquee — seamless loop (xPercent 0→-50, 38s linear), slows to
 *  0.25× on hover; wrapper carries a scrubbed ±4% drift on top of the loop. */
export function Marquee() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const loop = [...MARQUEE, ...MARQUEE];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !track.current) return;
      tween.current = gsap.to(track.current, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      gsap.fromTo(
        wrap.current,
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      // scroll-velocity physics: the track skews with scroll speed and springs
      // back to rest; the loop itself briefly runs faster while you fling
      const skewSetter = gsap.quickSetter(track.current, "skewX", "deg");
      const clampSkew = gsap.utils.clamp(-9, 9);
      const proxy = { skew: 0 };
      ScrollTrigger.create({
        trigger: wrap.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = clampSkew(self.getVelocity() / -260);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.9,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
            if (tween.current)
              gsap.fromTo(
                tween.current,
                { timeScale: 1 + Math.abs(skew) * 0.35 },
                { timeScale: 1, duration: 1.1, ease: "power2.out", overwrite: "auto" },
              );
          }
        },
      });
    },
    { scope: wrap },
  );

  const setSpeed = (timeScale: number) => {
    if (tween.current) gsap.to(tween.current, { timeScale, duration: 0.6, overwrite: true });
  };

  return (
    <section
      className="border-y border-line"
      onMouseEnter={() => setSpeed(0.25)}
      onMouseLeave={() => setSpeed(1)}
    >
      <div ref={wrap} className="overflow-hidden py-[26px]">
        <div ref={track} className="flex w-max items-center gap-8 whitespace-nowrap">
          {loop.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-faint">
                {item}
              </span>
              <span aria-hidden className="text-ember/50">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
