"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Results() {
  const { lang } = useLang();

  return (
    <section className="bg-surface/50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          {t.results.title[lang]}
        </h2>

        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {t.results.items.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl md:text-6xl font-bold gradient-text">
                  {item.value}
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  {item.label[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
