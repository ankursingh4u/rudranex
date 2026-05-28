"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks } from "./site-content";
import { Trishul } from "./Trishul";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-ink/80 border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "backdrop-blur-md bg-ink/40 border-b border-white/5"
      }`}
    >
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between px-6 transition-all ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <Trishul className="w-6 h-8 transition-transform group-hover:scale-110" />
          <span className="font-display font-bold tracking-[0.18em] text-foam text-lg">
            RUDRANEX
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-foam/70">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative transition-colors ${
                    isActive ? "text-foam" : "hover:text-foam"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-px bg-cobalt transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contact" className="hidden md:inline-flex items-center rounded-md bg-cobalt px-4 py-2 text-sm font-medium text-foam shadow-[0_0_20px_rgba(37,99,235,0.45)] hover:bg-cobalt/90 hover:shadow-[0_0_32px_rgba(37,99,235,0.7)] transition-all">
          Get In Touch
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-0.5 w-6 bg-foam transition-all ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foam transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foam transition-all ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        } bg-ink/95 backdrop-blur-xl border-t border-white/5`}
      >
        <ul className="flex flex-col px-6 py-6 gap-1">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block font-display tracking-[0.15em] text-lg py-3 border-b border-white/5 transition-all ${
                  pathname === link.href ? "text-cobalt" : "text-foam/80 hover:text-foam"
                }`}
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  transform: open ? "translateX(0)" : "translateX(-8px)",
                  opacity: open ? 1 : 0,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-md bg-cobalt px-5 py-3 text-sm font-semibold text-foam shadow-[0_0_24px_rgba(37,99,235,0.5)]"
            >
              Get In Touch
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
