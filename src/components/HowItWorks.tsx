"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const stepNumbers = ["01", "02", "03", "04"];

export default function HowItWorks() {
  const { lang } = useLang();

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.howItWorks.title[lang]}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t.howItWorks.subtitle[lang]}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {t.howItWorks.steps.map((step, index) => (
            <div key={stepNumbers[index]} className="relative flex flex-col items-center md:items-start text-center md:text-left">
              {/* Dashed connector (hidden on last step and on mobile) */}
              {index < t.howItWorks.steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full border-t border-dashed border-gray-200" />
              )}

              {/* Step number */}
              <span className="text-5xl font-bold text-blue-100 leading-none mb-3">
                {stepNumbers[index]}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title[lang]}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
