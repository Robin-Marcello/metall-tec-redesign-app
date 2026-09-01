"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { addressMapUrl, navEn, getLocale } from "@/lib/i18n";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const isEn = locale === "en";
  const navItems = isEn ? navEn : nav;
  const homeHref = isEn ? "/en" : "/";

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-graphite/60 px-5 py-16 backdrop-blur-xl sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href={homeHref} className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="font-display text-xl font-bold tracking-tight text-chrome">
              Metall<span className="text-weld">|</span>Tec
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
            {isEn
              ? "Metal construction from Katzelsdorf, Lower Austria. Planned, fabricated and installed from a single source – with the commitment that every weld holds what we promise."
              : "Metallbau aus Katzelsdorf, Niederösterreich. Geplant, gefertigt und montiert aus einer Hand – seit jeher mit dem Anspruch, dass jede Naht hält, was wir versprechen."}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest2 text-mist/70">
            EN 1090 · {isEn ? "Master workshop" : "Meisterbetrieb"} · {site.address.region}
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest2 text-mist">
            {isEn ? "Navigation" : "Navigation"}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-chrome/80 transition-colors hover:text-weld-glow">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest2 text-mist">
            {isEn ? "Contact" : "Kontakt"}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-chrome/80">
            <li>
              <a
                href={addressMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-weld-glow"
              >
                {site.address.street}<br />{site.address.zip} {site.address.city}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-weld-glow">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-weld-glow">
                {site.email}
              </a>
            </li>
            <li className="text-mist">
              {isEn ? "Mon–Thu 07:00–16:00, Fri 07:00–12:00" : site.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-mist/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. {isEn ? "All rights reserved." : "Alle Rechte vorbehalten."}</p>
        <p className="flex gap-5">
          <Link href="/impressum" className="hover:text-chrome">
            {isEn ? "Imprint" : "Impressum"}
          </Link>
          <Link href="/datenschutz" className="hover:text-chrome">
            {isEn ? "Privacy policy" : "Datenschutz"}
          </Link>
        </p>
      </div>
    </footer>
  );
}
