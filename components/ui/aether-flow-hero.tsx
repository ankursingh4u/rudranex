"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { HERO } from "@/lib/content";

/**
 * Interactive particle-network hero (adapted from the "Aether Flow" component).
 * Recoloured to Ember & Bone: subtle bone particles on ink, faint links, and
 * ember links only near the cursor (ember stays rationed to the "active" role).
 * Text runs on Framer Motion, gated on the preloader's `rudranex:hero-entry`
 * event. Honors prefers-reduced-motion (static frame, no loop, text shown).
 */
type Mouse = { x: number | null; y: number | null; radius: number };

class Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;

  constructor(x: number, y: number, dx: number, dy: number, size: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(210, 224, 255, 0.32)"; // cool blue-white particles
    ctx.fill();
  }

  update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, mouse: Mouse) {
    if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
    if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

    if (mouse.x !== null && mouse.y !== null) {
      const ddx = mouse.x - this.x;
      const ddy = mouse.y - this.y;
      const distance = Math.sqrt(ddx * ddx + ddy * ddy);
      if (distance < mouse.radius + this.size) {
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= (ddx / distance) * force * 5;
        this.y -= (ddy / distance) * force * 5;
      }
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw(ctx);
  }
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 + 0.4, duration: 0.8, ease: "easeInOut" },
  }),
};

export default function AetherFlowHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);

  // sync text entry with the preloader wipe (fallback: start anyway)
  useEffect(() => {
    const on = () => setStarted(true);
    window.addEventListener("rudranex:hero-entry", on);
    const t = window.setTimeout(() => setStarted(true), 3200);
    return () => {
      window.removeEventListener("rudranex:hero-entry", on);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Particle[] = [];
    const mouse: Mouse = { x: null, y: null, radius: 200 };
    let animationFrameId = 0;

    const init = () => {
      particles = [];
      const count = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const dx = Math.random() * 0.4 - 0.2;
        const dy = Math.random() * 0.4 - 0.2;
        particles.push(new Particle(x, y, dx, dy, size));
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dist =
            (particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2;
          if (dist < (canvas.width / 7) * (canvas.height / 7)) {
            const opacity = 1 - dist / 20000;
            const dxm = particles[a].x - (mouse.x ?? -9999);
            const dym = particles[a].y - (mouse.y ?? -9999);
            const near = Math.sqrt(dxm * dxm + dym * dym) < mouse.radius;
            ctx.strokeStyle = near
              ? `rgba(61, 125, 255, ${opacity})` // electric blue near cursor (active)
              : `rgba(70, 95, 150, ${opacity})`; // dim blue elsewhere
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.fillStyle = "#070b14"; // ink (deep navy)
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) p.update(ctx, canvas, mouse);
      connect();
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
      if (reduce) render(); // keep static frame crisp on resize
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    if (reduce) {
      render();
      return () => window.removeEventListener("resize", resizeCanvas);
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      render();
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onOut);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const state = started ? "visible" : "hidden";

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden pt-24">
      <canvas ref={canvasRef} className="absolute left-0 top-0 h-full w-full" aria-hidden />

      <div className="relative z-10 p-6 text-center">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate={state}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-line)] bg-[color:var(--glass-bg)] px-4 py-1.5 backdrop-blur-sm"
        >
          <Zap className="h-4 w-4 text-ember" strokeWidth={1.5} />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {HERO.eyebrow}
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate={state}
          className="h-hero mx-auto max-w-4xl font-display font-medium text-bone"
        >
          Building Digital Solutions for the Next <em>Era</em>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate={state}
          className="body-lg mx-auto mt-8 max-w-2xl text-muted"
        >
          {HERO.sub}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate={state}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href={HERO.ctas[0].href}
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full bg-bone px-8 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-[#fffaf2]"
          >
            {HERO.ctas[0].label}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
          <a href={HERO.ctas[1].href} data-cursor="hover" className="link-underline">
            {HERO.ctas[1].label} <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
