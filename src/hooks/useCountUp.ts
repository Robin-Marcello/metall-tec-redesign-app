"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useCountUp(end: number, duration = 1.8, delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let rafId: number;
    let startTimestamp: number | null = null;
    const delayMs = delay * 1000;
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      if (startTimestamp === null) startTimestamp = now;
      const elapsed = now - startTimestamp - delayMs;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * end));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, end, duration, delay]);

  return { value, ref };
}
