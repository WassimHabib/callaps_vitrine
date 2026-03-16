"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const stepNumbers = ["01", "02", "03", "04"];

export default function HowItWorks() {
  const { lang } = useLang();

  return (
    <section className="relative bg-surface/50 py-24 px-4 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.howItWorks.title[lang]}</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            {t.howItWorks.subtitle[lang]}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-accent" />

          <div className="flex flex-col gap-12">
            {t.howItWorks.steps.map((step, index) => (
              <div key={stepNumbers[index]} className="relative pl-12 md:pl-24">
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent ring-4 ring-surface/80" />

                {/* Card */}
                <div className="glass rounded-2xl p-5 md:p-8">
                  {/* Step number & badge row */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-bold gradient-text leading-none">
                      {stepNumbers[index]}
                    </span>
                    <span className="bg-primary/10 text-primary text-sm font-medium rounded-full px-3 py-1">
                      {step.badge[lang]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                    {step.title[lang]}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed">
                    {step.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
