"use client";

import { useEffect, useRef } from "react";

/**
 * Rotating point-sphere (Fibonacci distribution, perspective-projected) drawn on
 * canvas — a calm "alive" accent in the cinetica spirit. Electric-blue points,
 * depth-faded. Static single frame under reduced motion.
 */
export function ParticleSphere({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const N = 620;
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let angle = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      for (const p of pts) {
        const x = p.x * cosA - p.z * sinA;
        const z = p.x * sinA + p.z * cosA;
        const persp = 1 / (2 - z);
        const sx = cx + x * R * persp * 1.2;
        const sy = cy + p.y * R * persp * 1.2;
        const alpha = (z + 1.3) / 2.6;
        const size = Math.max(0.4, (z + 1.5) * 1.0 * dpr);
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61, 125, 255, ${alpha * 0.7})`;
        ctx.fill();
      }
    };

    resize();
    if (reduce) {
      render();
      const onResize = () => {
        resize();
        render();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const loop = () => {
      angle += 0.0035;
      render();
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("resize", resize);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
