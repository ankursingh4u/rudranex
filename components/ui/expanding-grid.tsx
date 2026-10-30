"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface ExpandItem {
  img: string;
  title: string;
  description: string;
  /** when set, the whole card is a link (service detail page) */
  href?: string;
}

/**
 * Hover-expand image grid: hovering a card grows its row + column while the
 * neighbours shrink and its description reveals. Each card is also a sprung
 * 3D tilt surface (pointer-tracked, lerped) with a light sweep, and links to
 * its detail page. On touch/small screens it falls back to an even grid.
 */
function TiltCard({
  it,
  onEnter,
  onLeave,
}: {
  it: ExpandItem;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const card = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);

  // spring-lerped 3D tilt: target follows pointer, current eases toward it
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { rx: 0, ry: 0, sx: 50, sy: 50, o: 0 };
    const cur = { rx: 0, ry: 0, sx: 50, sy: 50, o: 0 };
    let raf = 0;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      target.ry = (px - 0.5) * 10;
      target.rx = (0.5 - py) * 8;
      target.sx = px * 100;
      target.sy = py * 100;
      target.o = 1;
    };
    const leave = () => {
      target.rx = target.ry = 0;
      target.o = 0;
    };
    const loop = () => {
      cur.rx += (target.rx - cur.rx) * 0.12;
      cur.ry += (target.ry - cur.ry) * 0.12;
      cur.sx += (target.sx - cur.sx) * 0.12;
      cur.sy += (target.sy - cur.sy) * 0.12;
      cur.o += (target.o - cur.o) * 0.1;
      el.style.transform = `perspective(900px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg)`;
      if (shine.current) {
        shine.current.style.opacity = String(cur.o * 0.5);
        shine.current.style.background = `radial-gradient(420px circle at ${cur.sx}% ${cur.sy}%, rgba(255,255,255,0.35), transparent 65%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const inner = (
    <div
      ref={card}
      className="group relative h-full min-h-[200px] overflow-hidden rounded-[14px] border border-line shadow-card transition-colors duration-[350ms] hover:border-[rgba(37,99,235,0.55)]"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[700ms] ease-out group-hover:scale-[1.08]"
        style={{ backgroundImage: `url(${it.img})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(7,11,20,0.25), rgba(7,11,20,0.9))" }}
      />
      {/* pointer-tracked light sweep */}
      <div aria-hidden ref={shine} className="pointer-events-none absolute inset-0 opacity-0" />
      {/* text sits on the dark photo scrim, so it stays light in any theme */}
      <div className="relative flex h-full flex-col justify-end p-6">
        <h3 className="font-display text-[1.375rem] text-white">{it.title}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-[0.875rem] leading-relaxed text-white/75 opacity-0 transition-all duration-[500ms] group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
          {it.description}
        </p>
        {it.href && (
          <span className="mt-0 flex max-h-0 items-center gap-2 overflow-hidden font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[#9db8f5] opacity-0 transition-all duration-[500ms] group-hover:mt-4 group-hover:max-h-8 group-hover:opacity-100">
            Explore service <span aria-hidden>→</span>
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div data-cursor="hover" onMouseEnter={onEnter} onMouseLeave={onLeave} className="min-h-[200px]">
      {it.href ? (
        <Link href={it.href} className="block h-full focus-visible:rounded-[14px]" aria-label={`${it.title} — explore service`}>
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}

export function ExpandingGrid({ items, cols = 3 }: { items: ExpandItem[]; cols?: number }) {
  const rows = Math.ceil(items.length / cols);
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);

  const sizes = (count: number, hovered: number | null, grow: number) => {
    if (hovered === null) return Array(count).fill("1fr").join(" ");
    const others = (count - (1 + grow)) / (count - 1);
    return Array.from({ length: count }, (_, i) => (i === hovered ? `${1 + grow}fr` : `${others}fr`)).join(" ");
  };

  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: sizes(cols, hover?.c ?? null, 1.1),
        gridTemplateRows: sizes(rows, hover?.r ?? null, 0.7),
        transition: "grid-template-columns 0.45s ease, grid-template-rows 0.45s ease",
        minHeight: `${rows * 230}px`,
      }}
    >
      {items.map((it, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        return (
          <TiltCard
            key={it.title}
            it={it}
            onEnter={() => setHover({ r, c })}
            onLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
}
