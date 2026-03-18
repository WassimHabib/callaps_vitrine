"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Solution() {
  const { lang } = useLang();

  return (
    <section id="solution" className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0B0B0F] via-surface to-surface-dark">
      {/* Gradient glow — le glow coloré descend ici */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[15%] w-[400px] h-[300px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />

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
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {t.solution.items.map((item, index) => (
            <div key={index} className="glass rounded-xl p-5 flex items-start gap-4">
              <svg
                className="w-6 h-6 text-accent-light shrink-0 mt-0.5"
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
