"use client";

import { useCallback, useRef, useState } from "react";
import SteelPlate from "@/components/ui/SteelPlate";

/**
 * Pointer-driven before/after comparison.
 * Replace the two SteelPlate fallbacks with <Image> once photos exist:
 * /public/images/vorher.jpg and /public/images/nachher.jpg
 */
export default function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl glass sm:aspect-[21/9]"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      role="slider"
      aria-label="Vorher-Nachher-Vergleich"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
    >
      {/* AFTER (full) */}
      <div className="absolute inset-0">
        <SteelPlate seed={3} label="Nachher: saniertes Geländer" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent" />
      </div>

      {/* BEFORE (clipped) — desaturated, rusty */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="h-full w-full saturate-[0.4] sepia-[0.5] brightness-[0.6]">
          <SteelPlate seed={5} label="Vorher: korrodiertes Geländer" />
        </div>
        <div className="absolute inset-0 bg-carbon/30" />
      </div>

      {/* Divider handle */}
      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%` }} aria-hidden="true">
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-weld shadow-weld-glow" />
        <div className="absolute top-1/2 -ml-5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-weld text-[#0A0B0E] shadow-weld-glow">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
      </div>

      <span className="absolute left-4 top-4 z-10 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest2 text-chrome">
        Vorher
      </span>
      <span className="absolute right-4 top-4 z-10 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest2 text-weld-glow">
        Nachher
      </span>
    </div>
  );
}
