"use client";

import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: t.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question.fr,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer.fr,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.faq.title[lang]}
          </h2>
          <p className="text-gray-500 text-lg">
            {t.faq.subtitle[lang]}
          </p>
        </div>

        {/* Accordion */}
        <div>
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggle(index)}
                  className="w-full py-5 flex justify-between items-center text-gray-900 font-medium cursor-pointer text-left transition-colors"
                >
                  <span>{item.question[lang]}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 ml-4 text-gray-400 transition-transform duration-300 ${
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
                  <div className="pb-5 text-gray-500 leading-relaxed">
                    {item.answer[lang]}
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
