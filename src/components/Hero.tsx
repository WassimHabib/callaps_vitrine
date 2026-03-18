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
          <div className="relative hidden lg:flex items-center justify-center h-[500px]">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl" />

            {/* Dashboard mockup — floats up on scroll */}
            <div
              ref={dashRef}
              className="absolute -top-4 -right-4 w-[340px] rounded-2xl glass p-4 shadow-2xl shadow-black/30"
              style={{ transition: "transform 0.1s linear" }}
            >
              {/* Mini dashboard */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400">Dashboard Callaps</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-primary">247</p>
                  <p className="text-[10px] text-slate-500">{lang === "fr" ? "Appels" : "Calls"}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-emerald-400">89%</p>
                  <p className="text-[10px] text-slate-500">{lang === "fr" ? "Résolus" : "Resolved"}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-accent">34</p>
                  <p className="text-[10px] text-slate-500">Leads</p>
                </div>
              </div>
              {/* Mini chart bars */}
              <div className="flex items-end gap-1 h-12">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Phone mockup — floats down on scroll */}
            <div
              ref={phoneRef}
              className="absolute bottom-0 left-4 w-[200px] rounded-[2rem] bg-slate-950 border border-white/10 p-2 shadow-2xl shadow-black/50"
              style={{ transition: "transform 0.1s linear" }}
            >
              {/* Phone notch */}
              <div className="w-16 h-1 bg-slate-800 rounded-full mx-auto mb-2" />
              {/* Screen */}
              <div className="rounded-[1.5rem] bg-gradient-to-b from-slate-900 to-slate-950 p-3 space-y-2">
                {/* Agent header */}
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <p className="text-[10px] text-white font-medium">Agent Callaps</p>
                    <p className="text-[8px] text-emerald-400">{lang === "fr" ? "En ligne" : "Online"}</p>
                  </div>
                </div>
                {/* Chat bubbles */}
                <div className="bg-white/5 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%]">
                  <p className="text-[9px] text-slate-300">{lang === "fr" ? "Bonjour ! Comment puis-je vous aider ?" : "Hello! How can I help you?"}</p>
                </div>
                <div className="bg-gradient-to-r from-primary to-accent rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[85%] ml-auto">
                  <p className="text-[9px] text-white">{lang === "fr" ? "Je voudrais un rendez-vous" : "I'd like an appointment"}</p>
                </div>
                <div className="bg-white/5 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%]">
                  <p className="text-[9px] text-slate-300">{lang === "fr" ? "Parfait ! Je vous propose jeudi à 14h." : "Perfect! How about Thursday at 2pm?"}</p>
                </div>
                {/* Typing indicator */}
                <div className="flex gap-1 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>

            {/* Floating badge — call notification */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white font-medium">{lang === "fr" ? "Appel qualifié" : "Qualified call"}</p>
                  <p className="text-[10px] text-emerald-400">{lang === "fr" ? "Lead transféré → CRM" : "Lead transferred → CRM"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
