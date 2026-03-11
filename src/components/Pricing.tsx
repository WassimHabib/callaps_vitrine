"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-cyan-400 shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function Pricing() {
  const { lang } = useLang();

  return (
    <section id="pricing" className="bg-surface/50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">
              {t.pricing.title1[lang]}
              {t.pricing.titleHighlight[lang]}
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            {t.pricing.subtitle[lang]}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Starter */}
          <div className="glass rounded-2xl p-8 transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-xl font-semibold text-white mb-2">
              {t.pricing.plans[0].name[lang]}
            </h3>
            <div className="mb-4">
              <span className="text-5xl font-bold text-white">
                {t.pricing.plans[0].price[lang]}
              </span>
              <span className="text-lg text-slate-400"> {t.pricing.monthly[lang]}</span>
            </div>
            <p className="text-slate-400 mb-8">
              {t.pricing.plans[0].description[lang]}
            </p>

            <ul className="space-y-4 mb-8">
              {t.pricing.plans[0].features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-slate-300">
                  <CheckIcon />
                  {feature[lang]}
                </li>
              ))}
            </ul>

            <a
              href="#start"
              className="block w-full text-center px-6 py-3 rounded-full border border-primary text-primary font-semibold transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              {t.pricing.cta[lang]}
            </a>
          </div>

          {/* Business (Featured) */}
          <div className="relative glass rounded-2xl p-8 ring-2 ring-primary/30 shadow-xl shadow-primary/10 lg:scale-105 transition-transform duration-300 hover:scale-[1.07] lg:hover:scale-[1.07]">
            {/* Badge */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold">
              {t.pricing.recommended[lang]}
            </span>

            <h3 className="text-xl font-semibold text-white mb-2 mt-2">
              {t.pricing.plans[1].name[lang]}
            </h3>
            <div className="mb-4">
              <span className="text-5xl font-bold text-white">
                {t.pricing.plans[1].price[lang]}
              </span>
              <span className="text-lg text-slate-400"> {t.pricing.monthly[lang]}</span>
            </div>
            <p className="text-slate-400 mb-8">
              {t.pricing.plans[1].description[lang]}
            </p>

            <ul className="space-y-4 mb-8">
              {t.pricing.plans[1].features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-slate-300">
                  <CheckIcon />
                  {feature[lang]}
                </li>
              ))}
            </ul>

            <a
              href="#start"
              className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold transition-transform duration-300 hover:scale-105 shadow-lg shadow-primary/25"
            >
              {t.pricing.cta[lang]}
            </a>
          </div>

          {/* Enterprise */}
          <div className="glass rounded-2xl p-8 transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-xl font-semibold text-white mb-2">
              {t.pricing.plans[2].name[lang]}
            </h3>
            <div className="mb-4">
              <span className="text-5xl font-bold text-white">
                {t.pricing.plans[2].price[lang]}
              </span>
            </div>
            <p className="text-slate-400 mb-8">
              {t.pricing.plans[2].description[lang]}
            </p>

            <ul className="space-y-4 mb-8">
              {t.pricing.plans[2].features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-slate-300">
                  <CheckIcon />
                  {feature[lang]}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="block w-full text-center px-6 py-3 rounded-full border border-primary text-primary font-semibold transition-colors duration-300 hover:bg-primary hover:text-white"
            >
              {t.pricing.ctaContact[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
