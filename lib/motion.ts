/** Motion grammar — the only eases used site-wide. Calm = premium. */
export const EASE_OUT = "expo.out"; // entries
export const EASE_FLOW = "power3.inOut"; // scrubbed movement

/** Lenis configuration (exact, per spec). */
export const LENIS_CONFIG = {
  duration: 1.15,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
};

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
