"use client";

import { useLang } from "@/lib/LanguageContext";

export default function TrustBar() {
  const { lang } = useLang();

  return (
    <section className="py-8 px-4 bg-slate-950/80">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">
          {lang === "fr" ? "Ils nous font confiance" : "Trusted by"}
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {/* RGPD Compliant */}
          <div className="flex items-center gap-2 glass rounded-full px-5 py-2.5">
            <svg
              className="w-5 h-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-sm text-slate-300">RGPD Compliant</span>
          </div>

          {/* Made in France */}
          <div className="flex items-center gap-2 glass rounded-full px-5 py-2.5">
            <svg
              className="w-5 h-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <span className="text-sm text-slate-300">Made in France</span>
          </div>

          {/* +50 entreprises */}
          <div className="flex items-center gap-2 glass rounded-full px-5 py-2.5">
            <svg
              className="w-5 h-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-sm text-slate-300">
              {lang === "fr"
                ? "+50 entreprises accompagn\u00e9es"
                : "+50 businesses supported"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
