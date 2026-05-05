"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerStar, StickerQuote, StickerSparkle } from "@/components/icons/sticker";

const INITIALS = ["SM", "MD", "AB"];
const CARD_VARIANTS: Array<"card" | "paper" | "card"> = ["card", "paper", "card"];

export default function Testimonials() {
  const { lang } = useLang();

  return (
    <section id="temoignages" className="relative py-20 md:py-28 bg-card-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border-[2px] border-stroke text-stroke text-xs font-bold uppercase tracking-wide [box-shadow:3px_3px_0_var(--color-stroke)]">
              <StickerSparkle size={18} />
              {lang === "fr" ? "Témoignages" : "Testimonials"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-stroke leading-tight">
            {t.testimonials.title1[lang]}
            <span className="text-primary"> {t.testimonials.titleHighlight[lang]}</span>
          </h2>
          <p className="mt-4 text-lg text-stroke opacity-70 max-w-2xl mx-auto">
            {t.testimonials.subtitle[lang]}
          </p>
        </div>

        {/* Testimonial cards — 3 columns on large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.testimonials.items.map((item, index) => {
            const variant = CARD_VARIANTS[index] ?? "card";
            const isPaper = variant === "paper";
            const textColor = isPaper ? "text-[#0B0B0F]" : "text-stroke";

            return (
              <StickerCard key={item.name} variant={variant} rotation={0} hoverable>
                {/* Quote icon */}
                <StickerQuote size={36} className={`${textColor} mb-4`} />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StickerStar key={i} size={20} className={textColor} />
                  ))}
                </div>

                {/* Citation */}
                <p className={`text-base lg:text-lg leading-relaxed mb-8 ${textColor} opacity-90`}>
                  &ldquo;{item.quote[lang]}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${
                      isPaper
                        ? "bg-[#0B0B0F] text-[#FAF7F0] border-[2px] border-[#0B0B0F]"
                        : "bg-primary text-stroke border-[2px] border-stroke"
                    }`}
                  >
                    {INITIALS[index]}
                  </div>
                  <div>
                    <p className={`font-bold ${textColor}`}>{item.name}</p>
                    <p className={`text-sm ${textColor} opacity-60`}>{item.role[lang]}</p>
                  </div>
                </div>
              </StickerCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
