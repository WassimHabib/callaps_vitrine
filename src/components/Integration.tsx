"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";

const badgeIcons = [
  // CRM icon — contacts/people
  <svg key="crm" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H9m6 0a5.972 5.972 0 0 0-.786-3.07M9 19.128A9.38 9.38 0 0 1 6.375 19.5a9.337 9.337 0 0 1-4.121-.952 4.125 4.125 0 0 1 7.533-2.493M9 19.128v-.003c0-1.113.285-2.16.786-3.07M9 19.128H15m-6 0a5.972 5.972 0 0 1 .786-3.07m4.428 0a6.003 6.003 0 0 0-5.214 0" />
  </svg>,
  // Internal tools icon — wrench
  <svg key="tools" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
  </svg>,
  // Business software icon — building
  <svg key="business" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
  </svg>,
];

export default function Integration() {
  const { lang } = useLang();

  return (
    <section className="bg-surface/50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          {t.integration.title[lang]}
          <span className="gradient-text">{t.integration.titleHighlight[lang]}</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg text-center mt-4 max-w-2xl mx-auto">
          {t.integration.subtitle[lang]}
        </p>

        {/* Integration badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {[
            { label: "CRM", icon: badgeIcons[0] },
            { label: lang === "fr" ? "Outils internes" : "Internal tools", icon: badgeIcons[1] },
            { label: lang === "fr" ? "Logiciels métiers" : "Business software", icon: badgeIcons[2] },
          ].map((badge, i) => (
            <div
              key={i}
              className="glass rounded-xl px-6 py-4 flex items-center gap-3 text-white font-medium"
            >
              {badge.icon}
              {badge.label}
            </div>
          ))}
        </div>

        {/* Footer text */}
        <p className="text-slate-400 text-sm mt-8 text-center">
          {t.integration.footer[lang]}
        </p>
      </div>
    </section>
  );
}
