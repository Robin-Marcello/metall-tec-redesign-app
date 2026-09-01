"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

const { geo, address } = site;
const addr = `${address.street}, ${address.zip} ${address.city}, Österreich`;

const GOOGLE_URL = `https://maps.google.com/?q=${encodeURIComponent(addr)}`;
const APPLE_URL = `https://maps.apple.com/?address=${encodeURIComponent(addr)}&ll=${geo.lat},${geo.lng}`;

// OpenStreetMap – no API key, no consent required
const delta = 0.008;
const OSM_URL =
  `https://www.openstreetmap.org/export/embed.html` +
  `?bbox=${geo.lng - delta},${geo.lat - delta},${geo.lng + delta},${geo.lat + delta}` +
  `&layer=mapnik&marker=${geo.lat},${geo.lng}`;

export default function MapEmbed() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="glass flex flex-col overflow-hidden rounded-3xl lg:h-full lg:min-h-[420px]"
      onMouseLeave={() => setOpen(false)}
    >
      {/* Map */}
      <div className="relative aspect-[4/3] flex-1 lg:aspect-auto">
        <iframe
          title={`Karte: ${site.name} in ${address.city}`}
          src={OSM_URL}
          className="absolute inset-0 h-full w-full grayscale-[0.5] contrast-[1.1] brightness-[0.7]"
          loading="lazy"
          referrerPolicy="no-referrer"
          allowFullScreen
        />
      </div>

      {/* Route dropdown */}
      <div className="shrink-0 border-t border-white/[0.06] p-3">
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-chrome transition-all hover:border-white/20 hover:bg-white/[0.06]"
            aria-expanded={open}
            aria-haspopup="menu"
          >
            <span className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-weld-glow"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Route starten
            </span>
            <motion.svg
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="h-4 w-4 text-mist"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl"
              >
                <a
                  href={GOOGLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-chrome transition-colors hover:bg-white/[0.06]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" fill="#B8C72C" />
                    <circle cx="12" cy="9" r="2.5" fill="#0A0B0E" />
                  </svg>
                  Google Maps öffnen
                </a>
                <div className="mx-4 h-px bg-white/[0.06]" />
                <a
                  href={APPLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-chrome transition-colors hover:bg-white/[0.06]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.99ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
                  </svg>
                  Apple Maps öffnen
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
