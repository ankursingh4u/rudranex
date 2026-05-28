"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const style: React.CSSProperties = {
    transform: shown ? "translateY(0)" : `translateY(${y}px)`,
    opacity: shown ? 1 : 0,
    filter: shown ? "blur(0)" : "blur(6px)",
    transition: `transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 0.9s ease ${delay}ms, filter 0.9s ease ${delay}ms`,
    willChange: "transform, opacity, filter",
  };

  return (
    <Tag ref={ref as never} className={className} style={style} suppressHydrationWarning>
      {children}
    </Tag>
  );
}
