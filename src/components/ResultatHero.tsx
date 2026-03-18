"use client";

import Image from "next/image";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function ResultatHero() {
  const { lang } = useLang();

  return (
    <section className="relative z-30 bg-[#0B0B0F] pt-32 md:pt-40 pb-24 px-6 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-16">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold gradient-text">{t.hero.stat1Value[lang]}</p>
            <p className="text-sm text-slate-400 mt-1">{t.hero.stat1Label[lang]}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold gradient-text">{t.hero.stat2Value[lang]}</p>
            <p className="text-sm text-slate-400 mt-1">{t.hero.stat2Label[lang]}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold gradient-text">{t.hero.stat3Value[lang]}</p>
            <p className="text-sm text-slate-400 mt-1">{t.hero.stat3Label[lang]}</p>
          </div>
        </div>

        {/* Text */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            {lang === "fr" ? "Résultats" : "Results"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {lang === "fr" ? "0 appel manqué." : "0 missed calls."}
            <br />
            <span className="gradient-text">
              {lang === "fr" ? "Plus de clients." : "More clients."}
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {lang === "fr"
              ? "Les entreprises qui utilisent Callaps ne perdent plus un seul appel. Chaque interaction devient une opportunité de conversion."
              : "Companies using Callaps never miss a single call. Every interaction becomes a conversion opportunity."}
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/resultat-hero.png"
            alt={lang === "fr" ? "0 appel manqué, +26% de conversion" : "0 missed calls, +26% conversion"}
            width={700}
            height={400}
            className="w-full max-w-[600px] h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
