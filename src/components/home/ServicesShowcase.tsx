"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { services as defaultServices } from "@/lib/data";
import type { Service } from "@/lib/data";
import SteelPlate from "@/components/ui/SteelPlate";

type Props = {
  services?: Service[];
  detailsBasePath?: string;
  detailsLabel?: string;
};

type LightboxItem = { src: string; title: string; spec: string };

export default function ServicesShowcase({
  services = defaultServices,
  detailsBasePath = "/leistungen",
  detailsLabel = "Mehr zu",
}: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const current = services[active];

  useEffect(() => setMounted(true), []);

  // Escape key closes lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openLightbox(s: Service) {
    if (s.image) setLightbox({ src: s.image, title: s.title, spec: s.spec });
  }

  return (
    <>
      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* Service list */}
        <ul className="space-y-1" role="tablist">
          {services.map((s, i) => {
            const selected = i === active;
            return (
              <li key={s.id}>
                <button
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group relative flex w-full cursor-pointer items-baseline justify-between gap-4 rounded-2xl px-5 py-5 text-left transition-all duration-300 ${
                    selected ? "glass shadow-[inset_0_1px_0_rgba(201,207,216,0.14),0_4px_24px_rgba(0,0,0,0.35)]" : "hover:bg-white/[0.05]"
                  }`}
                >
                  {selected && (
                    <span className="absolute bottom-3 left-0 top-3 w-0.5 rounded-full bg-weld" aria-hidden="true" />
                  )}
                  <div>
                    <span
                      className={`font-display text-xl font-medium tracking-tight transition-colors sm:text-2xl ${
                        selected ? "text-chrome" : "text-mist group-hover:text-chrome"
                      }`}
                    >
                      {s.title}
                    </span>
                    <AnimatePresence initial={false}>
                      {selected && (
                        <motion.p
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden pt-2 text-sm leading-relaxed text-mist"
                        >
                          {s.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <span
                    className={`shrink-0 font-mono text-[11px] uppercase tracking-widest2 ${
                      selected ? "text-weld-glow" : "text-mist/50"
                    }`}
                  >
                    {s.spec}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Preview panel — sticky on desktop so it stays in view while scrolling the list */}
        <div className="lg:sticky lg:top-28">
        <div className="thread-reactive group/panel relative overflow-hidden rounded-3xl glass">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Image with hover zoom */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                whileHover={current.image ? { scale: 1.06 } : {}}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.image ? (
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <SteelPlate seed={active + 1} label={current.title} />
                )}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/30 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Fullscreen button — appears on hover */}
          {current.image && (
            <button
              onClick={() => openLightbox(current)}
              aria-label={`${current.title} in Vollbild`}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:text-white group-hover/panel:opacity-100"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          )}

          {/* Details at bottom */}
          <div className="relative flex h-full min-h-[280px] flex-col justify-end p-7 lg:min-h-[420px] lg:p-8">
            <ul className="space-y-2">
              {current.details.map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-sm text-chrome/90">
                  <span className="h-1 w-4 rounded-full bg-weld" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            <Link
              href={`${detailsBasePath}#${current.id}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-weld-glow transition-colors hover:text-weld-core"
            >
              {detailsLabel} {current.title}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        </div> {/* end sticky wrapper */}
      </div>

      {/* Lightbox — portaled to body to escape the Section's z-10 stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] flex flex-col bg-black/90 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            {/* Header row — close button always in its own row, never overlaps image */}
            <div className="flex shrink-0 items-center justify-end px-4 py-3 sm:px-6">
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                aria-label="Schließen"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Image row */}
            <div className="flex min-h-0 flex-1 items-center justify-center px-4">
              <motion.div
                initial={reduced ? false : { scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightbox.src}
                  alt={lightbox.title}
                  className="max-h-[calc(100vh-9rem)] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
                />
              </motion.div>
            </div>

            {/* Footer row — caption */}
            <div className="shrink-0 px-6 pb-5 pt-3 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="font-display text-sm font-semibold text-chrome">{lightbox.title}</p>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest2 text-mist">{lightbox.spec}</p>
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
