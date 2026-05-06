"use client";

import { useLang } from "@/lib/LanguageContext";
import { t } from "@/lib/translations";
import { StickerCard } from "@/components/ui/sticker-card";
import { StickerIconBox } from "@/components/ui/sticker-icon-box";
import {
  StickerPhoneMissed,
  StickerSparkle,
  StickerSoundwave,
  StickerCalendar,
} from "@/components/icons/sticker";

const itemIcons = [
  <StickerPhoneMissed key="phone-missed" size={28} />,
  <StickerSparkle key="sparkle" size={28} />,
  <StickerSoundwave key="soundwave" size={28} />,
  <StickerCalendar key="calendar" size={28} />,
];

export default function Problem() {
  const { lang } = useLang();

  return (
    <section id="problem" className="relative py-20 md:py-28 bg-card">
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-stroke mb-4 leading-tight">
            {t.problem.title[lang]}
          </h2>
          <p className="text-lg text-stroke/75 leading-relaxed">
            {t.problem.subtitle[lang]}
          </p>
        </div>

        {/* Problem items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {t.problem.items.map((item, i) => (
            <StickerCard key={i} variant={i % 2 === 0 ? "card" : "elevated"} hoverable={false}>
              <div className="flex items-start gap-4">
                <StickerIconBox variant="violet" size="md">
                  {itemIcons[i]}
                </StickerIconBox>
                <p className="text-base lg:text-lg text-stroke leading-relaxed font-medium">
                  {item[lang]}
                </p>
              </div>
            </StickerCard>
          ))}
        </div>

        {/* Result banner */}
        <div className="max-w-3xl mx-auto">
          <StickerCard variant="violet" hoverable={false}>
            <p className="text-xl md:text-2xl text-stroke font-black text-center leading-tight">
              {t.problem.result[lang]}
            </p>
          </StickerCard>
        </div>
      </div>
    </section>
  );
}
