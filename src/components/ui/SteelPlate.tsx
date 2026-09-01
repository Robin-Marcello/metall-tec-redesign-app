type Props = {
  seed?: number;
  label?: string;
  className?: string;
};

/**
 * Procedurally varied brushed-steel SVG plate (placeholder until photos exist).
 * Brushing is a cheap <pattern> of hairlines — no feTurbulence filter, which
 * was expensive to composite under hover/scale transforms.
 */
export default function SteelPlate({ seed = 1, label, className = "" }: Props) {
  const hue = [210, 215, 205, 220, 208, 212][seed % 6];
  const angle = [12, -8, 18, -14, 6, -20][seed % 6];
  const id = `plate-${seed}`;

  return (
    <svg viewBox="0 0 800 600" className={`h-full w-full ${className}`} role="img" aria-label={label ?? "Stahlplatte"} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${angle} 0.5 0.5)`}>
          <stop offset="0%" stopColor={`hsl(${hue} 12% 22%)`} />
          <stop offset="35%" stopColor={`hsl(${hue} 10% 34%)`} />
          <stop offset="50%" stopColor={`hsl(${hue} 14% 46%)`} />
          <stop offset="65%" stopColor={`hsl(${hue} 10% 30%)`} />
          <stop offset="100%" stopColor={`hsl(${hue} 12% 18%)`} />
        </linearGradient>
        <pattern id={`${id}-brush`} width="6" height={3 + (seed % 3)} patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
          <rect width="6" height="1" y="0" fill="rgba(255,255,255,0.045)" />
        </pattern>
        <radialGradient id={`${id}-light`} cx="0.3" cy="0.2" r="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill={`url(#${id}-steel)`} />
      <rect width="800" height="600" fill={`url(#${id}-brush)`} />
      <rect width="800" height="600" fill={`url(#${id}-light)`} />

      <path
        d={`M -20 ${340 + (seed % 4) * 40} C 220 ${280 + (seed % 3) * 50}, 480 ${420 - (seed % 5) * 30}, 820 ${330 + (seed % 2) * 60}`}
        fill="none"
        stroke="#FF7A1A"
        strokeWidth="3"
        opacity="0.7"
        strokeDasharray="14 10"
      />

      {[60, 740].map((x) =>
        [60, 540].map((y) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="14" fill={`hsl(${hue} 10% 14%)`} />
            <circle cx={x} cy={y} r="9" fill={`hsl(${hue} 12% 40%)`} />
            <circle cx={x - 3} cy={y - 3} r="3" fill="rgba(255,255,255,0.35)" />
          </g>
        ))
      )}
    </svg>
  );
}
