"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerPlus } from "@/components/icons/sticker";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLang();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-bg-deep overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide mb-4 [box-shadow:3px_3px_0_var(--color-stroke)]">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-stroke mb-4 leading-tight">
            {t.faq.title[lang]}
          </h2>
          <p className="text-text-muted text-lg">{t.faq.subtitle[lang]}</p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-card sticker-border sticker-shadow rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-stroke font-bold cursor-pointer text-left hover:bg-white/5 transition-colors gap-4"
                >
                  <span className="text-base md:text-lg leading-snug">
                    {item.question[lang]}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex-shrink-0 text-stroke"
                  >
                    <StickerPlus size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-6 text-text-muted text-base leading-relaxed">
                        {item.answer[lang]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Optional CTA */}
        <div className="mt-12 text-center">
          <p className="text-text-muted text-sm mb-3">
            {lang === "fr"
              ? "Une question pas listée ?"
              : "A question not listed?"}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-sm font-bold [box-shadow:3px_3px_0_var(--color-stroke)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:5px_5px_0_var(--color-stroke)] transition-transform duration-150"
          >
            {lang === "fr" ? "Contactez-nous" : "Contact us"}
          </a>
        </div>
      </div>
    </section>
  );
}
