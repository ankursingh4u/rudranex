"use client";

import { ExpandingGrid, type ExpandItem } from "@/components/ui/expanding-grid";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";
import { SERVICES } from "@/lib/content";

// distinct images (different from the Six Worlds cards) mapped to the six
// services (verbatim copy)
const IMGS = [
  "1555066931-4365d14bab8c", // Custom Software
  "1498050108023-c5249f4df085", // Mobile Apps
  "1517077304055-6e89abbf09b0", // Cloud & DevOps
  "1526374965328-7f61d4dc18c5", // AI & Automation
  "1581291518857-4e27b48ff24e", // UI/UX Systems
  "1552664730-d307ca884978", // Dedicated Teams
];

const items: ExpandItem[] = SERVICES.rows.map((r, i) => ({
  title: r.title,
  description: r.body,
  img: `https://images.unsplash.com/photo-${IMGS[i]}?auto=format&fit=crop&w=800&q=80`,
}));

export function Capabilities() {
  return (
    <section id="services" className="section" data-no-stack>
      <div className="container-x">
        <Eyebrow>IN-HOUSE, END TO END</Eyebrow>
        <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
          The whole stack, under one <em>roof</em>.
        </LineReveal>
        <p className="body-lg mt-6 max-w-xl text-muted">
          Six disciplines, one team — hover any card to expand it.
        </p>
        <div className="mt-14">
          <ExpandingGrid items={items} cols={3} />
        </div>
      </div>
    </section>
  );
}
