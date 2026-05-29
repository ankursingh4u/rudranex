import Link from "next/link";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { serviceDetails, serviceIcon } from "./site-content";

const servicePhotos = [
  // Custom software — code editor, dark IDE
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  // Mobile app — hands holding smartphone
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  // Cloud & DevOps — glowing server room
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=600&q=80",
  // AI & Automation — neural network visual
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80",
  // UI/UX — tablet with design wireframe
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
  // Dedicated teams — collaborative standup
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
  // IT consulting — person at dual monitors
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  // Business registration — city skyline global
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80",
  // Digital marketing — growth analytics
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80",
  // Product roadmap — planning session
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
];

export function Services({ compact = false }: { compact?: boolean }) {
  const items = compact ? serviceDetails.slice(0, 6) : serviceDetails;

  return (
    <section id="services" className="section-shell bg-ink scroll-mt-20">
      <div className="site-container">
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="OUR SERVICES"
            title={<>Everything your business <span className="text-shimmer">needs to grow</span>.</>}
            body="From custom software and mobile apps to global business registration and digital marketing — we do it all under one roof."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <article className="photo-card group h-full flex flex-col">
                {/* Photo header */}
                <div className="relative overflow-hidden" style={{ height: "160px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={servicePhotos[i % servicePhotos.length]}
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,1,23,0.2) 0%, rgba(0,1,23,0.75) 100%)," +
                        "linear-gradient(to right, rgba(37,99,235,0.25), transparent 60%)",
                    }}
                  />
                  {/* Icon + eyebrow overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cobalt/90 text-foam backdrop-blur-sm">
                      {serviceIcon(i)}
                    </div>
                    <span className="text-[10px] tracking-[0.22em] text-foam/80 uppercase font-semibold">{service.title.split(" ")[0]}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="photo-card-body flex flex-col flex-1">
                  <h3 className="font-display font-bold text-base mb-2 text-foam">{service.title}</h3>
                  <p className="text-sm text-foam/60 leading-relaxed mb-4 flex-1">{service.body}</p>
                  <ul className="space-y-1.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs text-foam/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-cobalt flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {compact ? (
          <Reveal className="mt-10 text-center">
            <Link href="/services" className="button-secondary">
              View all services <span aria-hidden>→</span>
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
