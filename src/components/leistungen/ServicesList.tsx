"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SteelPlate from "@/components/ui/SteelPlate";
import type { Service } from "@/lib/data";

type LightboxItem = { src: string; title: string };

export default function ServicesList({ services }: { services: Service[] }) {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="space-y-6">
        {services.map((s, i) => (
          <article key={s.id} id={s.id} data-thread-section="" className="scroll-mt-32">
            <Reveal>
              <div className="thread-reactive group/card grid gap-0 overflow-hidden rounded-3xl glass transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(201,207,216,0.18)] md:grid-cols-[1fr_1.4fr]">

                {/* Image column */}
                <div className="relative min-h-[200px] overflow-hidden md:min-h-[260px]">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={s.image ? { scale: 1.06 } : {}}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    ) : (
                      <SteelPlate seed={i + 2} label={s.title} />
                    )}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-graphite/80 md:bg-gradient-to-r" />

                  {/* Fullscreen button */}
                  {s.image && (
                    <button
                      onClick={() => setLightbox({ src: s.image!, title: s.title })}
                      aria-label={`${s.title} in Vollbild`}
                      className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:text-white group-hover/card:opacity-100"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Text column */}
                <div className="p-7 sm:p-9">
                  <div className="flex items-center gap-3">
                    <span data-thread-anchor="" className="thread-marker h-2.5 w-2.5 rounded-full bg-seam" aria-hidden="true" />
                    <p className="font-mono text-[11px] uppercase tracking-widest2 text-weld-glow">{s.spec}</p>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-chrome sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-mist">{s.description}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-sm text-chrome/85">
                        <span className="h-1 w-4 shrink-0 rounded-full bg-weld" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={reduced ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-h-[82vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
              />
              <button
                onClick={() => setLightbox(null)}
                aria-label="Schließen"
                className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-graphite text-chrome shadow-lg transition-colors hover:text-weld-glow"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <p className="mt-3 text-center font-display text-sm font-semibold text-chrome">{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
