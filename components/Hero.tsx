const sparkles = [
  { top: "15%", left: "60%", delay: "0.2s", dur: "3.4s", size: 3 },
  { top: "25%", left: "72%", delay: "1.1s", dur: "4.2s", size: 2 },
  { top: "35%", left: "64%", delay: "0.6s", dur: "3.8s", size: 2 },
  { top: "20%", left: "80%", delay: "1.8s", dur: "4.6s", size: 3 },
  { top: "45%", left: "68%", delay: "0.9s", dur: "3.6s", size: 2 },
  { top: "12%", left: "55%", delay: "2.2s", dur: "4.0s", size: 2 },
  { top: "40%", left: "78%", delay: "0.4s", dur: "3.2s", size: 3 },
  { top: "55%", left: "62%", delay: "1.4s", dur: "4.4s", size: 2 },
  { top: "28%", left: "85%", delay: "2.6s", dur: "3.9s", size: 2 },
  { top: "48%", left: "74%", delay: "0.7s", dur: "4.1s", size: 3 },
];

const headlineLines = [
  { text: "BUILDING DIGITAL", delay: "0.6s" },
  { text: "SOLUTIONS FOR", delay: "0.8s" },
  { text: ["THE ", { highlight: "NEXT ERA." }], delay: "1.0s" },
] as const;

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex items-center bg-starfield"
      style={{ background: "var(--color-ink)" }}
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)," +
            "radial-gradient(ellipse 40% 60% at 80% 30%, rgba(124,58,237,0.14) 0%, transparent 60%)",
        }}
      />

      {/* Starfield dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-starfield"
        style={{ opacity: 0.6 }}
      />

      {/* Video — right half, feathered edges */}
      <div
        className="absolute top-0 bottom-0 right-0 left-[30%] overflow-hidden"
        aria-hidden
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 22%, black 94%, transparent 100%)," +
            "linear-gradient(to bottom, transparent 0%, black 15%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 22%, black 94%, transparent 100%)," +
            "linear-gradient(to bottom, transparent 0%, black 15%, black 90%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-intro.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster="/hero-bg.png"
        />
        {/* Fallback gradient when video is loading */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 60% 50%, rgba(37,99,235,0.25) 0%, rgba(124,58,237,0.15) 40%, transparent 75%)",
          }}
        />
      </div>

      {/* Left-to-right gradient so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(to right, var(--color-ink) 0%, var(--color-ink) 30%, rgba(0,1,23,0.75) 50%, rgba(0,1,23,0.3) 70%, transparent 85%)",
        }}
      />

      {/* Pulsate halo behind the video centre */}
      <div
        className="pointer-events-none absolute rounded-full blur-3xl"
        data-pulsate
        style={{
          left: "65%",
          top: "50%",
          width: "560px",
          height: "560px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(37,99,235,0.2) 40%, transparent 70%)",
          animation: "pulsate-glow 6s ease-in-out infinite",
        }}
        aria-hidden
      />

      {/* Sparkle particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              boxShadow: "0 0 6px rgba(180,200,255,0.9)",
              animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Hero copy */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-28 pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow — visible immediately, subtle fade-up */}
          <p
            className="font-body text-xs tracking-[0.3em] text-cobalt mb-5"
            style={{ animation: "fade-up 0.7s ease-out 0.3s both" }}
          >
            WELCOME TO RUDRANEX
          </p>

          {/* Headline lines — each rises in sequentially */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.02] tracking-tight">
            {headlineLines.map((line, i) => (
              <span
                key={i}
                className="block"
                style={{
                  animation: `rise-in 1s cubic-bezier(0.22,1,0.36,1) ${line.delay} both`,
                }}
              >
                {typeof line.text === "string"
                  ? line.text
                  : line.text.map((part, j) =>
                      typeof part === "string" ? (
                        part
                      ) : (
                        <span key={j} className="text-shimmer">
                          {part.highlight}
                        </span>
                      ),
                    )}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-lg text-foam/80 text-base sm:text-lg leading-relaxed"
            style={{ animation: "fade-up 0.9s ease-out 1.3s both" }}
          >
            We build powerful, scalable and innovative digital solutions that
            drive business growth and create meaningful impact — globally.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4"
            style={{ animation: "fade-up 0.9s ease-out 1.6s both" }}
          >
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-md bg-cobalt px-6 py-3 text-sm font-semibold text-foam shadow-[0_0_28px_rgba(37,99,235,0.55)] hover:bg-cobalt/90 hover:shadow-[0_0_40px_rgba(37,99,235,0.8)] transition-all"
            >
              Our Services <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-foam/25 bg-white/5 backdrop-blur px-6 py-3 text-sm font-semibold text-foam hover:bg-white/10 hover:border-foam/50 transition-all"
            >
              Let&apos;s Talk <span aria-hidden>→</span>
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="mt-10 flex flex-wrap gap-3"
            style={{ animation: "fade-up 0.9s ease-out 1.9s both" }}
          >
            {["Web Dev", "App Dev", "Cloud & AI", "Global Setup", "Marketing"].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[10px] tracking-[0.2em] text-foam/60 uppercase backdrop-blur"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        style={{ animation: "fade-up 1s ease-out 2.3s both" }}
        aria-hidden
      >
        <span className="text-foam/50 text-[10px] tracking-[0.3em] font-body">SCROLL</span>
        <span className="relative block w-6 h-10 rounded-full border border-foam/40">
          <span
            className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-foam"
            style={{ animation: "wheel-drop 1.8s ease-in-out infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
