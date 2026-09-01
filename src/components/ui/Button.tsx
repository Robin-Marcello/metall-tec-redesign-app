import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled,
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-transform duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-weld text-[#0A0B0E] shadow-weld-glow hover:shadow-[0_0_36px_rgba(194,206,75,0.5)]"
      : "glass text-chrome hover:border-white/20";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <svg
        className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {variant === "primary" && <span className="sheen-sweep" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`}>
      {inner}
    </button>
  );
}
