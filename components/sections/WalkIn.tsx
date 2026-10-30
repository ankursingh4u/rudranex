"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReduced } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Drop the Gemini-generated walkthrough clip at public/walkthrough.mp4.
 *  Until that file exists, this section renders nothing. For buttery scrubbing
 *  re-encode with every frame as a keyframe:
 *  ffmpeg -i in.mp4 -an -g 1 -crf 23 -movflags +faststart walkthrough.mp4 */
const SRC = "/walkthrough.mp4";

/**
 * Scroll-scrubbed walkthrough — the section pins for 2.5 screens while the
 * video's playhead follows scroll (rAF-lerped so it glides instead of
 * stuttering), making the scroll feel like walking into the room. Copy fades
 * up as you arrive. Reduced motion gets a static, unpinned frame.
 */
export function WalkIn() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);

  useGSAP(
    () => {
      const scope = root.current;
      const video = videoRef.current;
      if (!scope || !video || prefersReduced()) return;

      let duration = 0;
      let target = 0;
      let current = 0;
      let raf = 0;

      // rAF lerp between scroll-driven target time and the actual playhead —
      // this is what makes the walk feel smooth instead of frame-snapped
      const loop = () => {
        if (duration > 0) {
          current += (target - current) * 0.14;
          if (Math.abs(video.currentTime - current) > 1 / 30 && video.readyState >= 2) {
            video.currentTime = current;
          }
        }
        raf = requestAnimationFrame(loop);
      };

      const st = ScrollTrigger.create({
        trigger: scope,
        start: "top top",
        end: "+=250%",
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (duration > 0) target = self.progress * duration;
          // copy arrives over the last quarter of the walk
          const t = gsap.utils.clamp(0, 1, (self.progress - 0.72) / 0.24);
          gsap.set(".wi-copy", { opacity: t, y: 36 * (1 - t) });
        },
      });

      const onMeta = () => {
        duration = Math.max(0, video.duration - 0.05);
        video.pause();
      };
      video.addEventListener("loadedmetadata", onMeta);
      if (video.readyState >= 1) onMeta();
      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        video.removeEventListener("loadedmetadata", onMeta);
        st.kill();
      };
    },
    { scope: root, dependencies: [missing] },
  );

  // when the asset isn't there, remeasure the page after the section unpins
  useEffect(() => {
    if (missing) ScrollTrigger.refresh();
  }, [missing]);

  if (missing) return null;

  return (
    <section ref={root} data-no-stack className="relative h-screen overflow-hidden bg-[#070b14]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={SRC}
        muted
        playsInline
        preload="auto"
        onError={() => setMissing(true)}
      />
      {/* legibility scrims — light at rest, deeper near the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(0deg, rgba(7,11,20,0.55) 0%, transparent 35%, transparent 75%, rgba(7,11,20,0.35) 100%)" }}
      />
      <div className="wi-copy absolute inset-x-0 bottom-[14vh] text-center" style={{ opacity: 0 }}>
        <p className="eyebrow" style={{ color: "#8b95ac" }}>
          WELCOME IN
        </p>
        <h2 className="h-section mx-auto mt-4 max-w-3xl font-display text-[#e9eef8]">
          Step inside. This is where it gets <em className="display-em">built</em>.
        </h2>
      </div>
    </section>
  );
}
