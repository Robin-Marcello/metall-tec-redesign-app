"use client";

export default function ScrollButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-2 sm:right-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Zum Seitenanfang"
        className="glass-strong flex h-10 w-10 items-center justify-center rounded-full text-mist shadow-glass transition-all duration-200 hover:-translate-y-0.5 hover:text-weld-glow"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <button
        onClick={() =>
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        }
        aria-label="Zum Seitenende"
        className="glass-strong flex h-10 w-10 items-center justify-center rounded-full text-mist shadow-glass transition-all duration-200 hover:translate-y-0.5 hover:text-weld-glow"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </div>
  );
}
