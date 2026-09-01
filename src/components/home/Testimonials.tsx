"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials as defaultTestimonials } from "@/lib/data";

type Testimonial = { quote: string; name: string; context: string };

export default function Testimonials({ items = defaultTestimonials }: { items?: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [reduced, items.length]);

  const current = items[index];

  return (
    <div className="thread-reactive mx-auto max-w-3xl text-center">
      <div className="relative min-h-[220px] sm:min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="font-display text-xl font-medium leading-relaxed tracking-tight text-chrome sm:text-2xl">
              „{current.quote}"
            </p>
            <footer className="mt-6">
              <p className="text-sm font-medium text-weld-glow">{current.name}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-mist">
                {current.context}
              </p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2" role="tablist">
        {items.map((t, i) => (
          <button
            key={t.name}
            role="tab"
            aria-selected={i === index}
            aria-label={`Stimme ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-weld shadow-weld-glow" : "w-2 bg-seam hover:bg-mist"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
