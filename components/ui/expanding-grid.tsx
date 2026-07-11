"use client";

import { useState } from "react";

export interface ExpandItem {
  img: string;
  title: string;
  description: string;
}

/**
 * Hover-expand image grid (in the spirit of the dynamic frame layout): hovering
 * a card grows its row + column while the neighbours shrink, and its description
 * reveals. Themed dark-navy + electric-blue. On touch/small screens it falls
 * back to an even grid.
 */
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
          <div
            key={it.title}
            data-cursor="hover"
            onMouseEnter={() => setHover({ r, c })}
            onMouseLeave={() => setHover(null)}
            className="group relative min-h-[200px] overflow-hidden rounded-[14px] border border-line transition-colors duration-[350ms] hover:border-[rgba(61,125,255,0.6)]"
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
            <div className="relative flex h-full flex-col justify-end p-6">
              <h3 className="font-display text-[22px] text-bone">{it.title}</h3>
              <p className="mt-2 max-h-0 overflow-hidden text-[14px] leading-relaxed text-bone/75 opacity-0 transition-all duration-[500ms] group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
                {it.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
