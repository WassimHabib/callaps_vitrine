"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-accent shrink-0"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {t.pricing.plans.map((plan, i) => {
            const isFeatured = i === 1;
            const isCustom = i === 2;

            return (
              <div
                key={i}
                className={`glass rounded-2xl p-8 flex flex-col transition-transform duration-300 hover:scale-[1.02] ${
                  isFeatured
                    ? "ring-2 ring-accent/40 shadow-xl shadow-accent/10 lg:scale-105 lg:hover:scale-[1.07]"
                    : ""
                } relative`}
              >
                {/* Badge */}
                {isFeatured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold whitespace-nowrap">
                    🔥 {t.pricing.recommended[lang]}
                  </span>
                )}

                <h3 className={`text-xl font-semibold text-white mb-2 ${isFeatured ? "mt-2" : ""}`}>
                  {plan.name[lang]}
                </h3>

                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {plan.price[lang]}
                  </span>
                  {!isCustom && (
                    <span className="text-lg text-slate-400"> {t.pricing.monthly[lang]}</span>
                  )}
                </div>

                <p className="text-slate-400 mb-6 text-sm">
                  {plan.description[lang]}
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckIcon />
                      {feature[lang]}
                    </li>
                  ))}
                </ul>

                {/* Extra pricing */}
                {plan.extra && (
                  <p className="text-xs text-slate-500 mb-6 border-t border-white/5 pt-4">
                    {plan.extra[lang]}
                  </p>
                )}

                <Link
                  href="/demo"
                  className={`block w-full text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    isFeatured
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-accent/25 hover:scale-105"
                      : "border border-accent/30 text-accent hover:bg-accent/10"
                  }`}
                >
                  {isCustom ? t.pricing.ctaContact[lang] : t.pricing.cta[lang]}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
