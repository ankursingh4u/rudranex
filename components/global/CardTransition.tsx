"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

export interface CardExpandDetail {
  img: string;
  title: string;
  href: string;
  rect: { left: number; top: number; width: number; height: number };
}

/** Dispatch from any card to run the expand-into-page transition. */
export const expandCard = (detail: CardExpandDetail) =>
  window.dispatchEvent(new CustomEvent("rudranex:card-expand", { detail }));

export const VIA_CARD_KEY = "rudranex:via-card";

/**
 * Global overlay: a clicked card's image expands from its exact rect to fill
 * the viewport, the route changes underneath, then the overlay fades to reveal
 * the service hero. Lives in the layout so it survives the navigation.
 */
export function CardTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [job, setJob] = useState<CardExpandDetail | null>(null);
  const phase = useRef<"idle" | "expanding" | "waiting">("idle");
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: Event) => {
      if (phase.current !== "idle") return;
      phase.current = "expanding";
      setJob((e as CustomEvent<CardExpandDetail>).detail);
    };
    window.addEventListener("rudranex:card-expand", on);
    return () => window.removeEventListener("rudranex:card-expand", on);
  }, []);

  // expand from the card's rect to the full viewport, then navigate
  useLayoutEffect(() => {
    const node = el.current;
    if (!job || !node || phase.current !== "expanding") return;
    const { rect } = job;
    try {
      sessionStorage.setItem(VIA_CARD_KEY, "1");
    } catch {}
    gsap.set(node, {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      borderRadius: 14,
      opacity: 1,
    });
    gsap.to(node, {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      duration: 0.75,
      ease: "power3.inOut",
      onComplete: () => {
        phase.current = "waiting";
        router.push(job.href);
      },
    });
    gsap.fromTo(".ct-title", { opacity: 1 }, { opacity: 0, y: -14, duration: 0.45, ease: "power2.in", delay: 0.2 });
  }, [job, router]);

  // destination mounted beneath us — fade the overlay away
  useEffect(() => {
    if (!job || phase.current !== "waiting" || pathname !== job.href) return;
    gsap.to(el.current, {
      opacity: 0,
      duration: 0.65,
      delay: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        phase.current = "idle";
        setJob(null);
      },
    });
  }, [pathname, job]);

  if (!job) return null;
  return (
    <div ref={el} aria-hidden className="fixed z-[9999] overflow-hidden" style={{ willChange: "left, top, width, height" }}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${job.img})` }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,11,20,0.25), rgba(7,11,20,0.9))" }} />
      <div className="ct-title absolute inset-x-0 bottom-0 p-6 md:p-10">
        <h3 className="font-display text-[1.375rem] text-white md:text-[2rem]">{job.title}</h3>
      </div>
    </div>
  );
}
