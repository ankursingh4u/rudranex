type TrishulProps = {
  className?: string;
  glow?: boolean;
  title?: string;
  size?: "sm" | "md" | "lg";
};

export function Trishul({ className, glow = true, title = "Rudranex" }: TrishulProps) {
  return (
    <svg
      viewBox="0 0 56 78"
      role="img"
      aria-label={title}
      className={className}
      style={
        glow
          ? {
              filter:
                "drop-shadow(0 0 6px rgba(37,99,235,0.8)) drop-shadow(0 0 14px rgba(124,58,237,0.35))",
            }
          : undefined
      }
    >
      <defs>
        {/* Main blade gradient: ice-blue tip → cobalt body → violet base */}
        <linearGradient id="rdx-blade" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stopColor="#dbeafe" />
          <stop offset="18%"  stopColor="#60a5fa" />
          <stop offset="52%"  stopColor="#2563eb" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        {/* Left-edge highlight — simulates metallic sheen */}
        <linearGradient id="rdx-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.28)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Subtle base-ring fill */}
        <radialGradient id="rdx-ring" cx="50%" cy="42%" r="52%">
          <stop offset="0%"   stopColor="rgba(37,99,235,0.14)" />
          <stop offset="100%" stopColor="rgba(37,99,235,0)" />
        </radialGradient>
      </defs>

      {/* ── Outer glow ring (very subtle) ── */}
      <ellipse cx="28" cy="38" rx="24" ry="26"
        fill="url(#rdx-ring)" />

      {/* ══════════════════════════════════
          BLADES
          Left  : tip (14, 13)  body 8 px wide
          Center: tip (28,  2)  body 8 px wide  ← tallest
          Right : tip (42, 13)  body 8 px wide
         ══════════════════════════════════ */}

      {/* Left blade — base fill */}
      <path d="M14 13 L10 23 L10 48 L18 48 L18 23 Z"
        fill="url(#rdx-blade)" />
      {/* Left blade — shine strip */}
      <path d="M14 13 L10 23 L10 48 L12.5 48 L12.5 23 Z"
        fill="url(#rdx-shine)" />

      {/* Center blade — base fill */}
      <path d="M28 2 L24 14 L24 48 L32 48 L32 14 Z"
        fill="url(#rdx-blade)" />
      {/* Center blade — shine strip */}
      <path d="M28 2 L24 14 L24 48 L26.5 48 L26.5 14 Z"
        fill="url(#rdx-shine)" />

      {/* Right blade — base fill */}
      <path d="M42 13 L38 23 L38 48 L46 48 L46 23 Z"
        fill="url(#rdx-blade)" />
      {/* Right blade — shine strip */}
      <path d="M42 13 L38 23 L38 48 L40.5 48 L40.5 23 Z"
        fill="url(#rdx-shine)" />

      {/* ── Crossbar ── */}
      <rect x="8" y="48" width="40" height="5.5" rx="2.75"
        fill="url(#rdx-blade)" />
      {/* Crossbar top highlight */}
      <rect x="8" y="48" width="40" height="2" rx="1"
        fill="rgba(255,255,255,0.18)" />

      {/* ── Shaft ── */}
      <rect x="24.5" y="53.5" width="7" height="13" rx="2"
        fill="url(#rdx-blade)" />

      {/* ── Lower binding ring ── */}
      <rect x="18" y="61" width="20" height="5" rx="2.5"
        fill="url(#rdx-blade)" />
      {/* binding top highlight */}
      <rect x="18" y="61" width="20" height="2" rx="1"
        fill="rgba(255,255,255,0.14)" />

      {/* ── Base tip ── */}
      <path d="M28 77 L22 66 L34 66 Z"
        fill="url(#rdx-blade)" />
    </svg>
  );
}
