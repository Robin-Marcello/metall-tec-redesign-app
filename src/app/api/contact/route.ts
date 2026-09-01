import { NextResponse } from "next/server";
import { Resend } from "resend";

// Testbetrieb: FROM bleibt onboarding@resend.dev (kein Domain-Nachweis nötig).
// Produktion: Domain metall-tec.at in Resend verifizieren, dann RESEND_FROM setzen.
const FROM_ADDRESS = process.env.RESEND_FROM ?? "onboarding@resend.dev";
// RESEND_TO muss mit der E-Mail-Adresse übereinstimmen, die das Resend-Konto erstellt hat
// (Einschränkung im kostenlosen Plan ohne Domain-Verifizierung).
const TO_ADDRESS = process.env.RESEND_TO ?? "office@metall-tec.at";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const ALLOWED_TOPICS = [
    "Geländer", "Stiege", "Tor / Zaun", "Vordach / Carport",
    "Sonnensegel / Sonnenschutz", "Sonstiges",
    "Railing", "Staircase", "Gate / Fence", "Canopy / Carport",
    "Awning / Sun protection", "Other",
  ];

  const name    = String(body.name    ?? "").trim().slice(0, 200);
  const email   = String(body.email   ?? "").trim().slice(0, 254);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const phone   = String(body.phone   ?? "").trim().slice(0, 50);
  const rawTopic = String(body.topic  ?? "").trim();
  const topic   = ALLOWED_TOPICS.includes(rawTopic) ? rawTopic : "Sonstiges";

  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "Bitte Name, gültige E-Mail und Nachricht angeben." },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Kontaktanfrage] RESEND_API_KEY nicht gesetzt – E-Mail übersprungen.");
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  try {
    // Notification to Martin
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `Neue Anfrage: ${topic} – ${name}`,
      text: [
        "Neue Kontaktanfrage über die Website:",
        "",
        `Name:     ${name}`,
        `E-Mail:   ${email}`,
        `Telefon:  ${phone || "–"}`,
        `Thema:    ${topic}`,
        "",
        "Nachricht:",
        message,
      ].join("\n"),
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "Ihre Anfrage bei Metall-Tec",
      text: [
        `Guten Tag ${name},`,
        "",
        "vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten",
        "und melden uns in der Regel noch am selben Werktag bei Ihnen.",
        "",
        "Mit freundlichen Grüßen",
        "Metall-Tec Metallbau",
        "",
        "Tel.:   +43 2622 000000",
        "E-Mail: office@metall-tec.at",
        "Web:    https://www.metall-tec.at",
      ].join("\n"),
    });
  } catch (err) {
    console.error("[Kontaktanfrage] Mail-Fehler:", err);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
