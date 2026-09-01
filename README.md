# Metall-Tec — Website

Premium-Dark-Theme-Website für Metall-Tec (Metallbau, Katzelsdorf/NÖ).
Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · GSAP.

## Signature Feature: Die Schweißnaht

Eine leuchtende SVG-„Schweißnaht" zieht sich durch jede Seite:

- Der Pfad wird zur Laufzeit aus den Positionen aller `[data-thread-anchor]`-Elemente
  generiert (serpentinenförmige Bézier-Kurve) → funktioniert auf jeder Seitenlänge.
- GSAP ScrollTrigger scrubbt `stroke-dashoffset` → die Naht wird exakt so weit
  „geschweißt", wie der Nutzer gescrollt hat.
- Am Ende der Naht sitzt eine glühende Spitze mit Funkenpartikeln (rAF-Loop).
- Jede `[data-thread-section]` bekommt die Klasse `is-lit`, sobald die Naht sie
  erreicht → Inhalte aktivieren sich (`.thread-reactive`).
- `prefers-reduced-motion`: statische, vollständig gezeichnete Naht, keine Funken.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
```

## Deployment (Vercel)

```bash
npm i -g vercel
vercel           # Projekt verknüpfen
vercel --prod    # Produktiv-Deployment (Region: fra1)
```

Oder Repo zu GitHub pushen und in Vercel importieren — `vercel.json` ist enthalten.

## Inhalte ersetzen

| Was | Wo |
|---|---|
| Hero-Video | `public/video/hero.mp4` + `hero-poster.jpg` |
| Projektfotos | `public/images/` + `SteelPlate` durch `next/image` ersetzen |
| Texte/Projekte/Leistungen | `src/lib/data.ts` |
| Adresse, Telefon, E-Mail | `src/lib/site.ts` |
| Kontaktformular-Versand | `src/app/api/contact/route.ts` (Resend/SMTP einhängen) |

## Struktur

```
src/
├── app/                  # App Router: Seiten, API, sitemap, robots
├── components/
│   ├── thread/           # WeldThread (Signature Feature)
│   ├── home/             # Hero, Services, Gallery, BeforeAfter, ...
│   ├── contact/          # Formular + DSGVO-Maps-Embed
│   ├── layout/           # Navbar, Footer
│   └── ui/               # Section, Button, Reveal, Logo, SteelPlate
├── lib/                  # site.ts, data.ts, seo.ts, gsap.ts
└── hooks/
```

## SEO

- Metadata-API pro Seite, OpenGraph `de_AT`, Canonicals
- JSON-LD `LocalBusiness` (Adresse, Geo, Öffnungszeiten)
- `sitemap.xml` + `robots.txt` generiert
- Security-Header via `next.config.mjs`
