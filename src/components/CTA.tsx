"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function CTA() {
  const { lang } = useLang();

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          {/* Decorative glow circles */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent rounded-full blur-3xl opacity-20" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">{t.cta.title[lang]}</span>{" "}
              <span className="gradient-text">{t.cta.titleHighlight[lang]}</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/demo"
                className="bg-gradient-to-r from-primary to-accent rounded-xl px-8 py-4 text-white font-semibold text-lg shadow hover:scale-105 transition-transform"
              >
                {t.cta.ctaPrimary[lang]}
              </Link>
              <Link
                href="/demo"
                className="glass rounded-xl px-8 py-4 text-white font-semibold text-lg"
              >
                {t.cta.ctaSecondary[lang]}
              </Link>
            </div>

            <p className="text-slate-400 text-sm mt-8">
              {t.cta.trust[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
