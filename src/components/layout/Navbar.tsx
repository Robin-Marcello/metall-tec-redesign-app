"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";
import { getLocale, localePathMap, navEn } from "@/lib/i18n";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const locale = getLocale(pathname);
  const isEn = locale === "en";
  const navItems = isEn ? navEn : nav;
  const homeHref = isEn ? "/en" : "/";
  const ctaHref = isEn ? "/en/contact" : "/kontakt";
  const ctaLabel = isEn ? "Get a quote" : "Anfrage starten";
  const altLangHref = localePathMap[pathname] ?? (isEn ? "/" : "/en");
  const altLangLabel = isEn ? "DE" : "EN";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 transition-all duration-500 ${
          scrolled || open
            ? "glass-strong py-2"
            : "border border-transparent py-3.5"
        }`}
      >
        <Link href={homeHref} className="flex items-center gap-3" aria-label="Metall-Tec – Startseite">
          <Logo className={`transition-all duration-500 ${scrolled ? "h-6 w-6" : "h-8 w-8"}`} />
          <span className={`font-display font-bold tracking-tight text-chrome transition-all duration-500 ${scrolled ? "text-base" : "text-lg"}`}>
            Metall<span className="text-weld">|</span>Tec
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active ? "text-chrome" : "text-mist hover:text-chrome"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-chrome/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          <Link
            href={altLangHref}
            className="ml-2 rounded-full border border-white/[0.12] px-3 py-1.5 font-mono text-xs font-medium text-mist/70 transition-all hover:border-white/30 hover:text-chrome"
            aria-label={`Switch to ${altLangLabel}`}
          >
            {altLangLabel}
          </Link>

          <ThemeToggle className="ml-2" />

          <Link
            href={ctaHref}
            className="ml-2 rounded-full bg-weld px-5 py-2 text-sm font-semibold text-[#0A0B0E] shadow-weld-glow transition-transform hover:-translate-y-0.5"
          >
            {ctaLabel}
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-chrome md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-strong mx-auto mt-2 max-w-6xl rounded-2xl p-3 md:hidden"
            aria-label="Mobile Navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-base ${
                  pathname === item.href ? "bg-chrome/[0.08] text-chrome" : "text-mist"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={altLangHref}
              className="mt-1 block rounded-xl px-4 py-3 font-mono text-sm text-mist/60"
            >
              {altLangLabel === "EN" ? "🌐 English version" : "🌐 Deutsche Version"}
            </Link>
            <div className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3">
              <ThemeToggle />
              <span className="text-sm text-mist/60">Darstellungsmodus</span>
            </div>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-2 block rounded-xl bg-weld px-4 py-3 text-center font-semibold text-[#0A0B0E]"
            >
              {site.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
