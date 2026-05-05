"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import {
  StickerCalendar,
  StickerArrowRight,
  StickerMessage,
} from "@/components/icons/sticker";
import { DashboardResultats } from "@/components/scenes/dashboard-resultats";

export default function CTA() {
  const { lang } = useLang();

  return (
    <section className="bg-secondary overflow-hidden relative">
      {/* Dots pattern overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left col — copy + CTAs */}
          <div className="flex flex-col items-start gap-8">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-bg-deep bg-stroke text-bg-deep text-sm font-semibold">
              <StickerMessage size={20} />
              {lang === "fr" ? "Passez à l'action" : "Take action"}
            </span>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-bg-deep">
              {t.cta.title[lang]}
              <span className="block">{t.cta.titleHighlight[lang]}</span>
            </h2>

            {/* Sub-copy / trust pills */}
            <div className="flex flex-wrap gap-2">
              {t.cta.trust[lang].split(" · ").map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-bg-deep text-stroke border border-stroke text-sm font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primary */}
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-bg-deep text-stroke border border-stroke font-bold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ boxShadow: "4px 4px 0 var(--color-stroke)" }}
              >
                <StickerCalendar size={20} />
                {t.cta.ctaPrimary[lang]}
                <StickerArrowRight size={16} />
              </Link>

              {/* Secondary */}
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stroke text-bg-deep border border-bg-deep font-bold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <StickerMessage size={20} />
                {t.cta.ctaSecondary[lang]}
              </Link>
            </div>
          </div>

          {/* Right col — Dashboard scene */}
          <div className="hidden lg:flex items-center justify-center mt-12 lg:mt-0">
            <DashboardResultats className="w-full max-w-md drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
