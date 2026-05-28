import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-body text-xs tracking-[0.3em] text-cobalt mb-4">{eyebrow}</p>
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>
      {body ? <p className="mt-5 text-foam/70 leading-relaxed">{body}</p> : null}
    </div>
  );
}
