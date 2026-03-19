"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLang();
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      if (phoneRef.current) {
        phoneRef.current.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-white">
      {/* Glow removed — now using glow-bg.png image behind elements */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        {/* ── Top: Text centered ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-4 tracking-wide uppercase animate-fade-in-up">
            {lang === "fr" ? "Chaque appel compte." : "Every call counts."}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in-up">
            <span className="text-gray-900">{t.hero.title1[lang]}</span>
            <br />
            <span className="gradient-text">{t.hero.titleHighlight[lang]}</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            {t.hero.subtitle[lang]}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 animate-fade-in-up animation-delay-400">
            <Link
              href="/demo"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent to-primary text-white font-semibold text-base shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 transition-all duration-200"
            >
              {t.hero.ctaPrimary[lang]}
            </Link>
            <a
              href="#solution"
              className="px-8 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-base hover:bg-gray-50 transition-all duration-200"
            >
              {t.hero.ctaSecondary[lang]}
            </a>
          </div>

          <p className="text-xs text-gray-400 animate-fade-in-up animation-delay-400">
            {t.hero.subtitleSmall[lang]}
          </p>
        </div>

        {/* ── Phone showcase — centré, grand, dépasse en bas comme droper.ai ── */}
        <div className="relative flex justify-center mt-16 md:mt-20 -mb-32 md:-mb-64 animate-fade-in-up animation-delay-600">

          {/* Glow behind elements */}
          <img src="/glow-bg.png" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] md:w-[1200px] pointer-events-none z-0 opacity-80" />

          {/* Carte haut-gauche — desktop only */}
          <div className="absolute left-2 md:left-8 top-4 md:top-10 z-10 bg-white rounded-2xl border border-gray-100 shadow-lg p-4 w-[180px] md:w-[220px] hidden md:block">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[11px] text-gray-500 font-medium">{lang === "fr" ? "Dernier lead" : "Latest lead"}</span>
            </div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs text-accent font-bold">SM</div>
              <div>
                <p className="text-xs text-gray-900 font-medium">Sophie Martin</p>
                <p className="text-[10px] text-gray-400">TechVision — CEO</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <span className="text-[9px] bg-accent/10 text-accent rounded-full px-2 py-0.5">{lang === "fr" ? "Qualifié" : "Qualified"}</span>
              <span className="text-[9px] bg-primary/10 text-primary rounded-full px-2 py-0.5">{lang === "fr" ? "Intéressé" : "Interested"}</span>
            </div>
          </div>

          {/* Carte haut-droite — desktop only */}
          <div className="absolute right-2 md:right-8 top-8 md:top-14 z-10 bg-white rounded-2xl border border-gray-100 shadow-lg p-4 w-[170px] md:w-[210px] hidden md:block">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[11px] text-gray-500 font-medium">Analytics</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-gray-900">247</p>
                <p className="text-[9px] text-gray-400">{lang === "fr" ? "Appels" : "Calls"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-accent">+34</p>
                <p className="text-[9px] text-gray-400">Leads</p>
              </div>
            </div>
            <div className="flex items-end gap-[3px] h-8">
              {[35, 55, 40, 70, 50, 85, 60, 90, 55, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-accent/70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Phone */}
          <div
            ref={phoneRef}
            className="relative z-20 w-[240px] md:w-[380px]"
            style={{ transition: "transform 0.1s linear" }}
          >
            {/* iPhone frame */}
            <div className="rounded-[3rem] md:rounded-[3.5rem] bg-gradient-to-b from-[#e0e0e8] to-[#c8c8d0] p-[3px] shadow-2xl shadow-black/20">
              <div className="rounded-[2.85rem] md:rounded-[3.35rem] bg-white overflow-hidden">
                {/* Dynamic Island */}
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-[100px] h-[30px] md:w-[120px] md:h-[34px] bg-black rounded-full" />
                </div>
                {/* Screen */}
                <div className="bg-white px-1">
                  {/* Call header */}
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl mx-2 px-5 py-4 flex items-center gap-3 mt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-semibold">{lang === "fr" ? "Appel en cours" : "Call in progress"}</p>
                      <p className="text-xs text-primary">02:34 — {lang === "fr" ? "Agent IA actif" : "AI Agent active"}</p>
                    </div>
                    <div className="flex gap-[3px]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-[3px] rounded-full bg-primary" style={{ height: `${8 + Math.sin(i * 1.2) * 8}px`, animation: `soundbar 0.${3 + i}s ease-in-out infinite alternate` }} />
                      ))}
                    </div>
                  </div>

                  {/* Transcription — rallongée */}
                  <div className="px-4 py-4 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs text-accent font-bold mt-0.5 shrink-0">IA</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{lang === "fr" ? "Bonjour, Callaps, comment puis-je vous aider ?" : "Hello, Callaps, how can I help?"}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs text-primary font-bold mt-0.5 shrink-0">{lang === "fr" ? "Client" : "Client"}</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{lang === "fr" ? "Je cherche une solution pour automatiser nos appels." : "I'm looking to automate our calls."}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs text-accent font-bold mt-0.5 shrink-0">IA</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{lang === "fr" ? "Bien sûr ! Combien d'appels recevez-vous par jour ?" : "Of course! How many calls do you get per day?"}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs text-primary font-bold mt-0.5 shrink-0">{lang === "fr" ? "Client" : "Client"}</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{lang === "fr" ? "Environ 150 par jour, et on en rate beaucoup." : "About 150 per day, and we miss a lot."}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs text-accent font-bold mt-0.5 shrink-0">IA</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{lang === "fr" ? "Notre agent IA peut tous les traiter, 24h/24. Je vous propose un créneau pour une démo ?" : "Our AI agent can handle all of them, 24/7. Can I book a demo slot for you?"}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs text-primary font-bold mt-0.5 shrink-0">{lang === "fr" ? "Client" : "Client"}</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{lang === "fr" ? "Oui, jeudi 14h si possible." : "Yes, Thursday 2pm if possible."}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs text-accent font-bold mt-0.5 shrink-0">IA</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{lang === "fr" ? "C'est noté ! RDV confirmé jeudi à 14h. Bonne journée !" : "Noted! Meeting confirmed Thursday at 2pm. Have a great day!"}</p>
                    </div>
                  </div>

                  {/* Lead status */}
                  <div className="px-4 pb-5">
                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl px-4 py-3 flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <p className="text-xs text-accent font-semibold">{lang === "fr" ? "Lead qualifié — transfert CRM..." : "Lead qualified — CRM transfer..."}</p>
                    </div>
                  </div>

                  {/* RDV confirmé */}
                  <div className="px-4 pb-6">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/5 rounded-xl px-4 py-3 flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <p className="text-xs text-primary font-semibold">{lang === "fr" ? "RDV confirmé — Jeu. 14h" : "Meeting confirmed — Thu. 2pm"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* CSS for sound bars */}
      <style jsx>{`
        @keyframes soundbar {
          from { height: 3px; }
          to { height: 14px; }
        }
      `}</style>
    </section>
  );
}
