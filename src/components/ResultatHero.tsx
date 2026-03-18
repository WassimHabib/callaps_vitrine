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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-20">
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

        {/* Two columns: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Image */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/resultat-hero.png"
              alt={lang === "fr" ? "0 appel manqué, +26% de conversion" : "0 missed calls, +26% conversion"}
              width={700}
              height={400}
              className="w-full max-w-[500px] h-auto"
              priority
            />
          </div>

          {/* Right — Text */}
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              {lang === "fr" ? "Résultats concrets" : "Real results"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {lang === "fr" ? "Plus de clients." : "More clients."}
              <br />
              <span className="gradient-text">
                {lang === "fr" ? "Un meilleur service." : "Better service."}
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {lang === "fr"
                ? "Callaps ne génère pas seulement des leads. Il améliore l'ensemble de votre relation client : suivi des demandes, qualité de service, temps de réponse, satisfaction."
                : "Callaps doesn't just generate leads. It improves your entire customer relationship: request tracking, service quality, response time, satisfaction."}
            </p>

            {/* Benefits list */}
            <div className="space-y-4">
              {(lang === "fr"
                ? [
                    "0 appel manqué — chaque client est pris en charge",
                    "Nouveaux prospects qualifiés automatiquement",
                    "Demandes clients traitées 24h/24",
                    "Qualité de service mesurée et améliorée",
                    "Temps de réponse divisé par 10",
                  ]
                : [
                    "0 missed calls — every client is taken care of",
                    "New prospects automatically qualified",
                    "Client requests handled 24/7",
                    "Service quality measured and improved",
                    "Response time divided by 10",
                  ]
              ).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
