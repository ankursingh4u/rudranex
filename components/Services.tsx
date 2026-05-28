import Link from "next/link";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { serviceDetails, serviceIcon } from "./site-content";

const servicePhotos = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=75",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=75",
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
