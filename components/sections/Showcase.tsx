"use client";

import { DynamicFrameLayout, type Frame } from "@/components/ui/dynamic-frame-layout";
import { Eyebrow } from "@/components/anim/Eyebrow";
import { LineReveal } from "@/components/anim/LineReveal";

// Placeholder showreel clips (Luma demo CDN) — swap with real Rudranex work.
const V = "https://static.cdn-luma.com/files";
const frames: Frame[] = [
  { id: 1, video: `${V}/981e483f71aa764b/Company%20Thing%20Exported.mp4`, defaultPos: { x: 0, y: 0, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  { id: 2, video: `${V}/58ab7363888153e3/WebGL%20Exported%20(1).mp4`, defaultPos: { x: 4, y: 0, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  { id: 3, video: `${V}/58ab7363888153e3/Jitter%20Exported%20Poster.mp4`, defaultPos: { x: 8, y: 0, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  { id: 4, video: `${V}/58ab7363888153e3/Exported%20Web%20Video.mp4`, defaultPos: { x: 0, y: 4, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  { id: 5, video: `${V}/58ab7363888153e3/Logo%20Exported.mp4`, defaultPos: { x: 4, y: 4, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  { id: 6, video: `${V}/58ab7363888153e3/Animation%20Exported%20(4).mp4`, defaultPos: { x: 8, y: 4, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  { id: 7, video: `${V}/58ab7363888153e3/Illustration%20Exported%20(1).mp4`, defaultPos: { x: 0, y: 8, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  { id: 8, video: `${V}/58ab7363888153e3/Art%20Direction%20Exported.mp4`, defaultPos: { x: 4, y: 8, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
  { id: 9, video: `${V}/58ab7363888153e3/Product%20Video.mp4`, defaultPos: { x: 8, y: 8, w: 4, h: 4 }, mediaSize: 1, isHovered: false },
];

export function Showcase() {
  return (
    <section className="section" data-no-stack>
      <div className="container-x">
        <Eyebrow>IN MOTION</Eyebrow>
        <LineReveal as="h2" className="h-section mt-5 font-display text-bone">
          Work that <em>moves</em>.
        </LineReveal>
        <p className="body-lg mt-6 max-w-xl text-muted">Hover any frame — it expands and comes to life.</p>
        <div className="mt-14 h-[80vh] min-h-[520px] w-full overflow-hidden rounded-2xl border border-line">
          <DynamicFrameLayout frames={frames} className="h-full w-full" hoverSize={6} gapSize={4} />
        </div>
      </div>
    </section>
  );
}
