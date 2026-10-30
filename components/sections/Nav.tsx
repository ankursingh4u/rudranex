"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { useLenis } from "@/components/SmoothScroll";
import { NAV_LINKS } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

/** Magnetic "Get In Touch" pill — follows cursor within 90px (max 10px, lerp
 *  0.18), a bone circle wipes from the cursor entry point on hover. */
function GetInTouch({ onClick }: { onClick: (e: MouseEvent) => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = btn.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let inside = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < 90) {
        inside = true;
        target.x = Math.max(-10, Math.min(10, dx * 0.4));
        target.y = Math.max(-10, Math.min(10, dy * 0.4));
      } else if (inside) {
        inside = false;
        target.x = target.y = 0;
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: EASE_OUT });
      }
    };
    const loop = () => {
      if (inside) {
        cur.x += (target.x - cur.x) * 0.18;
        cur.y += (target.y - cur.y) * 0.18;
        gsap.set(el, { x: cur.x, y: cur.y });
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const enter = (e: MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.set(fill.current, { left: e.clientX - r.left - 110, top: e.clientY - r.top - 110, scale: 0 });
    gsap.to(fill.current, { scale: 2.5, duration: 0.5, ease: EASE_OUT });
    gsap.to(label.current, { color: "var(--color-ink)", duration: 0.3 });
  };
  const leave = () => {
    gsap.to(fill.current, { scale: 0, duration: 0.5, ease: EASE_OUT });
    gsap.to(label.current, { color: "var(--color-bone)", duration: 0.3 });
  };

  return (
    <button
      ref={btn}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={onClick}
      className="relative overflow-hidden rounded-full border border-line px-[22px] py-[10px]"
    >
      <span
        ref={fill}
        aria-hidden
        className="pointer-events-none absolute h-[220px] w-[220px] rounded-full bg-bone"
        style={{ scale: 0 }}
      />
      <span
        ref={label}
        className="relative font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone"
      >
        Get In Touch
      </span>
    </button>
  );
}

export function Nav() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const menuLinks = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active-section highlight: rect-measured every scroll frame, so it stays
  // truthful after reloads with scroll restoration and inside pinned sections
  useEffect(() => {
    const sections = NAV_LINKS.flatMap((link) => {
      const el = document.querySelector<HTMLElement>(link.href);
      return el ? [{ href: link.href as string, el }] : [];
    });
    if (!sections.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.5;
      let current = "";
      for (const s of sections) {
        const r = s.el.getBoundingClientRect();
        if (r.top <= line && r.bottom >= line) {
          current = s.href;
          break;
        }
      }
      if (current) setActive(current); // hold the last section through gaps
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // stagger mobile links in on open
  useEffect(() => {
    if (open && menuLinks.current) {
      gsap.fromTo(
        menuLinks.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: EASE_OUT },
      );
    }
  }, [open]);

  // while the mobile menu is open: lock scroll, close on Escape, focus first link
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    menuLinks.current?.querySelector("a")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, lenis]);

  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    const el = href === "#top" ? document.body : document.querySelector(href);
    if (!el) return;
    // Land the section's heading just below the 76px nav by eating most of the
    // section's top padding — otherwise the heading floats far down (or, on a
    // short screen, the oversized content clips under the bar).
    let offset = -76;
    if (el !== document.body) {
      const padTop = parseFloat(getComputedStyle(el as Element).paddingTop) || 0;
      offset = padTop - 76 - 22;
    }
    if (lenis) {
      lenis.start(); // menu-open effect may still have scroll locked
      lenis.scrollTo(el as HTMLElement, { offset, duration: 1.4 });
    } else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[9996] h-[76px]"
        style={{
          background: scrolled ? "rgba(244,246,251,0.78)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--color-line)" : "transparent"}`,
          transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        }}
      >
        <div className="container-x flex h-full items-center justify-between">
          <a href="#top" onClick={go("#top")} className="font-display text-[1.125rem] font-medium text-bone">
            RUDRANEX
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={go(link.href)}
                  className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300"
                  style={{ color: isActive ? "var(--color-ember)" : "var(--color-faint)" }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--color-bone)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--color-faint)";
                  }}
                >
                  {isActive && <span className="h-[3px] w-[3px] rounded-full bg-ember" />}
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <GetInTouch onClick={go("#contact")} />
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span
              className="block h-px w-5 bg-bone transition-transform duration-300"
              style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-px w-5 bg-bone transition-transform duration-300"
              style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[9995] bg-ink lg:hidden">
          <ul ref={menuLinks} className="flex h-full flex-col items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={go(link.href)}
                  className="font-display text-[2rem] text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
