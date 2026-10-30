"use client";

import Link from "next/link";
import { expandCard } from "@/components/global/CardTransition";

export interface ExpandItem {
  img: string;
  title: string;
  description: string;
  /** when set, the whole card is a link (service detail page) */
  href?: string;
}

/**
 * Service card grid. Hover is deliberately cheap — transform/opacity only
 * (image zoom, card lift, pointer-tracked light sweep via CSS vars, no rAF).
 * The iconic move is the click: the card itself expands into the detail page
 * (CardTransition overlay). Keyboard/touch/reduced-motion fall back to a
 * normal navigation.
 */
function ServiceCard({ it }: { it: ExpandItem }) {
  // pointer-tracked sweep: write CSS vars straight from the event — no loop
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!it.href) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // plain nav
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // respect new-tab
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    expandCard({
      img: it.img,
      title: it.title,
      href: it.href,
      rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
    });
  };

  const body = (
    <article
      onPointerMove={onMove}
      className="group relative h-full min-h-[240px] overflow-hidden rounded-[14px] border border-line shadow-card transition-[transform,border-color,box-shadow] duration-500 ease-out group-has-[:focus-visible]:border-ember hover:-translate-y-1.5 hover:border-[rgba(37,99,235,0.55)] hover:shadow-[0_24px_60px_-20px_rgba(13,20,40,0.35)]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        style={{ backgroundImage: `url(${it.img})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(7,11,20,0.25), rgba(7,11,20,0.9))" }}
      />
      {/* pointer-tracked light sweep (pure CSS, driven by --mx/--my) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.22), transparent 65%)",
        }}
      />
      {/* text sits on the dark photo scrim, so it stays light in any theme */}
      <div className="relative flex h-full flex-col justify-end p-6">
        <h3 className="font-display text-[1.375rem] text-white">{it.title}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-[0.875rem] leading-relaxed text-white/75 opacity-0 transition-all duration-[500ms] group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
          {it.description}
        </p>
        {it.href && (
          <span className="mt-0 flex max-h-0 items-center gap-2 overflow-hidden font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[#9db8f5] opacity-0 transition-all duration-[500ms] group-hover:mt-4 group-hover:max-h-8 group-hover:opacity-100">
            Explore service{" "}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        )}
      </div>
    </article>
  );

  return it.href ? (
    <Link
      href={it.href}
      onClick={onClick}
      data-cursor="hover"
      className="group block"
      aria-label={`${it.title} — explore service`}
    >
      {body}
    </Link>
  ) : (
    <div data-cursor="hover" className="group">
      {body}
    </div>
  );
}

export function ExpandingGrid({ items, cols = 3 }: { items: ExpandItem[]; cols?: number }) {
  const lgCols = cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${lgCols}`}>
      {items.map((it) => (
        <ServiceCard key={it.title} it={it} />
      ))}
    </div>
  );
}
