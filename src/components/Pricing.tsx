"use client";

import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerCheck,
  StickerEuro,
  StickerSparkle,
} from "@/components/icons/sticker";

const cardVariants = ["card", "violet", "elevated"] as const;

export default function Pricing() {
  const { lang } = useLang();

  return (
    <section
      id="pricing"
      className="relative py-20 md:py-28 bg-card overflow-hidden"
    >
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide mb-6 [box-shadow:3px_3px_0_var(--color-stroke)]">
            <StickerSparkle size={16} />
            {t.nav.pricing[lang]}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stroke leading-tight mb-4">
            {t.pricing.title1[lang]}
            <span className="text-primary">{t.pricing.titleHighlight[lang]}</span>
          </h2>
          <p className="text-base md:text-lg text-stroke/70 leading-relaxed">
            {t.pricing.subtitle[lang]}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {t.pricing.plans.map((plan, i) => {
            const variant = cardVariants[i];
            const isFeatured = i === 1;
            const isCustom = i === 2;

            return (
              <div key={i} className="relative flex">
                {/* Populaire badge — absolute positioned over card */}
                {isFeatured && (
                  <span className="absolute top-5 right-5 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stroke text-bg-deep border-[2px] border-stroke text-[11px] font-black uppercase tracking-wide [box-shadow:3px_3px_0_var(--color-bg-deep)] sm:rotate-[5deg]">
                    {t.pricing.recommended[lang]}
                  </span>
                )}

                <StickerCard variant={variant} className="w-full flex flex-col">
                  {/* Icon box */}
                  <StickerIconBox
                    variant={isFeatured ? "stroke" : "violet"}
                    size="md"
                    className="mb-5"
                  >
                    <StickerEuro size={28} />
                  </StickerIconBox>

                  {/* Plan name */}
                  <StickerCard.Title>{plan.name[lang]}</StickerCard.Title>

                  {/* Price */}
                  <div className="my-4">
                    <span className="text-5xl font-black leading-none">
                      {plan.price[lang]}
                    </span>
                    {!isCustom && (
                      <span className="text-base font-bold opacity-60 ml-1">
                        {t.pricing.monthly[lang]}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <StickerCard.Description>{plan.description[lang]}</StickerCard.Description>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm leading-snug"
                      >
                        <StickerCheck size={20} className="shrink-0 mt-0.5" />
                        <span className="opacity-85">{feature[lang]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Extra pricing */}
                  {plan.extra && (
                    <p className="text-xs opacity-50 mb-5 border-t border-current/10 pt-4">
                      {plan.extra[lang]}
                    </p>
                  )}

                  {/* CTA */}
                  <Link
                    href="/demo"
                    className={`block w-full text-center px-6 py-3 rounded-full font-black text-sm border-[2px] transition-transform duration-150 hover:-translate-y-0.5 ${
                      isFeatured
                        ? "bg-bg-deep text-stroke border-stroke [box-shadow:4px_4px_0_var(--color-stroke)]"
                        : "bg-stroke text-bg-deep border-stroke [box-shadow:4px_4px_0_var(--color-bg-deep)]"
                    }`}
                  >
                    {isCustom ? t.pricing.ctaContact[lang] : t.pricing.cta[lang]}
                  </Link>
                </StickerCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
