"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const cardIndices = [0, 1, 3]; // Appels automatisés, IA Conversationnelle, Intégration CRM

export default function Features() {
  const { lang } = useLang();

  return (
    <section id="features" className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t.features.title1[lang]}
            <span className="text-blue-600">{t.features.titleHighlight[lang]}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t.features.subtitle[lang]}
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardIndices.map((cardIndex) => {
            const card = t.features.cards[cardIndex];
            return (
              <div
                key={cardIndex}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {card.metric[lang]}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {card.title[lang]}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {card.description[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
