"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * WeldThread — the signature element, styled like a real weld seam.
 *
 * Realism model (what a welder would recognise):
 * - Only the zone right behind the torch glows (#hot layers, ~HOT_LEN px,
 *   positioned with a dash trick: dasharray = "HOT_LEN len", offset slides
 *   the glowing window along the path).
 * - Behind it the seam has SOLIDIFIED: a silver bead with ripple "Schuppung"
 *   (a userSpace <pattern> of crescents painted as stroke) plus a faint
 *   blue-violet heat-tint halo (Anlauffarben) along the cooled length.
 * - The tip is the weld pool: white-hot core, arc flare, flicker, sparks.
 *
 * Performance: no SVG filters; one lerped rAF loop; geometry cached.
 */

type SparkState = { x: number; y: number; vx: number; vy: number; life: number };
type SectionMeta = { el: HTMLElement; litAt: number };

const SPARK_COUNT = 12;
const LERP = 0.1;
const HOT_LEN = 260; // px of seam still glowing behind the weld pool

export default function WeldThread() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  const svgRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const hazRef = useRef<SVGPathElement>(null);
  const beadRef = useRef<SVGPathElement>(null);
  const rippleRef = useRef<SVGPathElement>(null);
  const hotWideRef = useRef<SVGPathElement>(null);
  const hotMidRef = useRef<SVGPathElement>(null);
  const hotCoreRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGGElement>(null);
  const sparkRefs = useRef<(SVGCircleElement | null)[]>([]);

  const sparks = useRef<SparkState[]>([]);
  const pathLength = useRef(0);
  const prog = useRef(0);
  const sections = useRef<SectionMeta[]>([]);
  const rafId = useRef(0);

  /** Cooled layers: reveal from start to tip. */
  const revealPaths = useCallback(
    () => [hazRef.current, beadRef.current, rippleRef.current].filter(Boolean) as SVGPathElement[],
    []
  );
  /** Hot layers: a sliding glowing window just behind the tip. */
  const hotPaths = useCallback(
    () => [hotWideRef.current, hotMidRef.current, hotCoreRef.current].filter(Boolean) as SVGPathElement[],
    []
  );

  const setOffsets = useCallback(() => {
    const len = pathLength.current;
    if (!len) return;
    const revealOffset = `${len * (1 - prog.current)}`;
    const hotOffset = `${HOT_LEN - len * prog.current}`;
    revealPaths().forEach((p) => (p.style.strokeDashoffset = revealOffset));
    hotPaths().forEach((p) => (p.style.strokeDashoffset = hotOffset));
  }, [revealPaths, hotPaths]);

  const buildPath = useCallback(() => {
    const svg = svgRef.current;
    const bead = beadRef.current;
    const base = baseRef.current;
    if (!svg || !bead || !base) return;

    // Reset height before measuring so the SVG doesn't inflate its own scrollHeight
    svg.style.height = "0px";
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const width = document.documentElement.clientWidth;
    svg.setAttribute("viewBox", `0 0 ${width} ${docHeight}`);
    svg.style.height = `${docHeight}px`;

    const anchors = Array.from(
      document.querySelectorAll<HTMLElement>("[data-thread-anchor]")
    )
      .map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2;
      })
      .sort((a, b) => a - b);

    const isDesktop = width >= 1024;
    const amplitude = width * (isDesktop ? 0.32 : 0.34);
    const cx = width * 0.5;
    const ys = [80, ...anchors, docHeight - 120];
    const pts = ys.map((y, i) => ({ x: cx + (i % 2 === 0 ? -amplitude : amplitude), y }));

    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1];
      const c = pts[i];
      const m = (p.y + c.y) / 2;
      d += ` C ${p.x.toFixed(1)} ${m.toFixed(1)}, ${c.x.toFixed(1)} ${m.toFixed(1)}, ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
    }

    [...revealPaths(), ...hotPaths(), base].forEach((p) => p.setAttribute("d", d));

    const len = bead.getTotalLength();
    pathLength.current = len;
    revealPaths().forEach((p) => (p.style.strokeDasharray = `${len}`));
    hotPaths().forEach((p) => (p.style.strokeDasharray = `${HOT_LEN} ${len}`));
    setOffsets();

    sections.current = Array.from(
      document.querySelectorAll<HTMLElement>("[data-thread-section]")
    ).map((el) => {
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      // Section lights up when it enters the lower third of the viewport.
      return { el, litAt: top + 60 };
    });
  }, [revealPaths, hotPaths, setOffsets]);

  const applyLighting = useCallback((_tipY: number) => {
    // Light sections when they enter the viewport (~70 % from top), not when
    // the thread tip physically reaches them. The tip lags scroll position so
    // using it caused sections to stay dark too long.
    const triggerY = window.scrollY + window.innerHeight * 0.72;
    for (const s of sections.current) {
      s.el.classList.toggle("is-lit", triggerY >= s.litAt);
    }
  }, []);

  const moveTip = useCallback(() => {
    const bead = beadRef.current;
    const tip = tipRef.current;
    const len = pathLength.current;
    if (!bead || !tip || !len) return { x: 0, y: 0 };
    const pt = bead.getPointAtLength(len * prog.current);
    tip.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
    return pt;
  }, []);

  useEffect(() => {
    if (reduced) {
      buildPath();
      prog.current = 1;
      setOffsets();
      const pt = moveTip();
      applyLighting(pt.y);
      sections.current.forEach((s) => s.el.classList.add("is-lit"));
      return;
    }

    sparks.current = Array.from({ length: SPARK_COUNT }, () => ({
      x: -100, y: -100, vx: 0, vy: 0, life: Math.random(),
    }));

    buildPath();

    const maxScroll = () =>
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    prog.current = window.scrollY / maxScroll();
    setOffsets();
    let pt = moveTip();
    applyLighting(pt.y);

    // Track doc height so content changes (accordion, etc.) trigger a rebuild.
    let lastDocHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );

    const tick = () => {
      // If the page grew or shrank (e.g. accordion opened), rebuild immediately
      // so the path + section lit-thresholds stay in sync with the new layout.
      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      if (Math.abs(docH - lastDocHeight) > 30) {
        lastDocHeight = docH;
        buildPath();
      }

      const target = window.scrollY / maxScroll();
      const diff = target - prog.current;
      const moving = Math.abs(diff) > 0.00005;
      if (moving) {
        prog.current += diff * LERP;
        if (Math.abs(target - prog.current) < 0.00005) prog.current = target;
        setOffsets();
        pt = moveTip();
        applyLighting(pt.y);
      }

      // Sparks live even when scrolling pauses.
      sparks.current.forEach((s, i) => {
        s.life -= 0.022;
        if (s.life <= 0) {
          s.x = pt.x;
          s.y = pt.y;
          const a = Math.random() * Math.PI * 2;
          const v = 0.6 + Math.random() * 2.2;
          s.vx = Math.cos(a) * v;
          s.vy = Math.sin(a) * v - 0.8;
          s.life = 0.5 + Math.random() * 0.5;
        } else {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.06;
        }
        const el = sparkRefs.current[i];
        if (el) {
          el.setAttribute("cx", `${s.x}`);
          el.setAttribute("cy", `${s.y}`);
          el.setAttribute("opacity", `${Math.max(0, s.life)}`);
          el.setAttribute("r", `${1 + s.life * 1.6}`);
        }
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    const onResize = () => buildPath();
    window.addEventListener("resize", onResize);
    const settle = setTimeout(onResize, 600);
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    fontsReady?.then(() => buildPath()).catch(() => undefined);

    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(settle);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname, reduced, buildPath, setOffsets, moveTip, applyLighting]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-0 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="weld-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9C2" />
          <stop offset="50%" stopColor="#FF9A3D" />
          <stop offset="100%" stopColor="#FF7A1A" />
        </linearGradient>
        <radialGradient id="tip-core">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FFE9C2" />
          <stop offset="100%" stopColor="rgba(255,122,26,0)" />
        </radialGradient>
        {/* Schuppung: sich überlappende Halbmond-Schuppen wie bei einer
            sauberen MAG-Raupe. userSpace-Pattern als Stroke-Paint = 0 Kosten
            pro Frame, Reveal läuft über denselben Dash-Trick. */}
        <pattern id="weld-ripples" width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="M0 4.6 Q3.5 2.2 7 4.6" fill="none" stroke="rgba(238,243,250,0.40)" strokeWidth="1.2" />
          <path d="M0 6.4 Q3.5 4.4 7 6.4" fill="none" stroke="rgba(8,9,12,0.35)" strokeWidth="1.1" />
        </pattern>
      </defs>

      {/* Anrisslinie: der noch ungeschweißte Weg. */}
      <path ref={baseRef} fill="none" stroke="rgba(201,207,216,0.10)" strokeWidth="1.5" strokeDasharray="2 8" />

      {/* Wärmeeinflusszone: bläuliche Anlauffarben entlang der erkalteten Naht. */}
      <path ref={hazRef} fill="none" stroke="#6E7BC4" strokeWidth="9" strokeLinecap="round" opacity="0.10" />

      {/* Erstarrte Raupe: silbrig, mit Schuppung darüber. */}
      <path ref={beadRef} fill="none" stroke="#848D9B" strokeWidth="4.2" strokeLinecap="round" opacity="0.95" />
      <path ref={rippleRef} fill="none" stroke="url(#weld-ripples)" strokeWidth="4.2" strokeLinecap="round" />

      {/* Heiße Zone: nur die letzten ~260px hinter dem Schmelzbad glühen. */}
      <path ref={hotWideRef} fill="none" stroke="#FF7A1A" strokeWidth="13" strokeLinecap="round" opacity="0.14" />
      <path ref={hotMidRef} fill="none" stroke="#FF9A3D" strokeWidth="6.5" strokeLinecap="round" opacity="0.40" />
      <path ref={hotCoreRef} fill="none" stroke="url(#weld-gradient)" strokeWidth="4.2" strokeLinecap="round" />

      {/* Schmelzbad: weißglühender Kern, Lichtbogen-Flare, Flackern. */}
      <g ref={tipRef}>
        <circle r="24" fill="url(#tip-core)" opacity="0.6" className="animate-flicker" />
        <path
          d="M0 -15 L1.8 -1.8 L15 0 L1.8 1.8 L0 15 L-1.8 1.8 L-15 0 L-1.8 -1.8 Z"
          fill="#FFE9C2"
          opacity="0.55"
          className="animate-flicker"
        />
        <circle r="4.5" fill="#FFFFFF" />
      </g>
      {Array.from({ length: SPARK_COUNT }).map((_, i) => (
        <circle
          key={i}
          ref={(el) => { sparkRefs.current[i] = el; }}
          r="1.5"
          fill={i % 3 === 0 ? "#FFE9C2" : "#FFC46B"}
        />
      ))}
    </svg>
  );
}
