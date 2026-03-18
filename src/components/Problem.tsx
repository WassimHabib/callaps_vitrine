"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Problem() {
  const { lang } = useLang();

  return (
    <section id="problem" className="bg-surface/50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          {t.problem.title[lang]}
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          {t.problem.subtitle[lang]}
        </p>

        {/* Pain points */}
        <div className="flex flex-col gap-4">
          {t.problem.items.map((item, index) => (
            <div key={index} className="glass rounded-xl p-4 flex items-start gap-4">
              {/* Red X icon */}
              <svg
                className="w-6 h-6 text-red-400 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-lg text-slate-300">{item[lang]}</span>
            </div>
          ))}
        </div>

        {/* Result */}
        <div className="glass rounded-xl p-6 mt-8 text-center relative overflow-hidden">
          {/* Subtle red/orange glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 pointer-events-none" />
          <p className="relative text-xl font-semibold text-white">
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-[length:100%_2px] bg-no-repeat bg-bottom pb-1">
              {t.problem.result[lang]}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
