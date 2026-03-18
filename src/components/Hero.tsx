"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLang();
  const phoneRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      if (phoneRef.current) {
        phoneRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
      }
      if (card1Ref.current) {
        card1Ref.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0B0F]">
      {/* Subtle top gradient — just a hint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        {/* ── Top: Text centered ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-4 tracking-wide uppercase animate-fade-in-up">
            {lang === "fr" ? "Chaque appel compte." : "Every call counts."}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in-up">
            <span className="text-white">{t.hero.title1[lang]}</span>
            <br />
            <span className="gradient-text">{t.hero.titleHighlight[lang]}</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
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
              className="px-8 py-3.5 rounded-xl border border-white/10 text-white font-semibold text-base hover:bg-white/5 transition-all duration-200"
            >
              {t.hero.ctaSecondary[lang]}
            </a>
          </div>

          <p className="text-xs text-slate-600 animate-fade-in-up animation-delay-400">
            {t.hero.subtitleSmall[lang]}
          </p>
        </div>

        {/* ── Bottom: Visual showcase ── */}
        <div className="relative max-w-5xl mx-auto h-[420px] md:h-[480px] animate-fade-in-up animation-delay-600">

          {/* ── Centre: Phone (grand) ── */}
          <div
            ref={phoneRef}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 w-[220px] md:w-[260px]"
            style={{ transition: "transform 0.1s linear" }}
          >
            <div className="rounded-[2.5rem] bg-[#0B0B0F] border border-white/10 p-2.5 shadow-2xl shadow-black/60">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0B0B0F] rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-white/10 rounded-full" />
              </div>
              {/* Screen */}
              <div className="rounded-[2rem] bg-gradient-to-b from-[#111118] to-[#0B0B0F] overflow-hidden">
                {/* Call header */}
                <div className="bg-emerald-500/10 px-4 pt-7 pb-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] text-white font-medium">{lang === "fr" ? "Appel en cours" : "Call in progress"}</p>
                    <p className="text-[9px] text-emerald-400">02:34 — {lang === "fr" ? "Agent IA actif" : "AI Agent active"}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-[3px] rounded-full bg-emerald-400" style={{ height: `${6 + Math.sin(i * 1.2) * 6}px`, animation: `soundbar 0.${3 + i}s ease-in-out infinite alternate` }} />
                    ))}
                  </div>
                </div>

                {/* Transcription */}
                <div className="px-3 py-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[8px] text-accent font-semibold mt-0.5 shrink-0">IA</span>
                    <p className="text-[9px] text-slate-300 leading-relaxed">{lang === "fr" ? "Bonjour, Callaps, comment puis-je vous aider ?" : "Hello, Callaps, how can I help?"}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[8px] text-primary font-semibold mt-0.5 shrink-0">{lang === "fr" ? "Client" : "Client"}</span>
                    <p className="text-[9px] text-slate-300 leading-relaxed">{lang === "fr" ? "Je cherche une solution pour automatiser nos appels." : "I'm looking to automate our calls."}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[8px] text-accent font-semibold mt-0.5 shrink-0">IA</span>
                    <p className="text-[9px] text-slate-300 leading-relaxed">{lang === "fr" ? "Je peux vous aider. Combien d'appels recevez-vous par jour ?" : "I can help. How many calls do you get per day?"}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[8px] text-primary font-semibold mt-0.5 shrink-0">{lang === "fr" ? "Client" : "Client"}</span>
                    <p className="text-[9px] text-slate-300 leading-relaxed">{lang === "fr" ? "Environ 150 par jour." : "About 150 per day."}</p>
                  </div>
                </div>

                {/* Bottom status */}
                <div className="px-3 pb-3">
                  <div className="bg-accent/10 rounded-lg px-2.5 py-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <p className="text-[8px] text-accent font-medium">{lang === "fr" ? "Lead qualifié — transfert CRM..." : "Lead qualified — CRM transfer..."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Carte gauche: Analytics ── */}
          <div
            ref={card1Ref}
            className="absolute left-0 top-8 md:top-12 w-[200px] md:w-[240px] glass rounded-2xl p-4 shadow-xl z-10"
            style={{ transition: "transform 0.1s linear" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-slate-400 font-medium">Analytics</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-base font-bold text-white">247</p>
                <p className="text-[8px] text-slate-500">{lang === "fr" ? "Appels traités" : "Calls handled"}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-base font-bold text-emerald-400">+34</p>
                <p className="text-[8px] text-slate-500">{lang === "fr" ? "Leads générés" : "Leads generated"}</p>
              </div>
            </div>
            {/* Mini chart */}
            <div className="flex items-end gap-[3px] h-10">
              {[35, 55, 40, 70, 50, 85, 60, 90, 55, 95, 70, 80].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent/70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* ── Carte droite: Lead + RDV ── */}
          <div className="absolute right-0 top-4 md:top-8 w-[200px] md:w-[230px] glass rounded-2xl p-4 shadow-xl z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-400 font-medium">{lang === "fr" ? "Dernier lead" : "Latest lead"}</span>
              <span className="text-[8px] text-emerald-400 ml-auto">{lang === "fr" ? "Il y a 2 min" : "2 min ago"}</span>
            </div>
            {/* Lead card */}
            <div className="bg-white/5 rounded-xl p-3 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-[10px] text-accent font-bold">SM</div>
                <div>
                  <p className="text-[10px] text-white font-medium">Sophie Martin</p>
                  <p className="text-[8px] text-slate-500">TechVision — CEO</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[7px] bg-emerald-500/10 text-emerald-400 rounded px-1.5 py-0.5">{lang === "fr" ? "Qualifié" : "Qualified"}</span>
                <span className="text-[7px] bg-primary/10 text-primary rounded px-1.5 py-0.5">{lang === "fr" ? "150 appels/j" : "150 calls/day"}</span>
                <span className="text-[7px] bg-accent/10 text-accent rounded px-1.5 py-0.5">{lang === "fr" ? "Intéressé" : "Interested"}</span>
              </div>
            </div>
            {/* RDV */}
            <div className="bg-accent/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <p className="text-[9px] text-accent font-medium">{lang === "fr" ? "RDV planifié — Jeu. 14h" : "Meeting booked — Thu. 2pm"}</p>
            </div>
          </div>

          {/* ── Carte bas-gauche: Intégration CRM ── */}
          <div className="absolute left-4 md:left-12 bottom-4 w-[180px] glass rounded-xl px-3 py-2.5 shadow-lg z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] text-white font-medium">HubSpot CRM</p>
                <p className="text-[7px] text-emerald-400">{lang === "fr" ? "Synchronisé" : "Synced"}</p>
              </div>
            </div>
          </div>

          {/* ── Carte bas-droite: Stat conversion ── */}
          <div className="absolute right-4 md:right-12 bottom-8 glass rounded-xl px-3 py-2.5 shadow-lg z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] text-white font-medium">+45% conversion</p>
                <p className="text-[7px] text-emerald-400">{lang === "fr" ? "Ce mois" : "This month"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="flex flex-wrap justify-center gap-10 mt-12 animate-fade-in-up animation-delay-600">
          <div className="text-center">
            <p className="text-2xl font-bold gradient-text">{t.hero.stat1Value[lang]}</p>
            <p className="text-xs text-slate-500">{t.hero.stat1Label[lang]}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold gradient-text">{t.hero.stat2Value[lang]}</p>
            <p className="text-xs text-slate-500">{t.hero.stat2Label[lang]}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold gradient-text">{t.hero.stat3Value[lang]}</p>
            <p className="text-xs text-slate-500">{t.hero.stat3Label[lang]}</p>
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
