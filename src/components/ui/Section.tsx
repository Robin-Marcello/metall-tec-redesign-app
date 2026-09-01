import { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  /** Adds a node on the weld seam + activation behaviour. */
  threaded?: boolean;
};

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  threaded = true,
}: Props) {
  return (
    <section
      id={id}
      {...(threaded ? { "data-thread-section": "" } : {})}
      className={`relative z-10 px-5 py-24 sm:px-8 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <header className="thread-reactive mb-12 max-w-2xl md:mb-16">
            {eyebrow && (
              <div className="mb-4 flex items-center gap-3">
                {threaded && (
                  <span
                    data-thread-anchor=""
                    className="thread-marker h-2 w-2 rounded-full bg-seam"
                  />
                )}
                <span className="font-mono text-xs uppercase tracking-widest2 text-mist">
                  {eyebrow}
                </span>
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-metal sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
