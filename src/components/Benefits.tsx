"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Benefits() {
  const { lang } = useLang();

  return (
    <section className="bg-surface-dark py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
          {t.benefits.title[lang]}
        </h2>

        {/* Benefits list */}
        <div className="flex flex-col gap-4">
          {t.benefits.items.map((item, i) => (
            <div
              key={i}
              className="glass rounded-xl p-5 flex items-center gap-4 border-l-2 border-primary"
            >
              {/* Checkmark / lightning icon */}
              <span className="gradient-text text-2xl flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="url(#benefit-grad)" strokeWidth={2.5}>
                  <defs>
                    <linearGradient id="benefit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-primary)" />
                      <stop offset="100%" stopColor="var(--color-accent)" />
                    </linearGradient>
                  </defs>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </span>
              <span className="text-xl text-white font-medium">{item[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
