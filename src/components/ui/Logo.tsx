type Props = { className?: string };

/** Metall|Tec badge mark — vertical lime bar flanked by M and T profiles. */
export default function Logo({ className = "h-8 w-8" }: Props) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true" fill="none">
      <rect width="44" height="44" rx="10" fill="#1C1F26" />

      {/* M — steel gray */}
      <path
        d="M6 33V14l8 9 8-9v19"
        stroke="#8A93A1"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Divider bar — lime */}
      <line x1="24" y1="9" x2="24" y2="35" stroke="#B8C72C" strokeWidth="2.5" strokeLinecap="round" />

      {/* T — lime */}
      <path
        d="M27 15h11M32.5 15v18"
        stroke="#B8C72C"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
