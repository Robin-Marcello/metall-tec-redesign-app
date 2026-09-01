"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";
type StepNum = 1 | 2 | 3;

const topicsDe = [
  { value: "Geländer", sub: "Balkon · Stiege · Terrasse" },
  { value: "Stiege", sub: "Stahl · Glas · Holzstufen" },
  { value: "Tor / Zaun", sub: "Schiebetore · Antriebe" },
  { value: "Vordach / Carport", sub: "Stahl · Glas · Holz" },
  { value: "Sonnensegel / Sonnenschutz", sub: "Terrasse · Balkon · Objekt" },
  { value: "Sonstiges", sub: "Sonderanfertigung · Reparatur" },
];

const topicsEn = [
  { value: "Railing", sub: "Balcony · Staircase · Terrace" },
  { value: "Staircase", sub: "Steel · Glass · Timber treads" },
  { value: "Gate / Fence", sub: "Sliding gates · Drives" },
  { value: "Canopy / Carport", sub: "Steel · Glass · Timber" },
  { value: "Awning / Sun protection", sub: "Terrace · Balcony · Commercial" },
  { value: "Other", sub: "Custom work · Repairs" },
];

const labelsDe = {
  steps: ["Leistung", "Projekt", "Kontakt"],
  topicPrompt: "Worum geht es?",
  change: "ändern",
  projectLabel: "Ihr Projekt *",
  projectPlaceholder: "Was soll gebaut, saniert oder repariert werden? Maße und Fotos können Sie später nachreichen.",
  back: "← Zurück",
  next: "Weiter",
  nameLabel: "Name *",
  namePlaceholder: "Max Mustermann",
  phoneLabel: "Telefon",
  emailLabel: "E-Mail *",
  emailPlaceholder: "max@beispiel.at",
  consent: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur Bearbeitung der Anfrage zu.",
  sending: "Wird gesendet …",
  submit: "Anfrage senden",
  successTitle: "Anfrage gesendet",
  successMsg: "Danke für Ihr Vertrauen. Wir melden uns in der Regel noch am selben Werktag.",
  errorMsg: "Das Senden hat nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.",
};

const labelsEn = {
  steps: ["Service", "Project", "Contact"],
  topicPrompt: "What can we help with?",
  change: "change",
  projectLabel: "Your project *",
  projectPlaceholder: "What needs to be built, renovated or repaired? You can send measurements and photos later.",
  back: "← Back",
  next: "Next",
  nameLabel: "Name *",
  namePlaceholder: "John Smith",
  phoneLabel: "Phone",
  emailLabel: "E-mail *",
  emailPlaceholder: "john@example.com",
  consent: "By submitting you agree to the processing of your data to handle your enquiry.",
  sending: "Sending …",
  submit: "Send enquiry",
  successTitle: "Enquiry sent",
  successMsg: "Thank you for getting in touch. We usually respond the same business day.",
  errorMsg: "Sending failed. Please try again or give us a call.",
};

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-chrome placeholder:text-mist/50 transition-colors focus:border-weld/60 focus:bg-white/[0.05] focus:outline-none";

export default function ContactForm({ locale = "de" }: { locale?: "de" | "en" }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState<StepNum>(1);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ topic: "", message: "", name: "", phone: "", email: "" });

  const topics = locale === "en" ? topicsEn : topicsDe;
  const L = locale === "en" ? labelsEn : labelsDe;

  function goTo(next: StepNum) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass rounded-3xl p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-weld/15 text-weld-glow">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-chrome">{L.successTitle}</h3>
        <p className="mt-3 text-sm text-mist">{L.successMsg}</p>
      </div>
    );
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * 36 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -36 }),
  };

  return (
    <div className="glass rounded-3xl p-7 sm:p-9">
      <div className="mb-8 flex items-center">
        {L.steps.map((label, i) => {
          const s = (i + 1) as StepNum;
          const done = s < step;
          const active = s === step;
          return (
            <Fragment key={s}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs transition-all duration-300 ${
                    done ? "bg-weld text-[#0A0B0E]" : active ? "border border-weld text-weld-glow" : "border border-seam text-mist/40"
                  }`}
                >
                  {done ? (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-widest ${active ? "text-weld-glow" : "text-mist/40"}`}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className="mx-3 mb-5 h-px flex-1 transition-colors duration-500"
                  style={{ background: done ? "#c2ce4b" : "rgba(255,255,255,0.08)" }}
                />
              )}
            </Fragment>
          );
        })}
      </div>

      <AnimatePresence mode="wait" custom={dir}>
        {step === 1 && (
          <motion.div key="step1" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.27, ease: [0.22, 1, 0.36, 1] }}>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-widest2 text-mist/60">{L.topicPrompt}</p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {topics.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => { setForm((f) => ({ ...f, topic: t.value })); goTo(2); }}
                  className="flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-weld/30 hover:bg-weld/[0.04]"
                >
                  <span className="font-medium text-chrome">{t.value}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-mist/50">{t.sub}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.27, ease: [0.22, 1, 0.36, 1] }} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-weld/40 bg-weld/[0.08] px-4 py-1.5 text-sm text-weld-glow">{form.topic}</span>
              <button type="button" onClick={() => goTo(1)} className="text-xs text-mist/50 transition-colors hover:text-chrome">{L.change}</button>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-mist">{L.projectLabel}</label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder={L.projectPlaceholder}
                className={inputCls}
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <button type="button" onClick={() => goTo(1)} className="text-sm text-mist/60 transition-colors hover:text-chrome">{L.back}</button>
              <Button onClick={() => { if (form.message.trim()) goTo(3); }} disabled={!form.message.trim()}>{L.next}</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.form key="step3" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.27, ease: [0.22, 1, 0.36, 1] }} onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-mist">{L.nameLabel}</label>
                <input id="name" required autoComplete="name" placeholder={L.namePlaceholder} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-mist">{L.phoneLabel}</label>
                <input id="phone" type="tel" autoComplete="tel" placeholder="+43 …" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-widest2 text-mist">{L.emailLabel}</label>
              <input id="email" type="email" required autoComplete="email" placeholder={L.emailPlaceholder} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} />
            </div>

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-end sm:justify-between">
              <button type="button" onClick={() => goTo(2)} className="text-sm text-mist/60 transition-colors hover:text-chrome">{L.back}</button>
              <div className="flex flex-col items-end gap-3">
                <p className="text-right text-xs leading-relaxed text-mist/60">{L.consent}</p>
                <Button type="submit" disabled={status === "sending"}>{status === "sending" ? L.sending : L.submit}</Button>
              </div>
            </div>

            {status === "error" && (
              <p className="rounded-xl border border-weld/40 bg-weld/10 px-4 py-3 text-sm text-weld-glow" role="alert">{L.errorMsg}</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
