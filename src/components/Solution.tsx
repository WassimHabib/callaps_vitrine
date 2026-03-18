"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Solution() {
  const { lang } = useLang();

  return (
    <section id="solution" className="relative bg-surface-dark py-24 px-6 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          <span className="text-white">{t.solution.title[lang]}</span>
          <span className="gradient-text">{t.solution.titleHighlight[lang]}</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg text-center mb-12 max-w-2xl mx-auto">
          {t.solution.subtitle[lang]}
        </p>

        {/* Solution items */}
        <div className="flex flex-col gap-4">
          {t.solution.items.map((item, index) => (
            <div key={index} className="glass rounded-xl p-4 flex items-start gap-4">
              {/* Green checkmark icon */}
              <svg
                className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-lg text-slate-200">{item[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
