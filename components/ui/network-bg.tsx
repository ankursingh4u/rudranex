"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}
interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
}

/**
 * Live "software network" background — drifting nodes linked by proximity lines
 * with glowing data packets streaming between them (evokes services / APIs /
 * data flow). Canvas-based, DPR-aware, pauses when off-screen, and renders a
 * single static frame under reduced motion.
 */
export function NetworkBg({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let raf = 0;

    const CONN = 140; // link distance

    const newPacket = (): Packet => {
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (b === a) b = (b + 1) % Math.max(1, nodes.length);
      return { a, b, t: 0, speed: rand(0.004, 0.011) };
    };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.min(96, Math.floor((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.22, 0.22),
        vy: rand(-0.22, 0.22),
        r: rand(0.8, 2.2),
      }));
      packets = Array.from({ length: Math.max(6, Math.floor(count / 10)) }, newPacket);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // drift
      for (const p of nodes) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // proximity links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < CONN) {
            ctx.strokeStyle = `rgba(61,125,255,${(1 - d / CONN) * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const p of nodes) {
        ctx.fillStyle = "rgba(200,218,255,0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // data packets
      for (const pk of packets) {
        pk.t += pk.speed;
        const A = nodes[pk.a];
        const B = nodes[pk.b];
        if (pk.t >= 1 || !A || !B) {
          Object.assign(pk, newPacket());
          continue;
        }
        const x = A.x + (B.x - A.x) * pk.t;
        const y = A.y + (B.y - A.y) * pk.t;
        ctx.shadowColor = "rgba(61,125,255,0.9)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "rgba(140,182,255,0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    init();
    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (reduced) return;
        if (e.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        init();
        if (reduced) draw();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(rt);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
