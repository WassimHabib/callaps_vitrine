"use client";

import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-surface/50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">{t.faq.title[lang]}</span>
          </h2>
          <p className="text-slate-400 text-lg">
            {t.faq.subtitle[lang]}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl mb-4"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 flex justify-between items-center text-white font-medium cursor-pointer text-left hover:bg-white/5 rounded-xl transition-colors"
                >
                  <span>{t.faq.items[index].question[lang]}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-400">
                    {t.faq.items[index].answer[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
