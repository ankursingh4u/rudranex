"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function ScrollShowcase() {
  return (
    <section className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <p className="eyebrow mb-4">SEE IT IN MOTION</p>
            <h2 className="h-section font-display text-bone">
              Built to feel <em>alive</em>.
            </h2>
          </>
        }
      >
        {/* plain img (no next/image domain config needed) */}
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80"
          alt="Product dashboard"
          className="mx-auto h-full w-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
