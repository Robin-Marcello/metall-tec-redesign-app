"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

type HeroContent = {
  eyebrow?: string;
  heading?: React.ReactNode;
  intro?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  specs?: { label: string; value: string }[];
};

const showcaseCards = [
  {
    title: "Geländer",
    label: "EN 1090",
    text: "Absturzsicherung, Glasfüllung, Edelstahl-Handlauf",
    className: "left-0 top-8 rotate-[-7deg]",
  },
  {
    title: "Stiegen",
    label: "S235JR",
    text: "Faltwerk, Podeste, Gitterrost und Sonderlösungen",
    className: "right-2 top-0 rotate-[5deg]",
  },
  {
    title: "Tore",
    label: "Antrieb",
    text: "Schiebe- und Drehtore mit sauberer Führung",
    className: "bottom-8 left-8 rotate-[4deg]",
  },
  {
    title: "Stahlbau",
    label: "EXC2",
    text: "Tragwerke, Vordächer, Carports und Montage",
    className: "bottom-0 right-0 rotate-[-4deg]",
  },
];

const trustSignals = [
  "Aufmaß vor Ort",
  "Eigene Fertigung",
  "Montage-Team",
  "Saubere Übergabe",
];

export default function Hero({
  eyebrow,
  heading,
  intro,
  primaryCta,
  secondaryCta,
  specs,
}: HeroContent = {}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const _eyebrow = eyebrow ?? `Metallbau · ${site.address.city}, ${site.address.region}`;
  const _heading = heading ?? (
    <>
      Aus Stahl wird,
      <br />
      was bleibt.
    </>
  );
  const _intro =
    intro ??
    "Geländer, Stiegen, Tore und Stahlkonstruktionen – geplant, gefertigt und montiert von einem Team, das jede Schweißnaht persönlich nimmt.";
  const _primaryCta = primaryCta ?? { label: "Projekt anfragen", href: "/kontakt" };
  const _secondaryCta = secondaryCta ?? { label: "Projekte ansehen", href: "/projekte" };
  const _specs = specs ?? [
    { label: "Werkstoffe", value: "Stahl · Edelstahl · Alu" },
    { label: "Norm", value: "EN 1090 · EXC2" },
  ];

  return (
    <section ref={ref} className="relative z-10 flex min-h-[100svh] items-center overflow-hidden">
      <motion.div style={reduced ? undefined : { y: yBg }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-[0.38] saturate-[0.85]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--carbon))_0%,rgba(10,11,14,0.86)_42%,rgba(10,11,14,0.45)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/75 via-carbon/35 to-carbon" />
        <div className="absolute -right-32 top-8 h-[34rem] w-[34rem] rounded-full bg-weld/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <div className="hero-grid absolute inset-0 opacity-[0.18]" aria-hidden="true" />
        <div className="sheen-sweep opacity-60" aria-hidden="true" />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { opacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-32 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16"
      >
        <div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/[0.10] bg-white/[0.045] px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-weld-glow shadow-glass"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-weld shadow-weld-glow" aria-hidden="true" />
            {_eyebrow}
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-metal sm:text-6xl md:text-7xl"
          >
            {_heading}
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg"
          >
            {_intro}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href={_primaryCta.href}>{_primaryCta.label}</Button>
            <Button href={_secondaryCta.href} variant="ghost">
              {_secondaryCta.label}
            </Button>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-2"
            aria-label="Projektablauf"
          >
            {trustSignals.map((signal) => (
              <span
                key={signal}
                className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-mist"
              >
                {signal}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 28, rotateX: 8 }}
          animate={{ opacity: 1, x: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden h-[520px] w-full max-w-[520px] [perspective:1200px] lg:block"
          aria-hidden="true"
        >
          <div className="absolute inset-6 rounded-[2rem] border border-white/[0.08] bg-white/[0.025] shadow-[0_40px_140px_rgba(0,0,0,0.55)] [transform:rotateX(58deg)_rotateZ(-24deg)]" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-weld/15 blur-3xl" />
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {showcaseCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={reduced ? false : { opacity: 0, y: 24, rotateY: -12 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.7, delay: 0.55 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute w-60 rounded-3xl border border-white/[0.10] bg-graphite/72 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-500 hover:scale-[1.03] ${card.className}`}
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="rounded-full bg-weld/12 px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-weld-glow">
                    {card.label}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-weld shadow-weld-glow" />
                </div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-chrome">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">{card.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-weld/20 bg-carbon/70 p-5 shadow-weld-glow backdrop-blur-md">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-panel-gradient">
              <video
                className="h-full w-full object-cover opacity-75"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/hero-poster.jpg"
              >
                <source src="/video/hero.mp4" type="video/mp4" />
              </video>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-widest text-mist">
              {_specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3">
                  <dt className="text-mist/60">{spec.label}</dt>
                  <dd className="mt-1 text-chrome">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-mist/50" aria-hidden="true">
        <motion.svg
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M12 4v14m0 0-5-5m5 5 5-5" />
        </motion.svg>
      </div>
    </section>
  );
}
