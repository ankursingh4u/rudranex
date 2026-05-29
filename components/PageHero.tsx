import Image from "next/image";
import type { ReactNode } from "react";

import { Reveal } from "./Reveal";

type HeroMediaProps = {
  src: string;
  alt: string;
};

function HeroMedia({ src, alt }: HeroMediaProps) {
  return (
    <div className="hero-visual-shell rounded-[2rem] p-3 sm:p-4">
      <div className="hero-visual-frame relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink/70 aspect-[4/5] sm:aspect-[1.05/1]">
        <div className="hero-visual-grid pointer-events-none absolute inset-0" aria-hidden />
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 32rem, 90vw"
          className="object-cover"
          unoptimized
        />
        <div className="hero-visual-glow pointer-events-none absolute inset-x-0 bottom-0 h-1/2" aria-hidden />
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  actions,
  highlights,
  aside,
  media,
  variant = "default",
}: {
  eyebrow: string;
  title: ReactNode;
  body: string;
  actions?: ReactNode;
  highlights?: readonly string[];
  aside?: ReactNode;
  media?: HeroMediaProps;
  variant?: "default" | "split" | "spotlight";
}) {
  const hasAside = Boolean(aside ?? media);

  return (
    <section className={`page-hero bg-starfield page-hero-${variant}`}>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(124,58,237,0.14),transparent_42%)]"
        aria-hidden
      />
      <div className="page-hero-orbit pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="site-container relative z-10 pt-24 pb-14 sm:pt-28 sm:pb-18 lg:pt-32 lg:pb-20">
        <div
          className={`grid gap-8 sm:gap-10 items-start ${hasAside ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]" : ""}`}
        >
          <Reveal className="max-w-3xl">
            <p className="font-body text-xs tracking-[0.3em] text-cobalt mb-4">{eyebrow}</p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.04] tracking-tight">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-foam/75 leading-relaxed">{body}</p>
            {highlights?.length ? (
              <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.24em] text-foam/60">
                {highlights.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
            {actions ? <div className="mt-10 flex flex-wrap gap-4">{actions}</div> : null}
          </Reveal>
          {hasAside ? (
            <Reveal delay={120} className="lg:justify-self-end lg:w-full lg:max-w-xl">
              <div className="grid gap-5">
                {media ? <HeroMedia {...media} /> : null}
                {aside}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
