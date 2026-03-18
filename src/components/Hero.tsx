"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

export default function Hero() {
  const { lang } = useLang();
  const phoneRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      if (phoneRef.current) {
        phoneRef.current.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
      }
      if (dashRef.current) {
        dashRef.current.style.transform = `translate3d(0, ${y * 0.1}px, 0)`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Large glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 animate-fade-in-up">
              <span className="text-white">{t.hero.title1[lang]}</span>
              <span className="gradient-text">{t.hero.titleHighlight[lang]}</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl mb-3 animate-fade-in-up animation-delay-200">
              {t.hero.subtitle[lang]}
            </p>

            <p className="text-sm text-slate-500 max-w-lg mb-8 animate-fade-in-up animation-delay-200">
              {t.hero.subtitleSmall[lang]}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10 animate-fade-in-up animation-delay-400">
              <Link
                href="/demo"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-base shadow-lg shadow-primary/25 hover:scale-105 transition"
              >
                {t.hero.ctaPrimary[lang]}
              </Link>
              <a
                href="#solution"
                className="px-7 py-3.5 rounded-xl glass text-white font-semibold text-base hover:scale-105 transition"
              >
                {t.hero.ctaSecondary[lang]}
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 animate-fade-in-up animation-delay-600">
              <div>
                <p className="text-3xl font-bold gradient-text">{t.hero.stat1Value[lang]}</p>
                <p className="text-xs text-slate-500">{t.hero.stat1Label[lang]}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">{t.hero.stat2Value[lang]}</p>
                <p className="text-xs text-slate-500">{t.hero.stat2Label[lang]}</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">{t.hero.stat3Value[lang]}</p>
                <p className="text-xs text-slate-500">{t.hero.stat3Label[lang]}</p>
              </div>
            </div>
          </div>

          {/* Right — Floating visual */}
          <div className="relative hidden lg:flex items-center justify-center h-[600px]">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl" />

            {/* ── Phone mockup (centre, grand) ── */}
            <div
              ref={phoneRef}
              className="relative z-10 w-[260px] rounded-[2.5rem] bg-slate-950 border border-white/10 p-3 shadow-2xl shadow-black/50"
              style={{ transition: "transform 0.1s linear" }}
            >
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-950 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
              </div>
              {/* Screen */}
              <div className="rounded-[2rem] bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 pt-7 pb-2">
                  <span className="text-[10px] text-slate-500">Callaps IA</span>
                  <span className="text-[10px] text-emerald-400">{lang === "fr" ? "En ligne" : "Online"}</span>
                </div>
                {/* Agent info */}
                <div className="text-center px-4 pb-3 border-b border-white/5">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                      <circle cx="12" cy="9" r="2" />
                    </svg>
                  </div>
                  <p className="text-xs text-white font-semibold">Agent Callaps</p>
                </div>
                {/* Chat */}
                <div className="px-3 py-3 space-y-2">
                  <div className="bg-white/5 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%]">
                    <p className="text-[10px] text-slate-300">{lang === "fr" ? "Bonjour ! Comment puis-je vous aider ?" : "Hello! How can I help?"}</p>
                  </div>
                  <div className="bg-gradient-to-r from-primary to-accent rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[80%] ml-auto">
                    <p className="text-[10px] text-white">{lang === "fr" ? "Je voudrais un rendez-vous" : "I'd like an appointment"}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%]">
                    <p className="text-[10px] text-slate-300">{lang === "fr" ? "Parfait ! Jeudi 14h vous convient ?" : "Perfect! Does Thursday 2pm work?"}</p>
                  </div>
                  <div className="bg-gradient-to-r from-primary to-accent rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[70%] ml-auto">
                    <p className="text-[10px] text-white">{lang === "fr" ? "Oui, c'est noté !" : "Yes, noted!"}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%]">
                    <p className="text-[10px] text-slate-300">{lang === "fr" ? "RDV confirmé. Bonne journée !" : "Appointment confirmed. Have a great day!"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Notifications éparpillées autour du téléphone ── */}

            {/* Top-right: appel entrant */}
            <div
              ref={dashRef}
              className="absolute top-2 right-0 glass rounded-xl px-3 py-2.5 shadow-lg"
              style={{ transition: "transform 0.1s linear" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-white font-medium">{lang === "fr" ? "Appel entrant" : "Incoming call"}</p>
                  <p className="text-[9px] text-emerald-400">{lang === "fr" ? "Décroché en 0.3s" : "Answered in 0.3s"}</p>
                </div>
              </div>
            </div>

            {/* Top-left: lead qualifié */}
            <div className="absolute top-16 -left-6 glass rounded-xl px-3 py-2.5 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-white font-medium">{lang === "fr" ? "Lead qualifié" : "Qualified lead"}</p>
                  <p className="text-[9px] text-accent">{lang === "fr" ? "Transféré → CRM" : "Transferred → CRM"}</p>
                </div>
              </div>
            </div>

            {/* Middle-right: RDV pris */}
            <div className="absolute top-[45%] -right-8 glass rounded-xl px-3 py-2.5 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-white font-medium">{lang === "fr" ? "RDV confirmé" : "Appointment set"}</p>
                  <p className="text-[9px] text-primary">{lang === "fr" ? "Jeudi 14h — Auto" : "Thursday 2pm — Auto"}</p>
                </div>
              </div>
            </div>

            {/* Bottom-left: appel sortant */}
            <div className="absolute bottom-20 -left-4 glass rounded-xl px-3 py-2.5 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                    <polyline points="23 7 23 1 17 1" /><line x1="16" y1="8" x2="23" y2="1" />
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-white font-medium">{lang === "fr" ? "Appel sortant" : "Outbound call"}</p>
                  <p className="text-[9px] text-blue-400">{lang === "fr" ? "Prospection auto" : "Auto prospecting"}</p>
                </div>
              </div>
            </div>

            {/* Bottom-right: analyse */}
            <div className="absolute bottom-4 right-4 glass rounded-xl px-3 py-2.5 shadow-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                    <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                    <path d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z" />
                    <path d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-white font-medium">{lang === "fr" ? "Analyse temps réel" : "Real-time analysis"}</p>
                  <p className="text-[9px] text-amber-400">+45% {lang === "fr" ? "conversion" : "conversion"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
