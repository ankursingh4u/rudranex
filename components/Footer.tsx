import Link from "next/link";

import { legalLinks, navLinks } from "./site-content";

export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/5 py-10">
      <div className="site-container flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="font-display font-bold tracking-[0.18em] text-lg text-foam">RUDRANEX</p>
            <p className="mt-3 text-sm leading-relaxed text-foam/60">
              Founder-led software development for ambitious businesses building products, platforms, and operational systems that need to scale.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs tracking-[0.25em] text-foam/45 mb-3">NAVIGATION</p>
              <ul className="space-y-2 text-sm text-foam/70">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-foam transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] text-foam/45 mb-3">LEGAL</p>
              <ul className="space-y-2 text-sm text-foam/70">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-foam transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] text-foam/45 mb-3">CONTACT</p>
              <ul className="space-y-2 text-sm text-foam/70">
                <li><a href="mailto:support@rudranex.com" className="hover:text-foam transition-colors">support@rudranex.com</a></li>
                <li><a href="tel:+917725971086" className="hover:text-foam transition-colors">+91 77259 71086</a></li>
                <li>Jaipur, Rajasthan, India</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-foam/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Rudranex</span>
          <span className="tracking-[0.25em]">POWERING THE NEXT ERA</span>
        </div>
      </div>
    </footer>
  );
}
