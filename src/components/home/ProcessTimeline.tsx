import { processSteps } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

type Step = { step: string; title: string; text: string };

export default function ProcessTimeline({ steps = processSteps }: { steps?: Step[] }) {
  const total = String(steps.length).padStart(2, "0");
  return (
    <ol className="relative mx-auto max-w-2xl space-y-14">
      {steps.map((s, i) => (
        <li key={s.step} data-thread-section="" className="relative">
          <Reveal delay={i * 0.05}>
            <div className="thread-reactive glass relative rounded-3xl p-7 sm:p-8">
              <div className="flex items-start gap-5">
                <span
                  data-thread-anchor=""
                  className="thread-marker mt-1 flex h-3 w-3 shrink-0 rounded-full bg-seam"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest2 text-weld-glow">
                    Station {s.step} / {total}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-chrome sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">{s.text}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
