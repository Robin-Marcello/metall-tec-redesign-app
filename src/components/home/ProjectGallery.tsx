"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/data";
import SteelPlate from "@/components/ui/SteelPlate";

const categoryToService: Record<string, string> = {
  Stiegen: "stiegen",
  Tore: "tore",
  Geländer: "gelaender",
  Stahlbau: "stahlbau",
  Sanierung: "reparatur",
  Edelstahl: "edelstahl",
  Sonnenschutz: "sonnenschutz",
};

const categories = ["Alle", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function ProjectGallery() {
  const [filter, setFilter] = useState("Alle");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const touchStartX = useRef(0);

  useEffect(() => setMounted(true), []);

  const visible =
    filter === "Alle" ? projects : projects.filter((p) => p.category === filter);

  const current = lightboxIndex !== null ? visible[lightboxIndex] : null;

  const close = useCallback(() => setLightboxIndex(null), []);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setLightboxIndex(index);
    },
    []
  );

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    goTo((lightboxIndex - 1 + visible.length) % visible.length, -1);
  }, [lightboxIndex, visible.length, goTo]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    goTo((lightboxIndex + 1) % visible.length, 1);
  }, [lightboxIndex, visible.length, goTo]);

  useEffect(() => { setLightboxIndex(null); }, [filter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, prev, next]);

  return (
    <>
      {/* Filter tabs */}
      <div>
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Projektkategorien">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                filter === c
                  ? "bg-weld text-[#0A0B0E] shadow-weld-glow"
                  : "glass text-mist hover:text-chrome"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <motion.article
              key={p.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={reduced ? {} : { y: -4 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl glass"
              onClick={() => goTo(i, 1)}
            >
              <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <SteelPlate seed={i + 1} label={p.title} />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-widest2 text-chrome">
                  {p.category}
                </span>
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight text-chrome">
                  {p.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-weld-glow">
                  {p.location} · {p.year}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{p.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <p className="font-mono text-[11px] text-mist/70">{p.material}</p>
                  {categoryToService[p.category] && (
                    <Link
                      href={`/leistungen#${categoryToService[p.category]}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs font-medium text-weld-glow transition-colors hover:text-weld-core"
                    >
                      Leistung <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox — portaled to body to escape the Section's z-10 stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
        {current && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] flex flex-col bg-black/92 backdrop-blur-md"
            onClick={close}
          >
            {/* Header row — close button always in its own row, never overlaps image */}
            <div className="flex shrink-0 items-center justify-end px-4 py-3 sm:px-6">
              <button
                onClick={(e) => { e.stopPropagation(); close(); }}
                aria-label="Schließen"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Image row — flex-1 so it fills remaining height */}
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
              }}
            >
              {visible.length > 1 && (
                <button
                  onClick={prev}
                  aria-label="Vorheriges Bild"
                  className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition hover:bg-black/80 hover:text-white sm:left-4"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}

              <motion.div
                key={lightboxIndex}
                initial={reduced ? false : { opacity: 0, x: direction * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="select-none"
              >
                {current.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={current.image}
                    alt={current.title}
                    className="max-h-[calc(100vh-9rem)] max-w-[80vw] rounded-2xl object-contain shadow-2xl sm:max-w-[85vw]"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-[50vh] w-[80vw] max-w-2xl items-center justify-center rounded-2xl bg-graphite">
                    <SteelPlate seed={lightboxIndex + 1} label={current.title} />
                  </div>
                )}
              </motion.div>

              {visible.length > 1 && (
                <button
                  onClick={next}
                  aria-label="Nächstes Bild"
                  className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition hover:bg-black/80 hover:text-white sm:right-4"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>

            {/* Footer row — caption + dots */}
            <div
              className="shrink-0 px-6 pb-5 pt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-chrome">{current.title}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest2 text-weld-glow">
                    {current.location} · {current.year}
                  </p>
                </div>
                {visible.length > 1 && (
                  <p className="font-mono text-xs text-mist/50 tabular-nums">
                    {lightboxIndex + 1} / {visible.length}
                  </p>
                )}
              </div>
              {visible.length > 1 && visible.length <= 12 && (
                <div className="mt-3 flex justify-center gap-1.5">
                  {visible.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i, i > lightboxIndex! ? 1 : -1)}
                      aria-label={`Bild ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === lightboxIndex ? "w-5 bg-weld" : "w-1.5 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
