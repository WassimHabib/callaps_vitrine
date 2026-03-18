"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-blue-600 shrink-0"
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
    <section id="pricing" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.pricing.title1[lang]}
            <span className="text-blue-600">{t.pricing.titleHighlight[lang]}</span>
          </h2>
          <p className="text-lg text-gray-500">
            {t.pricing.subtitle[lang]}
          </p>
        </div>

        {/* Plans - 2 cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.pricing.plans[0].name[lang]}
            </h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">
                {t.pricing.plans[0].price[lang]}
              </span>
              <span className="text-lg text-gray-500"> {t.pricing.monthly[lang]}</span>
            </div>
            <p className="text-gray-500 mb-8">
              {t.pricing.plans[0].description[lang]}
            </p>

            <ul className="space-y-4 mb-8">
              {t.pricing.plans[0].features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-gray-700">
                  <CheckIcon />
                  {feature[lang]}
                </li>
              ))}
            </ul>

            <a
              href="#start"
              className="block w-full text-center px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold transition-colors duration-300 hover:bg-blue-50"
            >
              {t.pricing.cta[lang]}
            </a>
          </div>

          {/* Business (Featured) */}
          <div className="relative bg-white rounded-2xl p-8 border border-gray-200 ring-2 ring-blue-600">
            {/* Badge */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold">
              {t.pricing.recommended[lang]}
            </span>

            <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-2">
              {t.pricing.plans[1].name[lang]}
            </h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">
                {t.pricing.plans[1].price[lang]}
              </span>
              <span className="text-lg text-gray-500"> {t.pricing.monthly[lang]}</span>
            </div>
            <p className="text-gray-500 mb-8">
              {t.pricing.plans[1].description[lang]}
            </p>

            <ul className="space-y-4 mb-8">
              {t.pricing.plans[1].features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-gray-700">
                  <CheckIcon />
                  {feature[lang]}
                </li>
              ))}
            </ul>

            <a
              href="#start"
              className="block w-full text-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold transition-colors duration-300 hover:bg-blue-700"
            >
              {t.pricing.cta[lang]}
            </a>
          </div>
        </div>

        {/* Enterprise line */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">
            {lang === "fr" ? "Besoin de plus ?" : "Need more?"}{" "}
            <a href="#contact" className="text-blue-600 font-semibold hover:underline">
              {t.pricing.ctaContact[lang]}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
